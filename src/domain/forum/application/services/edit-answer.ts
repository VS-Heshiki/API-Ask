import { AnswerRepository } from '@/domain/forum/application/repositories'

type EditAnswerInput = {
    authorId: string
    answerId: string
    content: string
}

type EditAnswerOutput = void

export class EditAnswerService {

    constructor (private readonly answerRepository: AnswerRepository) { }

    async execute ({ authorId, answerId, content }: EditAnswerInput): Promise<EditAnswerOutput> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not Found')
        }

        if (answer.authorId.toString !== authorId) {
            throw new Error('Not Allowed')
        }

        answer.content = content

        await this.answerRepository.save(answer)
    }
}
