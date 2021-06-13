    function Particle(i, n){
        var ang = 6.28 * i/n
        var r = sen(3*5*ang)*100+155
        var g = sen(3*2*ang)*100+155
        var b = sen(5*2*ang)*100+155
        
        this.x = canvas.width/2
        this.y = canvas.height
        this.raio = 76
        this.c = "rgb("+ r +","+ g +","+ b +")"
        this.spc = 10
        this.inercx = 0
        this.inercy = 0
        this.formy = cos(3*ang) * .4 * i/n 
        this.formx = sen(2*ang) * .4 * i/n + .3 
    }


    function Particles(n){
        this.n = n
        this.elo = []
        for (var i=0; i<n; i++){this.elo[i] = new Particle(i, n)}
        
        this.draw = function() {
            var x, y, n, x0, y0
            n = this.n
            x0 = window.innerWidth/2
            y0 = 8*window.innerHeight/10
            
            for (var i = 0; i<this.n; i++)
                plot(this.elo[i].x, this.elo[i].y, this.elo[i].raio, this.elo[i].c)
                
            for (var i = 0; i<this.n; i++){
                x = x0 + .8*window.innerWidth*(i/n - .5)
                y = y0 - this.normal(clock, i) * 30
                plot(x, y, 30, this.elo[i].c)
            }
        };
        
    
        this.varia = function() {
            var n, r, g, b, a, ang
            n = this.n
            for (var i = 0; i<n; i++){
                ang = 6.28 * i/n
                a = this.normal(clock, i)
                a2 = this.normal(clock, n-i)
                r = sen(7*ang)*a*42+55 
                g = sen(11*ang)*a*42+55
                b = sen(13*ang)*a*42+55
                this.elo[i].c = [r,g,b,1]
                this.elo[i].spc = 100
                this.elo[i].raio = sen(a2/3)*sen(a2/3)*75+76
            }
        };
    
        this.movhead = function() {
            var vel, ang = 6.28 * i/this.n
            vel = cos(2*clock/160)*15 + 170
            this.elo[0].x = cos(3*clock/vel)*150 + window.innerWidth/3
            this.elo[0].y = sen(2*clock/vel)*150 + window.innerHeight/3
        };
    
        this.calc = function() {
            for (var i=1; i<n; i++) {
                var p = this.elo[i]
                var q = this.elo[i - 1]
                xd = p.x - q.x + p.inercx * .5 + p.formx
                yd = p.y - q.y + p.inercy * .5 + p.formy
                dist = sqrt(p.spc/(xd * xd + yd * yd))
                xd *= dist 
                yd *= dist 
                p.inercx = xd + q.x - p.x
                p.inercy = yd + q.y - p.y
                p.x = xd + q.x
                p.y = yd + q.y
            }
        }

        this.normal = function(x0, i){
            var sig, mu, x, n
            sig = 1/10
            n = this.n
            mu = i/n
            x = 1.8*((x0/5)%n)/n -.4
            return 2*Math.exp(-(x-mu)*(x-mu)/(2*sig*sig))/(sqrt(6.28*sig*sig))
        }   
    }
    


    var corrente, mx, my, space, clock
    
    window.onload = function(){
        corrente = new Particles(100)
        mx = window.innerWidth/2;
        my = 0;
        space = 100
        clock = 0
        rnd1 = 3
        rnd2 = 2
        loop()
    }

    document.onmousemove = function move(e) {
        mx = e.clientX;
        my = e.clientY;
        corrente.calc()
    }



    function main(x,y) {
        clear()
        corrente.movhead()
        corrente.calc()
        corrente.varia()
        corrente.draw()
        clock ++
    }
    
    function sqrt(x) {return Math.sqrt(x)};  
    function cos(x){return Math.cos(x)}
    function sen(x){return Math.sin(x)}
    
    function debug(a){document.getElementById('debug').innerHTML = Math.floor(a*100)/100}

