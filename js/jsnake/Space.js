define(['GuiElement', 'SpaceOccupant', 'Apple', 'BodyPart'],
	function(GuiElement, SpaceOccupant, Apple,   BodyPart) {
		
		// a Space in the Snake Pit
		function Space(col, xPos, yPos) {
			//for my own sanity
			this.id = 'sp-' + xPos + '-' + yPos;

			GuiElement.call(this, col, 'div', this.id, 'sk-space');

			//basic properties
			this.occupant = null;
			this.x = xPos;
			this.y = yPos;
		}
		Space.prototype = Object.create(GuiElement.prototype);
		Space.prototype.constructor = Space;

		Space.prototype.getPit = function() {
			return this.getCol().getPit();
		};

		Space.prototype.getCol = function() {
			return this.getParent();
		};

		//coordinates
		Space.prototype.getX = function() {
			return this.x;
		};
		Space.prototype.getY = function() {
			return this.y;
		};
		Space.prototype.getCoords = function() {
			return [this.x, this.y];
		};

		//occupancy
		Space.prototype.isVacant = function() {
			return (this.occupant === null);
		};
		Space.prototype.setOccupant = function(occupant) {
			if (occupant instanceof SpaceOccupant) {
				this.occupant = occupant;
				this.occupant.setSpace(this);
				//up two levels to the pit
				this.getCol().getPit().makeSpaceUnavail(this);
			} else {
				throw 'Attempted to set an invalid space occupant';
			}

			this.refreshUI();

			return this;
		};
		Space.prototype.getOccupant = function() {
			return this.occupant;
		};
		Space.prototype.vacate = function() {
			this.occupant = null;
			this.getPit().makeSpaceAvail(this);

			this.refreshUI();
			
			return this;
		};

		//update the space's appearance based on its occupancy
		Space.prototype.refreshUI = function() {
			if (this.isVacant()) {
				this.getElem().className = 'sk-space';
				//$(this.getElem()).removeClass('sk-occupied').removeClass('sk-apple').removeClass('sk-bodypart');
			} else {
				if (this.getOccupant() instanceof Apple) {
					this.getElem().className = 'sk-space sk-occupied sk-apple';
					//$(this.getElem()).addClass('sk-occupied').addClass('sk-apple').removeClass('sk-bodypart');
				} else if (this.getOccupant() instanceof BodyPart) {
					this.getElem().className = 'sk-space sk-occupied sk-bodypart';
					//$(this.getElem()).addClass('sk-occupied').addClass('sk-bodypart').removeClass('sk-apple');
				}
			}

			return this;
		};

		return Space;
	}
);