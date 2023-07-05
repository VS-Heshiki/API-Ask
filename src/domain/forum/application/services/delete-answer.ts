import { AnswerRepository } from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { Either, left, right } from '@/core/types'

type DeleteAnswerInput = {
    authorId: string
    answerId: string
}

type DeleteAnswerOutput = Either<ResourceNotFoundError | NotAllowedError, object>

export class DeleteAnswerService {

    constructor (private readonly answerRepository: AnswerRepository) { }

    async execute ({ authorId, answerId }: DeleteAnswerInput): Promise<DeleteAnswerOutput> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== answer.authorId.toString) {
            return left(new NotAllowedError())
        }

        await this.answerRepository.delete(answerId)
        return right({})
    }
}
