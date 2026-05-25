'use client'
import { useAssignmentStore } from '@/store/assignmentStore'

export default function StepOne() {
  const { form, updateForm } = useAssignmentStore()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    updateForm({ uploadedFile: file })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Assignment Details</h2>
        <p className="text-sm text-gray-500">Basic information about your assignment</p>
      </div>

      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-orange-300 transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 16H7a3 3 0 010-6h.5M16 16h1a3 3 0 000-6h-.5M8.5 10a4 4 0 017 0" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {form.uploadedFile ? form.uploadedFile.name : 'Choose a file or drag & drop it here'}
            </p>
            <p className="text-xs text-gray-400 mt-1">PDF or text files supported</p>
          </div>
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf,.txt"
              className="hidden"
              onChange={handleFileChange}
            />
            <span className="text-sm border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors inline-block">
              Browse Files
            </span>
          </label>
        </div>
      </div>

      {/* Assignment Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Assignment Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateForm({ title: e.target.value })}
          placeholder="e.g. Quiz on Electricity"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
        />
      </div>

      {/* School Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          School Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.schoolName}
          onChange={(e) => updateForm({ schoolName: e.target.value })}
          placeholder="e.g. Delhi Public School, Bokaro"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
        />
      </div>

      {/* Subject + Grade row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Subject <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => updateForm({ subject: e.target.value })}
            placeholder="e.g. Science"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Class / Grade <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={form.grade}
            onChange={(e) => updateForm({ grade: e.target.value })}
            placeholder="e.g. Grade 8"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
          />
        </div>
      </div>

      {/* Topic */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Topic / Chapter <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.topic}
          onChange={(e) => updateForm({ topic: e.target.value })}
          placeholder="e.g. Electrolysis and Chemical Effects"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
        />
      </div>

      {/* Due Date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Due Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => updateForm({ dueDate: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
        />
      </div>
    </div>
  )
}