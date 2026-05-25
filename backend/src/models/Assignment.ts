import mongoose, { Schema, Document } from 'mongoose'

export interface IQuestion {
  id: string
  text: string
  difficulty: 'Easy' | 'Moderate' | 'Hard'
  marks: number
}

export interface ISection {
  title: string
  instruction: string
  questions: IQuestion[]
}

export interface IAssignment extends Document {
  title: string
  schoolName: string
  subject: string
  grade: string
  topic: string
  dueDate: string
  additionalInstructions: string
  questionTypes: {
    type: string
    numQuestions: number
    marks: number
  }[]
  generatedPaper: {
    timeAllowed: string
    totalMarks: number
    sections: ISection[]
  } | null
  status: 'pending' | 'generated'
  createdAt: Date
}

const QuestionSchema = new Schema({
  id: String,
  text: String,
  difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'] },
  marks: Number,
})

const SectionSchema = new Schema({
  title: String,
  instruction: String,
  questions: [QuestionSchema],
})

const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    schoolName: { type: String, required: true },
    subject: { type: String, required: true },
    grade: { type: String, required: true },
    topic: { type: String, required: true },
    dueDate: { type: String, required: true },
    additionalInstructions: { type: String, default: '' },
    questionTypes: [
      {
        type: { type: String },
        numQuestions: Number,
        marks: Number,
      },
    ],
    generatedPaper: {
      timeAllowed: String,
      totalMarks: Number,
      sections: [SectionSchema],
    },
    status: {
      type: String,
      enum: ['pending', 'generated'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

export default mongoose.model<IAssignment>('Assignment', AssignmentSchema)