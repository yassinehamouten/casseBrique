$(document).on('ready',function(){
	
	var longBrique = 50; // Longueur d'une brique
	var hautBrique = 30; // Hauteur d'une brique
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	var listeBriques = [
	[1,1,'#000000'],
	[1,2,'#13DD32'],
	[1,4,'#93B0D3'],
	[1,5,'#2201BC'],
	[2,1,'#1CDDFF']
	];
	
	drawLevel();

	var balle = function(x,y)
	{
		this.x = x;
		this.y = y;
		this.radius = 10;
		this.couleur = "#000000";
		this.vitesseX = 0;
		this.vitesseY = 0;
	}

	var brique = function(x,y,color,pouvoir)
	{
		this.x = x;
		this.y = y;
		this.lon = 50;
		this.lar = 30;
		this.couleur = color;
		this.pouvoir = null;
	}

	function drawLevel()
	{
		for(i in listeBriques)
		{
			x = (listeBriques[i][1]-1)*longBrique;
			y = (listeBriques[i][0]-1)*hautBrique;
			ctx.fillStyle = (listeBriques[i][2]);
			ctx.fillRect(x,y,longBrique,hautBrique);
		}
	}
	
}); 
