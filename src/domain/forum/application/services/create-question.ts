import { QuestionRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'

type CreateQuestionInput = {
    authorId: string
    title: string
    content: string
}

type CreateQuestionOutput = {
    question: Question
}

export class CreateQuestionService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ authorId, title, content }: CreateQuestionInput): Promise<CreateQuestionOutput> {
        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content
        })

        await this.questionRepository.create(question)

        return { question }
    }
}
