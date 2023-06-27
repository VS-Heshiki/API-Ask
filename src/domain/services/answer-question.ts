import { Answer } from '@/domain/entities'
import { AnswerRepository } from '@/domain/repositories'

export type AnswerQuestionInput = {
    instructorId: string
    questionId: string
    content: string
}

export class AnswerQuestion {

    constructor (private readonly answerRepository: AnswerRepository) { }

    async execute ({ instructorId, questionId, content }: AnswerQuestionInput): Promise<Answer> {
        const answer = new Answer({
            content,
            authorId: instructorId,
            questionId
        })

        await this.answerRepository.create(answer)

        return answer
    }
}
