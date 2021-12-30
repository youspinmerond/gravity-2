console.clear()
const doc = document
let objects = []
function object(x,y,m,e,Vx,Vy) {
    this.m = m
    this.location = {
        x: x,
        y: y
    }
    this.velocity = {
        x: Vx,
        y: Vy
    }
    this.name = e
    this.element = doc.getElementsByClassName(e)[0]

    this.moving = () => {
        this.location.x += this.velocity.x
        this.location.y += this.velocity.y
        this.element.style.left = this.location.x + 'px'
        this.element.style.top = this.location.y + 'px'
        if(this.location.x+this.velocity.x <= 0)                     this.velocity.x = -this.velocity.x
        if(this.location.x+this.velocity.x >= window.innerWidth-5)   this.velocity.x = -this.velocity.x *.8
        if(this.location.y+this.velocity.y <= 0) this.velocity.y = - this.velocity.y *.8
        if(this.location.y+this.velocity.y >= window.innerHeight-20) this.velocity.y = -this.velocity.y *.8
    }
}
const CreateNewObject = (x,y,m,e,Vx,Vy) => {
    let t = new object(x,y,m,e,Vx,Vy)
    objects.push(t)
    return t
}





let a = CreateNewObject(window.innerWidth*.48, window.innerHeight*.15, 1, 'obj1', 5,0)
let b = CreateNewObject(window.innerWidth*.48, window.innerHeight*.5, 10000, 'obj2', 0,0)
//let c = CreateNewObject(50, 300, 10, 'obj3', .5,0)







function move(obj1,obj2) {
    // F=ma; a = F/m
    // r = rx+ry
    // ry = A1y - A2y
    // ryx = A1x - A2x
    if(obj1.name == obj2.name) return
    if(!obj1 || !obj2) return
    let rx = obj1.location.x - obj2.location.x
    let ry = obj1.location.y - obj2.location.y
    
    let r = Math.sqrt(rx * rx + ry * ry);

    let alpha = Math.asin(rx / r);
    let gamma = Math.acos(ry / r);

    let a = obj1.m / (r * r);
    if(a > 5) a = 5
    obj2.velocity.x += Math.sin(alpha) * a;
    obj2.velocity.y += Math.cos(gamma) * a;
    console.log(obj2.location.x)
}

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// LOOP EVENT ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

let loop = setInterval(() => {
    objects.forEach(e => e.moving())

    objects.forEach(e => {
        objects.forEach(f => {
            move(e,f)
        })
    })
},10)

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

doc.addEventListener('keydown', e => {
    if(e.key == 'q' || e.key == 'й' || e.key == ' ') clearInterval(loop)
})