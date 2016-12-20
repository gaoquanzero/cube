/**
 * Created by xxxx on 15/6/7.
 */

function EnemyBall(name, game) {
    var self = this;
    var allX = 0, isOnSin = 0, hitNumber = 0;

    this.SpriteName=game.gameName+name;

    Sprite.call(this, self.SpriteName, {
        paint: function (sprite, context) {
            if (sprite.visible) {
                context.save();
                context.fillStyle = self.color;
                context.beginPath();
                context.arc(sprite.left, sprite.top, sprite.radius, 0, Math.PI * 2, true);
                context.closePath();
                context.fill();

                context.restore();
            }
        }
    },[
        enemyBallMove={

            updateBallPosition:function () {
                /*
                if(self.top<game.height/3){
                    self.velocityY=50;
                }else{
                    self.velocityY=0.1;
                }
                if(self.left<(self.radius+10)||(self.left+10)>game.width-self.radius){
                    self.velocityX=-self.velocityX;
                }
                self.left-=self.velocityX;
                self.top+=self.velocityY;
                */

                /*
                //sin
                if ( self.top < game.height/3 && isOnSin) {
                    self.velocityY = 50;
                    self.top += self.velocityY;
                    if (self.top >= game.height/3) {
                        isOnSin = false;
                    }
                }
                else {
                    if(self.left<self.radius||self.left>game.width-self.radius){
                        self.velocityX=-self.velocityX;
                    }
                    self.left -= self.velocityX;
                    self.top = game.height/3 - (Math.sin(allX/((game.width-self.radius)/2) *Math.PI))*50;
                    allX += Math.abs(self.velocityX);
                }
                */

                if (self.top <= game.height/5) {
                        self.velocityY = 20;
                }
                else {
                    if (self.left<self.radius||self.left>game.width-self.radius){
                        self.velocityX=-self.velocityX;
                        hitNumber ++;
                    }
                    if (self.left>(game.width/2 - Math.abs(self.velocityX)/2) &&
                        self.left<=(game.width/2 + Math.abs(self.velocityX)/2) &&
                    self.top > game.height/6) {
                        hitNumber ++;
                        console.log(self.top);
                    }

                    if(hitNumber == 0) {
                        self.velocityY = 0;
                    }
                    else if (hitNumber == 1) {
                        self.velocityY = 3;
                    }
                    else if (hitNumber == 2) {
                        self.velocityY = -3;
                    }
                    else if (hitNumber == 3) {
                        self.velocityY = 0;
                        hitNumber = 0;
                    }

                    self.left -= self.velocityX;
                }
                self.top += self.velocityY;

            },

            execute:function (self,context,time) {
                this.updateBallPosition();
            }
        },
        enemyBallExplosion={
            pushAnimationTimer: new AnimationTimer(500) ,
            start: function () {
                this.pushAnimationTimer.start();
                this.tempRadius=this.tempRadius||self.radius/2;
                this.startX=this.startX||self.left;
                this.startY=this.startY||self.top;
                this.color=self.color;
                this.distance=game.width;
            },
            draw: function (context) {
                context.save();
                context.beginPath();
                context.fillStyle=this.color;
                context.arc(this.startX,this.startY,this.tempRadius+=30,0,Math.PI*2,true);
                context.closePath();
                context.fill();
                context.restore();
            },
            execute:function (sprite,context,time) {
                if(this.pushAnimationTimer.isRunning()) {

                    this.draw(game.getGame().context);
                    if(this.tempRadius>this.distance){
                        this.pushAnimationTimer.stop();
                        this.tempRadius=self.radius;

                        game.backgroundColor=this.color;
                        game.getGame().reset(1);
                    }
                }
            }
        }
    ]);

    this.left=game.width/2;
    this.top=0;
    this.radius=25;
    this.velocityX=(Math.floor(Math.random()*5)+5)*(Math.random()>0.5?1:-1);
    this.velocityY=0.1;
    this.visible=true;
    
    this.changeColor= function () {
        this.color='#'+Math.floor(Math.random()*16777215).toString(16);
    };
    this.changeColor();

    this.explosion= function () {
        enemyBallExplosion.start();
    };
}

EnemyBall.prototype=new Sprite();
EnemyBall.prototype.constructor=EnemyBall;

