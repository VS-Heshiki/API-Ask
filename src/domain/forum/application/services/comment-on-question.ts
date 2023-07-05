import { QuestionComment } from '@/domain/forum/enterprise/entities'
import { QuestionCommentRepository, QuestionRepository } from '@/domain/forum/application/repositories'
import { ResourceNotFoundError } from '@/domain/forum/application/services/errors/resource-not-found-error'
import { UniqueEntityId } from '@/core/entities'
import { Either, left, right } from '@/core/types'

type CommentOnQuestionInput = {
    authorId: string
    questionId: string
    content: string
}

type CommentOnQuestionOutput = Either<ResourceNotFoundError, { questionComment: QuestionComment }>

export class CommentOnQuestionService {

    constructor (
        private readonly questionRepository: QuestionRepository,
        private readonly questionCommentRepository: QuestionCommentRepository
    ) { }

    async execute ({ authorId, questionId, content }: CommentOnQuestionInput): Promise<CommentOnQuestionOutput> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
            content
        })

        await this.questionCommentRepository.create(questionComment)

        return right({ questionComment })
    }
}
