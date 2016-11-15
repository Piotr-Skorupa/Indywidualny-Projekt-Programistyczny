var gra = {
    _WIDTH: 800,
    _HEIGHT: 600
};


var xx;
var yy;
var laser;
var background;
var back2;
var back3;
var title;
var but1;
var but2;
var gracz;
var alien;
var alien1;
var alien2;
var alien3;
var lifea;
var lifea1;
var lifea2;
var lifea3;
var life;
var attack;
var attacka;
var speed = 6;
var fireButton;
var keyboard;
var esc;

gra.Boot = function(game) {};
gra.Boot.prototype = {

    create: function() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.state.start('Preload');
    }
};