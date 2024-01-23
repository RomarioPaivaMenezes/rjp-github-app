
export interface Persistence<T> {
    addItem(object: T),
    addNewItem(object: T),
    findById(objectId: number),
    remove(object: T),
    removeById(objectId: number),
    update(object: T)
}
