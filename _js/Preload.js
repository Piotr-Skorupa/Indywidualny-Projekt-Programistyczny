gra.Preload = function(game) {};
gra.Preload.prototype = {
    preload: function() {

        this.load.image('jak', 'src/2.png');
        this.load.image('star', 'src/kosmos.jpg');
        this.load.image('start', 'src/1.png');
        this.load.image('tytul', 'src/logo.png');
        this.load.image('ship', 'src/statek.png');
        this.load.image('jako', 'src/jako.png');
        this.load.image('ufo', 'src/wrog.png');
        this.load.image('laser', 'src/laser.png');
        this.load.image('laser2', 'src/laser2.png');
        this.load.image('laser_ufo', 'src/szczal.png');

    },
    create: function() {

        this.state.start('Menu');
    }

};