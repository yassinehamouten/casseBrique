$(document).on('ready', function () {

    var longBrique = 48; // Longueur d'une brique
    var hautBrique = 30; // Hauteur d'une brique
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var barre;
    var balle;
    var score = 0;
    var timerRefresh;
    var direction;
    var vitesse = 2;
    var pause = 0;
    var vie = 3;
    var timer = 0;
    var monChrono; 
    var listeBriques = [];
    var listeBriquesDebut = [];

    swal({
            title: "Initialisation du jeu",
            text: "Entre le code que l'éditeur t'a fourni <a href='editeur.html'> ici </a> :",  
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Le code ici...",
            html: true
        },
        function(inputValue){
            if (inputValue === false || inputValue === "") 
            {
                var level = JSON.parse("[[0, 0, \"#333333\", 1],[0, 1, \"#333333\", 1],[0, 2, \"#333333\", 1],[0, 3, \"#333333\", 1],[0, 4, \"#333333\", 1],[0, 5, \"#333333\", 1],[0, 6, \"#333333\", 1],[0, 7, \"#333333\", 1],[0, 8, \"#333333\", 1],[0, 9, \"#333333\", 1],[0, 10, \"#333333\", 1],[0, 11, \"#333333\", 1],[0, 12, \"#333333\", 1],[0, 13, \"#333333\", 1],[0, 14, \"#333333\", 1],[0, 15, \"#333333\", 1],[0, 16, \"#333333\", 1],[0, 17, \"#333333\", 1],[0, 18, \"#333333\", 1],[0, 19, \"#333333\", 1],[1, 0, \"#555555\", 1],[1, 1, \"#555555\", 1],[1, 2, \"#555555\", 1],[1, 3, \"#555555\", 1],[1, 4, \"#555555\", 1],[1, 5, \"#555555\", 1],[1, 6, \"#555555\", 1],[1, 7, \"#555555\", 1],[1, 8, \"#555555\", 1],[1, 9, \"#555555\", 1],[1, 10, \"#555555\", 1],[1, 11, \"#555555\", 1],[1, 12, \"#555555\", 1],[1, 13, \"#555555\", 1],[1, 14, \"#555555\", 1],[1, 15, \"#555555\", 1],[1, 16, \"#555555\", 1],[1, 17, \"#555555\", 1],[1, 18, \"#555555\", 1],[1, 19, \"#555555\", 1],[2, 0, \"#777777\", 1],[2, 1, \"#777777\", 1],[2, 2, \"#777777\", 1],       [2, 3, \"#777777\", 1],[2, 4, \"#777777\", 1],[2, 5, \"#777777\", 1],[2, 6, \"#777777\", 1],[2, 7, \"#777777\", 1],[2, 8, \"#777777\", 1],[2, 9, \"#777777\", 1],[2, 10, \"#777777\", 1],[2, 11, \"#777777\", 1],[2, 12, \"#777777\", 1],[2, 13, \"#777777\", 1],[2, 14, \"#777777\", 1],[2, 15, \"#777777\", 1],[2, 16, \"#777777\", 1],[2, 17, \"#777777\", 1],[2, 18, \"#777777\", 1],[2, 19, \"#777777\", 1]]");
            }
            else
            {
                var level = JSON.parse(inputValue);
            }       

            for (i in level) 
            {
                var x = (level[i][1]) * longBrique + (level[i][1] * 2);
                var y = (level[i][0]) * hautBrique + (level[i][0] * 2);
                var couleur = level[i][2];
                var pouvoir = 'test';
                var scoreB = 1;
                var b = new Brique(x, y, couleur, pouvoir, scoreB);
                listeBriques.push(b); 
            }
			listeBriquesDebut = listeBriques.slice(0);
	
            $( "#start" ).trigger( "click" );
            swal.close();
        });
     

    var creationBalle = function (x, y) {
        this.x = x;
        this.y = y;
        this.radius = 10;
        this.couleur = "#FF00000";
        this.vitesseX = 0;
        this.vitesseY = 0;
        this.direction_x = 0;
        this.direction_y = 0;
    }

    var Brique = function (x, y, color, pouvoir, scoreB) {
        this.x = x;
        this.y = y;
        this.lon = 50;
        this.lar = 30;
        this.couleur = color;
        this.pouvoir = null;
        this.scoreB = scoreB;
    }

    var creationBarre = function () {
        this.largeur = 140;
        this.hauteur = 10;
        this.x = canvas.width / 2 - this.largeur / 2;
        this.y = canvas.height - this.hauteur - 3;
        this.couleur = '#333333';
    }


    function initialize() {
            score = 0;
            pause = 0;
            timer = 0;            
            monChrono = setInterval(chrono,1000);
            
            balle = new creationBalle(canvas.width / 2, canvas.height - 50);
            barre = new creationBarre();
            timerRefresh = setInterval(refresh, 5);
            window.addEventListener("keydown", deplacer, false);
            window.addEventListener("keyup", stop, false);
            
    }
    
    function chrono(){
		timer++;
	}

    function deplacer(e) {
        if (e.keyCode == 37 || e.keyCode == 39)
            direction = e.keyCode;
    }

    function stop() {
        direction = 0;
    }

    function drawLevel() {
        for (i in listeBriques) {
            x = listeBriques[i].x;
            y = listeBriques[i].y;
            scoreB = listeBriques[i].scoreB;
            couleur = listeBriques[i].couleur;;

            //## gestion collision brique ##//

            point_haut = balle.y - (balle.radius/2);
            point_bas = balle.y + (balle.radius/2);
            point_gauche = balle.x - (balle.radius/2);
            point_droit = balle.x + (balle.radius/2);

            //touche brique partie haute
            if (point_bas == y && ((point_gauche>=x && point_gauche<=x+longBrique) || (point_droit>=x && point_droit<=x+longBrique))) {
                listeBriques.splice(i, 1);
                score += scoreB;
                balle.direction_y = balle.direction_y * (-1);
            }
            //touche brique partie gauche
            if (point_droit==x && ((point_haut>=y && point_haut<=y+hautBrique)||(point_bas>=y && point_bas<=y+hautBrique))) {
                listeBriques.splice(i, 1);
                score += scoreB;
                balle.direction_x = balle.direction_x * (-1);
            }
            //touche brique partie droite
            if (point_gauche==x+longBrique && ((point_haut>=y && point_haut<=y+hautBrique)||(point_bas>=y && point_bas<=y+hautBrique))) {
                listeBriques.splice(i, 1);
                score += scoreB;
                balle.direction_x = balle.direction_x * (-1);
            }
            //touche brique partie basse
            if (point_haut == y+hautBrique && ((point_gauche>=x && point_gauche<=x+longBrique) || (point_droit>=x && point_droit<=x+longBrique))) {
                listeBriques.splice(i, 1);
                score += scoreB;
                balle.direction_y = balle.direction_y * (-1);
            }

            //## Fin gestion collision brique ##//

            //Else on affiche
            else {
                ctx.fillStyle = couleur;
                ctx.fillRect(x, y, longBrique, hautBrique);
            }
            if (listeBriques.length < 1) {
                win();
            }

        }

        ctx.fillStyle = (barre.couleur);
        ctx.fillRect(barre.x, barre.y, barre.largeur, barre.hauteur);

        ctx.fillStyle = (balle.couleur);
        ctx.arc(balle.x, balle.y, balle.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    function refresh() {

        //ctx.clearRect(barre.x,barre.y,barre.largeur,barre.hauteur);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //Gestion de la barre
        if (direction == 37 && barre.x >= 0) // Gauche
            barre.x -= vitesse;
        else if (direction == 39 && barre.x + barre.largeur <= canvas.width) // Droite
            barre.x += vitesse;
        ctx.fillRect(barre.x, barre.y, barre.largeur, barre.hauteur);
        //Fin de la gestion de la barre

        //## gestion de la balle ##//

        // gestion de l'aleatoire du debut
        if (balle.direction_x == 0)
            balle.direction_x = -1;
        if (balle.direction_y == 0)
            balle.direction_y = -1;

        if (balle.x + balle.radius >= canvas.width) {
            //si la balle touche a droite
            balle.direction_x = balle.direction_x * (-1);
            balle.x = balle.x + balle.direction_x;
        } else {
            if (balle.x - balle.radius <= 0) {
                //si la balle touche a gauche
                balle.direction_x = balle.direction_x * (-1);
                balle.x = balle.x + balle.direction_x;
            } else {
                balle.x = balle.x + balle.direction_x;
            }
        }

        if (balle.y + balle.radius >= canvas.height) {
            //si la balle touche en bas
            //if (balle.x >= barre.x -balle.radius && balle.x <= barre.x + barre.largeur + balle.radius && balle.y > barre.y - balle.radius + 2 && balle.y < barre.y + barre.hauteur - 5) {
            gameOver();
        } else {
            if (balle.y - balle.radius <= 0) {
                //si la balle touche en haut
                balle.direction_y = balle.direction_y * (-1);
                balle.y = balle.y + balle.direction_y;
            } else {
                balle.y = balle.y + balle.direction_y;
            }
        }

        // si la balle touche la barre
        if(balle.y+(balle.radius/2) >= barre.y && balle.x>=barre.x && balle.x<=barre.x+barre.largeur){

            if(balle.x>=barre.x+barre.largeur/2){
                //si la balle touche la partie gauche de la barre
                balle.direction_y = ((balle.x-barre.largeur/2)*100/((barre.x+barre.largeur)/2))/100;
            }
            balle.direction_y = balle.direction_y * (-1);
        }

        ctx.beginPath();
        ctx.fillStyle = (balle.couleur);
        ctx.arc(balle.x, balle.y, balle.radius, 0, 2 * Math.PI);
        ctx.fill();

        //## Fin gestion de la balle ##//

        drawLevel();

        //Gestion du score, vie et timer
        $('#score2').text(score);
        $('#vie2').text(vie);
        $('#timer2').text(timer);
        if(timer>=60){
			vie=0;
			gameOver();
		}
        //Fin de la gestion du score, vie et timer
    }

    function gameOver() {
        if (vie > 1) {
            vie--;
            balle.x = canvas.width / 2;
            balle.y = canvas.height - 2*balle.radius;
            barre.x = canvas.width / 2 - barre.largeur / 2;
            barre.y = canvas.height - barre.hauteur - 3;
            balle.direction_x = 0;
            balle.direction_y = 0;
        }
        else {
            clearInterval(timerRefresh);
            clearInterval(monChrono);
            window.removeEventListener("keydown", deplacer, false);
            window.removeEventListener("keyup", stop, false);
            $('#message').text(" - Perdu - ");
            swal("Perdu ! ","T'es carrement mauvais !", "error");            
			$('#pause').hide();
        }

    }

    function win() {
        clearInterval(timerRefresh);
        clearInterval(monChrono);
        window.removeEventListener("keydown", deplacer, false);
        window.removeEventListener("keyup", stop, false);
        $('#message').text(" - BRAVO - ");
        swal("Bravo !","VICTOIRE !!!!", "success");
        $('#pause').hide();
    }

    $(document).on('click', '#start', function (e) {
        e.preventDefault();

        $('#score1').show();
        $('#vie1').show();
        $('#restart').show();
        $('#pause').show();
        $('#start').hide();
		$('.timer1').show();
		$('#difficulte').show();
        initialize();
        drawLevel();

    });

    $(document).on('click', '#restart', function (e) {
        //Restart
        e.preventDefault();
        
        clearInterval(monChrono);
		timer=0;

        $('#message').text("");
        clearInterval(timerRefresh);
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
         
        listeBriques = listeBriquesDebut.slice(0); 		
        initialize();
        drawLevel();
        $('#pause').show();
    });

    $(document).on('click', '#pause', function (e) {
        e.preventDefault();

        //Mettre en pause
        if (pause == 0) {
            pause = 1;
            clearInterval(monChrono);
            clearInterval(timerRefresh);
            window.removeEventListener("keydown", deplacer, false);
            window.removeEventListener("keyup", stop, false);
            $('#message').text(" - En pause - ");
        }
        else {//Revenir en game
            pause = 0;
            monChrono = setInterval(chrono,1000);
            timerRefresh = setInterval(refresh, 5);
            window.addEventListener("keydown", deplacer, false);
            window.addEventListener("keyup", stop, false);
            $('#message').text("");
        }

    });
    
    /* Diificulte */
    
        $(document).on('click', '#facile', function (e) {
        e.preventDefault();
        
        clearInterval(monChrono);
		vitesse = 2;
		vie = 3;
		timer=0;

        $('#message').text("");
        clearInterval(timerRefresh);
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
         
        listeBriques = listeBriquesDebut.slice(0); 		
        initialize();
        drawLevel();
        $('#pause').show();
    });
    
        $(document).on('click', '#moyen', function (e) {
        e.preventDefault();
        
        clearInterval(monChrono);
        vitesse = 5;
		vie = 2;		
		timer=0;

        $('#message').text("");
        clearInterval(timerRefresh);
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
         
        listeBriques = listeBriquesDebut.slice(0); 		
        initialize();
        drawLevel();
        $('#pause').show();
    });
    
        $(document).on('click', '#difficile', function (e) {
        e.preventDefault();
        
        clearInterval(monChrono);
        vitesse = 15;
		vie = 1;		
		timer=0;  

        $('#message').text("");
        clearInterval(timerRefresh);
        ctx.clearRect(0, 0, canvas.width, canvas.height);        
         
        listeBriques = listeBriquesDebut.slice(0); 		
        initialize();
        drawLevel();
        $('#pause').show();
    });

}); 


