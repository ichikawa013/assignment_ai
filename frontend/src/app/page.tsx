'use client'
import Link from 'next/link'
import { useAssignmentStore } from '@/store/assignmentStore'
import { Assignment } from '@/store/assignmentStore'

export default function AssignmentsPage() {
  const { assignments } = useAssignmentStore()

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Assignments</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage and create assignments for your classes
          </p>
        </div>
        <Link href="/assignments/create">
          <button className="bg-gray-900 text-white text-sm font-medium py-2.5 px-4 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <span className="text-lg leading-none">+</span>
            Create Assignment
          </button>
        </Link>
      </div>

      {assignments.length === 0 ? (
        <EmptyState />
      ) : (
        <AssignmentGrid assignments={assignments} />
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-32">
      <div className="w-32 h-32 mb-6">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="20" y="15" width="65" height="85" rx="6" fill="#e5e5e5" />
          <rect x="28" y="28" width="40" height="4" rx="2" fill="#c5c5c5" />
          <rect x="28" y="38" width="30" height="4" rx="2" fill="#c5c5c5" />
          <rect x="28" y="48" width="35" height="4" rx="2" fill="#c5c5c5" />
          <circle cx="78" cy="72" r="22" fill="#fef3f0" stroke="#f97316" strokeWidth="2" />
          <line x1="73" y1="67" x2="83" y2="77" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="83" y1="67" x2="73" y2="77" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        No assignments yet
      </h2>
      <p className="text-sm text-gray-500 text-center max-w-xs mb-8">
        Create your first assignment to start collecting and grading student
        submissions. Let AI assist with grading.
      </p>
      <Link href="/assignments/create">
        <button className="bg-gray-900 text-white text-sm font-medium py-2.5 px-5 rounded-lg hover:bg-gray-800 transition-colors">
          + Create Your First Assignment
        </button>
      </Link>
    </div>
  )
}

function AssignmentGrid({ assignments }: { assignments: Assignment[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {assignments.map((a) => (
        <div
          key={a.id}
          className="bg-white rounded-xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-900 text-sm">{a.title}</h3>
            <button className="text-gray-400 hover:text-gray-600 text-lg leading-none">⋯</button>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-gray-400">
              Assigned on:{' '}
              <span className="text-gray-600">{a.assignedOn}</span>
            </p>
            <p className="text-xs text-gray-400">
              Due:{' '}
              <span className="text-gray-600">{a.dueDate}</span>
            </p>
          </div>
          <div className="flex gap-2 mt-4">
            <Link href={`/assignments/${a.id}/output`} className="flex-1">
              <button className="w-full text-xs border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition-colors">
                View Assignment
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}