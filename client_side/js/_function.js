let rand = (min, max) => Math.random() * (max - min + 1) + min >> 0;

Array.prototype.last = function () {
    return this.length ? this[this.length - 1] : false;
};

Array.prototype.prev = function () {
    return this.length > 1 ? this[this.length - 2] : false;
};

Array.prototype.rand = function () {
    return this.length ? this[rand(0,this.length - 1)] : false;
};

function drawMaze(map,dom,w,h) {
    let canvas = document.createElement("canvas");
    canvas.classList.add("canvas");
    dom.append(canvas);
    canvas.width = map[0].length * w;
    canvas.height =  map.length * h;
    let ctx = canvas.getContext('2d');
    let [x,y] =[0,0];
    map.map((v,i)=>{
        y = i*h;
        v.map((val,inx) =>{
            x = inx * w;
            ctx.fillStyle = val === 0 ? "#3282b8" : "#0f4c75";
            ctx.fillRect(x,y,w,h);
        })
    })
}