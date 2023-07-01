import { EditQuestionService } from '@/domain/forum/application/services'
import { UniqueEntityId } from '@/core/entities'
import { QuestionRepositoryStub, createQuestion } from '@/tests/mock'
import { Question } from '@/domain/forum/enterprise/entities'

describe('EditQuestion Service', () => {
    let sut: EditQuestionService
    let questionRepositoryStub: QuestionRepositoryStub

    beforeEach(async () => {
        questionRepositoryStub = new QuestionRepositoryStub()
        sut = new EditQuestionService(questionRepositoryStub)

        const newQuestion = createQuestion({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('question-1'))
        await questionRepositoryStub.create(newQuestion)
    })

    it('should be able edit a question', async () => {
        const saveSpy = vitest.spyOn(questionRepositoryStub, 'save')

        await sut.execute({
            authorId: 'author-1',
            questionId: 'question-1',
            title: 'Any Title',
            content: 'Any Content'
        })

        expect(questionRepositoryStub.items[0]).toMatchObject({
            title: 'Any Title',
            content: 'Any Content'
        })
        expect(saveSpy).toHaveBeenCalledWith(expect.any(Question))
    })

    it('should avoid edit a question from another user', async () => {
        await expect(
            sut.execute({
                authorId: 'author-2',
                questionId: 'question-1',
                title: 'Any Title',
                content: 'Any Content'
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
