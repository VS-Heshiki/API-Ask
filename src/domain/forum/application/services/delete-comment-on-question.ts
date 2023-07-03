import { QuestionCommentRepository } from '@/domain/forum/application/repositories'

type DeleteCommentOnQuestionInput = {
    authorId: string
    commentId: string
}

type DeleteCommentOnQuestionOutput = void

export class DeleteCommentOnQuestionService {

    constructor (
        private readonly questionCommentRepository: QuestionCommentRepository
    ) { }

    async execute ({ authorId, commentId }: DeleteCommentOnQuestionInput): Promise<DeleteCommentOnQuestionOutput> {
        const comment = await this.questionCommentRepository.findById(commentId)

        if (!comment) {
            throw new Error('Comment not found!')
        }

        if (authorId !== comment.authorId.toString) {
            throw new Error('Not Allowed')
        }

        await this.questionCommentRepository.delete(comment)
    }
}
