import { EvaluationItem, EventState } from "../src/model/evaluation-item";
import { ContextManager, ObjectMonitorContext } from "../src/controll/managers/context-manager";


const monitorContextManager = new ObjectMonitorContext() 

/**
 const item: EvaluationItem = {
     org: 'org-test',
     repo: 'repo-test',
     id: 1,
     commit: 'commit-test',
     status: EventState.EVALUATE_APPROVAL
   }
 // Adding a new Item
monitorContextManager.addItem(item)
console.log(monitorContextManager.findById(1))

// Updating an Item
const itemToUpdate: EvaluationItem  =  monitorContextManager.findById(1) as EvaluationItem
itemToUpdate.org = 'commit-test-updated'
monitorContextManager.update(itemToUpdate)
console.log(monitorContextManager.findById(1))

// Updating an Item
const itemRemove: EvaluationItem  =  monitorContextManager.findById(1) as EvaluationItem
itemToUpdate.org = 'commit-test-updated'
monitorContextManager.removeById(itemRemove.id)
console.log(monitorContextManager.findById(1))


for(let i = 0; i < 10; i++){
  const item: EvaluationItem = {
    org: `org-test-${i}`,
    repo: `repo-test-${i}`,
    id: i,
    commit: `commit-test-${i}`,
    status: EventState.EVALUATE_APPROVAL
  }
  monitorContextManager.addItem(item)
  console.log(`item-${i}`)
}

console.log(monitorContextManager.findById(1))
 */

const contextManager: ContextManager<ObjectMonitorContext>  = new ContextManager(monitorContextManager)
console.log(contextManager.monitorContextManager.findById(1))