function SettingPrompt(settings, shortName, fullName, contents) {
	GuiElement.call(this, settings, 'div', null, 'sk-game-setting');

	//inject the proper DOM structure
	this.shortName = shortName;
	var labelHtml = '<label for="' + shortName + '">' + fullName + '</label>';
	if (isElement(contents)) {
		this.getElem().innerHTML = labelHtml;
		this.getElem().appendChild(contents);
	} else {
		this.getElem().innerHTML = labelHtml + contents;
	}	

	//select eligible form input (only supports one)
	this.formControl = this.getElem().querySelectorAll('input,select')[0];

	//push initial value to Settings
	this.pushSettingChange(this.formControl.value);

	//retain "this" as setting for closure
	var setting = this;

	//listen for change and push accordingly
	this.formControl.onchange = function() {
		setting.pushSettingChange(this.value);
	};
};
SettingPrompt.prototype = Object.create(GuiElement.prototype);
SettingPrompt.prototype.constructor = SettingPrompt;

SettingPrompt.prototype.getSettings = function() {
	return this.getParent();
};

SettingPrompt.prototype.getShortName = function() {
	return this.shortName;
};

//push the setting value up to the Settings object so the game can access it
SettingPrompt.prototype.pushSettingChange = function(val) {
	this.getSettings().setSetting(this.getShortName(), val);
};