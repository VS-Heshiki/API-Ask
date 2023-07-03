import { AnswerCommentRepository } from '@/domain/forum/application/repositories'
import { AnswerComment } from '@/domain/forum/enterprise/entities'

type FetchAnswerCommentInput = {
    answerId: string
    page: number
}

type FetchAnswerCommentOutput = {
    comments: AnswerComment[]
}

export class FetchAnswerCommentService {

    constructor (private readonly answerCommentRepository: AnswerCommentRepository) { }

    async execute ({ answerId, page }: FetchAnswerCommentInput): Promise<FetchAnswerCommentOutput> {
        const comments = await this.answerCommentRepository.findManyComments(answerId, { page })

        return { comments }
    }
}
