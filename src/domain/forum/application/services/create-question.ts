import { Question } from '@/domain/forum/enterprise/entities'
import { QuestionRepository } from '@/domain/forum/application/repositories'
import { UniqueEntityId } from '@/core/entities'
import { Either, right } from '@/core/types'

type CreateQuestionInput = {
    authorId: string
    title: string
    content: string
}

type CreateQuestionOutput = Either<null, { question: Question }>

export class CreateQuestionService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ authorId, title, content }: CreateQuestionInput): Promise<CreateQuestionOutput> {
        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content
        })

        await this.questionRepository.create(question)

        return right({ question })
    }
}
