/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { QuestionRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

export class QuestionRepositoryStub implements QuestionRepository {
    public items: Question[] = []

    async findById (questionId: string): Promise<Question | null> {
        const answer = this.items.find(item => item.id.toString === questionId)

        if (!answer) {
            return null
        }

        return answer
    }

    async create (question: Question): Promise<void> {
        this.items.push(question)
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async getBySlug (_slug: string): Promise<Question | null> {
        return null
    }

    async delete (questionId: string): Promise<void> {
        const questionIndex = this.items.findIndex(item => item.id.toString === questionId)

        this.items.splice(questionIndex, 1)
    }

    async edit (params: QuestionRepository.edit): Promise<void> {
        const answer = this.items.find(item => item.id.toString === params.questionId)

        answer!.title = params.title
        answer!.content = params.content
    }
}
