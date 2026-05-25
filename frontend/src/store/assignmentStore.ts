import { create } from 'zustand'

export type QuestionType = {
  id: string
  type: string
  numQuestions: number
  marks: number
}

export type Assignment = {
  id: string
  title: string
  subject: string
  grade: string
  assignedOn: string
  dueDate: string
  status: 'pending' | 'generated'
}

export type AssignmentForm = {
  title: string
  subject: string
  grade: string
  topic: string
  schoolName: string
  dueDate: string
  additionalInstructions: string
  questionTypes: QuestionType[]
  uploadedFile: File | null
}

export type GeneratedQuestion = {
  id: string
  text: string
  difficulty: 'Easy' | 'Moderate' | 'Hard'
  marks: number
}

export type GeneratedSection = {
  title: string
  instruction: string
  questions: GeneratedQuestion[]
}

export type GeneratedPaper = {
  assignmentId: string
  schoolName: string
  subject: string
  grade: string
  topic: string
  timeAllowed: string
  totalMarks: number
  sections: GeneratedSection[]
}

type AssignmentStore = {
  currentStep: number
  form: AssignmentForm
  isGenerating: boolean
  generationStatus: string
  generatedPaper: GeneratedPaper | null
  assignments: Assignment[]
  setStep: (step: number) => void
  updateForm: (data: Partial<AssignmentForm>) => void
  addQuestionType: () => void
  removeQuestionType: (id: string) => void
  updateQuestionType: (id: string, data: Partial<QuestionType>) => void
  setGenerating: (val: boolean) => void
  setGenerationStatus: (status: string) => void
  setGeneratedPaper: (paper: GeneratedPaper) => void
  resetForm: () => void
  addAssignment: (assignment: Assignment) => void
}

const defaultForm: AssignmentForm = {
  title: '',
  subject: '',
  grade: '',
  topic: '',
  schoolName: '',
  dueDate: '',
  additionalInstructions: '',
  questionTypes: [
    { id: '1', type: 'Short Answer Questions', numQuestions: 5, marks: 2 },
  ],
  uploadedFile: null,
}

export const useAssignmentStore = create<AssignmentStore>((set) => ({
  currentStep: 1,
  form: defaultForm,
  isGenerating: false,
  generationStatus: '',
  generatedPaper: null,
  assignments: [],

  setStep: (step) => set({ currentStep: step }),

  updateForm: (data) =>
    set((state) => ({ form: { ...state.form, ...data } })),

  addQuestionType: () =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: [
          ...state.form.questionTypes,
          {
            id: Date.now().toString(),
            type: 'Multiple Choice Questions',
            numQuestions: 4,
            marks: 1,
          },
        ],
      },
    })),

  removeQuestionType: (id) =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: state.form.questionTypes.filter((q) => q.id !== id),
      },
    })),

  updateQuestionType: (id, data) =>
    set((state) => ({
      form: {
        ...state.form,
        questionTypes: state.form.questionTypes.map((q) =>
          q.id === id ? { ...q, ...data } : q
        ),
      },
    })),

  setGenerating: (val) => set({ isGenerating: val }),
  setGenerationStatus: (status) => set({ generationStatus: status }),
  setGeneratedPaper: (paper) => set({ generatedPaper: paper }),
  resetForm: () => set({ form: defaultForm, currentStep: 1, generatedPaper: null }),
  addAssignment: (assignment) =>
    set((state) => ({
      assignments: [assignment, ...state.assignments],
    })),
}))