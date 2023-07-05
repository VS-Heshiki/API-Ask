import { Question } from '@/domain/forum/enterprise/entities'
import { QuestionRepository } from '@/domain/forum/application/repositories'
import { ResourceNotFoundError } from '@/domain/forum/application/services/errors'
import { Either, left, right } from '@/core/types'

type GetQuestionBySlugInput = {
    slug: string
}

type GetQuestionBySlugOutput = Either<ResourceNotFoundError, { question: Question }>

export class GetQuestionBySlugService {

    constructor (private readonly questionRepository: QuestionRepository) { }

    async execute ({ slug }: GetQuestionBySlugInput): Promise<GetQuestionBySlugOutput> {
        const question = await this.questionRepository.getBySlug(slug)

        if (!question) {
            return left(new ResourceNotFoundError())
        }

        return right({ question })
    }
}
