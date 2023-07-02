import { PaginationParams } from '@/core/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

export interface QuestionRepository {
    findById: (questionId: string) => Promise<Question | null>
    findMany: (page: PaginationParams) => Promise<Question[]>
    create: (question: Question) => Promise<void>
    getBySlug: (slug: string) => Promise<Question | null>
    delete: (questionId: string) => Promise<void>
    save: (question: Question) => Promise<void>
}
