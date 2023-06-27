import { Answer } from '@/domain/entities'

export interface AnswerRepository {
    create: (answer: Answer) => Promise<void>
}
