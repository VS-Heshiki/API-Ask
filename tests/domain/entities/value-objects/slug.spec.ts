import { Slug } from '@/domain/entities/value-objects'

import { describe, expect, it } from 'vitest'

describe('Slug ValueObject', () => {
    it('should create a new slug from text', () => {
        const slug = Slug.createFromText('An example text')

        expect(slug.value).toBe('an-example-text')
    })
})
