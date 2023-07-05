import { QuestionRepository } from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { Either, left, right } from '@/core/types'

type EditQuestionInput = {
    authorId: string
    questionId: string
    title: string
    content: string
}

type EditQuestionOutput = Either<ResourceNotFoundError | NotAllowedError, object>

export class EditQuestionService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ authorId, questionId, title, content }: EditQuestionInput): Promise<EditQuestionOutput> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (question.authorId.toString !== authorId) {
            return left(new NotAllowedError())
        }

        question.title = title
        question.content = content
        await this.questionRepository.save(question)
        return right({})
    }
}
