gra.Menu = function(game) {};
gra.Menu.prototype = {
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        if (tylko == 0) {
            menunuta = this.add.audio('menunuta');
            menunuta.loopFull(0.7);
            tylko = 1;
        }



        background = this.add.sprite(0, 0, 'star');

        title = this.add.sprite(100, 80, 'tytul');
        this.physics.enable(title, Phaser.Physics.ARCADE);
        title.anchor.setTo(0, 0);

        but1 = this.add.button(300, 270, 'start', this.actionOnClick, this, 0, 0, 0);
        this.physics.enable(but1, Phaser.Physics.ARCADE);
        but1.anchor.setTo(0, 0);

        but2 = this.add.button(300, 370, 'jak', this.action, this, 0, 0, 0);
        this.physics.enable(but2, Phaser.Physics.ARCADE);
        but2.anchor.setTo(0, 0);

        rekordString = 'Ostatni wynik: '
        rekordText = this.add.text(250, 500, rekordString + score, { font: '30px Lucida Console', fill: 'green' });
    },

    actionOnClick: function() {

        menunuta.pause();
        this.state.start('Game');
        czy_nuta2 = false;


    },

    action: function() {
        this.state.start('How');
    },

    update: function() {

        if (czy_nuta == false) {
            menunuta.pause();
            czy_nuta = true;
        } else if (czy_nuta == true) {
            menunuta.resume();
        }

    }
};