import { EditQuestionService } from '@/domain/forum/application/services'
import { Question } from '@/domain/forum/enterprise/entities'
import { NotAllowedError } from '@/domain/forum/application/services/errors'
import { UniqueEntityId } from '@/core/entities'
import { QuestionAttachmentRepositoryStub, QuestionRepositoryStub, createQuestion, createQuestionAttachment } from '@/tests/mock'

describe('EditQuestion Service', () => {
    let sut: EditQuestionService
    let questionRepositoryStub: QuestionRepositoryStub
    let questionAttachmentRepositoryStub: QuestionAttachmentRepositoryStub

    beforeEach(async () => {
        questionRepositoryStub = new QuestionRepositoryStub()
        questionAttachmentRepositoryStub = new QuestionAttachmentRepositoryStub()
        sut = new EditQuestionService(questionRepositoryStub, questionAttachmentRepositoryStub)

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

    it('should be able edit a question', async () => {
        const saveSpy = vitest.spyOn(questionRepositoryStub, 'save')


        await sut.execute({
            authorId: 'author-1',
            questionId: 'question-1',
            title: 'Any Title',
            content: 'Any Content',
            attachmentId: ['3', '4']
        })

        expect(questionRepositoryStub.items[0]).toMatchObject({
            title: 'Any Title',
            content: 'Any Content'
        })
        expect(saveSpy).toHaveBeenCalledWith(expect.any(Question))
        expect(questionAttachmentRepositoryStub.items).toHaveLength(2)
    })

    it('should avoid edit a question from another user', async () => {
        const result = await sut.execute({
            authorId: 'author-2',
            questionId: 'question-1',
            title: 'Any Title',
            content: 'Any Content',
            attachmentId: []
        })

        expect(result.isLeft).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
