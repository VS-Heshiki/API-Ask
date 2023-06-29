import { QuestionRepository } from '@/domain/forum/application/repositories'
import { Question } from '@/domain/forum/enterprise/entities'

type GetQuestionBySlugInput = {
    slug: string
}

type GetQuestionBySlugOutput = {
    question: Question
}

export class GetQuestionBySlugService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ slug }: GetQuestionBySlugInput): Promise<GetQuestionBySlugOutput> {
        const question = await this.questionRepository.getBySlug(slug)

        if (!question) {
            throw new Error('Question not Found')
        }

        return { question }
    }
}
