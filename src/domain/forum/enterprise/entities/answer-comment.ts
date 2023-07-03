import { Comment, CommentInput } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'
import { Optional } from '@/core/types'

export class AnswerComment extends Comment<AnswerCommentInput>{
    get answerId () {
        return this.params.answerId
    }

    static create (params: Optional<AnswerCommentInput, 'createdAt'>, id?: UniqueEntityId): AnswerComment {
        const answerComment = new AnswerComment({
            ...params,
            createdAt: new Date()
        }, id)

        return answerComment
    }
}

export interface AnswerCommentInput extends CommentInput {
    answerId: UniqueEntityId
}
