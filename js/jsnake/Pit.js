define(['GuiElement', 'Column', 'Space', 'Snake'],
	function(GuiElement, Column, Space,   Snake) {

		// the Snake Pit (game board, a matrix of spaces)
		function Pit(game, width, height) {
			GuiElement.call(this, game, 'div', 'sk-pit', null);

			this.width = width;
			this.height = height;
			this.cols = new Array();
			this.emptySpaces = new Array();

			//create columns and fill them with spaces
			for (var x = 0; x < this.width; x++) {
				//create the column
				var col = new Column(this);
				this.cols.push(col);

				for (var y = 0; y < this.height; y++) {
					//create the actual space
					var space = new Space(col, x, y);
					col.addSpace(space);
					this.emptySpaces.push(space);
				}
			}

			this.snake = new Snake(this);

		}
		Pit.prototype = Object.create(GuiElement.prototype);
		Pit.prototype.constructor = Pit;

		Pit.prototype.getGame = function() {
			return this.getParent();
		}

		Pit.prototype.getWidth = function() {
			return this.width;
		};
		Pit.prototype.getHeight = function() {
			return this.height;
		};

		Pit.prototype.getSnake = function() {
			return this.snake;
		};

		Pit.prototype.getCol = function(x) {
			return this.cols[x];
		};

		//perform a space lookup based on its x/y position
		Pit.prototype.getSpace = function(x, y) {
			//handle wrapping around if the requested space is out of bounds
			if (x >= this.width) { //X wrapping
				x = 0;
			} else if (x < 0) {
				x = this.width - 1;
			}
			if (y >= this.height) { //Y wrapping
				y = 0;
			} else if (y < 0) {
				y = this.height - 1;
			}

			//actually retrieve the space
			return this.getCol(x).getSpace(y);
		};
		//get the center of the board (or one short of it if odd)
		Pit.prototype.getCenter = function() {
			return this.getSpace(
				Math.floor(this.width/2), 
				Math.floor(this.width/2)
			);
		};

		//get the array of available/empty spaces
		Pit.prototype.getAllAvailSpaces = function() {
			return this.emptySpaces;
		};

		//find an empty space
		Pit.prototype.getAvailSpace = function() {

			if (this.getAllAvailSpaces().length > 0) {
				var index = Math.floor(Math.random() * this.getAllAvailSpaces().length);
				return this.getAllAvailSpaces()[index];
			} else {
				this.getGame().end();
			}	
		};

		//make a space available (so that an apple can be placed there)
		Pit.prototype.makeSpaceAvail = function(space) {
			if (space instanceof Space) {
				var spaceIndex = this.getAllAvailSpaces().indexOf(space);

				if (spaceIndex === -1) {
					this.getAllAvailSpaces().push(space);
				} else {
					console.log('Attempted to make available a space that was already designated as available.  Call ignored.');
				}
			} else {
				throw 'Could not make space available, valid space not passed';
			}

			return this;
		};
		//make a space unavailable (so that no apple can be placed there)
		Pit.prototype.makeSpaceUnavail = function(space) {
			if (space instanceof Space) {
				var spaceIndex = this.getAllAvailSpaces().indexOf(space);

				if (spaceIndex > -1) {
					this.getAllAvailSpaces().splice(spaceIndex, 1);
				} else {
					console.log('Attempted to make unavailable a space that was not available in the first place.  Call ignored.');
				}
			} else {
				throw 'Could not make space unavailable, valid space not passed';
			}

			return this;
		}

		return Pit;
	}
);