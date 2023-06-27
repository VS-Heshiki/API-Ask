import { randomUUID } from 'node:crypto'

export class Entity<Params> {
    private _id: string
    protected params: Params

    get id () {
        return this._id
    }

    constructor (params: Params, id?: string) {
        this.params = params
        this._id = id ?? randomUUID()
    }
}
