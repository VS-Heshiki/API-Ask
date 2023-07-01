import { BestAnswerOfQuestionService } from '@/domain/forum/application/services'
import { AnswerRepositoryStub, QuestionRepositoryStub, createAnswer, createQuestion } from '@/tests/mock'
import { Answer, Question } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'

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
})
