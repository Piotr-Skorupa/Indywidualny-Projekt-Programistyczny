gra.How = function(game) {};
gra.How.prototype = {
    create: function() {

        back3 = this.add.sprite(0, 0, 'jako');

        keyboard = this.input.keyboard.createCursorKeys();
        esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    },


    update: function() {

        if (esc.isDown) {
            this.state.start('Menu');
        }
    }

};