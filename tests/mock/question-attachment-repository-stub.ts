import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities'

export class QuestionAttachmentRepositoryStub implements QuestionAttachmentRepository {
    public items: QuestionAttachment[] = []

    async findManyByQuestionId (questionId: string): Promise<QuestionAttachment[]> {
        return this.items.filter(item => item.questionId.toString === questionId)
    }

    async deleteManyByQuestionId (questionId: string): Promise<void> {
        const questionAttachments = this.items.filter(item => item.questionId.toString !== questionId)

        this.items = questionAttachments
    }
}
