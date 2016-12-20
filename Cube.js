/**
 * Created by xxxx on 15/7/14.
 */

var Cube=function (x, y, z,length,width,height) {
    var temp;
    var self=this;

    this.length=length*0.5||0.95;
    this.width=width*0.5||0.95;
    this.height=height*0.5||0.95;

    var right=0,left=1,top=2,bottom=3,near=4,far=5;
    var changePlane={
        'left': function () {
            temp=near;
            near=right;
            right=far;
            far=left;
            left=temp;
        },
        'right': function () {
            temp=near;
            near=left;
            left=far;
            far=right;
            right=temp;
        },
        'up': function () {
            temp=near;
            near=bottom;
            bottom=far;
            far=top;
            top=temp;
        },
        'down':function () {
            temp=near;
            near=top;
            top=far;
            far=bottom;
            bottom=temp;
        }
    };

    var cube = new THREE.Mesh(new THREE.BoxGeometry(self.length, self.width, self.height), new THREE.MeshFaceMaterial([
            new THREE.MeshBasicMaterial({color: 0xff0000}),  //red  right
            new THREE.MeshBasicMaterial({color: 0x0000ff}),  //blue  left
            new THREE.MeshBasicMaterial({color: 0x00ff00}),  //green  top
            new THREE.MeshBasicMaterial({color: 0x00ffff}),  //cyan  bottom
            new THREE.MeshBasicMaterial({color: 0xffff00}),  //yellow  near
            new THREE.MeshBasicMaterial({color: 0xffffff})   //white  far
        ])
    );

    cube.position.set(x, y, z);

    this.apply = function (direction) {
        changePlane[direction]();
    };


    this.getCube = function () {
        return cube;
    };

    this.getNear= function () {
        return near;
    };

    this.getLeft= function () {
        return left;
    };
};


