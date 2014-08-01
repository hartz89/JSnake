define(['Child', 'DomUtils'],
	function(Child, DomUtils) {
		//the "superclass" for objects that are represented by a DOM element
		function GuiElement(parent, tag, id, clazz) {
			Child.call(this, parent);

			//create the element and set id/class as needed
			this.elem = document.createElement(tag);
			if (id !== null) {
				this.elem.setAttribute('id', id);
			}
			if (clazz !== null) {
				this.elem.className = clazz;
			}

			//append to the parent's DOM element
			//TODO traverse up the heirarchy until a GuiElement parent is found?
			if (this.getParent() instanceof GuiElement) {
				this.getParent().getElem().appendChild(this.elem);
			} else if (DomUtils.isElement(this.getParent())) {
				this.getParent().appendChild(this.elem);
			} else {
				throw 'Could not append GuiElement to parent because the parent was neither a GuiElement or a valid DOM element';
			}

			//get the original display CSS value of the element
			//so it can be shown properly regardless of "block", "inline-block", etc...
			this.origDisplayVal = this.getElem().style.display;
		}
		GuiElement.prototype = Object.create(Child.prototype);
		GuiElement.prototype.constructor = GuiElement;

		GuiElement.prototype.getElem = function() {
			return this.elem;
		};

		//show the DOM element using it's original "display" value
		GuiElement.prototype.show = function() {
			this.getElem().style.display = this.origDisplayVal;
		};

		//hide the DOM element
		GuiElement.prototype.hide = function() {
			this.getElem().style.display = 'none';
		};

		return GuiElement;
	}
);