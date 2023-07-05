import { AnswerRepository } from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { Either, left, right } from '@/core/types'

type EditAnswerInput = {
    authorId: string
    answerId: string
    content: string
}

type EditAnswerOutput = Either<ResourceNotFoundError | NotAllowedError, object>

export class EditAnswerService {

    constructor (private readonly answerRepository: AnswerRepository) { }

    async execute ({ authorId, answerId, content }: EditAnswerInput): Promise<EditAnswerOutput> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (answer.authorId.toString !== authorId) {
            return left(new NotAllowedError())
        }

        answer.content = content
        await this.answerRepository.save(answer)
        return right({})
    }
}
