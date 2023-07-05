import { GetQuestionBySlugService } from '@/domain/forum/application/services'
import { QuestionRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects'

import { MockProxy, mock } from 'vitest-mock-extended'
import { createQuestion } from '@/tests/mock'

describe('GetQuestionBySlug Service', () => {
    let sut: GetQuestionBySlugService
    let questionRepositoryMock: MockProxy<QuestionRepository>
    let newQuestion: Question

    beforeEach(() => {
        questionRepositoryMock = mock()
        newQuestion = createQuestion({ slug: Slug.create('Example Slug') })
        questionRepositoryMock.getBySlug.mockResolvedValue(newQuestion)
        sut = new GetQuestionBySlugService(questionRepositoryMock)
    })

    it('should find a question by slug', async () => {
        const result = await sut.execute({
            slug: 'example-slug'
        })

        expect(result.isRight()).toBeTruthy()
        expect(result.value.question?.title).toBe(newQuestion.title)
    })
})
