import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export abstract class Entity<Params> {
    private readonly _id: UniqueEntityId
    protected params: Params

    get id () {
        return this._id
    }

    protected constructor (params: Params, id?: UniqueEntityId) {
        this.params = params
        this._id = id ?? new UniqueEntityId()
    }
}
