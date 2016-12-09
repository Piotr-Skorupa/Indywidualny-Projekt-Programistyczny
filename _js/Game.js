gra.Games = function(game) {};
gra.Games.prototype = {
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        score = 0;
        attack = 1; //atak gracza
        attacka = 1; //atak obcego
        life = 100; //zycie gracza

        // stworzenie spritów
        back2 = this.add.tileSprite(0, 0, 800, 600, 'star');

        gracz = this.add.sprite(350, 500, 'ship');
        this.physics.enable(gracz, Phaser.Physics.ARCADE);

        lasers = this.add.group();
        lasers.enableBody = true;
        lasers.physicsBodyType = Phaser.Physics.ARCADE;
        lasers.createMultiple(30, 'laser');
        lasers.setAll('outOfBoundsKill', true);
        lasers.setAll('checkWorldBounds', true);

        ufoLasers = this.add.group();
        ufoLasers.enableBody = true;
        ufoLasers.physicsBodyType = Phaser.Physics.ARCADE;
        ufoLasers.createMultiple(30, 'laser_ufo');
        ufoLasers.setAll('outOfBoundsKill', true);
        ufoLasers.setAll('checkWorldBounds', true);

        aliens = this.add.group();
        aliens.enableBody = true;
        aliens.physicsBodyType = Phaser.Physics.ARCADE;

        //punkty
        scoreString = 'Score : ';
        scoreText = this.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: 'blue' });
        //życie
        lifeString = 'Health : ';
        lifeText = this.add.text(580, 10, lifeString + life + procent, { font: '34px Arial', fill: 'blue' });


        //wczytanie przycisków
        keyboard = this.input.keyboard.createCursorKeys();
        fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);



    },

    fire: function() {

        //  Ustawiamy limit czasowy dla wystrzelonych laserów
        if (this.time.now > bulletTime) {
            //  Bierzemy pierwszy laser z puli grupy
            laser = lasers.getFirstExists(false);

            if (laser) {
                laser.reset(xx, yy);
                laser.body.velocity.y -= 400;
                bulletTime = this.time.now + 200;

            }
        }
    },

    createAliens: function() {
        // tworzymy obcych funkcja for rozmieszczając ich w równych odstepach od lewego rogu ekranu
        zeroAliens = false;
        for (var i = 0; i < 2; i++) {
            for (var x = 0; x < 4; x++) {
                var alien = aliens.create(x * 150, i * 150, 'ufo');
                alien.body.moves = false;
            }

        }
        aliens.y = 40;
        var ruch = this.add.tween(aliens).to({ x: 260 }, 3000, Phaser.Easing.Linear.None, true, 0, 1000, true);

    },
    //kolizja z obcymi
    colisionFunc: function(laser, alien) {
        laser.kill();
        alien.kill();

        score += 50;
        scoreText.text = scoreString + score;

        if (aliens.countLiving() == 0) {
            zeroAliens = true;
        }

    },
    //kolizja z graczem
    colisionGracz: function(ufoLaser, gracz) {
        ufoLaser.kill();
        life -= 25;
        lifeText.text = lifeString + life + procent;
    },
    //strzal obcych
    ufoFire: function() {

        ufoLaser = ufoLasers.getFirstExists(false);

        livingUfo.length = 0;

        aliens.forEachAlive(function(alien) {
            livingUfo.push(alien);
        });

        if (ufoLaser && livingUfo.length > 0) {

            var random = this.rnd.integerInRange(0, livingUfo.length - 1);

            // randomly select one of them
            var shooter = livingUfo[random];
            // And fire the bullet from this enemy
            ufoLaser.reset(shooter.body.x + 25, shooter.body.y + 50);

            ufoLaser.body.velocity.y += 400;
            firingTimer = this.time.now + 1000;
        }

    },
    update: function() {

        back2.tilePosition.y += 4;
        xx = gracz.body.x + 37;
        yy = gracz.body.y - 46;


        if (zeroAliens) {
            this.createAliens();
        }

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
            zeroAliens = true;
        }

        if (gracz.body.x <= 0) gracz.body.x = 1;
        else if (gracz.body.x >= 700) gracz.body.x = 699;

        if (life == 0) {
            alert("Przegrałeś ! Uzyskałeś " + score + " punktów :)");
            this.state.start('Menu');
            zeroAliens = true;
        }
        if (this.time.now > firingTimer) {
            this.ufoFire();
        }


        this.physics.arcade.overlap(lasers, aliens, this.colisionFunc, null, this);
        this.physics.arcade.overlap(ufoLaser, gracz, this.colisionGracz, null, this);
    }
};