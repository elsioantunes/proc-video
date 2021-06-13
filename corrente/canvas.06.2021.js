
    canvas = document.createElement('canvas')
    document.body.appendChild(canvas)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    cnv = canvas.getContext('2d')
   
    function plot(x, y, r, c) {
        var i, cr1, cg1, cb1, ca1, cr2, cg2, cb2, ca2 

        cr1 = c[0]
        cg1 = c[1]
        cb1 = c[2]
        ca1 = c[3]
        
        cr2 = Math.floor(c[0] / 1.6)
        cg2 = Math.floor(c[1] / 1.2)
        cb2 = Math.floor(c[2] / 1.2)
        ca2 = 1
        
        var c  = "rgba(" + cr1 + "," + cg1 + "," + cb1 + "," + ca1 + ")"
        var c2  = "rgba(" + cr2 + "," + cg2 + "," + cb2 + "," + ca2 + ")"
        cnv.lineCap = "round"
        cnv.lineWidth = r
        // cnv.strokeStyle = "#5b5a59"
        cnv.strokeStyle = c2
        cnv.beginPath()
        cnv.lineTo(x,y)
        cnv.stroke()
        
        cnv.lineWidth = r-4
        cnv.strokeStyle = c
        cnv.beginPath()
        cnv.lineTo(x,y)
        cnv.stroke()

        cnv.strokeStyle = c2
        cnv.lineWidth = 2
        for(i=0; i<2; i++){
            cnv.save()
            cnv.translate(x,y)
            cnv.rotate(i*6.28/8)
            
            cnv.beginPath()
            cnv.moveTo(-r/2,0)
            cnv.lineTo(r/2,0)
            cnv.moveTo(0,-r/2)
            cnv.lineTo(0,r/2)
            cnv.stroke()
            cnv.restore()
        }
    };

    function clear(x,y) {
        cnv.fillStyle = "#717887"
        cnv.fillRect(0,0,canvas.width,canvas.height)
    };

    function loop() {
        main()
        requestAnimationFrame(loop)
    };
