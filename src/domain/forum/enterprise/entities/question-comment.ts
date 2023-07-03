import { Entity, UniqueEntityId } from '@/core/entities'
import { Optional } from '@/core/types'

export class QuestionComment extends Entity<QuestionCommentInput>{
    get authorId () {
        return this.params.authorId
    }

    get questionId () {
        return this.params.questionId
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

    static create (params: Optional<QuestionCommentInput, 'createdAt'>, id?: UniqueEntityId): QuestionComment {
        const questionComment = new QuestionComment({
            ...params,
            createdAt: new Date()
        }, id)

        return questionComment
    }
}

export type QuestionCommentInput = {
    authorId: UniqueEntityId
    questionId: UniqueEntityId
    content: string
    createdAt: Date
    updatedAt?: Date
}
