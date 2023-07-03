import { Comment, CommentInput } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'
import { Optional } from '@/core/types'

export class QuestionComment extends Comment<QuestionCommentInput>{
    get questionId () {
        return this.params.questionId
    }

    static create (params: Optional<QuestionCommentInput, 'createdAt'>, id?: UniqueEntityId): QuestionComment {
        const questionComment = new QuestionComment({
            ...params,
            createdAt: new Date()
        }, id)

        return questionComment
    }
}

export interface QuestionCommentInput extends CommentInput {
    questionId: UniqueEntityId
}
