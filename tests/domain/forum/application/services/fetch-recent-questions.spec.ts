import { UniqueEntityId } from '@/core/entities'
import { FetchRecentQuestionsService } from '@/domain/forum/application/services'
import { QuestionRepositoryStub, createQuestion } from '@/tests/mock'

describe('FetchRecentQuestions Service', () => {
    let sut: FetchRecentQuestionsService
    let questionRepositoryStub: QuestionRepositoryStub

    beforeEach(async () => {
        questionRepositoryStub = new QuestionRepositoryStub
        sut = new FetchRecentQuestionsService(questionRepositoryStub)
    })

    it('should fetch questions sorted by date', async () => {
        await questionRepositoryStub.create(createQuestion({ createdAt: new Date(2022, 2, 12) }))
        await questionRepositoryStub.create(createQuestion({ createdAt: new Date(2022, 2, 19) }))
        await questionRepositoryStub.create(createQuestion({ createdAt: new Date(2022, 2, 8) }))

        await sut.execute({ page: 1 })

        expect(questionRepositoryStub.items[0].createdAt).toEqual(new Date(2022, 2, 19))
        expect(questionRepositoryStub.items[1].createdAt).toEqual(new Date(2022, 2, 12))
        expect(questionRepositoryStub.items[2].createdAt).toEqual(new Date(2022, 2, 8))
    })
})
