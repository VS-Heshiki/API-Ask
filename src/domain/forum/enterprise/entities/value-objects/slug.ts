export class Slug {
    public value: string

    private constructor (value: string) {
        this.value = value
    }

    static create (value: string) {
        return new Slug(value)
    }

    static createFromText (text: string): Slug {
        const makeSlug = text
            .normalize('NFKD')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/_/g, '-')
            .replace(/_/g, '-')
            .replace(/--+/g, '-')
            .replace(/-$/g, '')

        return new Slug(makeSlug)
    }
}
