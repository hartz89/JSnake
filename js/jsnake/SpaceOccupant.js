define(['Child'],
	function(Child) {
		
		//an "superclass" for any object that can occupy a space
		function SpaceOccupant(space) {
			Child.call(this, space);
		}
		SpaceOccupant.prototype = Object.create(Child.prototype);
		SpaceOccupant.prototype.constructor = SpaceOccupant;

		SpaceOccupant.prototype.setSpace = function(space) {
			this.setParent(space);

			return this;
		};
		SpaceOccupant.prototype.getSpace = function() {
			return this.getParent();
		};

		return SpaceOccupant;
	}
);
