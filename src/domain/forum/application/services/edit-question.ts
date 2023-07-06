import { QuestionAttachmentRepository, QuestionRepository } from '@/domain/forum/application/repositories'
import { NotAllowedError, ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { Either, left, right } from '@/core/types'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'

type EditQuestionInput = {
    authorId: string
    questionId: string
    title: string
    content: string
    attachmentId: string[]
}

type EditQuestionOutput = Either<ResourceNotFoundError | NotAllowedError, object>

export class EditQuestionService {

    constructor (
        private readonly questionRepository: QuestionRepository,
        private readonly questionAttachmentRepository: QuestionAttachmentRepository
    ) { }

    async execute ({ authorId, questionId, title, content, attachmentId }: EditQuestionInput): Promise<EditQuestionOutput> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        if (question.authorId.toString !== authorId) {
            return left(new NotAllowedError())
        }

        const currentQuestionAttachments = await this.questionAttachmentRepository.findManyByQuestionId(question.id.toString)

        const questionAttachmentsList = new QuestionAttachmentList(currentQuestionAttachments)

        const questionAttachment = attachmentId.map(attachmentIds => {
            return QuestionAttachment.create({
                questionId: question.id,
                attachmentId: new UniqueEntityId(attachmentIds)
            })
        })

        questionAttachmentsList.update(questionAttachment)

        question.title = title
        question.content = content
        await this.questionRepository.save(question)
        return right({})
    }
}
