import { Question } from '@/domain/forum/enterprise/entities'

export interface QuestionRepository {
    create: (question: Question) => Promise<void>
}
