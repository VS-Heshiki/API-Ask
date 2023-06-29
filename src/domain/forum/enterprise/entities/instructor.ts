import { Entity, UniqueEntityId } from '@/core/entities'

export class Instructor extends Entity<InstructorInput> {
    static create (params: InstructorInput, id?: UniqueEntityId): Instructor {
        const instructor = new Instructor(params, id)

        return instructor
    }
}

export type InstructorInput = {
    name: string
}
