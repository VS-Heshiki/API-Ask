import { QuestionComment, QuestionCommentInput } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'

import { faker } from '@faker-js/faker'

export const createQuestionComment = (override: Partial<QuestionCommentInput> = {}, id?: UniqueEntityId): QuestionComment => {
    const newQuestionComment = QuestionComment.create({
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return newQuestionComment
}
