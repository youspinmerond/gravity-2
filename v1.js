console.clear()
const doc = document

let objcts = []
function object (x,y,m,element) {
    this.m = m;
    this.velocity = {
        x:0,
        y:0
    }
    this.location = {
        x:x,
        y:y
    }

    this.element = doc.getElementsByClassName(element)[0]
    doc.getElementsByClassName(element)[0].style.left = location.x + "px"
    doc.getElementsByClassName(element)[0].style.top  = location.y + "px"
    this.element.style.left = this.location.x + 'px'
    this.element.style.top = this.location.y + 'px'

    this.moving = () => {
        this.location.x += this.velocity.x
        this.location.y += this.velocity.y
        // MOVING X
        if(this.location.x <= 0)
        {
            this.velocity.x = -this.velocity.x *.8 
        }
        if(this.location.x + this.velocity.x >= window.innerWidth)
        {
            this.velocity.x = -this.velocity.x *.8
        }
        // MOVING Y
        if(this.location.y <= 0)
        {
            this.velocity.y = -this.velocity.y *.8 
        }
        if(this.location.y + this.velocity.y >= window.innerHeight -20)
        {
            this.velocity.y = -this.velocity.y *.8
        }
        

        this.element.style.left = this.location.x + 'px'
        this.element.style.top = this.location.y + 'px'
    }

}
CreateNewObject = (x,y,m,element) => {
    let v = new object(x,y,m,element)
    objcts.push(v)
    return v
}

let obj1 = CreateNewObject(800,400,30,'obj1')
let obj2 = CreateNewObject(200,700,30,'obj2')
// let obj3 = CreateNewObject(520,490,30,'obj3')
let move = () => {
    //Fg = m1m2/r**2
    //rX = x1-x2
    //rY = y1-y2
    //r = rX+rY
    for(i=0; i<= objcts.length; i++)
    {
        if(objcts.length < 2)
        {
            objcts[i].moving()
        }
        for(c=i+1; c<= objcts.length; c++)
        {
            if(!objcts[c]) return;
            let rX = objcts[i].location.x - objcts[c].location.x
            let rY = objcts[i].location.y - objcts[c].location.y
            let r  = rX + rY
            let Fg = (objcts[i].m * objcts[c].m) / r**2
            if(Fg>= 1) Fg = 1
            
            // MOVING X
            if(objcts[i].location.x > objcts[c].location.x)
            {
                objcts[i].velocity.x -= Fg/objcts[i].m
                objcts[c].velocity.x += Fg/objcts[c].m
                console.log(1)
            } else {
                objcts[i].velocity.x += Fg/objcts[i].m
                objcts[c].velocity.x -= Fg/objcts[c].m
                console.log(2)
            }
            // MOVING Y
            if(objcts[i].location.y > objcts[c].location.y)
            {
                objcts[i].velocity.y -= Fg/objcts[i].m
                objcts[c].velocity.y += Fg/objcts[c].m
                console.log(3)
            } else {
                objcts[i].velocity.y += Fg/objcts[i].m
                objcts[c].velocity.y -= Fg/objcts[c].m
                console.log(4)
            }
            
            objcts[i].moving()
            objcts[c].moving()
        }
    }
}
let loop = setInterval(() => {
    move()
},10)
document.addEventListener('keydown', e => {
    if(e.key == "q" || e.key == "й") clearInterval(loop)
    if(e.key == " ")                 clearInterval(loop)
})