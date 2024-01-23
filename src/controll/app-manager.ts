import { ContextManager, ObjectMonitorContext } from "./managers/context-manager";

class AppManager {
    
    contextManager: ContextManager<ObjectMonitorContext>  = new ContextManager(new ObjectMonitorContext())    
   
    private static _instance: AppManager;

    public static instance() {
        if (this._instance === undefined) {
            this._instance = new AppManager();
        }
        return this._instance;
    }
}

const appManager = AppManager.instance();
export default appManager;