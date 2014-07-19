// the fruit that the Snake chases
function Apple(space) {
	SpaceOccupant.call(this, space);
};
Apple.prototype = Object.create(SpaceOccupant.prototype);
Apple.prototype.constructor = Apple;

Apple.prototype.relocate = function() {
	var pit = this.getSpace().getPit();
	this.getSpace().vacate();
	var newSpace = pit.getAvailSpace();
	newSpace.setOccupant(this);

	return this;
};