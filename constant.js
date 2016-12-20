/**
 * Created by xxxx on 15/7/14.
 */
var three = THREE;
var key = {
    81: {
        "keyCode": 'q',
        'direction': 'left',
        'position': 1
    },
    87: {
        "keyCode": 'w',
        'direction': 'left',
        'position': 0
    },
    69: {
        "keyCode": 'e',
        'direction': 'left',
        'position': -1
    },
    65: {
        "keyCode": 'a',
        'direction': 'right',
        'position': 1
    },
    83: {
        "keyCode": 's',
        'direction': 'right',
        'position': 0
    },
    68: {
        "keyCode": 'd',
        'direction': 'right',
        'position': -1
    },
    85: {
        "keyCode": 'u',
        'direction': 'up',
        'position': -1
    },
    73: {
        "keyCode": 'i',
        'direction': 'up',
        'position': 0
    },
    79: {
        "keyCode": 'o',
        'direction': 'up',
        'position': 1
    },
    74: {
        "keyCode": 'j',
        'direction': 'down',
        'position': -1
    },
    75: {
        "keyCode": 'k',
        'direction': 'down',
        'position': 0
    },
    76: {
        "keyCode": 'l',
        'direction': 'down',
        'position': 1
    }
};
var sinAngle = Math.sin(Math.PI / 90), cosAngle = Math.cos(Math.PI / 90);
var MATRIX = {
    'init': new three.Matrix4().set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ),
    'left': new three.Matrix4().set(
        0, 0, -1, 0,
        0, 1, 0, 0,
        1, 0, 0, 0,
        0, 0, 0, 1
    ),
    'right': new three.Matrix4().set(
        0, 0, 1, 0,
        0, 1, 0, 0,
        -1, 0, 0, 0,
        0, 0, 0, 1
    ),
    'up': new three.Matrix4().set(
        1, 0, 0, 0,
        0, 0, 1, 0,
        0, -1, 0, 0,
        0, 0, 0, 1
    ),
    'down': new three.Matrix4().set(
        1, 0, 0, 0,
        0, 0, -1, 0,
        0, 1, 0, 0,
        0, 0, 0, 1
    )
};
var rotateMatrix = {
    'left': rotateLeft = new three.Matrix4().set(
        cosAngle, 0, -sinAngle, 0,
        0, 1, 0, 0,
        sinAngle, 0, cosAngle, 0,
        0, 0, 0, 1
    ),
    'right': rotateRight = new three.Matrix4().set(
        cosAngle, 0, sinAngle, 0,
        0, 1, 0, 0,
        -sinAngle, 0, cosAngle, 0,
        0, 0, 0, 1
    ),
    'up': rotateUp = new three.Matrix4().set(
        1, 0, 0, 0,
        0, cosAngle, sinAngle, 0,
        0, -sinAngle, cosAngle, 0,
        0, 0, 0, 1
    ),
    'down': rotateDown = new three.Matrix4().set(
        1, 0, 0, 0,
        0, cosAngle, -sinAngle, 0,
        0, sinAngle, cosAngle, 0,
        0, 0, 0, 1
    )
};
