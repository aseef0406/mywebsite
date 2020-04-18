function load_images(){
    virus_img = new Image;
    virus_img.src = "Assets/v2.png";

    player_img = new Image;
    player_img.src = "Assets/superhero.png";

    gem_img = new Image;
    gem_img.src = "Assets/gem.png";
}


function init(){
    
    canvas = document.getElementById("mycanvas");
    
    H=400;
    W=700;

    canvas.height=H;
    canvas.width=W;

    //try to work e=with canvas
    pen = canvas.getContext('2d');

    //we want to create a box
    // JSON Objects

    e1 = {
        x : 150,
        y : 10,
        w : 60,
        h : 60,
        speed: 10,
    };

    e2 = {
        x : 300,
        y : 10,
        w : 60,
        h : 60,
        speed: 20,
    };
    
    e3 = {
        x : 500,
        y : 10,
        w : 60,
        h : 60,
        speed: 30,
    };
    enemies=[e1,e2,e3];
 
    score=0;
    game_over=false;

    player={
        x: 10,
        y: H - H/3,
        w: 60,
        h: 60,
        speed: 20,
        moving:false,
    };
    gem={
        x: 600,
        y: H - H/3,
        w: 60,
        h: 60,
    };

    canvas.addEventListener('mousedown',function(){
        console.log("mouse has been pressed");
        player.moving=true;
    });
    canvas.addEventListener('mouseup',function(){
        console.log("mouse has been released");
        player.moving=false;
    });
    canvas.addEventListener("touchleave", function(){
        console.log("touch has been pressed");
        player.moving=false;
    });
    canvas.addEventListener("touchend", function(){
        console.log("touch has been released");
        player.moving=true;
    });
};

//movement

//Game Loop
function draw(){

    pen.clearRect(0,0,W,H);
    pen.fillStyle = "green";
    pen.drawImage(player_img,player.x,player.y,player.w,player.h)
    pen.drawImage(gem_img,gem.x,gem.y,gem.w,gem.h);

    pen.fillStyle = "blue";
    for(let i=0;i<enemies.length;i++){
        pen.drawImage(virus_img,enemies[i].x,enemies[i].y,enemies[i].w,enemies[i].h);
    }
    pen.fillStyle = "green" ;
    pen.fillText("score : "+score,10,10);
};

function isColliding(b1,b2){
    if(Math.abs(b1.x - b2.x ) <= b1.h - 30 && Math.abs(b1.y - b2.y)<=b1.w)
        return true;
    return false;
}

function update(){
    if(player.moving==true){
        player.x+=player.speed;
        score += 20;
    }

    for(let i=0;i<enemies.length;i++){
        if(isColliding(enemies[i],player)){
            score -= 100;
            if(score < 0){
                game_over=true;
                alert("You Lost!!!!!!!!!!")
            }
        }
    }

    if(isColliding(gem,player)){
        game_over=true;
    }

    for(let i=0;i<enemies.length;i++){
        enemies[i].y+=enemies[i].speed;
        if(enemies[i].y + enemies[i].h > H || enemies[i].y < 0){
            enemies[i].speed *= -1 ;
        }
    }
};

function gameloop(){
    console.log("In Game Loop");
    if(game_over==true){
        alert("You won with " + score + " points!!!!!!")
        clearInterval(f);
    }
    draw();
    update();
};

load_images();
//start oF game
init();

//repeated call gameloop
let f = setInterval(gameloop,100);
