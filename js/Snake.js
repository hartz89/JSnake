// The Snake (a glorified LinkedList)
function Snake(pit) {
	Child.call(this, pit);

	this.head = undefined;
	this.direction = 'W'; //start moving west
	this.moveOffset = [-1, 0]; //start moving west
	this.lastMoveDirection = null;

	var pitCenter = this.getPit().getCenter();

	//build out the head and the trailing body
	var initSize = 5;
	this.head = new BodyPart(this, null);

	//initial positioning
	pitCenter.setOccupant(this.head);
	pitCenter.refreshUI();
	var prev = this.head;

	for (var i = 1; i < initSize; i++) {
		var newPart = new BodyPart(this, null);

		var space = this.getPit().getSpace(pitCenter.getX() + i, pitCenter.getY());
		//initial positioning
		space.setOccupant(newPart);

		//link the previous part to the new part
		prev.setNextPart(newPart);
		prev = newPart;
	}
}
Snake.prototype = Object.create(Child.prototype);
Snake.prototype.constructor = Snake;

Snake.prototype.getPit = function() {
	return this.getParent();
};

Snake.prototype.getHead = function() {
	return this.head;
};
Snake.prototype.setHead = function(part) {
	this.head = part;

};

Snake.prototype.getDirection = function() {
	return this.direction;
};
Snake.prototype.setDirection = function(dxn) {
	this.direction = dxn;

	return this;
};
Snake.prototype.getLastMoveDirection = function() {
	return this.lastMoveDirection;
};
Snake.prototype.setLastMoveDirection = function(dxn) {
	this.lastMoveDirection = dxn;

	return this;
};

Snake.prototype.getMoveXOffset = function() {
	return this.moveOffset[0];
};
Snake.prototype.getMoveYOffset = function() {
	return this.moveOffset[1];
};
Snake.prototype.setMoveOffset = function(offset) {
	this.moveOffset = offset;

	return this;
};

Snake.prototype.turn = function(dxn) {
	dxn = dxn.toUpperCase();
	var prevDxn = this.getLastMoveDirection();
	if (dxn !== prevDxn) {
		//make sure the sanke isn't trying to double back on itself
		if ( prevDxn !== null &&
			(  dxn === 'N' && prevDxn === 'S'
			|| dxn === 'S' && prevDxn === 'N'
			|| dxn === 'W' && prevDxn === 'E'
			|| dxn === 'E' && prevDxn === 'W')) {

			//console.trace('prevented snake from doubling back on itself.');
		} else {
			//translate direction to an offset
			switch (dxn) {
				case 'N':
					this.setMoveOffset([0, -1]);
					break;
				case 'S':
					this.setMoveOffset([0, 1]);
					break;
				case 'E':
					this.setMoveOffset([1, 0]);
					break;
				case 'W':
					this.setMoveOffset([-1, 0]);
					break;
				default:
					throw 'Snake cannot turn in direction "' + dxn + '"';
			}

			this.setDirection(dxn);

			//console.log('turned snake from ' + prevDxn + ' to ' + this.direction);
		}
	}

	return this;
};

Snake.prototype.slither = function() {
	var head = this.getHead();
	var pit = this.getPit();

	var destSpace = pit.getSpace(
		head.getSpace().getX() + this.getMoveXOffset(),
		head.getSpace().getY() + this.getMoveYOffset()
	);

	if (destSpace.isVacant()) {
		this.getHead().moveTo(destSpace);
	} else {
		this.collide(destSpace.getOccupant());
	}

	this.setLastMoveDirection(this.getDirection());

	return this;
};

Snake.prototype.collide = function(occupant) {
	if (occupant instanceof Apple) {
		this.eat(occupant);
	} else if (occupant instanceof BodyPart) {
		this.die();
	} else {
		throw 'Unexpected space occupant collision!';
	}

	return this;
};

Snake.prototype.eat = function(apple) {
	//eat the apple
	var oldAppleSpace = apple.getSpace();
	apple.relocate();

	//get bigger
	var oldHead = this.getHead();
	var newHead = new BodyPart(this, oldHead);
	this.setHead(newHead);

	//put the new head in the apple's old space
	oldAppleSpace.setOccupant(newHead);

	this.getPit().getGame().addScore(10);

	return this;
};

//when the snake runs into itself
Snake.prototype.die = function() {
	this.getPit().getGame().end();

	return this;
};