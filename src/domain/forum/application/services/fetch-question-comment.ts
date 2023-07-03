import { QuestionCommentRepository } from '@/domain/forum/application/repositories'
import { QuestionComment } from '@/domain/forum/enterprise/entities'

type FetchQuestionCommentInput = {
    questionId: string
    page: number
}

type FetchQuestionCommentOutput = {
    comments: QuestionComment[]
}

export class FetchQuestionCommentService {

    constructor (private readonly questionCommentRepository: QuestionCommentRepository) { }

    async execute ({ questionId, page }: FetchQuestionCommentInput): Promise<FetchQuestionCommentOutput> {
        const comments = await this.questionCommentRepository.findManyComments(questionId, { page })

        return { comments }
    }
}
