import { Entity } from '@/core/entities'

export class Answer extends Entity<AnswerInput>{
    get content () {
        return this.params.content
    }
}

export type AnswerInput = {
    content: string
    authorId: string
    questionId: string
}
