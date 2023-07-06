import { QuestionAttachment, QuestionAttachmentParams } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'

export const createQuestionAttachment = (override: Partial<QuestionAttachmentParams>, id?: UniqueEntityId): QuestionAttachment => {
    const newQuestionAttachment = QuestionAttachment.create({
        attachmentId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        ...override
    }, id)

    return newQuestionAttachment
}
