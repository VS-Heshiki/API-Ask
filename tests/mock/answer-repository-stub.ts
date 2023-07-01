/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AnswerRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'

export class AnswerRepositoryStub implements AnswerRepository {
    public items: Answer[] = []

    async create (answer: Answer): Promise<void> {
        this.items.push(answer)
    }

    async delete (answerId: string): Promise<void> {
        const answerIndex = this.items.findIndex(item => item.id.toString === answerId)

        this.items.splice(answerIndex, 1)
    }

    async findById (answerId: string): Promise<Answer | null> {
        const answer = this.items.find(item => item.id.toString === answerId)

        if (!answer) {
            return null
        }

        return answer
    }

    async save (answer: Answer): Promise<void> {
        const answerIndex = this.items.findIndex(item => item.id === answer.id)

        this.items[answerIndex] = answer
    }
}
