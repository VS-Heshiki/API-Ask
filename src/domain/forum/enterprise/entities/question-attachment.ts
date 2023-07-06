import { Entity, UniqueEntityId } from '@/core/entities'

export class QuestionAttachment extends Entity<QuestionAttachmentParams> {
    get questionId () {
        return this.params.questionId
    }

    get attachmentId () {
        return this.params.attachmentId
    }

    static create (params: QuestionAttachmentParams, id?: UniqueEntityId) {
        const questionAttachment = new QuestionAttachment(params, id)

        return questionAttachment
    }
}

export type QuestionAttachmentParams = {
    questionId: UniqueEntityId
    attachmentId: UniqueEntityId
}
