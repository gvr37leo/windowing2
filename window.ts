
class UIRect{
    
    absrect:Rect
    dirty:boolean = true
    absrectupdated:EventSystemVoid = new EventSystemVoid()

    constructor(public id:number,public parentid:number,public anchormin:Vector,public anchormax:Vector,public offsetmin:Vector,public offsetmax:Vector, public store:UIRect[]){

    }


    updateAbsRect(container:Rect){
        if(this.dirty){
            var absmin = container.getPoint(this.anchormin)
            var absmax = container.getPoint(this.anchormax)
            this.absrect = new Rect(absmin.add(this.offsetmin),absmax.add(this.offsetmax))
            this.dirty = false
            this.absrectupdated.trigger()
            this.getChildren().forEach(c => c.updateAbsRect(this.absrect))
        }
    }

    getChildren(){
        return this.store.filter(r => r.parentid == this.id)
    }

    markDirty(){
        this.dfwalk(r => r.dirty = true)
    }

    draw(){
        this.dfwalk(r => r.absrect.draw(ctxt))
    }

    dfwalk(cb:(rect:UIRect) => void){
        cb(this)
        this.getChildren().forEach(c => cb(c))
    }
}

