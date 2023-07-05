import { AnswerComment } from '@/domain/forum/enterprise/entities'
import { AnswerCommentRepository, AnswerRepository } from '@/domain/forum/application/repositories'
import { ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { UniqueEntityId } from '@/core/entities'
import { Either, left, right } from '@/core/types'


type CommentOnAnswerInput = {
    authorId: string
    answerId: string
    content: string
}

type CommentOnAnswerOutput = Either<ResourceNotFoundError, { answerComment: AnswerComment }>

export class CommentOnAnswerService {

    constructor (
        private readonly answerRepository: AnswerRepository,
        private readonly answerCommentRepository: AnswerCommentRepository
    ) { }

    async execute ({ authorId, answerId, content }: CommentOnAnswerInput): Promise<CommentOnAnswerOutput> {
        const answer = await this.answerRepository.findById(answerId)

        if (!answer) {
            return left(new ResourceNotFoundError())
        }

        const answerComment = AnswerComment.create({
            authorId: new UniqueEntityId(authorId),
            answerId: new UniqueEntityId(answerId),
            content
        })

        await this.answerCommentRepository.create(answerComment)

        return right({ answerComment })
    }
}
