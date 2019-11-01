class UIRect{
    id:number
    parentid:number
    anchormin:Vector
    anchormax:Vector
    offsetmin:Vector
    offsetmax:Vector
    absrect:Rect
    dirty:false

    updateAbsRect(container:Rect,rects:UIRect[]){
        var absmin = container.getPoint(this.anchormin)
        var absmax = container.getPoint(this.anchormax)
        this.absrect = new Rect(absmin.add(this.offsetmin),absmax.add(this.offsetmax))
        var children = this.getChildren(rects)
        children.forEach(c => c.updateAbsRect(this.absrect,rects))
    }

    getChildren(rects:UIRect[]){
        return rects.filter(r => r.id == this.parentid)
    }
}

