import { AnswerCommentRepository } from '@/domain/forum/application/repositories'
import { AnswerComment } from '@/domain/forum/enterprise/entities'

export class AnswerCommentRepositoryStub implements AnswerCommentRepository {
    public items: AnswerComment[] = []

    async create (answerComment: AnswerComment): Promise<void> {
        this.items.push(answerComment)
    }
}
