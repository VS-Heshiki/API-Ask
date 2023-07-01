import { Answer } from '@/domain/forum/enterprise/entities'

export interface AnswerRepository {
    create: (answer: Answer) => Promise<void>
    delete: (answerId: string) => Promise<void>
    findById: (answerId: string) => Promise<Answer | null>
    edit: (params: AnswerRepository.Edit) => Promise<void>
}

export namespace AnswerRepository {
    export type Edit = {
        answerId: string
        content: string
    }
}
