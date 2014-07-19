function GuiElement(parent, tag, id, clazz) {
	Child.call(this, parent);

	this.elem = document.createElement(tag);
	if (id !== null) {
		this.elem.setAttribute('id', id);
	}
	if (clazz !== null) {
		this.elem.className = clazz;
	}

	if (this.getParent() instanceof GuiElement) {
		this.getParent().getElem().appendChild(this.elem);
	} else if (isNode(this.getParent())) {
		this.getParent().appendChild(this.elem);
	} else {
		throw 'Could not append GuiElement to parent because the parent was neither a GuiElement or a valid DOM element';
	}

	this.origDisplayVal = this.getElem().style.display;
}
GuiElement.prototype = Object.create(Child.prototype);
GuiElement.prototype.constructor = GuiElement;

GuiElement.prototype.getElem = function() {
	return this.elem;
};

GuiElement.prototype.show = function() {
	this.getElem().style.display = this.origDisplayVal;
};

GuiElement.prototype.hide = function() {
	this.getElem().style.display = 'none';
};

//Returns true if it is a DOM node
function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}

//Returns true if it is a DOM element    
function isElement(o){
  return (
    typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2
    o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
);
}