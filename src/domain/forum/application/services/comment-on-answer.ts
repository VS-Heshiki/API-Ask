import { AnswerCommentRepository, AnswerRepository } from '@/domain/forum/application/repositories'
import { AnswerComment } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'

type CommentOnAnswerInput = {
    authorId: string
    answerId: string
    content: string
}

type CommentOnAnswerOutput = {
    answerComment: AnswerComment
}

export class CommentOnAnswerService {

    constructor (
        private readonly answerRepository: AnswerRepository,
        private readonly answerCommentRepository: AnswerCommentRepository
    ) { }

    async execute ({ authorId, answerId, content }: CommentOnAnswerInput): Promise<CommentOnAnswerOutput> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found!')
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityId(authorId),
            answerId: new UniqueEntityId(answerId),
            content
        })

        await this.answerCommentRepository.create(answerComment)

        return { answerComment }
    }
}
