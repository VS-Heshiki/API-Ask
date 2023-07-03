import { AnswerComment } from '@/domain/forum/enterprise/entities'

export interface AnswerCommentRepository {
    findById: (commentId: string) => Promise<AnswerComment | null>
    create: (answerComment: AnswerComment) => Promise<void>
    delete: (answerComment: AnswerComment) => Promise<void>
}
