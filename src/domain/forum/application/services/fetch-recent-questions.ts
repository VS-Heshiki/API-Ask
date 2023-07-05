import { Question } from '@/domain/forum/enterprise/entities'
import { QuestionRepository } from '@/domain/forum/application/repositories'
import { Either, right } from '@/core/types'

type FetchRecentQuestionsInput = {
    page: number
}

type FetchRecentQuestionsOutput = Either<void, { questions: Question[] }>

export class FetchRecentQuestionsService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ page }: FetchRecentQuestionsInput): Promise<FetchRecentQuestionsOutput> {
        const questions = await this.questionRepository.findManyRecent({ page })

        return right({ questions })
    }
}
