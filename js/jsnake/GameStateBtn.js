define(['GuiElement'],
	function(GuiElement) {

		//this GuiElement controls the starting, pausing, and resuming of the game
		function GameStateBtn(game) {
			GuiElement.call(this, game, 'button', 'sk-game-state-btn', null);
			this.getElem().setAttribute('type', 'button');

			this.startBtnClick = function() {
				game.start();
			};

			this.pauseBtnClick = function() {
				game.pause();
			};

			this.resumeBtnClick = function() {
				game.resume();
			};

			this.restartBtnClick = function() {
				game.restart();
			};

			//start button initially
			this.makeStartBtn();
		}
		GameStateBtn.prototype = Object.create(GuiElement.prototype);
		GameStateBtn.prototype.constructor = GameStateBtn;

		GameStateBtn.prototype.makeStartBtn = function() {
			this.getElem().innerHTML = 'Start';
			this.getElem().onclick = this.startBtnClick;
		};

		GameStateBtn.prototype.makePauseBtn = function() {
			this.getElem().innerHTML = 'Pause';
			this.getElem().onclick = this.pauseBtnClick;
		};

		GameStateBtn.prototype.makeResumeBtn = function() {
			this.getElem().innerHTML = 'Resume';
			this.getElem().onclick = this.resumeBtnClick;
		};

		GameStateBtn.prototype.makeRestartBtn = function() {
			this.getElem().innerHTML = 'Play Again';
			this.getElem().onclick = this.restartBtnClick;
		};

		return GameStateBtn;
	}
);