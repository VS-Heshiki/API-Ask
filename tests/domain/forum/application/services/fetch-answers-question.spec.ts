import { UniqueEntityId } from '@/core/entities'
import { FetchAnswersQuestionService } from '@/domain/forum/application/services'
import { AnswerRepositoryStub, createAnswer } from '@/tests/mock'

describe('FetchAnswersQuestion Service', () => {
    let sut: FetchAnswersQuestionService
    let answerRepositoryStub: AnswerRepositoryStub

    beforeEach(async () => {
        answerRepositoryStub = new AnswerRepositoryStub()
        sut = new FetchAnswersQuestionService(answerRepositoryStub)
    })

    it('should fetch 20 answers per page', async () => {
        for (let i = 1;i <= 25;i++) {
            await answerRepositoryStub.create(createAnswer({ questionId: new UniqueEntityId('question-1') }))
        }

        const result = await sut.execute({ questionId: 'question-1', page: 2 })

        expect(result.isRight()).toBeTruthy()
        expect(result.value?.answers).toHaveLength(5)
    })
})
