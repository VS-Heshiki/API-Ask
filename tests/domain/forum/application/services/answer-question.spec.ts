import { AnswerQuestionService } from '@/domain/forum/application/services'
import { AnswerRepository } from '@/domain/forum/application/repositories'

import { MockProxy, mock } from 'vitest-mock-extended'

describe('AnswerQuestion Service', () => {
    let sut: AnswerQuestionService
    let answerRepositoryMock: MockProxy<AnswerRepository>

    beforeEach(() => {
        answerRepositoryMock = mock()
        sut = new AnswerQuestionService(answerRepositoryMock)
    })

    it('should create an answer', async () => {
        const result = await sut.execute({
            instructorId: '1',
            questionId: '1',
            content: 'new answer'
        })

        expect(result.isRight()).toBeTruthy()
        expect(result.value?.answer.content).toBe('new answer')
    })
})
