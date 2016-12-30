gra.Preload = function(game) {};
gra.Preload.prototype = {
    preload: function() {

        //obrazki
        this.load.image('jak', 'src/2.png');
        this.load.image('star', 'src/kosmos.jpg');
        this.load.image('start', 'src/1.png');
        this.load.image('tytul', 'src/logo.png');
        this.load.image('ship', 'src/statek.png');
        this.load.image('jako', 'src/jako.png');
        this.load.spritesheet('ufo', 'src/wrog.png');
        this.load.spritesheet('laser', 'src/laser.png');
        this.load.spritesheet('laser2', 'src/laser2.png');
        this.load.image('laser_ufo', 'src/szczal.png');
        this.load.image('bomba', 'src/bomba.png');
        this.load.image('zdrowie', 'src/zycie.png');
        this.load.image('zamiana', 'src/zamiana.png');

        //dźwieki
        this.load.audio('wybuch', 'src/wybuch.mp3');
        this.load.audio('lasergracz', 'src/lasergracz.mp3');
        this.load.audio('laserufo', 'src/laserufo.mp3');
        this.load.audio('menunuta', 'src/menu.mp3');
        this.load.audio('gamenuta', 'src/game.mp3');
        this.load.audio('zamiana1', 'src/zamiana.mp3');
        this.load.audio('zdrowie1', 'src/zdrowie.mp3');
        this.load.audio('au', 'src/au.mp3');
        this.load.audio('full', 'src/full_life.mp3');

    },
    create: function() {

        this.state.start('Menu');
    }

};