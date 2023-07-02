import { QuestionRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

type FetchRecentQuestionsInput = {
    page: number
}

type FetchRecentQuestionsOutput = {
    questions: Question[]
}

export class FetchRecentQuestionsService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ page }: FetchRecentQuestionsInput): Promise<FetchRecentQuestionsOutput> {
        const questions = await this.questionRepository.findMany({ page })

        return { questions }
    }
}
