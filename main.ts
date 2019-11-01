/// <reference path="node_modules/utilsx/utils.ts" />
/// <reference path="node_modules/vectorx/vector.ts" />
/// <reference path="node_modules/rect3x/rect.ts" />
/// <reference path="window.ts" />

var windows:UIRect = [

]

var crret = createCanvas(500,500)
var canvas = crret.canvas
var ctxt = crret.ctxt

loop((dt) => {
    ctxt.clearRect(0,0,500,500)

    ctxt.fillRect(10,10,10,10)
})
