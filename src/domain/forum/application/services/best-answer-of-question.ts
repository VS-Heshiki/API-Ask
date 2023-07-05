import { Question } from '@/domain/forum/enterprise/entities'
import { AnswerRepository, QuestionRepository } from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { Either, left, right } from '@/core/types'

type BestAnswerOfQuestionInput = {
    authorId: string
    answerId: string
}

type BestAnswerOfQuestionOutput = Either<NotAllowedError | ResourceNotFoundError, { question: Question }>

export class BestAnswerOfQuestionService {
    constructor (
        private readonly questionRepository: QuestionRepository,
        private readonly answerRepository: AnswerRepository
    ) { }

    async execute ({ authorId, answerId }: BestAnswerOfQuestionInput): Promise<BestAnswerOfQuestionOutput> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        const question = await this.questionRepository.findById(answer.questionId.toString)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (question.authorId.toString !== authorId) {
            return left(new NotAllowedError())
        }

        question.bestAnswerId = answer.id

        await this.questionRepository.save(question)

        return right({ question })
    }
}
