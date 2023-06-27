import { randomUUID } from 'node:crypto'

export class Question {
    public title: string
    public content: string
    public authorId: string
    public id: string

    constructor (params: QuestionInput, id?: string) {
        this.title = params.title
        this.content = params.content
        this.authorId = params.authorId
        this.id = id ?? randomUUID()
    }
}

export type QuestionInput = {
    content: string
    title: string
    authorId: string
}
