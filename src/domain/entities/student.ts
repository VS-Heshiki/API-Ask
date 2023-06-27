import { Entity, UniqueEntityId } from '@/core/entities'

export class Student extends Entity<StudentInput>{
    static create (params: StudentInput, id?: UniqueEntityId): Student {
        const student = new Student(params, id)

        return student
    }
}

export type StudentInput = {
    name: string
}
