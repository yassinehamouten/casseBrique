$(document).on('ready',function(){
	
	var longBrique = 50; // Longueur d'une brique
	var hautBrique = 30; // Hauteur d'une brique
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var barre;
    var balle;
	var score=0;
	var timerRefresh; 
	var direction;
	
	
	var level = [
	[0,0,'#333333',1],
	[0,1,'#333333',1],
	[0,3,'#333333',1],
	[0,4,'#333333',1],
	[1,0,'#FF0000',5]
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

	var Brique = function(x,y,color,pouvoir)
	{
		this.x = x;
		this.y = y;
		this.lon = 50;
		this.lar = 30;
		this.couleur = color;
		this.pouvoir = null;	
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
			var x = (level[i][1])*longBrique;
			var y = (level[i][0])*hautBrique;
			var couleur = level[i][2];
			var pouvoir = 'test';
			var b = new Brique(x,y,couleur,pouvoir);
			listeBriques.push(b);
		}
        balle = new creationBalle(canvas.width/2,canvas.height-50);
		barre = new creationBarre();  
		timerRefresh = setInterval(refresh, 5);
		window.addEventListener("keydown", deplacer, false);

	}
	
	function deplacer(e){ 
		if(e.keyCode == 37 || e.keyCode == 39)  
			direction = e.keyCode; 
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
        ctx.stroke();
        
	}
	function refresh(){  
		
	}  

}); 
