var gra = {
    _WIDTH: 800,
    _HEIGHT: 600
};

var au;
var full;
var zdrowieS;
var zamianaS;
var loteryTime = 0;
var bomba;
var zdrowie;
var zamiana;
var losowanie;
var tylko = 0;
var czy_nuta2 = false;
var czy_nuta = false;
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
var speed = 6;
var fireButton;
var keyboard;
var esc;
var bulletTime = 0;
var livingUfo = [];
var wybuch;
var lasergracz;
var laserufo;
var menunuta;
var gamenuta = 0;


gra.Boot = function(game) {};
gra.Boot.prototype = {

    create: function() {
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.state.start('Preload');
    }
};