var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//背景图片
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;

};
bgImage.src = "images/background.png";

//Hero 图片
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;

};
heroImage.src = "images/hero.png";

//Monster 图片
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
}
monsterImage.src = "images/monster.png";



//定义对象
var hero = {
    speed: 256 //movement in pixels per second
};
var monster = {};
var monsterCaught = 0;

//处理用户的输入
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

//当玩家捕获怪物时重置游戏
var resetHero = function () {
    //重置英雄
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;

};
var resetMonster = function () {
    //随机将怪物扔在屏幕上的任意一个地方
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));

};

//更新对象
var update = function (modifier) {
    if (38 in keysDown) {

        //检测英雄是否在上边界y坐标为11
        if (hero.y < 11) {

        } else {
            hero.y -= hero.speed * modifier;
        }
    }

    if (40 in keysDown) {

        //检测英雄是否在xia边界y坐标为436
        if (hero.y > 436) {

        } else {
            hero.y += hero.speed * modifier;
        }
    }

    if (37 in keysDown) {

        //检测英雄是否在左边界x坐标小于25
        if (hero.x < 25) {

        } else {
            hero.x -= hero.speed * modifier;
        }
    }
    if (39 in keysDown) {
        // console.log(hero.x);
        //检测英雄是否在右边界x坐标小于25
        if (hero.x > 462) {

        } else {
            hero.x += hero.speed * modifier;
        }
    }

    //Are they touching?
    if (
        hero.x <= (monster.x + 32) &&
        monster.x <= (hero.x + 32) &&
        hero.y <= (monster.y + 32) &&
        monster.y <= (hero.y + 32)
    ) {
        ++monsterCaught;
        resetMonster();
    }
};

//渲染物体
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    //得分
    ctx.fillStyle = "rgb(250,250,250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught:" + monsterCaught, 32, 32);
};

//主要循环函数
var main = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    then = now;

    //请求尽快再做一次
    requestAnimationFrame(main);

};
//浏览器兼容
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//启动游戏
var then = Date.now();
resetHero();
resetMonster();
main();


window.onload = function () {

    //背景音乐
    //音乐是否正在播放
    var bgMusic = document.getElementById("bgMusic")
    var pauseMusicBtn = document.getElementById("pauseMusic");
    var playing = false;
    setTimeout(function () {
        bgMusic.play()
            .then(e => console.log(e))
            .catch(e => console.log(e));

        playing = true;

        pauseMusicBtn.addEventListener('click', pause);
    }, 500);  //0.5秒后将会调用执行remind()函数
    
    //音乐暂停
    function pause() {
        if (playing) {
            bgMusic.pause();
            playing = false;
            pauseMusicBtn.textContent = "播放音乐";
        } else {
            bgMusic.play();
            playing = true;
            pauseMusicBtn.textContent = "暂停音乐";
        }
    }

}

