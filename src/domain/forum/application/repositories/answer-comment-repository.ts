import { AnswerComment } from '@/domain/forum/enterprise/entities'

export interface AnswerCommentRepository {
    create: (answerComment: AnswerComment) => Promise<void>
}
