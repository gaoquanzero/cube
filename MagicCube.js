/* global THREE */
/**
 * Created by xxxx on 15/7/14.
 */

var MagicCube = function (canvas, custom) {

    var scene = null;
    var camera = null;
    var renderer = null;

    var cubes = [];

    var operationQueue = [];
    var rotationQueue = [], turnQueue = [];
    var turnCount = 0, rotationCount = 0;

    var running = false;

    this.addCube = function (cube) {
        scene.add(cube.getCube());
        cubes.push(cube);
    };

    this.init = function () {
        var myCanvas = document.getElementById(canvas);
        myCanvas.width = myCanvas.clientWidth;
        myCanvas.height = myCanvas.clientHeight;

        renderer = new THREE.WebGLRenderer({
            canvas: myCanvas
        });
        scene = new THREE.Scene();

        camera = new THREE.PerspectiveCamera(45, myCanvas.clientWidth / myCanvas.clientHeight, 0.1, 100);
        camera.position.set(0, 0, 8);
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        scene.add(camera);


        //near plane
        var cube11 = new Cube(-1, 1, 1);
        this.addCube(cube11);
        var cube12 = new Cube(0, 1, 1);
        this.addCube(cube12);
        var cube13 = new Cube(1, 1, 1);
        this.addCube(cube13);
        var cube14 = new Cube(-1, 0, 1);
        this.addCube(cube14);
        var cube15 = new Cube(0, 0, 1);
        this.addCube(cube15);
        var cube16 = new Cube(1, 0, 1);
        this.addCube(cube16);
        var cube17 = new Cube(-1, -1, 1);
        this.addCube(cube17);
        var cube18 = new Cube(0, -1, 1);
        this.addCube(cube18);
        var cube19 = new Cube(1, -1, 1);
        this.addCube(cube19);

        //middile plane
        var cube21 = new Cube(-1, 1, 0);
        this.addCube(cube21);
        var cube22 = new Cube(0, 1, 0);
        this.addCube(cube22);
        var cube23 = new Cube(1, 1, 0);
        this.addCube(cube23);
        var cube24 = new Cube(-1, 0, 0);
        this.addCube(cube24);
        var cube25 = new Cube(0, 0, 0);
        this.addCube(cube25);
        var cube26 = new Cube(1, 0, 0);
        this.addCube(cube26);
        var cube27 = new Cube(-1, -1, 0);
        this.addCube(cube27);
        var cube28 = new Cube(0, -1, 0);
        this.addCube(cube28);
        var cube29 = new Cube(1, -1, 0);
        this.addCube(cube29);

        //far plane
        var cube31 = new Cube(-1, 1, -1);
        this.addCube(cube31);
        var cube32 = new Cube(0, 1, -1);
        this.addCube(cube32);
        var cube33 = new Cube(1, 1, -1);
        this.addCube(cube33);
        var cube34 = new Cube(-1, 0, -1);
        this.addCube(cube34);
        var cube35 = new Cube(0, 0, -1);
        this.addCube(cube35);
        var cube36 = new Cube(1, 0, -1);
        this.addCube(cube36);
        var cube37 = new Cube(-1, -1, -1);
        this.addCube(cube37);
        var cube38 = new Cube(0, -1, -1);
        this.addCube(cube38);
        var cube39 = new Cube(1, -1, -1);
        this.addCube(cube39);


        var light = new THREE.DirectionalLight(0xffffff);
        light.position.set(10, 10, 15);
        scene.add(light);

        if (!custom) {
            randomTurn();
        }
    };


    this.start = function () {
        this.init();
        renderer.render(scene, camera);
    };

    function randomTurn() {

        renderer.render(scene, camera);

        var rand = Math.floor(Math.random() * 15 + 10);
        var keyCodes = [81, 87, 69, 65, 83, 68, 85, 73, 79, 74, 75, 75];
        //rand = 0;
        for (var index = 0, currentKey, direction, position; index < rand; index++) {
            currentKey = key[keyCodes[Math.floor(Math.random() * 12)]];

            direction = currentKey.direction;
            position = currentKey.position;

            if (direction == 'left' || direction == 'right') {
                for (var i = 0, length = cubes.length; i < length; i++) {
                    if (Math.round(cubes[i].getCube().position.y, 10) == position) {
                        cubes[i].getCube().applyMatrix(MATRIX[direction]);
                        cubes[i].apply(direction);
                    }
                }
            }

            if (direction == 'up' || direction == 'down') {
                for (i = 0; i < length; i++) {
                    if (Math.round(cubes[i].getCube().position.x, 10) == position) {
                        cubes[i].getCube().applyMatrix(MATRIX[direction]);
                        cubes[i].apply(direction);
                    }
                }
            }

        }

    }

    function Rotate(direction) {
        var self = this;
        this.i = this.i || 0;
        this.direction = direction;

        this.update = function () {
            self.i++;
            self.rotateFlag = requestAnimationFrame(function () {
                self.update();
            });

            for (var i = 0, length = cubes.length; i < length; i++) {
                cubes[i].getCube().applyMatrix(rotateMatrix[self.direction]);
            }
            renderer.render(scene, camera);
            if (self.i >= 45) {
                cancelAnimationFrame(self.rotateFlag);
                self.i = 0;

                rotationCount++;

                running = false;

                operate();
                /*
                 if (rotationQueue[rotationCount]) {
                 new Rotate(rotationQueue[rotationCount]).update();
                 }
                 */
            }
        }
    }

    function Turn(keyCode) {
        var self = this;
        this.i = this.i || 0;
        this.key = key[keyCode];
        this.direction = this.key.direction;
        this.position = this.key.position;

        this.index = turnQueue.length;

        this.update = function () {
            self.i++;
            self.turnFlag = requestAnimationFrame(function () {
                self.update();
            });

            if (self.direction == 'left' || self.direction == 'right') {
                for (var j = 0, length = cubes.length; j < length; j++) {
                    if (Math.round(cubes[j].getCube().position.y, 10) == self.position) {
                        cubes[j].getCube().applyMatrix(rotateMatrix[self.direction]);
                    }
                }
            }

            if (self.direction == 'up' || self.direction == 'down') {
                for (j = 0, length = cubes.length; j < length; j++) {
                    if (Math.round(cubes[j].getCube().position.x, 10) == self.position) {
                        cubes[j].getCube().applyMatrix(rotateMatrix[self.direction]);
                    }
                }
            }

            renderer.render(scene, camera);
            if (self.i >= 45) {
                cancelAnimationFrame(self.turnFlag);
                self.i = 0;

                if (self.direction == 'left' || self.direction == 'right') {
                    for (var j = 0, length = cubes.length; j < length; j++) {
                        if (Math.round(cubes[j].getCube().position.y, 10) == self.position) {
                            cubes[j].apply(self.direction);
                        }
                    }
                }

                if (self.direction == 'up' || self.direction == 'down') {
                    for (var j = 0, length = cubes.length; j < length; j++) {
                        if (Math.round(cubes[j].getCube().position.x, 10) == self.position) {
                            cubes[j].apply(self.direction);
                        }
                    }
                }

                turnCount++;

                running = false;

                operate();
                if (checkCube()) {
                    window.setTimeout(function () {
                        alert("Congratulation");
                    }, 100);
                } else {
                }
            }
        }
    }

    function operate() {
        if (operationQueue.length===0||running) {

        } else {
            running = true;
            var operation = operationQueue.shift();
            switch (operation) {
                case 37:  //left
                    rotationQueue.push('left');

                    new Rotate(rotationQueue[rotationCount]).update();
                    break;
                case 38:  //up
                    rotationQueue.push('up');
                    new Rotate(rotationQueue[rotationCount]).update();
                    break;
                case 39:  //right
                    rotationQueue.push('right');

                    new Rotate(rotationQueue[rotationCount]).update();
                    break;
                case 40:  //down
                    rotationQueue.push('down');

                    new Rotate(rotationQueue[rotationCount]).update();
                    break;
            }

            for (var i in key) {
                if (key.hasOwnProperty(i) && operation == i) {
                    turnQueue.push(i);
                    new Turn(turnQueue[turnCount]).update();
                }
            }

        }
    }

    function checkCube() {
        var cubeInUse = cubes[0];
        var near = cubeInUse.getNear(), left = cubeInUse.getLeft();
        for (var i = 0; i < 27; i++) {
            if (!(cubes[i].getLeft() === left && cubes[i].getNear() === near)) {
                return false;
            }
        }
        return true;
    }


    window.onkeydown = function (e) {

        if (e.keyCode === 32) {
            if (camera.position.x === 0) {
                camera.position.set(5, 5, 5);
            } else {
                camera.position.set(0, 0, 8);
            }
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            renderer.render(scene, camera);
        } else {
            operationQueue.push(e.keyCode);
        }

        if (operationQueue.length > 0) {
            operate();
        }
    };

    window.onresize = function () {
        myCanvas.width = myCanvas.clientWidth;
        myCanvas.height = myCanvas.clientHeight;
        renderer.render(scene, camera);
    };

    window.getRunning=function(){
        return running;
    }
};