import { AnswerRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'

type FetchAnswersQuestionInput = {
    questionId: string
    page: number
}

type FetchAnswersQuestionOutput = {
    answers: Answer[]
}

export class FetchAnswersQuestionService {

    constructor (private readonly answerRepository: AnswerRepository) { }

    async execute ({ questionId, page }: FetchAnswersQuestionInput): Promise<FetchAnswersQuestionOutput> {
        const answers = await this.answerRepository.findManyAnswers(questionId, { page })

        return { answers }
    }
}
