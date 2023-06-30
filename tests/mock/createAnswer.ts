import { Answer, AnswerInput } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'

import { faker } from '@faker-js/faker'

export const createAnswer = (override: Partial<AnswerInput> = {}, id?: UniqueEntityId): Answer => {
    const newAnswer = Answer.create({
        authorId: new UniqueEntityId(),
        questionId: new UniqueEntityId(),
        content: faker.lorem.text(),
        ...override
    }, id)

    return newAnswer
}
