import { Question, QuestionAttachment } from '@/domain/forum/enterprise/entities'
import { QuestionRepository } from '@/domain/forum/application/repositories'
import { UniqueEntityId } from '@/core/entities'
import { Either, right } from '@/core/types'

type CreateQuestionInput = {
    authorId: string
    title: string
    content: string
    attachmentId: string[]
}

type CreateQuestionOutput = Either<null, { question: Question }>

export class CreateQuestionService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ authorId, title, content, attachmentId }: CreateQuestionInput): Promise<CreateQuestionOutput> {
        const question = Question.create({
            authorId: new UniqueEntityId(authorId),
            title,
            content
        })

        const questionAttachments = attachmentId.map(attachmentIds => {
            return QuestionAttachment.create({
                questionId: question.id,
                attachmentId: new UniqueEntityId(attachmentIds)
            })
        })

        question.attachment = questionAttachments

        await this.questionRepository.create(question)

        return right({ question })
    }
}
