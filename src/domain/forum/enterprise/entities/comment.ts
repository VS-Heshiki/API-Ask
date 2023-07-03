import { Entity, UniqueEntityId } from '@/core/entities'

export abstract class Comment<Input extends CommentInput> extends Entity<Input>{
    get authorId () {
        return this.params.authorId
    }

    get content () {
        return this.params.content
    }

    set content (content: string) {
        this.params.content = content
        this.refresh()
    }

    private refresh () {
        this.params.updatedAt = new Date()
    }
}

export type CommentInput = {
    authorId: UniqueEntityId
    content: string
    createdAt: Date
    updatedAt?: Date
}
