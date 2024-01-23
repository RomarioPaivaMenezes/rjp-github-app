
import { FileManagerImpl } from "./file-manager";
import { MonitorContext } from "./generic-monitor-context";
import { Persistence } from "./persistence";
import { EvaluationItem } from "../../model/evaluation-item";
const dotenv = require('dotenv')
dotenv.config()

export class ContextManager<T extends { contextInitialize(), getPersistenceManager()}>  implements Persistence<EvaluationItem>  {
    monitorContextManager: T

    constructor (monitorContext: T) {
        this.monitorContextManager = monitorContext
        console.info('initializing app context...')
        this.monitorContextManager.contextInitialize()
        console.info('Context initialized!')
    }

    addItem(object: EvaluationItem) {
        this.monitorContextManager.getPersistenceManager().addItem(object)
    }
    addNewItem(object: EvaluationItem) {
        return this.monitorContextManager.getPersistenceManager().addNewItem(object)
    }
    findById(objectId: number) {
        return this.monitorContextManager.getPersistenceManager().findById(objectId)
    }
    remove(object: EvaluationItem) {
        return this.monitorContextManager.getPersistenceManager().remove(object)
    }
    removeById(objectId: number) {
        return this.monitorContextManager.getPersistenceManager().removeById(objectId)
    }
    update(object: EvaluationItem) {
        return this.monitorContextManager.getPersistenceManager().update(object)
    }
}

export class ObjectMonitorContext extends MonitorContext {

    constructor() {
        super(new FileManagerImpl(process.env.DATA_FOLDER, process.env.DATA_DB_FILE))
    }
    
    contextInitialize(){
        const prList = this.persistenceManager.read()
        for(var item of prList) {
            this.addItem(item)
        }
        console.log('Context size: ' + prList.length)
    }

     getPersistenceManager() { 
        return this.persistenceManager;
    }
} 