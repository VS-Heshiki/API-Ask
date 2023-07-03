import { PaginationParams } from '@/core/repositories'
import { AnswerComment } from '@/domain/forum/enterprise/entities'

export interface AnswerCommentRepository {
    findById: (commentId: string) => Promise<AnswerComment | null>
    create: (answerComment: AnswerComment) => Promise<void>
    delete: (answerComment: AnswerComment) => Promise<void>
    findManyComments: (answerId: string, page: PaginationParams) => Promise<AnswerComment[]>
}
