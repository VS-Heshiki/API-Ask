import { QuestionCommentRepository, QuestionRepository } from '@/domain/forum/application/repositories'
import { QuestionComment } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'

type CommentOnQuestionInput = {
    authorId: string
    questionId: string
    content: string
}

type CommentOnQuestionOutput = {
    questionComment: QuestionComment
}

export class CommentOnQuestionService {

    constructor (
        private readonly questionRepository: QuestionRepository,
        private readonly questionCommentRepository: QuestionCommentRepository
    ) { }

    async execute ({ authorId, questionId, content }: CommentOnQuestionInput): Promise<CommentOnQuestionOutput> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found!')
        }

        const questionComment = QuestionComment.create({
            authorId: new UniqueEntityId(authorId),
            questionId: new UniqueEntityId(questionId),
            content
        })

        await this.questionCommentRepository.create(questionComment)

        return { questionComment }
    }
}
