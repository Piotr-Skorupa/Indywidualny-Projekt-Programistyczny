gra.Menu = function(game) {};
gra.Menu.prototype = {
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);

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
    },

    actionOnClick: function() {

        this.state.start('Game');

    },

    action: function() {
        this.state.start('How');
    },

    update: function() {

    }
};