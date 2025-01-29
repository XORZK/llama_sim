import { Gate } from './gates.js';

class Switch extends Gate {
	constructor() {
		super(0);
		this.text = "OFF";
	}

	toggle() {
		this.output.toggle();
		this.text = (this.output.value ? "ON" : "OFF");
	}

	update_value() {
		this.toggle();
	}

	out() {
		return this.output.value ? 1 : 0;
	}
};

export { Switch };
