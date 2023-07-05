import { AnswerRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'
import { UniqueEntityId } from '@/core/entities'
import { Either, right } from '@/core/types'

type AnswerQuestionInput = {
    instructorId: string
    questionId: string
    content: string
}

type AnswerQuestionOutput = Either<null, { answer: Answer }>

export class AnswerQuestionService {

    constructor (private readonly answerRepository: AnswerRepository) { }

    async execute ({ instructorId, questionId, content }: AnswerQuestionInput): Promise<AnswerQuestionOutput> {
        const answer = Answer.create({
            content,
            authorId: new UniqueEntityId(instructorId),
            questionId: new UniqueEntityId(questionId)
        })

        await this.answerRepository.create(answer)

        return right({ answer })
    }
}
