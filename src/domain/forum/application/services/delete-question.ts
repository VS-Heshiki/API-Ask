import { QuestionRepository } from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { Either, left, right } from '@/core/types'

type DeleteQuestionInput = {
    authorId: string
    questionId: string
}

type DeleteQuestionOutput = Either<ResourceNotFoundError | NotAllowedError, object>

export class DeleteQuestionService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ authorId, questionId }: DeleteQuestionInput): Promise<DeleteQuestionOutput> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (question.authorId.toString !== authorId) {
            return left(new NotAllowedError())
        }

        await this.questionRepository.delete(questionId)
        return right({})
    }
}
