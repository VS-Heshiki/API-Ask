import { randomUUID } from 'node:crypto'

export class Answer {
    public content: string
    public authorId: string
    public questionId: string
    public id: string

    constructor (params: AnswerInput, id?: string) {
        this.content = params.content
        this.authorId = params.authorId
        this.questionId = params.questionId
        this.id = id ?? randomUUID()
    }
}

export type AnswerInput = {
    content: string
    authorId: string
    questionId: string
}
