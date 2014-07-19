// the game state itself
// OPTIONS (basic instructors for how to build out the game):
//   - containerId - container that the game should be placed in - default: body
//   - width - width of the snake pit - default: 15
//   - height - height of the snake pit - default: 15
function Game(options) {
	this.containerId = options.containerId;
	GuiElement.call(this, this.fetchContainer(options.containerId), 'div', 'sk-game', 'init');

	this.score = 0;
	this.gameTimer = undefined;
	this.paused = null;
	this.started = false;

	var width = options.width || 15;
	var height = options.height || 15;

	//make the pit (starts out hidden due to game's 'init' class)
	this.pit = new Pit(this, width, height);

	//make the settings
	this.settings = new Settings(this);

	//make the game state (start/stop/pause/restart) button
	this.stateBtn = new GameStateBtn(this);	
}
Game.prototype = Object.create(GuiElement.prototype);
Game.prototype.constructor = Game;

Game.prototype.fetchContainer = function(containerId) {
	var container;

	if (typeof containerId === 'undefined') {
		container = document.body;
	} else {
		container = document.getElementById(containerId);
		if (container === null) {
			console.warn('The container ID provided to create snake was undefined.  Appending directly to <body> instead.');
			container = document.body;
		}
	}

	return container;
};

Game.prototype.getPit = function() {
	return this.pit;
};

Game.prototype.getSettings = function() {
	return this.settings;
};

Game.prototype.getStateBtn = function() {
	return this.stateBtn;
};

//allow setting of apple count programatically
Game.prototype.setAppleCount = function(count) {
	var count = parseInt(count);
	if (!isNaN(count)){
		this.appleCount = count;
	} else {
		throw 'Attempted to set Apple count to NaN value';
	}
};
Game.prototype.getAppleCount = function() {
	return parseInt(this.getSettings().getSetting('appleCount'));
};

//allow setting of speed / difficulty / overall fun-ness programatically
Game.prototype.setDelay = function() {

	switch (this.getSpeed()) {
		case 'slow':
			this.delay = 300;
			break;
		case 'fast':
			this.delay = 100;
			break;
		default:
			this.delay = 200;
			this.getSettings().setSetting('speed','medium');
	}
};
Game.prototype.getSpeed = function() {
	return this.getSettings().getSetting('speed');
};

//how long does it take for each "step" of the game to pass
Game.prototype.getDelay = function() {
	return this.delay;
};

//start the game
Game.prototype.start = function() {
	//the game can only be started once.  after that it's 'pause' and 'resume'
	if (!this.started) {

		this.paused = false;
		//removes the 'init' class (the only class added to the game element)
		this.getElem().className = '';
		this.getSettings().hide();

		this.setDelay();

		//TODO countdown timer for game start... 3-2-1

		//randomly place the apple(s) in unoccupied spaces
		for (var a = 0; a < this.getAppleCount(); a++) {
			this.getPit().getAvailSpace().setOccupant(new Apple());
		}

		//create closure so that snake and game can be used in the below fxn definitions
		var snake = this.getPit().getSnake();
		var game = this;	

		//every tick of the game timer, this function will execute
		this.advanceFxn = function() {
			snake.slither();
		};

		//supports up-left-down-right as well as WASD
		//since event.which is normalized by jQuery, this is somewhat of a jQuery dependency
		this.controlHandlerFxn = function(evt) {
			switch (evt.which) {

				case 37: //left arrow
				case 65: //A
					snake.turn('W');
					break;

				case 38: //up arrow
				case 87: //W
					snake.turn('N');
					break;

				case 39: //right arrow
				case 68: //D
					//right
					snake.turn('E');
					break;

				case 40: //down arrow
				case 83: //S
					snake.turn('S');
					break;

				case 32:
					//spacebar
					if (game.isPaused()) {
						game.resume();
					} else {
						game.pause();
					}
					break;
			}
		};

		//bind keydown to the constrol handler
		document.addEventListener('keydown', this.controlHandlerFxn);

		//start a timer running the advance function
		this.gameTimer = window.setInterval(this.advanceFxn, this.getDelay());

		//turn the game state button into a pause button
		this.getStateBtn().makePauseBtn();

		//all done, we're started up
		this.started = true;

	} else {
		throw 'Game can only be started once!  Did you mean to use "Game.resume()" ?';
	}
	
	return this;
};

Game.prototype.restart = function() {
	throw 'not yet implemented';
};

//suspend the game state
Game.prototype.pause = function() {
	//stop the game timer
	window.clearInterval(this.gameTimer);
	this.gameTimer = undefined;
	this.getStateBtn().makeResumeBtn();
	this.paused = true;

	return this;
};

//resume the game from paused state
Game.prototype.resume = function() {
	if (this.started && this.paused) {

		this.gameTimer = window.setInterval(this.advanceFxn, this.getDelay());
		this.getStateBtn().makePauseBtn();
		this.paused = false;

	} else {
		alert('Cannot resume a game that has not been started and paused yet!');
	}

	return this;
};

//check to see if the game is paused
Game.prototype.isPaused = function() {
	return this.paused;
};

//game over
Game.prototype.end = function() {
	this.pause();
	//this.getStateBtn().makeRestartBtn();

	alert('Game over! Your score: ' + this.getScore());

	window.location.reload();

};

//add points to the player's score
Game.prototype.addScore = function(pts) {
	var points = parseInt(pts);

	if (!isNaN(pts)) {
		this.score += pts;
	} else {
		console.warn('Invalid points value was not added to score');
	}
	
};
Game.prototype.getScore = function() {
	return this.score;
};