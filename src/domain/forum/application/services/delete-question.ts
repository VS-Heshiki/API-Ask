import { UniqueEntityId } from '@/core/entities'
import { QuestionRepository } from '@/domain/forum/application/repositories'

type DeleteQuestionInput = {
    authorId: string
    questionId: string
}

type DeleteQuestionOutput = void

export class DeleteQuestionService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ authorId, questionId }: DeleteQuestionInput): Promise<DeleteQuestionOutput> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not Found')
        }

        if (question.authorId !== new UniqueEntityId(authorId)) {
            throw new Error('Not Allowed')
        }

        await this.questionRepository.delete(questionId)
    }
}
