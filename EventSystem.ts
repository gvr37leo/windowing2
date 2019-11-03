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
        this.onchange.trigger(new BoxEvent(this.value,this.oldValue),[])
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

    trigger(value: T,excludes: ((val: T) => void)[]) {
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
    handled = false

    constructor(public val:T){

    }

    static create<T>(handled:boolean,val:T){
        var e = new PEvent(val)
        e.handled = handled
        return e
    }
}

class PBox<T>{
    box:Box<T>
    onchange:EventSystem<PEvent<T>> = new EventSystem()
    private isProtected:boolean = false

    constructor(val:T){
        this.box = new Box(val)
        this.box.onchange.listen((val) => {
            this.onchange.trigger(PEvent.create(this.isProtected,val),null)
        })
    }

    get():T{
        return this.box.value
    }

    set(v:T){
        this.box.set(v)
    }

    setHP(handled:boolean,val:T){
        this.setProtected(PEvent.create(handled,val))
    }

    setProtected(e:PEvent<T>){
        if(!e.handled){
            e.handled = true
            this.setS(e)
        }
    }

    setS(e:PEvent<T>){
        this.isProtected = e.handled
        this.box.set(e.val)
        this.isProtected = false
    }
}