//uses require.js
requirejs.config({
	baseUrl : 'js/jsnake',
	waitSeconds : 3
});

//require all of our game scripts and start it up
requirejs(['Game', '../domReady'], function(Game, domReady) {
	domReady(function() {
		new Game({
			width : 15,
			height : 15,
			containerId: 'gameContainer'
		});
	});
});