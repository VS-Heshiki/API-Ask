import { Entity, UniqueEntityId } from '@/core/entities'
import { Optional } from '@/core/types'
import { Slug } from '@/domain/entities/value-objects'

export class Question extends Entity<QuestionInput> {
    static create (params: Optional<QuestionInput, 'createdAt'>, id?: UniqueEntityId): Question {
        const question = new Question({
            ...params,
            createdAt: new Date()
        }, id)

        return question
    }
}

export type QuestionInput = {
    authorId: UniqueEntityId
    bestAnswerId: UniqueEntityId
    content: string
    title: string
    slug: Slug
    createdAt: Date
    updatedAt?: Date
}
