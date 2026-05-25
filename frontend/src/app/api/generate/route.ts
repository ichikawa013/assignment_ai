import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      title,
      subject,
      grade,
      topic,
      schoolName,
      questionTypes,
      additionalInstructions,
    } = body

    const totalMarks = questionTypes.reduce(
      (sum: number, qt: { numQuestions: number; marks: number }) =>
        sum + qt.numQuestions * qt.marks,
      0
    )

    const questionBreakdown = questionTypes
      .map(
        (qt: { type: string; numQuestions: number; marks: number }) =>
          `- ${qt.type}: ${qt.numQuestions} questions × ${qt.marks} marks each`
      )
      .join('\n')

    const prompt = `You are an expert teacher. Generate a structured question paper with the following details:

School: ${schoolName}
Subject: ${subject}
Class/Grade: ${grade}
Topic: ${topic}
Assignment Title: ${title}
Total Marks: ${totalMarks}

Question Breakdown:
${questionBreakdown}

${additionalInstructions ? `Additional Instructions: ${additionalInstructions}` : ''}

Return ONLY a valid JSON object in this exact format, no extra text:
{
  "timeAllowed": "45 minutes",
  "sections": [
    {
      "title": "Section A",
      "instruction": "Attempt all questions",
      "questions": [
        {
          "id": "1",
          "text": "Question text here?",
          "difficulty": "Easy",
          "marks": 2
        }
      ]
    }
  ]
}

Rules:
- difficulty must be exactly "Easy", "Moderate", or "Hard"
- Group questions by type into sections (Section A, Section B, etc.)
- Each section should have questions of the same type
- Make questions relevant to the topic
- Return valid JSON only, no markdown, no explanation`

    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }),
    })

    if (!groqRes.ok) {
      const err = await groqRes.json()
      throw new Error(err.error?.message || 'Groq request failed')
    }

    const groqData = await groqRes.json()
    const rawText = groqData.choices[0].message.content.trim()

    const cleaned = rawText
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/```$/i, '')
      .trim()

    const parsed = JSON.parse(cleaned)

    const paper = {
      assignmentId: Date.now().toString(),
      schoolName,
      subject,
      grade,
      topic,
      title,
      timeAllowed: parsed.timeAllowed || '45 minutes',
      totalMarks,
      sections: parsed.sections,
    }

    return NextResponse.json({
      assignmentId: paper.assignmentId,
      paper,
    })
  } catch (err) {
    console.error('Generate error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Generation failed' },
      { status: 500 }
    )
  }
}