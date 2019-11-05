class BoxEvent<T>{
    constructor(public val:T, public old:T){

    }
}

class Box<T>{
    onchange: EventSystem<BoxEvent<T>>
    value: T
    oldValue:T
    isSet: boolean = false

    constructor(value: T) {
        this.onchange = new EventSystem();
        this.value = value
    }

    get(): T {
        return this.value
    }

    set(value: T) {
        
    }

    continueSet(value: T, e: PEvent<BoxEvent<T>>){
        this.oldValue = this.value
        this.value = value
        // this.oldValue != value || 
        if (!this.isSet) {
            this.isSet = true;
            this.trigger()
        }
    }

    clear() {
        this.isSet = false
        this.set(null)
    }

    trigger(){
        this.onchange.trigger(new BoxEvent(this.value,this.oldValue))
    }
}

class PEvent<T>{
    cbset:Set<(val:PEvent<T>) => void> = new Set()
    constructor(public val:T){

    }

    static create<T>(val:T){
        var e = new PEvent(val)
        return e
    }
}

class EventSystem<T>{
    cbs:((val:PEvent<T>) => void)[] = []

    listen(cb:(val:PEvent<T>) => void){
        this.cbs.push(cb)
        return cb
    }

    trigger(val:T){
        this.continueTrigger(new PEvent(val))
    }

    continueTrigger(e:PEvent<T>){
        for (var cb of this.cbs) {
            if(e.cbset.has(cb))continue
            e.cbset.add(cb)
            cb(e)
        }
    }
}

class EventSystemVoid{
    event:EventSystem<number> = new EventSystem()

    listen(cb:() => void){
        this.event.listen(cb)
    }

    trigger(){
        this.event.trigger(0)
    }
}




