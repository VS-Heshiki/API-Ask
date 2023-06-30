import { AnswerRepository } from '@/domain/forum/application/repositories'

type DeleteAnswerInput = {
    authorId: string
    answerId: string
}

type DeleteAnswerOutput = void

export class DeleteAnswerService {

    constructor (private readonly answerRepository: AnswerRepository) { }

    async execute ({ authorId, answerId }: DeleteAnswerInput): Promise<DeleteAnswerOutput> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not Found')
        }

        if (authorId !== answer.authorId.toString) {
            throw new Error('Not Allowed')
        }

        await this.answerRepository.delete(answerId)
    }
}
