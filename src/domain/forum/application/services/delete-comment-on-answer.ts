import { AnswerCommentRepository } from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { Either, left, right } from '@/core/types'

type DeleteCommentOnAnswerInput = {
    authorId: string
    commentId: string
}

type DeleteCommentOnAnswerOutput = Either<ResourceNotFoundError | NotAllowedError, object>

export class DeleteCommentOnAnswerService {

    constructor (
        private readonly answerCommentRepository: AnswerCommentRepository
    ) { }

    async execute ({ authorId, commentId }: DeleteCommentOnAnswerInput): Promise<DeleteCommentOnAnswerOutput> {
        const comment = await this.answerCommentRepository.findById(commentId)

        if (!comment) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== comment.authorId.toString) {
            return left(new NotAllowedError())
        }

        await this.answerCommentRepository.delete(comment)
        return right({})
    }
}
