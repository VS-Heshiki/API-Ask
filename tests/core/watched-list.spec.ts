import { WatchedList } from '@/core/entities/watched-list'

class NumberWatchedList extends WatchedList<number> {
    compareItems (a: number, b: number): boolean {
        return a === b
    }
}
describe('Watched List', () => {
    it('should be able to create a watched list with initial items', () => {
        const list = new NumberWatchedList([1, 2])

        expect(list.currentItems).toEqual([1, 2])
    })

    it('should be able add new items to list', () => {
        const list = new NumberWatchedList([1, 2])

        list.add(3)

        expect(list.currentItems).toEqual([1, 2, 3])
        expect(list.getNewItems()).toEqual([3])
    })

    it('should be able remove items from the list', () => {
        const list = new NumberWatchedList([1, 2, 3, 4])

        list.remove(3)

        expect(list.currentItems).toEqual([1, 2, 4])
        expect(list.getRemovedItems()).toEqual([3])
    })

    it('should be able add an item even if it was removed before', () => {
        const list = new NumberWatchedList([1, 2, 3, 4])

        list.remove(2)
        list.add(2)

        expect(list.currentItems).toHaveLength(4)
        expect(list.getNewItems()).toEqual([])
        expect(list.getRemovedItems()).toEqual([])
    })

    it('should be able to update watched list items', () => {
        const list = new NumberWatchedList([1, 2, 3, 4])

        list.update([2, 4, 6])

        expect(list.currentItems).toHaveLength(3)
        expect(list.getNewItems()).toEqual([6])
        expect(list.getRemovedItems()).toEqual([1, 3])
    })
})
