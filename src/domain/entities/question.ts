import { Entity, UniqueEntityId } from '@/core/entities'
import { Slug } from '@/domain/entities/value-objects'

export class Question extends Entity<QuestionInput> {
}

export type QuestionInput = {
    authorId: UniqueEntityId
    bestAnswerId: UniqueEntityId
    content: string
    title: string
    slug: Slug
    createdAt: Date
    updatedAt?: Date
}
