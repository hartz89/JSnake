// the Snake Pit (game board, a 2D array of spaces)
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

//space lookups
Pit.prototype.getSpace = function(x, y) {
	//wrap around E <--> W
	if (x >= this.width) {
		x = 0;
	} else if (x < 0) {
		x = this.width - 1;
	}
	//wrap around N <--> S
	if (y >= this.height) {
		y = 0;
	} else if (y < 0) {
		y = this.height - 1;
	}

	return this.getCol(x).getSpace(y);
};
Pit.prototype.getCenter = function() {
	return this.getSpace(
		Math.floor(this.width/2), 
		Math.floor(this.width/2)
	);
};

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

//space availability (for apples)
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