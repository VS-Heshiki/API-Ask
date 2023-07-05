import { QuestionCommentRepository } from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { Either, left, right } from '@/core/types'

type DeleteCommentOnQuestionInput = {
    authorId: string
    commentId: string
}

type DeleteCommentOnQuestionOutput = Either<ResourceNotFoundError | NotAllowedError, object>

export class DeleteCommentOnQuestionService {

    constructor (
        private readonly questionCommentRepository: QuestionCommentRepository
    ) { }

    async execute ({ authorId, commentId }: DeleteCommentOnQuestionInput): Promise<DeleteCommentOnQuestionOutput> {
        const comment = await this.questionCommentRepository.findById(commentId)

        if (!comment) {
            return left(new ResourceNotFoundError())
        }

        if (authorId !== comment.authorId.toString) {
            return left(new NotAllowedError())
        }

        await this.questionCommentRepository.delete(comment)
        return right({})
    }
}
