import { AnswerRepository } from '@/domain/forum/application/repositories'
import { AnswerQuestion } from '@/domain/forum/application/services'

import { MockProxy, mock } from 'vitest-mock-extended'

describe('AnswerQuestion Service', () => {
    let sut: AnswerQuestion
    let answerRepositoryMock: MockProxy<AnswerRepository>

    beforeEach(() => {
        answerRepositoryMock = mock()
        sut = new AnswerQuestion(answerRepositoryMock)
    })

    it('should create an answer', async () => {
        const response = await sut.execute({
            instructorId: '1',
            questionId: '1',
            content: 'new answer'
        })

        expect(response.content).toBe('new answer')
    })
})
