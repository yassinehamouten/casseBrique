$(document).on('ready',function(){
	
	var longBrique = 50; // Longueur d'une brique
	var hautBrique = 30; // Hauteur d'une brique
	
	var listeBriques = [
	[1,1],
	[1,2],
	[1,4],
	[1,5],
	[2,1]
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
			console.log('x = ' + (listeBriques[i][0]-1)*longBrique + ' / Y = ' + (listeBriques[i][1]-1)*hautBrique);
		}
	}
	
}); 
