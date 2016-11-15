gra.Games = function(game) {};
gra.Games.prototype = {
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);


        attack = 1; //atak gracza
        attacka = 1; //atak obcego
        life = 3; //zycie gracza
        lifea = 2; //zycie obcego az do "lifea3" 
        lifea1 = 2;
        lifea2 = 2;
        lifea3 = 2;

        // stworzenie spritów
        back2 = this.add.tileSprite(0, 0, 800, 600, 'star');

        gracz = this.add.sprite(350, 500, 'ship');
        this.physics.enable(gracz, Phaser.Physics.ARCADE);

        alien = this.add.sprite(50, 100, 'ufo');

        alien1 = this.add.sprite(200, 100, 'ufo');

        alien2 = this.add.sprite(350, 100, 'ufo');

        alien3 = this.add.sprite(500, 100, 'ufo');

        //wczytanie przycisków
        keyboard = this.input.keyboard.createCursorKeys();
        fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

    },
    fire: function() {


        laser = this.add.sprite(xx, yy, 'laser');
        this.physics.enable(laser, Phaser.Physics.ARCADE);

        laser.body.velocity.y -= 400;

    },
    update: function() {

        back2.tilePosition.y += 4;
        xx = gracz.body.x + 37;
        yy = gracz.body.y - 46;

        if (keyboard.left.isDown) {
            gracz.x -= speed;

        } else if (keyboard.right.isDown) {
            gracz.x += speed;
        }

        if (fireButton.isDown) {
            this.fire();
        }

        if (esc.isDown) {

            this.state.start('Menu');
        }

        if (gracz.body.x <= 0) gracz.body.x = 1;
        else if (gracz.body.x >= 700) gracz.body.x = 699;



    }
};