import { EvaluationItem } from "../../model/evaluation-item"
import { FileManager, FileManagerImpl } from "./file-manager"
import { Persistence } from "./persistence"

export class MonitorContext<T extends { id: number } = EvaluationItem, PersistenceManager extends FileManager = FileManagerImpl> 
implements Persistence<T>{


    private objectToMonitorList: T[] = []
    protected persistenceManager: PersistenceManager

    constructor (persistenceManager: PersistenceManager){
        this.persistenceManager = persistenceManager
    }

    addItem(pr: T) {
        this.objectToMonitorList.push(pr)
    }

    addNewItem(pr: T) {
        if(!this.findById(pr.id)){
            this.objectToMonitorList.push(pr)
            this.persistenceManager.save(this.objectToMonitorList)
            return true
        }else{
            return false
        }
    }

    findById(objectId: number) {
        if (objectId) {
            return this.objectToMonitorList.find(object => {
                if (object.id) {
                    return (object.id === objectId)
                }
            })
        }
    }

    remove(object: T) {
        if (object) {
            this.objectToMonitorList = this.objectToMonitorList.filter(function (objectItem) {
                return objectItem !== object
            })
            this.persistenceManager.save(this.objectToMonitorList)
            return true
        }
        return false
    }

    removeById(objectId: number) {
        if (objectId) {
            this.objectToMonitorList = this.objectToMonitorList.filter(function (objectItem) {
                return objectItem.id !== objectId
            })
            this.persistenceManager.save(this.objectToMonitorList)
            return true
        }
        return false
    }

    update(object: T) {
        if (object) {
            return this.objectToMonitorList.find(objectToUpdate => {
                if (object.id) {
                    if(object.id === objectToUpdate.id) {
                        objectToUpdate = object 
                    }
                }
                this.persistenceManager.save(this.objectToMonitorList)
            })
        }
        
    }

}