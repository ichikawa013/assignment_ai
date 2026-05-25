import { Request, Response } from 'express'
import Assignment from '../models/Assignment'

export const createAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received body:', JSON.stringify(req.body, null, 2))
    const {
      title,
      schoolName,
      subject,
      grade,
      topic,
      dueDate,
      additionalInstructions,
      questionTypes,
      generatedPaper,
    } = req.body

    const assignment = new Assignment({
      title,
      schoolName,
      subject,
      grade,
      topic,
      dueDate,
      additionalInstructions,
      questionTypes,
      generatedPaper,
      status: 'generated',
    })

    await assignment.save()
    console.log('Saved assignment with ID:', assignment._id)
    console.log('Assignment status:', assignment.status)

    res.status(201).json({
      message: 'Assignment saved successfully',
      assignmentId: assignment._id,
      assignment,
    })
  } catch (err) {
    console.error('Create assignment error:', err)
    console.error('Full error:', JSON.stringify(err, null, 2))
    res.status(500).json({ error: 'Failed to save assignment' })
  }
}

export const getAssignments = async (req: Request, res: Response): Promise<void> => {
  try {
    const assignments = await Assignment.find()
      .sort({ createdAt: -1 })
      .select('title subject grade dueDate status createdAt')

    res.json({ assignments })
  } catch (err) {
    console.error('Get assignments error:', err)
    res.status(500).json({ error: 'Failed to fetch assignments' })
  }
}

export const getAssignmentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const assignment = await Assignment.findById(req.params.id)

    if (!assignment) {
      res.status(404).json({ error: 'Assignment not found' })
      return
    }

    res.json({ assignment })
  } catch (err) {
    console.error('Get assignment error:', err)
    res.status(500).json({ error: 'Failed to fetch assignment' })
  }
}

export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    await Assignment.findByIdAndDelete(req.params.id)
    res.json({ message: 'Assignment deleted' })
  } catch (err) {
    console.error('Delete assignment error:', err)
    res.status(500).json({ error: 'Failed to delete assignment' })
  }
}