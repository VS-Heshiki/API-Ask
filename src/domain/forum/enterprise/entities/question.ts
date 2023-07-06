import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects'
import { AggregateRoot, UniqueEntityId } from '@/core/entities'
import { Optional } from '@/core/types'

export class Question extends AggregateRoot<QuestionInput> {
    get authorId () {
        return this.params.authorId
    }

    get bestAnswerId () {
        return this.params.bestAnswerId
    }

    set bestAnswerId (bestAnswerId: UniqueEntityId | undefined) {
        this.params.bestAnswerId = bestAnswerId
        this.refresh()
    }

    get title () {
        return this.params.title
    }

    set title (title: string) {
        this.params.title = title
        this.params.slug = Slug.createFromText(title)
        this.refresh()
    }

    get content () {
        return this.params.content
    }

    set content (content: string) {
        this.params.content = content
        this.refresh()
    }

    get slug () {
        return this.params.slug
    }

    get excerpt () {
        return this.content
            .substring(0, 120)
            .trimEnd()
            .concat('...')
    }

    get attachment () {
        return this.params.attachment
    }

    set attachment (attachment: QuestionAttachmentList) {
        this.params.attachment = attachment
    }

    get createdAt () {
        return this.params.createdAt
    }

    private refresh () {
        this.params.updatedAt = new Date()
    }

    static create (params: Optional<QuestionInput, 'createdAt' | 'slug' | 'attachment'>, id?: UniqueEntityId): Question {
        const question = new Question({
            ...params,
            slug: params.slug ?? Slug.createFromText(params.title),
            createdAt: params.createdAt ?? new Date(),
            attachment: params.attachment ?? new QuestionAttachmentList()
        }, id)

        return question
    }
}

export type QuestionInput = {
    authorId: UniqueEntityId
    bestAnswerId?: UniqueEntityId
    title: string
    content: string
    slug: Slug
    attachment: QuestionAttachmentList
    createdAt: Date
    updatedAt?: Date
}
