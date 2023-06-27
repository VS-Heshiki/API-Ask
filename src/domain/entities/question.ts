import { Entity } from '@/core/entities'
import { Slug } from '@/domain/entities/value-objects'

export class Question extends Entity<QuestionInput> {
}

export type QuestionInput = {
    content: string
    title: string
    authorId: string
    slug: Slug
}
