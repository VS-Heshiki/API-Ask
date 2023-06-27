import { Entity } from '@/core/entities'

export class Instructor extends Entity<InstructorInput> {
}

export type InstructorInput = {
    name: string
}
