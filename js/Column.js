function Column(pit) {
	GuiElement.call(this, pit, 'div', null, 'sk-col');

	this.spaces = new Array();
}
Column.prototype = Object.create(GuiElement.prototype);
Column.prototype.constructor = Column;

Column.prototype.getPit = function() {
	return this.getParent();
};

Column.prototype.addSpace = function(space) {
	this.spaces.push(space);
};

Column.prototype.getSpace = function(y) {
	return this.spaces[y];
};