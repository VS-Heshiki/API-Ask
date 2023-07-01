import { Question } from '@/domain/forum/enterprise/entities'

export interface QuestionRepository {
    findById: (questionId: string) => Promise<Question | null>
    create: (question: Question) => Promise<void>
    getBySlug: (slug: string) => Promise<Question | null>
    delete: (questionId: string) => Promise<void>
    edit: (params: QuestionRepository.Edit) => Promise<void>
}

export namespace QuestionRepository {
    export type Edit = {
        questionId: string
        title: string
        content: string
    }
}
