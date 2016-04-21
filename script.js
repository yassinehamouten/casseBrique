$(document).on('ready',function(){
	
	var longBrique = 48; // Longueur d'une brique
	var hautBrique = 30; // Hauteur d'une brique
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var barre;
    var balle;
	var score=0;
	var timerRefresh; 
	var direction;
	var vitesse = 2; 
	
	var level = [
	[0,0,'#333333',1],
	[0,1,'#333333',1],
	[0,2,'#333333',1],
	[0,3,'#333333',1],
	[0,4,'#333333',1],
	[0,5,'#333333',1],
	[0,6,'#333333',1],
	[0,7,'#333333',1],
	[0,8,'#333333',1],
	[0,9,'#333333',1],
	[0,10,'#333333',1],
	[0,11,'#333333',1],
	[0,12,'#333333',1],
	[0,13,'#333333',1],
	[0,14,'#333333',1],
	[0,15,'#333333',1],
	[0,16,'#333333',1],
	[0,17,'#333333',1],
	[0,18,'#333333',1],
	[0,19,'#333333',1],
	[1,0,'#555555',1],
	[1,1,'#555555',1],
	[1,2,'#555555',1],
	[1,3,'#555555',1],
	[1,4,'#555555',1],
	[1,5,'#555555',1],
	[1,6,'#555555',1],
	[1,7,'#555555',1],
	[1,8,'#555555',1],
	[1,9,'#555555',1],
	[1,10,'#555555',1],
	[1,11,'#555555',1],
	[1,12,'#555555',1],
	[1,13,'#555555',1],
	[1,14,'#555555',1],
	[1,15,'#555555',1],
	[1,16,'#555555',1],
	[1,17,'#555555',1],
	[1,18,'#555555',1],
	[1,19,'#555555',1],

	[2,0,'#777777',1],
	[2,1,'#777777',1],
	[2,2,'#777777',1],
	[2,3,'#777777',1],
	[2,4,'#777777',1],
	[2,5,'#777777',1],
	[2,6,'#777777',1],
	[2,7,'#777777',1],
	[2,8,'#777777',1],
	[2,9,'#777777',1],
	[2,10,'#777777',1],
	[2,11,'#777777',1],
	[2,12,'#777777',1],
	[2,13,'#777777',1],
	[2,14,'#777777',1],
	[2,15,'#777777',1],
	[2,16,'#777777',1],
	[2,17,'#777777',1],
	[2,18,'#777777',1],
	[2,19,'#777777',1],

	];

	var listeBriques = []; 

	var creationBalle = function(x,y)
	{
		this.x = x;
		this.y = y;
		this.radius = 10;
		this.couleur = "#FF00000";
		this.vitesseX = 0;
		this.vitesseY = 0;
	}

	var Brique = function(x,y,color,pouvoir,score)
	{
		this.x = x;
		this.y = y;
		this.lon = 50;
		this.lar = 30;
		this.couleur = color;
		this.pouvoir = null;
		this.score = score;	
	}
	
	var creationBarre = function()
	{  
		this.largeur= 140;
		this.hauteur= 10;
		this.x = canvas.width/2-this.largeur/2;
		this.y = canvas.height-this.hauteur-3;
		this.couleur='#333333';
	}
	
	 
	initialize();
	drawLevel();
	console.log(listeBriques);
	
	function initialize()
	{
		for(i in level)
		{
			var x = (level[i][1])*longBrique + (level[i][1] * 2);
			var y = (level[i][0])*hautBrique + (level[i][0] * 2);
			var couleur = level[i][2];
			var pouvoir = 'test';
			var b = new Brique(x,y,couleur,pouvoir);
			listeBriques.push(b);
		}
        balle = new creationBalle(canvas.width/2,canvas.height-50);
		barre = new creationBarre();  
		timerRefresh = setInterval(refresh, 5);
		window.addEventListener("keydown", deplacer, false);
		window.addEventListener("keyup", stop, false);  
	}
	
	function deplacer(e){ 
		if(e.keyCode == 37 || e.keyCode == 39)  
			direction = e.keyCode; 
	}
		
	function stop(){  
		direction = 0;
	}

	function drawLevel()
	{
		for(i in listeBriques)
		{
			x = listeBriques[i].x;
			y = listeBriques[i].y;
			ctx.fillStyle = listeBriques[i].couleur;
			ctx.fillRect(x,y,longBrique,hautBrique);
		}

		ctx.fillStyle = (barre.couleur);
		ctx.fillRect(barre.x,barre.y,barre.largeur,barre.hauteur);

        ctx.fillStyle = (balle.couleur);
        ctx.arc(balle.x, balle.y, balle.radius, 0, 2 * Math.PI);
        ctx.fill();
	}
	function refresh(){  
		//Gestion de la barre
		ctx.clearRect(barre.x,barre.y,barre.largeur,barre.hauteur);
		if(direction == 37 && barre.x >= 0) // Gauche
			barre.x -= vitesse;
		else if(direction == 39 && barre.x+barre.largeur <= canvas.width) // Droite
			barre.x += vitesse;
		ctx.fillRect(barre.x,barre.y,barre.largeur,barre.hauteur);
		//Fin de la gestion de la barre
		
		//Gestion du score
		$('#score').text(score);
		//Fin de la gestion du score
	}  

}); 

$(document).on('click', '#start',function(e)
{
	e.preventDefault();
});
