import { QuestionComment } from '@/domain/forum/enterprise/entities'

export interface QuestionCommentRepository {
    create: (questionComment: QuestionComment) => Promise<void>
}
