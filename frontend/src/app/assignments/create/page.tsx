'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAssignmentStore } from '@/store/assignmentStore'
import StepOne from '@/components/create/StepOne'
import StepTwo from '@/components/create/StepTwo'

export default function CreateAssignmentPage() {
  const router = useRouter()
  const { form, currentStep, setStep } = useAssignmentStore()
  const [errors, setErrors] = useState<string[]>([])

  const validateStepOne = () => {
    const errs: string[] = []
    if (!form.title.trim()) errs.push('Assignment title is required')
    if (!form.schoolName.trim()) errs.push('School name is required')
    if (!form.subject.trim()) errs.push('Subject is required')
    if (!form.grade.trim()) errs.push('Class / Grade is required')
    if (!form.topic.trim()) errs.push('Topic is required')
    if (!form.dueDate) errs.push('Due date is required')
    return errs
  }

  const validateStepTwo = () => {
    const errs: string[] = []
    if (form.questionTypes.length === 0) {
      errs.push('Add at least one question type')
    }
    form.questionTypes.forEach((qt, i) => {
      if (qt.numQuestions < 1)
        errs.push(`Question type ${i + 1}: number of questions must be at least 1`)
      if (qt.marks < 1)
        errs.push(`Question type ${i + 1}: marks must be at least 1`)
    })
    return errs
  }

  const handleNext = () => {
    const errs = validateStepOne()
    if (errs.length > 0) {
      setErrors(errs)
      return
    }
    setErrors([])
    setStep(2)
  }

  const handleSubmit = async () => {
    const errs = validateStepTwo()
    if (errs.length > 0) {
      setErrors(errs)
      return
    }
    setErrors([])
    router.push('/assignments/generate')
  }

  const handleBack = () => {
    setErrors([])
    setStep(1)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          ← Assignment
        </button>
        <h1 className="text-2xl font-semibold text-gray-900">Create Assignment</h1>
        <p className="text-sm text-gray-500 mt-1">
          Set up a new assignment for your students
        </p>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              currentStep >= 1
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            1
          </div>
          <span
            className={`text-sm font-medium ${
              currentStep === 1 ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            Assignment Details
          </span>
        </div>

        <div className="flex-1 h-px bg-gray-200" />

        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              currentStep >= 2
                ? 'bg-gray-900 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            2
          </div>
          <span
            className={`text-sm font-medium ${
              currentStep === 2 ? 'text-gray-900' : 'text-gray-400'
            }`}
          >
            Question Setup
          </span>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        {/* Errors */}
        {errors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm font-medium text-red-700 mb-1">
              Please fix the following:
            </p>
            <ul className="list-disc list-inside space-y-1">
              {errors.map((err, i) => (
                <li key={i} className="text-sm text-red-600">
                  {err}
                </li>
              ))}
            </ul>
          </div>
        )}

        {currentStep === 1 ? <StepOne /> : <StepTwo />}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {currentStep === 2 ? (
          <button
            onClick={handleBack}
            className="px-6 py-2.5 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            ← Previous
          </button>
        ) : (
          <div />
        )}

        {currentStep === 1 ? (
          <button
            onClick={handleNext}
            className="px-6 py-2.5 text-sm bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
          >
            Generate Question Paper ✨
          </button>
        )}
      </div>
    </div>
  )
}