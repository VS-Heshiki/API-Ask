import { QuestionCommentRepository } from '@/domain/forum/application/repositories'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

export class QuestionCommentRepositoryStub implements QuestionCommentRepository {
    public items: QuestionComment[] = []

    async create (questionComment: QuestionComment): Promise<void> {
        this.items.push(questionComment)
    }

    async findById (commentId: string): Promise<QuestionComment | null> {
        const comment = this.items.find(item => item.id.toString === commentId)

        return comment ? comment : null
    }

    async delete (questionComment: QuestionComment): Promise<void> {
        const commentIndex = this.items.findIndex(item => item.id === questionComment.id)

        this.items.splice(commentIndex, 1)
    }
}
