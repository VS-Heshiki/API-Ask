import { AnswerComment } from '@/domain/forum/enterprise/entities'
import { AnswerCommentRepository } from '@/domain/forum/application/repositories'
import { Either, right } from '@/core/types'

type FetchAnswerCommentInput = {
    answerId: string
    page: number
}

type FetchAnswerCommentOutput = Either<void, { comments: AnswerComment[] }>

export class FetchAnswerCommentService {

    constructor (private readonly answerCommentRepository: AnswerCommentRepository) { }

    async execute ({ answerId, page }: FetchAnswerCommentInput): Promise<FetchAnswerCommentOutput> {
        const comments = await this.answerCommentRepository.findManyComments(answerId, { page })

        return right({ comments })
    }
}
