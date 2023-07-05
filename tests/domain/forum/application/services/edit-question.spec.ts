import { EditQuestionService } from '@/domain/forum/application/services'
import { Question } from '@/domain/forum/enterprise/entities'
import { NotAllowedError } from '@/domain/forum/application/services/errors'
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
        const result = await sut.execute({
            authorId: 'author-2',
            questionId: 'question-1',
            title: 'Any Title',
            content: 'Any Content'
        })

        expect(result.isLeft).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
