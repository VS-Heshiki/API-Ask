import { Entity, UniqueEntityId } from '@/core/entities'

export class Answer extends Entity<AnswerInput>{
    get content () {
        return this.params.content
    }
}

export type AnswerInput = {
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    content: string
    createdAt: Date
    updatedAt?: Date
}
