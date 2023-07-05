import { ServiceError } from '@/core/types'

export class ResourceNotFoundError extends Error implements ServiceError {
    constructor () {
        super('Resource Not Found!')
    }
}
