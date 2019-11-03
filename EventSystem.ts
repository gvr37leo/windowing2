class BoxEvent<T>{
    constructor(public val:T, public old:T){

    }
}

class Box<T>{
    onchange: EventSystem<BoxEvent<T>>
    onClear: EventSystemVoid
    value: T
    oldValue:T
    isSet: boolean = false

    constructor(value: T) {
        this.onchange = new EventSystem();
        this.value = value
        this.onClear = new EventSystemVoid();
    }

    get(): T {
        return this.value
    }

    set(value: T) {
        this.oldValue = this.value
        this.value = value
        if (this.oldValue != value || !this.isSet) {
            this.isSet = true;
            this.boxtrigger()
        }
    }

    clear() {
        this.isSet = false
        this.set(null)
        this.onClear.trigger()
    }

    boxtrigger(){
        this.onchange.trigger(new BoxEvent(this.value,this.oldValue))
    }
}

class EventSystem<T>{
    callbacks: ((val: T) => void)[] = []

    constructor() {

    }

    listen(callback: (val: T) => void): (val: T) => void {
        this.callbacks.push(callback)
        return callback
    }

    deafen(callback: (val: T) => void) {
        this.callbacks.splice(this.callbacks.findIndex(v => v === callback), 1)
    }

    trigger(value: T) {
        for (var callback of this.callbacks) {
            callback(value)
        }
    }
}

class EventSystemVoid{
    callbacks: (() => void)[] = []

    constructor() {

    }

    listen(callback: () => void) {
        this.callbacks.push(callback)
    }

    deafen(callback: () => void) {
        this.callbacks.splice(this.callbacks.findIndex(v => v === callback), 1)
    }

    trigger() {
        for (var callback of this.callbacks) {
            callback()
        }
    }
}

class ObjectBox<T>{
    val:T
    isSet: boolean = false
    onChange:EventSystemVoid

    constructor(val:T){
        this.val = val
    }

    get<V>(selector:(obj:T) => Box<V>):V{
        return selector(this.val).get()
    }

    set<V>(selector:(obj:T) => Box<V>, val:V){
        var old = selector(this.val)
        old.set(val)
        if(old.get() != val || !this.isSet){
            this.isSet = true
            this.onChange.trigger()
        }
    }
}


class PEvent<T>{
    cbset:Set<(val:PEvent<T>) => void>
    constructor(public val:T){

    }

    static create<T>(val:T){
        var e = new PEvent(val)
        return e
    }
}

class EventSystemP<T>{
    cbs:((val:PEvent<T>) => void)[] = []

    listen(cb:(val:PEvent<T>) => void){
        this.cbs.push(cb)
        return cb
    }

    trigger(e:PEvent<T>){
        
        for (var cb of this.cbs) {
            if(e.cbset.has(cb)){
                continue
            }
            e.cbset.add(cb)
            cb(e)
        }
    }
}




class PBox<T>{
    box:Box<T>
    onchange:EventSystem<PEvent<BoxEvent<T>>> = new EventSystem()

    constructor(val:T){
        this.box = new Box(val)
        this.box.onchange.listen((val) => {
            this.onchange.trigger(new PEvent(null))
        })
    }

    get():T{
        return this.box.value
    }


    set(e:PEvent<T>){
        this.box.set(e.val)
    }
}