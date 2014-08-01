define([],
	function() {

		//the "superclass" for every object that has a parent object related to it
		//TODO is this the best way to create this relationship?
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

		return Child;

	}
);