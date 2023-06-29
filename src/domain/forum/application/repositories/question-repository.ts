import { Question } from '@/domain/forum/enterprise/entities'

export interface QuestionRepository {
    create: (question: Question) => Promise<void>
    getBySlug: (slug: string) => Promise<Question | null>
}
