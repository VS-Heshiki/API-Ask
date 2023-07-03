import { PaginationParams } from '@/core/repositories'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

export interface QuestionCommentRepository {
    findById: (commentId: string) => Promise<QuestionComment | null>
    create: (questionComment: QuestionComment) => Promise<void>
    delete: (questionComment: QuestionComment) => Promise<void>
    findManyComments: (questionId: string, page: PaginationParams) => Promise<QuestionComment[]>
}
