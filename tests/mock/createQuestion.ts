import { Question, QuestionInput } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'

import { faker } from '@faker-js/faker'

export const createQuestion = (override: Partial<QuestionInput> = {}, id?: UniqueEntityId): Question => {
    const newQuestion = Question.create({
        authorId: new UniqueEntityId('1'),
        title: faker.lorem.paragraph(5),
        content: faker.lorem.text(),
        ...override
    }, id)

    return newQuestion
}
