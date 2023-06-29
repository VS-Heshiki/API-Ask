import { Answer } from '@/domain/forum/enterprise/entities'

export interface AnswerRepository {
    create: (answer: Answer) => Promise<void>
}
