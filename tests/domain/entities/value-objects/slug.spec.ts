import { Slug } from '@/domain/entities/value-objects'

describe('Slug ValueObject', () => {
    it('should create a new slug from text', () => {
        const slug = Slug.createFromText('An example text')

        expect(slug.value).toBe('an-example-text')
    })
})
