import { AnswerRepository } from '@/domain/forum/application/repositories'
import { AnswerQuestionService } from '@/domain/forum/application/services'

import { MockProxy, mock } from 'vitest-mock-extended'

describe('AnswerQuestion Service', () => {
    let sut: AnswerQuestionService
    let answerRepositoryMock: MockProxy<AnswerRepository>

    beforeEach(() => {
        answerRepositoryMock = mock()
        sut = new AnswerQuestionService(answerRepositoryMock)
    })

    it('should create an answer', async () => {
        const { answer } = await sut.execute({
            instructorId: '1',
            questionId: '1',
            content: 'new answer'
        })

        expect(answer.id).toBeTruthy()
        expect(answer.content).toBe('new answer')
    })
})
