import { DeleteQuestionService } from '@/domain/forum/application/services'
import { NotAllowedError } from '@/domain/forum/application/services/errors'
import { UniqueEntityId } from '@/core/entities'
import { QuestionAttachmentRepositoryStub, QuestionRepositoryStub, createQuestion, createQuestionAttachment } from '@/tests/mock'

describe('DeleteQuestion Service', () => {
    let sut: DeleteQuestionService
    let questionRepositoryStub: QuestionRepositoryStub
    let questionAttachmentRepositoryStub: QuestionAttachmentRepositoryStub

    beforeEach(async () => {
        questionAttachmentRepositoryStub = new QuestionAttachmentRepositoryStub
        questionRepositoryStub = new QuestionRepositoryStub(questionAttachmentRepositoryStub)
        sut = new DeleteQuestionService(questionRepositoryStub)

        const newQuestion = createQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))
        await questionRepositoryStub.create(newQuestion)

        questionAttachmentRepositoryStub.items.push(
            createQuestionAttachment({
                attachmentId: new UniqueEntityId('1'),
                questionId: newQuestion.id
            }),
            createQuestionAttachment({
                attachmentId: new UniqueEntityId('2'),
                questionId: newQuestion.id
            })
        )
    })

    it('should call Service with correct values', async () => {
        const deleteSpy = vitest.spyOn(questionRepositoryStub, 'delete')

        await sut.execute({
            authorId: 'author-1',
            questionId: 'question-1'
        })

        expect(questionRepositoryStub.items).toHaveLength(0)
        expect(questionAttachmentRepositoryStub.items).toHaveLength(0)
        expect(deleteSpy).toHaveBeenCalledWith('question-1')
    })

    it('should avoid delete a question from another user', async () => {
        const result = await sut.execute({
            authorId: 'author-2',
            questionId: 'question-1'
        })

        expect(result.isLeft).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
