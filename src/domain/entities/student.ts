import { Entity } from '@/core/entities'

export class Student extends Entity<StudentInput>{
}

export type StudentInput = {
    name: string
}
