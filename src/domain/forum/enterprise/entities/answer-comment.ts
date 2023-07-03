import { Entity, UniqueEntityId } from '@/core/entities'
import { Optional } from '@/core/types'

export class AnswerComment extends Entity<AnswerCommentInput>{
    get authorId () {
        return this.params.authorId
    }

    get answerId () {
        return this.params.answerId
    }

    get content () {
        return this.params.content
    }

    set content (content: string) {
        this.params.content = content
        this.refresh()
    }

    private refresh () {
        this.params.updatedAt = new Date()
    }

    static create (params: Optional<AnswerCommentInput, 'createdAt'>, id?: UniqueEntityId): AnswerComment {
        const answerComment = new AnswerComment({
            ...params,
            createdAt: new Date()
        }, id)

        return answerComment
    }
}

export type AnswerCommentInput = {
    authorId: UniqueEntityId
    answerId: UniqueEntityId
    content: string
    createdAt: Date
    updatedAt?: Date
}
