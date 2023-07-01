import { QuestionRepository } from '@/domain/forum/application/repositories'

type EditQuestionInput = {
    authorId: string
    questionId: string
    title: string
    content: string
}

type EditQuestionOutput = void

export class EditQuestionService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ authorId, questionId, title, content }: EditQuestionInput): Promise<EditQuestionOutput> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not Found')
        }

        if (question.authorId.toString !== authorId) {
            throw new Error('Not Allowed')
        }

        await this.questionRepository.edit({ questionId, title, content })
    }
}
