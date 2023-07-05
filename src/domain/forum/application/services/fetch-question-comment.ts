import { QuestionComment } from '@/domain/forum/enterprise/entities'
import { QuestionCommentRepository } from '@/domain/forum/application/repositories'
import { Either, right } from '@/core/types'

type FetchQuestionCommentInput = {
    questionId: string
    page: number
}

type FetchQuestionCommentOutput = Either<void, { comments: QuestionComment[] }>

export class FetchQuestionCommentService {

    constructor (private readonly questionCommentRepository: QuestionCommentRepository) { }

    async execute ({ questionId, page }: FetchQuestionCommentInput): Promise<FetchQuestionCommentOutput> {
        const comments = await this.questionCommentRepository.findManyComments(questionId, { page })

        return right({ comments })
    }
}
