'use client'
import { useAssignmentStore } from '@/store/assignmentStore'

const QUESTION_TYPES = [
  'Multiple Choice Questions',
  'Short Answer Questions',
  'Long Answer Questions',
  'Diagram/Graph-Based Questions',
  'Numerical Problems',
  'True/False Questions',
  'Fill in the Blanks',
]

export default function StepTwo() {
  const { form, addQuestionType, removeQuestionType, updateQuestionType, updateForm } =
    useAssignmentStore()

  const totalQuestions = form.questionTypes.reduce((sum, q) => sum + q.numQuestions, 0)
  const totalMarks = form.questionTypes.reduce((sum, q) => sum + q.numQuestions * q.marks, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Question Configuration</h2>
        <p className="text-sm text-gray-500">Set up question types, counts and marks</p>
      </div>

      {/* Question Types */}
      <div className="space-y-3">
        {form.questionTypes.map((qt, index) => (
          <div
            key={qt.id}
            className="border border-gray-200 rounded-xl p-4 bg-white"
          >
            <div className="flex items-center gap-3">
              {/* Type selector */}
              <select
                value={qt.type}
                onChange={(e) => updateQuestionType(qt.id, { type: e.target.value })}
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 bg-white"
              >
                {QUESTION_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Num questions */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500 whitespace-nowrap">No. of Q</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      updateQuestionType(qt.id, {
                        numQuestions: Math.max(1, qt.numQuestions - 1),
                      })
                    }
                    className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 text-sm"
                  >
                    −
                  </button>
                  <span className="px-3 py-1.5 text-sm font-medium min-w-[32px] text-center">
                    {qt.numQuestions}
                  </span>
                  <button
                    onClick={() =>
                      updateQuestionType(qt.id, {
                        numQuestions: qt.numQuestions + 1,
                      })
                    }
                    className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Marks */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">Marks</span>
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() =>
                      updateQuestionType(qt.id, {
                        marks: Math.max(1, qt.marks - 1),
                      })
                    }
                    className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 text-sm"
                  >
                    −
                  </button>
                  <span className="px-3 py-1.5 text-sm font-medium min-w-[32px] text-center">
                    {qt.marks}
                  </span>
                  <button
                    onClick={() =>
                      updateQuestionType(qt.id, { marks: qt.marks + 1 })
                    }
                    className="px-2.5 py-1.5 text-gray-500 hover:bg-gray-50 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Remove */}
              {index > 0 && (
                <button
                  onClick={() => removeQuestionType(qt.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Question Type */}
      <button
        onClick={addQuestionType}
        className="flex items-center gap-2 text-sm text-gray-600 border border-dashed border-gray-300 rounded-xl px-4 py-3 w-full hover:border-orange-400 hover:text-orange-500 transition-colors"
      >
        <span className="text-lg leading-none">+</span>
        Add Question Type
      </button>

      {/* Totals */}
      <div className="bg-orange-50 rounded-xl p-4 flex justify-between">
        <div className="text-sm">
          <span className="text-gray-500">Total Questions: </span>
          <span className="font-semibold text-gray-900">{totalQuestions}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Total Marks: </span>
          <span className="font-semibold text-gray-900">{totalMarks}</span>
        </div>
      </div>

      {/* Additional Instructions */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Additional Instructions
          <span className="text-gray-400 font-normal ml-1">(For better output)</span>
        </label>
        <textarea
          value={form.additionalInstructions}
          onChange={(e) => updateForm({ additionalInstructions: e.target.value })}
          placeholder="e.g. Generate a question paper for a 3-hour exam duration..."
          rows={4}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors resize-none"
        />
      </div>
    </div>
  )
}