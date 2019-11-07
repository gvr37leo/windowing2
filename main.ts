/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/rect3x/rect.ts" />
/// <reference path="EventSystem.ts" />
/// <reference path="window.ts" />
/// <reference path="flexbox.ts" />

/// <reference path="handle.ts" />


var windows:UIRect[] = []
windows.push(new UIRect(1,null,new Vector(0.1,0.1),new Vector(0.9,0.9),new Vector(10,10),new Vector(-10,-10),windows))
windows.push(new UIRect(2,1,new Vector(0,0),new Vector(0,0),new Vector(10,10),new Vector(50,50),windows))
windows.push(new UIRect(3,1,new Vector(1,1),new Vector(1,1),new Vector(-50,-50),new Vector(-10,-10),windows))

var clickmanager = new ClickManager()
clickmanager.listenToDocument()
var handles:Handle[] = [
    new Handle(new Vector(10,10),clickmanager),
    new Handle(new Vector(20,20),clickmanager),
    new Handle(new Vector(30,30),clickmanager),
    new Handle(new Vector(40,40),clickmanager),
]


var root = windows[0]
var crret = createCanvas(500,500)
var canvas = crret.canvas
var ctxt = crret.ctxt
var container = new Rect(new Vector(0,0),new Vector(500,500))
root.updateAbsRect(container)
updateHandles()

loop((dt) => {
    ctxt.clearRect(0,0,500,500)
    root.draw()
    handles.forEach(h => h.draw(ctxt))
})

function readAnchorSetData(container,absanchor){
        
}

function attachHandles2Rect(rect:UIRect):Handle[]{
    var parent = rect.getParent()
    var lhandles = [
        new Handle(new Vector(10,10),clickmanager),//anchormin
        new Handle(new Vector(20,20),clickmanager),//anchormax
        new Handle(new Vector(30,30),clickmanager),//offsetmin
        new Handle(new Vector(40,40),clickmanager),//offsetmax
    ]

    lhandles[0].pos.onchange.listen(e => {
        
        inverseLerp(e.val.val.x ,parent.absrect.value.min.x,parent.absrect.value.max.x)
        rect.anchormin = new Vector()
        rect.markDirty()
    })



    return lhandles
}
