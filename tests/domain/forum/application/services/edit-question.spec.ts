import { EditQuestionService } from '@/domain/forum/application/services'
import { UniqueEntityId } from '@/core/entities'
import { QuestionRepositoryStub, createQuestion } from '@/tests/mock'

describe('EditQuestion Service', () => {
    let sut: EditQuestionService
    let questionRepositoryStub: QuestionRepositoryStub

    beforeEach(async () => {
        questionRepositoryStub = new QuestionRepositoryStub()
        sut = new EditQuestionService(questionRepositoryStub)

        const newQuestion = createQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))
        await questionRepositoryStub.create(newQuestion)
    })

    it('should call Service with correct values', async () => {
        const editSpy = vitest.spyOn(questionRepositoryStub, 'edit')

        await sut.execute({
            authorId: 'author-1',
            questionId: 'question-1',
            title: 'Any Title',
            content: 'Any Content'
        })

        expect(questionRepositoryStub.items[0]).toEqual(
            expect.objectContaining({
                title: 'Any Title',
                content: 'Any Content'
            })
        )
        expect(editSpy).toHaveBeenCalledWith({
            questionId: 'question-1',
            title: 'Any Title',
            content: 'Any Content'
        })
    })
})
