console.clear()
const doc = document
let objects = []
let i=0
function object(x,y,m,Vx,Vy) {
    this.m = m
    this.location = {
        x: x,
        y: y
    }
    this.velocity = {
        x: Vx,
        y: Vy
    }
    this.element = doc.createElement('div')
    this.element.className = `obj${i+=1}`
    doc.body.append(this.element)
    this.element.style.border = `4px solid white`
    this.name = this.element.className

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
const CreateNewObject = (x,y,m,Vx,Vy) => {
    let t = new object(x,y,m,Vx,Vy)
    objects.push(t)
    return t
}





let a = CreateNewObject(window.innerWidth*.48, window.innerHeight*.15, 1, 5,0)
let b = CreateNewObject(window.innerWidth*.48, window.innerHeight*.5, 10000, 0,0)







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

    let alpha = Math.acos(rx / r);
    let gamma = Math.asin(ry / r);

    let a = obj1.m / (r * r);
    if(a > 5) a = 5
    obj2.velocity.x += Math.cos(alpha) * a;
    obj2.velocity.y += Math.sin(gamma) * a;
}

//////////////////////////////////////////////////////////////////////////////
////////////////////////////// LOOP EVENT ////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// create = () => {
//     let p = doc.createElement('p')
//     p.innerHTML = '#' + i++
//     let e = doc.createElement('section')
//     e.style.padding = '10px'
//     e.style.border = '2px solid white'

//     let M = doc.createElement('input')
//     M.type = 'text'
//     M.placeholder = 'Write here weight object'

//     let X = doc.createElement('input')
//     X.type = 'text'
//     X.placeholder = 'Write here X coordinate object'

//     let Y = doc.createElement('input')
//     Y.type = 'text'
//     Y.placeholder = 'Write here Y coordinate object'

//     let Vx = doc.createElement('input')
//     Vx.type = 'text'
//     Vx.placeholder = 'Write here  Velocity of X coordinate object'
    
//     let Vy = doc.createElement('input')
//     Vy.type = 'text'
//     Vy.placeholder = 'Write here  Velocity of Y coordinate object'

//     let remove = doc.createElement('input')
//     remove.type = 'button'
//     remove.value = 'remove'
//     remove.onclick = (() => {
//         i--
//         e = null
//     })
    

//     doc.body.append(e)
//     e.append(p)
//     e.append(M)
//     e.append(X)
//     e.append(Y)
//     e.append(doc.createElement('br'))
//     e.append(doc.createElement('br'))
//     e.append(Vx)
//     e.append(Vy)
//     e.append(remove)
    
// }

start = () => {
    doc.getElementsByName('input').forEach(e => e = null)
    let loop = setInterval(() => {
        objects.forEach(e => e.moving())

        objects.forEach(e => {
            objects.forEach(f => {
                move(e,f)
            })
        })
    },10)
doc.addEventListener('keydown', e => {
    if(e.key == 'q' || e.key == 'й' || e.key == ' ') clearInterval(loop)
})
}