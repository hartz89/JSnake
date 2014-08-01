define(['GuiElement', 'SettingPrompt'],
	function(GuiElement, SettingPrompt) {

		//tracks the game's setting prompts and the values specified in those prompts
		function Settings(game) {
			GuiElement.call(this, game, 'div', 'sk-settings', null);
			this.renderPrompts();
		}
		Settings.prototype = Object.create(GuiElement.prototype);
		Settings.prototype.constructor = Settings;

		//this function should contain all of the instructions on how to build out the different settings prompts
		Settings.prototype.renderPrompts = function() {
			//game speed
			var SPEED = 'speed';

			var speedLayout = '<!--SPEED PROMPT-->'
				+ '<select name="' + SPEED + '">'
				+ '  <option value="slow">Slow</option>'
				+ '  <option value="normal" selected="">Normal</option>'
				+ '  <option value="fast">Fast</option>'
				+ '</select>';

			this.speedPrompt = new SettingPrompt(this, SPEED, 'Speed', speedLayout);


			//number of apples
			var APPLE_COUNT = 'appleCount';

			var appleCountDom = document.createElement('input');
			appleCountDom.setAttribute('name', APPLE_COUNT);
			appleCountDom.setAttribute('type', 'text');
			appleCountDom.setAttribute('value', '1');
			appleCountDom.setAttribute('size', '1');
			appleCountDom.style.textAlign = 'center';

			this.applesPrompt = new SettingPrompt(this, APPLE_COUNT, 'Apples', appleCountDom);

			/*
				Either of the above patterns can be followed to create prompts for any
				desired settings prompts (HTML string or creating DOM elem with JS).
			*/
		};

		//take any setting name and value and set it as a property of this
		Settings.prototype.setSetting = function(settingName, settingValue) {
			//a little reflection for your friday afternoon
			this[settingName] = settingValue;
		};

		//get a setting by name
		Settings.prototype.getSetting = function(settingName) {
			return this[settingName];
		};

		return Settings;
	}
);