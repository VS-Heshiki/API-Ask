import { AnswerCommentRepository } from '@/domain/forum/application/repositories'

type DeleteCommentOnAnswerInput = {
    authorId: string
    commentId: string
}

type DeleteCommentOnAnswerOutput = void

export class DeleteCommentOnAnswerService {

    constructor (
        private readonly answerCommentRepository: AnswerCommentRepository
    ) { }

    async execute ({ authorId, commentId }: DeleteCommentOnAnswerInput): Promise<DeleteCommentOnAnswerOutput> {
        const comment = await this.answerCommentRepository.findById(commentId)

        if (!comment) {
            throw new Error('Comment not found!')
        }

        if (authorId !== comment.authorId.toString) {
            throw new Error('Not Allowed')
        }

        await this.answerCommentRepository.delete(comment)
    }
}
