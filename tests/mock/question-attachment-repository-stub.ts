import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities'

export class QuestionAttachmentRepositoryStub implements QuestionAttachmentRepository {
    public items: QuestionAttachment[] = []

    async findManyByQuestionId (questionId: string): Promise<QuestionAttachment[]> {
        return this.items.filter(item => item.id.toString === questionId)
    }
}
