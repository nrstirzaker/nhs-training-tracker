import {Mode} from "././Mode.ts";
import Action from "./Action.ts";



export class StateEngineClass{

    private static instance :StateEngineClass
    private currentMode : Mode;

    public static getInstance() : StateEngineClass{
        if (!StateEngineClass.instance){
            StateEngineClass.instance = new StateEngineClass(Mode.View)
        }
        return StateEngineClass.instance;
    }

    private constructor(mode: Mode){
        this.currentMode = mode;
    }
    public actionHandler (action: Action)  {

        switch(action) {
            case Action.SaveAction:
                this.currentMode = Mode.View
                break;
            case Action.CancelAction:
                this.currentMode = Mode.View
                break;
            case Action.AddAction:
                this.currentMode = Mode.Add
                break;
            case Action.EditAction:
                this.currentMode = Mode.Edit
                break;
            case Action.ArchiveAction:
                this.currentMode = Mode.View
                break;
            default:
                // code block
            }
        //$emit("stateChange", this.currentMode);
        console.log("StateEngineClass: Mode change: " + this.currentMode)
    }
    public getState() :Mode{
        return this.currentMode;
    }

}
//const instance = StateEngineClass.getInstance()

export default StateEngineClass;
