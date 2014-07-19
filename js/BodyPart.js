// a part of the Snake's body (a node in the LinkedList)
function BodyPart(snake, next) {
	SpaceOccupant.call(this, null);
	this.nextPart = next;
}
BodyPart.prototype = Object.create(SpaceOccupant.prototype);
BodyPart.prototype.constructor = BodyPart;

BodyPart.prototype.getSnake = function() {
	return this.getParent();
};

//for iterating through nodes
BodyPart.prototype.getNextPart = function() {
	return this.nextPart;
};
BodyPart.prototype.setNextPart = function(part) {
	this.nextPart = part;

	return this;
};

BodyPart.prototype.moveTo = function(space) {
	var prevSpace = this.getSpace();
	prevSpace.vacate();
	space.setOccupant(this);

	//pull the next body part along into this body part's previous space
	if (this.getNextPart() !== null) {
		this.getNextPart().moveTo(prevSpace);
	}

	return this;
};