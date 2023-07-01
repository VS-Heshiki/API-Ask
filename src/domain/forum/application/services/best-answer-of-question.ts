import { AnswerRepository, QuestionRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

type BestAnswerOfQuestionInput = {
    authorId: string
    answerId: string
}

type BestAnswerOfQuestionOutput = {
    question: Question
}

export class BestAnswerOfQuestionService {

    constructor (
        private readonly questionRepository: QuestionRepository,
        private readonly answerRepository: AnswerRepository
    ) { }

    async execute ({ authorId, answerId }: BestAnswerOfQuestionInput): Promise<BestAnswerOfQuestionOutput> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not Found')
        }

        const question = await this.questionRepository.findById(answer.questionId.toString)

        if (!question) {
            throw new Error('Question not Found')
        }

        if (question.authorId.toString !== authorId) {
            throw new Error('Not Allowed')
        }

        question.bestAnswerId = answer.id

        await this.questionRepository.save(question)

        return { question }
    }
}
