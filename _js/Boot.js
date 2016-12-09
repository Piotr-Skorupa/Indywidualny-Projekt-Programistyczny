var gra = {
    _WIDTH: 800,
    _HEIGHT: 600
};

var rekordString;
var rekordText;
var firingTimer = 0;
var procent = "%"
var ufoLasers;
var zeroAliens = true;
var lasers;
var aliens;
var score = 0;
var scoreText;
var scoreString = '';
var xx;
var yy;
var background;
var back2;
var back3;
var title;
var but1;
var but2;
var gracz;
var life;
var lifeText;
var lifeString;
var attack;
var attacka;
var speed = 6;
var fireButton;
var keyboard;
var esc;
var bulletTime = 0;
var livingUfo = [];

gra.Boot = function(game) {};
gra.Boot.prototype = {

    create: function() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.state.start('Preload');
    }
};