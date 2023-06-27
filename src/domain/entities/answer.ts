import { Entity, UniqueEntityId } from '@/core/entities'
import { Optional } from '@/core/types'

export class Answer extends Entity<AnswerInput>{
    get content () {
        return this.params.content
    }

    static create (params: Optional<AnswerInput, 'createdAt'>, id?: UniqueEntityId): Answer {
        const answer = new Answer({
            ...params,
            createdAt: new Date()
        }, id)

        return answer
    }
}

export type AnswerInput = {
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    content: string
    createdAt: Date
    updatedAt?: Date
}
