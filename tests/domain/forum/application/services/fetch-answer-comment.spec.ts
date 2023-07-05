import { FetchAnswerCommentService } from '@/domain/forum/application/services'
import { UniqueEntityId } from '@/core/entities'
import { AnswerCommentRepositoryStub, createAnswerComment } from '@/tests/mock'

describe('FetchAnswersComment Service', () => {
    let sut: FetchAnswerCommentService
    let answerCommentRepositoryStub: AnswerCommentRepositoryStub

    beforeEach(async () => {
        answerCommentRepositoryStub = new AnswerCommentRepositoryStub()
        sut = new FetchAnswerCommentService(answerCommentRepositoryStub)
    })

    it('should fetch 20 comments per page', async () => {
        for (let i = 1;i <= 25;i++) {
            await answerCommentRepositoryStub.create(createAnswerComment({ answerId: new UniqueEntityId('answer-1') }))
        }

        const result = await sut.execute({ answerId: 'answer-1', page: 2 })

        expect(result.isRight()).toBeTruthy()
        expect(result.value?.comments).toHaveLength(5)
    })
})
