import { Either, left, right } from '@/core/types'

const doSomething = (success: boolean): Either<string, number> => {
    if (success) {
        return right(10)
    } else {
        return left('error')
    }
}

describe('Either - Error Handling', () => {
    it('should return true', () => {
        const result = doSomething(true)

        expect(result.isRight()).toBeTruthy()
        expect(result.isLeft()).toBeFalsy()
    })

    it('should return false', () => {
        const result = doSomething(false)

        expect(result.isRight()).toBeFalsy()
        expect(result.isLeft()).toBeTruthy()
    })
})
