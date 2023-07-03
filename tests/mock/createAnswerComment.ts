import { AnswerComment, AnswerCommentInput } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'

import { faker } from '@faker-js/faker'

export const createAnswerComment = (override: Partial<AnswerCommentInput> = {}, id?: UniqueEntityId): AnswerComment => {
    const newAnswerComment = AnswerComment.create({
        authorId: new UniqueEntityId(),
        answerId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return newAnswerComment
}
