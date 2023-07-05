import { ServiceError } from '@/core/types'

export class NotAllowedError extends Error implements ServiceError {
    constructor () {
        super('Not Allowed!')
    }
}
