class Sky {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.lastUpdate = 0;
    }

    initCanvas() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        const imgbgcanvas = document.querySelector('.imgbgcanvas');
        this.ctx.drawImage(imgbgcanvas, 10, 10)
        this.ctx.fillRect(0,0, this.width, this.height);

    }

    generateStars(count) {
        let stars = [];

        for(let i = 0; i < count; i++){
            const radius = Math.random() * 3 + 2;

            stars.push({
                x: Math.random() * this.width,
                y: Math.random()/2 * this.height,
                radius: radius,
                originalRadius: radius,
                color: 'rgb(255, 255, 255)',
                originalColor: 'rgb(255, 255, 255)',
                speed: Math.random() + 0.2,
            })
        }

        this.stars = stars;
    }

    drawStars() {
        this.stars.forEach(star => {
            this.drawStar(star)
        })
    }

    updateStars() {
        this.stars.forEach(star => {
            star.x += star.speed * (this.delta/16);
            star.y -= star.speed * (this.delta/16) * ((this.width/2) - star.x)/ 3000;
            // star.radius = star.originalRadius * (Math.random() / 2 + 0.9);
            star.color = `rgb(255, 255, 255, ${Math.random()*3.5})`

            if(star.x > this.width + 2 * star.radius) {
                star.x = -2 * star.radius;
            }
        });
    }

    drawOverlayer() {
        let gradient = this.ctx.createRadialGradient(this.width/2, this.height/2, 250, this.width/2, this.height/2, this.width/2);
        gradient.addColorStop(0, 'rgba(0,0,0,0.1)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.1)');

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0,0, this.width, this.height);
    }

    clearCanvas() {
        const imgbgcanvas = document.querySelector('.imgbgcanvas');
        this.ctx.drawImage(imgbgcanvas, 0, 0)
        this.ctx.fillRect(0,0, this.width, this.height);
    }

    drawStar(star){
        this.ctx.save();

        this.ctx.fillStyle = star.color;

        this.ctx.beginPath();

        this.ctx.translate(star.x, star.y);
        this.ctx.moveTo(0,0 - star.radius);

        for(let i = 0; i < 5; i++){
            this.ctx.rotate((Math.PI/180 * 36));
            this.ctx.lineTo(0,0 - star.radius * 0.5)
            this.ctx.rotate((Math.PI/180 * 36));
            this.ctx.lineTo(0,0 - star.radius)
        
        }

        this.ctx.fill();

        this.ctx.restore(); //przywrocenie canvasa
    }

    text(text, font, color) {
        this.ctx.font = font;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = "center";
        this.ctx.fontWeight = "900";
        this.ctx.fillText(text, this.canvas.width/2, this.canvas.height/2);

    }

    draw(now) {
        this.delta = now - this.lastUpdate;
        this.clearCanvas();
        this.text("Drone photography","35px 'Montserrat'", "black");
        this.drawStars();
        this.updateStars();
        this.drawOverlayer();

        this.lastUpdate = now;
        window.requestAnimationFrame((now) => this.draw(now)); //odswiezanie animacji

    }
    

    run() {
        this.initCanvas();
        this.generateStars(100);
        this.draw(0);

    }
}

window.addEventListener('resize', function(){
    canvas.width = this.innerWidth;
    canvas.height = this.innerHeight;
    mouse.radius = ((canvas.height/80) * (canvas.height/80));
    sky.run();
});

const sky = new Sky(document.querySelector('#canvas'));
sky.run();
