import { Entity, UniqueEntityId } from '@/core/entities'

export class Attachment extends Entity<AttachmentParams> {
    get title () {
        return this.params.title
    }

    get link () {
        return this.params.link
    }

    static create (params: AttachmentParams, id?: UniqueEntityId): Attachment {
        const attachment = new Attachment(params, id)

        return attachment
    }
}

export type AttachmentParams = {
    title: string
    link: string
}
