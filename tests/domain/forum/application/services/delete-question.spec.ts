import { DeleteQuestionService } from '@/domain/forum/application/services'
import { QuestionRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'
import { createQuestion } from '@/tests/mock'
import { UniqueEntityId } from '@/core/entities'

import { MockProxy, mock } from 'vitest-mock-extended'

describe('DeleteQuestion Service', () => {
    let sut: DeleteQuestionService
    let questionRepositoryMock: MockProxy<QuestionRepository>
    let newQuestion: Question

    beforeEach(() => {
        questionRepositoryMock = mock()
        newQuestion = createQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))
        sut = new DeleteQuestionService(questionRepositoryMock)
    })

    it.todo('should call Service with correct values', async () => {
        // await sut.execute({
        //     authorId: newQuestion.authorId.toString,
        //     questionId: newQuestion.id.toString
        // })

        // expect(sut.execute).toHaveBeenCalledWith({ authorId: 'author-1', questionId: 'question-1' })
    })

    it('should avoid delete a question from another user ', async () => {
        await expect(
            sut.execute({
                authorId: 'author-2',
                questionId: newQuestion.id.toString
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
