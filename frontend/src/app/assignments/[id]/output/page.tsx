'use client'
import { useRouter, useParams } from 'next/navigation'
import { useAssignmentStore } from '@/store/assignmentStore'
import { useState, useEffect } from 'react'
import { GeneratedPaper } from '@/store/assignmentStore'

const DIFFICULTY_STYLES: Record<string, string> = {
  Easy: 'bg-green-50 text-green-700 border border-green-200',
  Moderate: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  Hard: 'bg-red-50 text-red-700 border border-red-200',
}

export default function OutputPage() {
  const router = useRouter()
  const params = useParams()
  const { resetForm } = useAssignmentStore()
  const [studentName, setStudentName] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [section, setSection] = useState('')

  const [paper, setPaper] = useState<GeneratedPaper | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = useAssignmentStore.getState().generatedPaper
    if (stored) {
      setPaper(stored)// eslint-disable-line react-hooks/set-state-in-effect
      setLoading(false)
      return
    }
    const fetchPaper = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/assignments/${params.id}`)
        if (!res.ok) throw new Error('Not found')
        const data = await res.json()
      console.log('API response:', data)
        const a = data.assignment ?? data
        setPaper({
          assignmentId: a._id,
          schoolName: a.schoolName,
          subject: a.subject,
          grade: a.grade,
          topic: a.topic,
          timeAllowed: a.generatedPaper.timeAllowed,
          totalMarks: a.generatedPaper.totalMarks,
          sections: a.generatedPaper.sections,
        })
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchPaper()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-gray-500">Loading paper...</p>
        </div>
      </div>
    )
  }

  if (!paper) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No question paper found.</p>
          <button
            onClick={() => router.push('/assignments/create')}
            className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-lg"
          >
            Create Assignment
          </button>
        </div>
      </div>
    )
  }

  const handlePrint = () => window.print()
  const handleRegenerate = () => router.push('/assignments/generate')
  const handleNewAssignment = () => {
    resetForm()
    router.push('/assignments/create')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Action Bar */}
      <div className="flex items-center justify-between mb-6 print:hidden">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRegenerate}
            className="flex items-center gap-2 text-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
          >
            ↻ Regenerate
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 text-sm bg-gray-900 text-white rounded-lg px-4 py-2 hover:bg-gray-800 transition-colors"
          >
            ↓ Download as PDF
          </button>
          <button
            onClick={handleNewAssignment}
            className="flex items-center gap-2 text-sm bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-600 transition-colors"
          >
            + New Assignment
          </button>
        </div>
      </div>

      {/* Question Paper */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden" id="question-paper">
        {/* Header */}
        <div className="border-b-2 border-gray-900 p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide uppercase">
            {paper.schoolName}
          </h1>
          <div className="mt-2 space-y-1">
            <p className="text-base font-medium text-gray-700">
              Subject: {paper.subject}
            </p>
            <p className="text-base font-medium text-gray-700">
              Class: {paper.grade}
            </p>
            <p className="text-sm text-gray-500">
              Topic: {paper.topic}
            </p>
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600">
            <span>Time Allowed: {paper.timeAllowed}</span>
            <span>Maximum Marks: {paper.totalMarks}</span>
          </div>
        </div>

        {/* General Instructions */}
        <div className="px-8 py-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600 italic">
            All questions are compulsory unless stated otherwise.
          </p>
        </div>

        {/* Student Info */}
        <div className="px-8 py-6 border-b border-gray-200">
          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="____________________"
                className="w-full border-b border-gray-400 pb-1 text-sm focus:outline-none focus:border-gray-900 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Roll Number</label>
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="____________________"
                className="w-full border-b border-gray-400 pb-1 text-sm focus:outline-none focus:border-gray-900 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Section</label>
              <input
                type="text"
                value={section}
                onChange={(e) => setSection(e.target.value)}
                placeholder="____________________"
                className="w-full border-b border-gray-400 pb-1 text-sm focus:outline-none focus:border-gray-900 bg-transparent"
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="px-8 py-6 space-y-8">
          {paper.sections.map((sec, sIndex) => (
            <div key={sIndex}>
              <div className="text-center mb-4">
                <h2 className="text-base font-bold text-gray-900 uppercase tracking-widest">
                  {sec.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1 italic">
                  {sec.instruction}
                </p>
              </div>
              <div className="space-y-4">
                {sec.questions.map((question, qIndex) => (
                  <div
                    key={question.id}
                    className="flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-medium">
                      {qIndex + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 leading-relaxed">
                        {question.text}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span
                          className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${DIFFICULTY_STYLES[question.difficulty] ||
                            DIFFICULTY_STYLES['Easy']
                            }`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="text-xs text-gray-400">
                          [{question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}]
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-8 py-4 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400">— End of Question Paper —</p>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white !important; }
          #question-paper {
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  )
}