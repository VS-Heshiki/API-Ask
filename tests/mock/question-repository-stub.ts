/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { PaginationParams } from '@/core/repositories'
import { QuestionAttachmentRepository, QuestionRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

export class QuestionRepositoryStub implements QuestionRepository {
    public items: Question[] = []

    constructor (private readonly questionAttachmentRepository: QuestionAttachmentRepository) { }

    async findById (questionId: string): Promise<Question | null> {
        const answer = this.items.find(item => item.id.toString === questionId)

        return answer ? answer : null
    }

    async findManyRecent ({ page }: PaginationParams): Promise<Question[]> {
        const questions = this.items
            .sort((a, b) => {
                return b.createdAt.getTime() - a.createdAt.getTime()
            })
            .slice((page - 1) * 20, page * 20)

        return questions
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

        this.questionAttachmentRepository.deleteManyByQuestionId(questionId)
        this.items.splice(questionIndex, 1)
    }

    async save (question: Question): Promise<void> {
        const questionIndex = this.items.findIndex(item => item.id === question.id)

        this.items[questionIndex] = question
    }
}
