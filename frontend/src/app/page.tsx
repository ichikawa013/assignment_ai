'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import { useAssignmentStore, Assignment } from '@/store/assignmentStore'

export default function AssignmentsPage() {
  const { assignments } = useAssignmentStore()

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/assignments')
        if (!res.ok) return
        const data = await res.json()
        const current = useAssignmentStore.getState().assignments
        if (current.length > 0) return
        data.assignments.forEach((a: {
          _id: string
          title: string
          subject: string
          grade: string
          createdAt: string
          dueDate: string
          status: 'pending' | 'generated'
        }) => {
          useAssignmentStore.getState().addAssignment({
            id: a._id,
            title: a.title,
            subject: a.subject,
            grade: a.grade,
            assignedOn: new Date(a.createdAt).toLocaleDateString('en-GB'),
            dueDate: a.dueDate,
            status: a.status,
          })
        })
      } catch (err) {
        console.error('Failed to fetch assignments:', err)
      }
    }
    fetchAssignments()
  }, [])

  return (
    <div className="px-4 py-6 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            Assignments
          </h1>
          <p className="text-sm text-gray-500 mt-1 hidden sm:block">
            Manage and create assignments for your classes
          </p>
        </div>
        <Link href="/assignments/create" className="shrink-0">
          <button className="bg-gray-900 text-white text-sm font-medium py-2.5 px-3 sm:px-4 rounded-lg flex items-center gap-1.5 hover:bg-gray-800 active:scale-95 transition-all">
            <span className="text-base leading-none">+</span>
            <span className="hidden sm:inline">Create Assignment</span>
            <span className="sm:hidden">Create</span>
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
    <div className="flex flex-col items-center justify-center py-20 sm:py-32 px-4">
      <div className="w-24 h-24 sm:w-32 sm:h-32 mb-5">
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
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 text-center">
        No assignments yet
      </h2>
      <p className="text-sm text-gray-500 text-center max-w-xs mb-8">
        Create your first assignment to start collecting and grading student
        submissions. Let AI assist with grading.
      </p>
      <Link href="/assignments/create">
        <button className="bg-gray-900 text-white text-sm font-medium py-3 px-6 rounded-lg hover:bg-gray-800 active:scale-95 transition-all w-full sm:w-auto">
          + Create Your First Assignment
        </button>
      </Link>
    </div>
  )
}

function AssignmentGrid({ assignments }: { assignments: Assignment[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      {assignments.map((a: Assignment) => (
        <div
          key={a.id}
          className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 hover:shadow-md active:shadow-sm transition-shadow"
        >
          {/* Card header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm leading-snug truncate">
                {a.title}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                {a.subject} · {a.grade}
              </p>
            </div>
            <span className={`shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
              a.status === 'generated'
                ? 'bg-green-50 text-green-700'
                : 'bg-yellow-50 text-yellow-700'
            }`}>
              {a.status}
            </span>
          </div>

          {/* Dates — two columns on mobile for compactness */}
          <div className="grid grid-cols-2 gap-1 sm:block sm:space-y-1">
            <p className="text-xs text-gray-400">
              Assigned:{' '}
              <span className="text-gray-600 block sm:inline">{a.assignedOn}</span>
            </p>
            <p className="text-xs text-gray-400">
              Due:{' '}
              <span className="text-gray-600 block sm:inline">{a.dueDate}</span>
            </p>
          </div>

          {/* Action button — full width, tall touch target on mobile */}
          <div className="mt-4">
            <Link href={`/assignments/${a.id}/output`} className="block">
              <button className="w-full text-xs border border-gray-200 rounded-lg py-2.5 sm:py-2 hover:bg-gray-50 active:bg-gray-100 transition-colors font-medium">
                View Assignment
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}