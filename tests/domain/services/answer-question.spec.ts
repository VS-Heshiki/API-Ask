import { AnswerRepository } from '@/domain/repositories'
import { AnswerQuestion } from '@/domain/services'

import { beforeEach, describe, expect, it } from 'vitest'
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
