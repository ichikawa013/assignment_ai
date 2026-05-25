'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAssignmentStore } from '@/store/assignmentStore'

const STEPS = [
  'Analyzing assignment details...',
  'Structuring question sections...',
  'Generating questions with AI...',
  'Applying difficulty levels...',
  'Finalizing question paper...',
]

export default function GeneratePage() {
  const router = useRouter()
  const { form, setGeneratedPaper, setGenerating } = useAssignmentStore()
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const hasStarted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    if (!form.title) {
      router.push('/assignments/create')
      return
    }

    const run = async () => {
      setGenerating(true)

      const interval = setInterval(() => {
        setProgress((p) => (p >= 90 ? p : p + 10))
        setCurrentStatusIndex((i) => Math.min(i + 1, STEPS.length - 1))
      }, 1200)

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: form.title,
            subject: form.subject,
            grade: form.grade,
            topic: form.topic,
            schoolName: form.schoolName,
            dueDate: form.dueDate,
            questionTypes: form.questionTypes,
            additionalInstructions: form.additionalInstructions,
          }),
        })

        clearInterval(interval)

        if (!response.ok) {
          const err = await response.json()
          throw new Error(err.error || 'Generation failed')
        }

        const data = await response.json()

        // Save to MongoDB
        await fetch('http://localhost:5000/api/assignments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: form.title,
            schoolName: form.schoolName,
            subject: form.subject,
            grade: form.grade,
            topic: form.topic,
            dueDate: form.dueDate,
            additionalInstructions: form.additionalInstructions,
            questionTypes: form.questionTypes,
            generatedPaper: data.paper,
          }),
        })

        setProgress(100)
        setGeneratedPaper(data.paper)
        setGenerating(false)

        const { addAssignment } = useAssignmentStore.getState()
        addAssignment({
          id: data.assignmentId,
          title: form.title,
          subject: form.subject,
          grade: form.grade,
          assignedOn: new Date().toLocaleDateString('en-GB'),
          dueDate: form.dueDate,
          status: 'generated',
        })

        setTimeout(() => {
          router.push(`/assignments/${data.assignmentId}/output`)
        }, 500)
      } catch (err) {
        clearInterval(interval)
        setGenerating(false)
        setError(err instanceof Error ? err.message : 'Something went wrong')
      }
    }

    run()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center border border-gray-100">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✕</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Generation Failed</h2>
          <p className="text-sm text-gray-500 mb-6">{error}</p>
          <button
            onClick={() => router.push('/assignments/create')}
            className="bg-gray-900 text-white text-sm px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl p-10 max-w-md w-full mx-4 border border-gray-100 shadow-sm">
        <div className="flex justify-center mb-8">
          <div className="relative w-20 h-20">
            <div className="w-20 h-20 rounded-full border-4 border-orange-100 border-t-orange-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-2xl">
              ✨
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
          Generating Question Paper
        </h2>
        <p className="text-sm text-gray-500 text-center mb-8">
          AI is crafting your personalized assessment
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{STEPS[currentStatusIndex]}</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-2 mt-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 transition-colors ${i < currentStatusIndex
                  ? 'bg-green-500 text-white'
                  : i === currentStatusIndex
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                  }`}
              >
                {i < currentStatusIndex ? '✓' : i + 1}
              </div>
              <span
                className={`text-sm transition-colors ${i === currentStatusIndex
                  ? 'text-gray-900 font-medium'
                  : i < currentStatusIndex
                    ? 'text-gray-400 line-through'
                    : 'text-gray-400'
                  }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}