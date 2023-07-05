import { Answer } from '@/domain/forum/enterprise/entities'
import { AnswerRepository } from '@/domain/forum/application/repositories'
import { Either, right } from '@/core/types'

type FetchAnswersQuestionInput = {
    questionId: string
    page: number
}

type FetchAnswersQuestionOutput = Either<void, { answers: Answer[] }>

export class FetchAnswersQuestionService {

    constructor (private readonly answerRepository: AnswerRepository) { }

    async execute ({ questionId, page }: FetchAnswersQuestionInput): Promise<FetchAnswersQuestionOutput> {
        const answers = await this.answerRepository.findManyAnswers(questionId, { page })

        return right({ answers })
    }
}
