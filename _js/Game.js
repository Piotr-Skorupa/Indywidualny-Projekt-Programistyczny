gra.Games = function(game) {};
gra.Games.prototype = {
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);

        //dzwieki

        wybuch = this.add.audio('wybuch');
        lasergracz = this.add.audio('lasergracz');
        laserufo = this.add.audio('laserufo');
        zdrowieS = this.add.audio('zdrowie1');
        zamianaS = this.add.audio('zamiana1');
        full = this.add.audio('full');
        au = this.add.audio('au');


        if (gamenuta == 0) {
            gamenuta = this.add.audio('gamenuta');
            gamenuta.loopFull(0.5);
        }
        //zmienne
        score = 0;
        attack = 1; //atak gracza

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

        lasers2 = this.add.group();
        lasers2.enableBody = true;
        lasers2.physicsBodyType = Phaser.Physics.ARCADE;
        lasers2.createMultiple(30, 'laser2');
        lasers2.setAll('outOfBoundsKill', true);
        lasers2.setAll('checkWorldBounds', true);

        ufoLasers = this.add.group();
        ufoLasers.enableBody = true;
        ufoLasers.physicsBodyType = Phaser.Physics.ARCADE;
        ufoLasers.createMultiple(30, 'laser_ufo');
        ufoLasers.setAll('outOfBoundsKill', true);
        ufoLasers.setAll('checkWorldBounds', true);

        aliens = this.add.group();
        aliens.enableBody = true;
        aliens.physicsBodyType = Phaser.Physics.ARCADE;

        this.createAliens();
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
            if (attack == 1) {
                laser = lasers.getFirstExists(false);

                if (laser) {
                    laser.reset(xx, yy);
                    laser.body.velocity.y -= 400;
                    bulletTime = this.time.now + 200;
                    lasergracz.play();

                }
            } else if (attack == 2) {
                laser2 = lasers2.getFirstExists(false);

                if (laser2) {
                    laser2.reset(xx, yy);
                    laser2.body.velocity.y -= 500;
                    bulletTime = this.time.now + 200;
                    lasergracz.play();

                }

            }
        }
    },
    //losujemy nagrode
    los: function() {
        losowanie = this.rnd.integerInRange(0, 4);
        var xo = this.rnd.integerInRange(0, 770);
        if (losowanie == 0 || losowanie == 4) {
            bomba = this.add.sprite(xo, 10, 'bomba');
            bomba.enableBody = true;
            this.physics.enable(bomba, Phaser.Physics.ARCADE);
            bomba.body.velocity.y += 300;

        } else if (losowanie == 1) {
            zdrowie = this.add.sprite(xo, 10, 'zdrowie');
            zdrowie.enableBody = true;
            this.physics.enable(zdrowie, Phaser.Physics.ARCADE);
            zdrowie.body.velocity.y += 300;

        } else if (losowanie == 2 || losowanie == 3) {
            zamiana = this.add.sprite(xo, 10, 'zamiana');
            zamiana.enableBody = true;
            this.physics.enable(zamiana, Phaser.Physics.ARCADE);
            zamiana.body.velocity.y += 300;

        }
        loteryTime = this.time.now + 10000;
    },
    //odtwarzamy obcych
    wskrzeszenie: function() {
        aliens.callAll('revive');
        zeroAliens = false;

    },
    //kolizja z bombami
    colisionBomba: function(bomba, gracz) {
        bomba.kill();
        life -= 25;
        lifeText.text = lifeString + life + procent;
        wybuch.play();
        au.play();
    },
    //kolizja z dodatkowym życiem
    colisionZdrowie: function(zdrowie, gracz) {
        zdrowie.kill();
        if (life < 100) {
            life += 25;
            lifeText.text = lifeString + life + procent;
            zdrowieS.play();
        } else full.play();

    },
    //kolizja z zamiana broni
    colisionZamiana: function(zamiana, gracz) {
        zamiana.kill();
        zamianaS.play();

        if (attack == 1) {
            attack = 2;
        } else if (attack == 2) {
            attack = 1;
        }


    },
    // tworzymy obcych funkcja for rozmieszczając ich w równych odstepach od lewego rogu ekranu
    createAliens: function() {

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
        wybuch.play();

        score += 50;
        scoreText.text = scoreString + score;

        if (aliens.countLiving() == 0) {
            zeroAliens = true;

        }

    },
    //kolizja z obcymi dla drugiego laseru
    colisionFunc2: function(laser2, alien) {
        laser2.kill();
        alien.kill();
        wybuch.play();

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
        au.play();
    },
    //strzal obcych
    ufoFire: function() {

        laserufo.play();
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

        if (czy_nuta2 == false) {
            gamenuta.pause();
            czy_nuta2 = true;
        } else if (czy_nuta2 == true) {
            gamenuta.resume();
        }



        back2.tilePosition.y += 4;
        xx = gracz.body.x + 37;
        yy = gracz.body.y - 46;


        if (zeroAliens) {
            this.wskrzeszenie();
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
            czy_nuta = false;
            gamenuta.pause();
        }

        if (gracz.body.x <= 0) gracz.body.x = 1;
        else if (gracz.body.x >= 700) gracz.body.x = 699;

        if (life == 0) {
            alert("Przegrałeś ! Uzyskałeś " + score + " punktów :)");
            this.state.start('Menu');
            zeroAliens = true;
            czy_nuta = false;
            gamenuta.pause();
            wybuch.play();

        }
        if (this.time.now > firingTimer) {
            this.ufoFire();
        }

        if (this.time.now > loteryTime) {
            this.los();
        }

        this.physics.arcade.overlap(lasers, aliens, this.colisionFunc, null, this);
        this.physics.arcade.overlap(lasers2, aliens, this.colisionFunc2, null, this);
        this.physics.arcade.overlap(ufoLaser, gracz, this.colisionGracz, null, this);
        this.physics.arcade.overlap(zdrowie, gracz, this.colisionZdrowie, null, this);
        this.physics.arcade.overlap(bomba, gracz, this.colisionBomba, null, this);
        this.physics.arcade.overlap(zamiana, gracz, this.colisionZamiana, null, this);
    }
};