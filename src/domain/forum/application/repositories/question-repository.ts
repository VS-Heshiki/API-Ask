import { Question } from '@/domain/forum/enterprise/entities'

export interface QuestionRepository {
    findById: (questionId: string) => Promise<Question | null>
    create: (question: Question) => Promise<void>
    getBySlug: (slug: string) => Promise<Question | null>
    delete: (questionId: string) => Promise<void>
    edit: (params: QuestionRepository.edit) => Promise<void>
}

export namespace QuestionRepository {
    export type edit = {
        questionId: string
        title: string
        content: string
    }
}
