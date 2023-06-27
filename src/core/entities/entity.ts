import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export class Entity<Params> {
    private _id: UniqueEntityId
    protected params: Params

    get id () {
        return this._id
    }

    constructor (params: Params, id?: string) {
        this.params = params
        this._id = new UniqueEntityId(id)
    }
}
