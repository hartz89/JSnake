//the "abstract class" for every object that has a parent object related to it
function Child(parent) {
	this.parent = parent;
};

Child.prototype.getParent = function() {
	return this.parent;
};
Child.prototype.setParent = function(parent) {
	this.parent = parent;

	return this;
};