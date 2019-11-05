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

loop((dt) => {
    ctxt.clearRect(0,0,500,500)
    root.draw()
    // handles.forEach(h => h.draw(ctxt))
})

function attachHandles2Rect(rect:UIRect):Handle[]{
    var lhandles = [
        new Handle(new Vector(10,10),clickmanager),//anchormin
        new Handle(new Vector(20,20),clickmanager),//anchormax
        new Handle(new Vector(30,30),clickmanager),//offsetmin
        new Handle(new Vector(40,40),clickmanager),//offsetmax
    ]

    var lhhandle0 = lhandles[0].pos.onchange.listen((v) => {
        rect.anchormin = new Vector()
        rect.markDirty()
    })


    rect.onAbsrectUpdate.listen(() => {
        lhandles[0].pos.set(new Vector(0,0))//exclude ^
        
    })

    return lhandles
}



var inputa = new Box(0)
inputa.onchange.listen(e => {
    inputb.continueSet(2,e)
})

var inputb = new Box(0)
inputb.onchange.listen(e => {
    inputc.continueSet(3,e)
})

var inputc = new Box(0)
inputc.onchange.listen(e => {
    inputa.continueSet(1,e)
})

inputa.set(9)