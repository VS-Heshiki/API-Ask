import { Entity, UniqueEntityId } from '@/core/entities'
import { Optional } from '@/core/types'

export class Answer extends Entity<AnswerInput>{
    get authorId () {
        return this.params.authorId
    }

    get questionId () {
        return this.params.questionId
    }

    get content () {
        return this.params.content
    }

    get excerpt () {
        return this.content
            .substring(0, 120)
            .trimEnd()
            .concat('...')
    }

    private refresh () {
        this.params.updatedAt = new Date()
    }

    set content (content: string) {
        this.content = content
        this.refresh()
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
