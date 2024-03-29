
class UIRect{
    
    absrect:Box<Rect>
    dirty:boolean = true

    constructor(public id:number,public parentid:number,public anchormin:Vector,public anchormax:Vector,public offsetmin:Vector,public offsetmax:Vector, public store:UIRect[]){

    }


    updateAbsRect(container:Rect){
        if(this.dirty){
            var absmin = container.getPoint(this.anchormin)
            var absmax = container.getPoint(this.anchormax)
            this.absrect.set(new Rect(absmin.add(this.offsetmin),absmax.add(this.offsetmax)))
            this.dirty = false
        }
        this.getChildren().forEach(c => c.updateAbsRect(this.absrect.get()))
    }

    getChildren(){
        return this.store.filter(r => r.parentid == this.id)
    }

    getParent(){
        return this.store.find(r => r.id == this.id)
    }

    markDirty(){
        this.dfwalk(r => r.dirty = true)
    }

    draw(){
        this.dfwalk(r => r.absrect.value.draw(ctxt))
    }

    dfwalk(cb:(rect:UIRect) => void){
        cb(this)
        this.getChildren().forEach(c => cb(c))
    }



    calcAbsAnchorPos(anchor:Vector,container:Rect):Vector{
        return this.uirectlerp(container.min,container.max,anchor)
    }

    calcAbsOffsetPos(anchor:Vector,offset:Vector,container:Rect):Vector{
        return this.calcAbsAnchorPos(anchor,container).add(offset)
    }

    uirectlerp(a:Vector,b:Vector,w:Vector):Vector{
        return new Vector(lerp(a.x,b.x,w.x),lerp(a.y,b.y,w.y))
    }

    uirectInvlerp(a:Vector,b:Vector,w:Vector){
        return new Vector(inverseLerp(a.x,b.x,w.x),inverseLerp(a.y,b.y,w.y))
    }
}

