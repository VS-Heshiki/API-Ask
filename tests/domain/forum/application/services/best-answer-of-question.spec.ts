import { BestAnswerOfQuestionService } from '@/domain/forum/application/services'
import { AnswerRepositoryStub, QuestionRepositoryStub, createAnswer, createQuestion } from '@/tests/mock'
import { Answer, Question } from '@/domain/forum/enterprise/entities'
import { NotAllowedError } from '@/domain/forum/application/services/errors'

describe('BestAnswerOfQuestion Service', () => {
    let sut: BestAnswerOfQuestionService
    let questionRepositoryStub: QuestionRepositoryStub
    let answerRepositoryStub: AnswerRepositoryStub
    let newQuestion: Question
    let newAnswer: Answer

    beforeEach(async () => {
        questionRepositoryStub = new QuestionRepositoryStub()
        answerRepositoryStub = new AnswerRepositoryStub()
        sut = new BestAnswerOfQuestionService(questionRepositoryStub, answerRepositoryStub)

        newQuestion = createQuestion()
        await questionRepositoryStub.create(newQuestion)
        newAnswer = createAnswer({ questionId: newQuestion.id })
        await answerRepositoryStub.create(newAnswer)
    })

    it('should be able set a best answer to question', async () => {
        const saveSpy = vitest.spyOn(questionRepositoryStub, 'save')

        await sut.execute({
            authorId: newQuestion.authorId.toString,
            answerId: newAnswer.id.toString
        })

        expect(questionRepositoryStub.items[0].bestAnswerId).toEqual(newAnswer.id)
        expect(saveSpy).toHaveBeenCalledWith(expect.any(Question))
    })

    it('should avoid set an answer from another user', async () => {
        const result = await sut.execute({
            authorId: 'invalid-author',
            answerId: newAnswer.id.toString
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
