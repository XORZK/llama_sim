import { Wire } from './wire.js'

class Switch {
	constructor() {
		this.output = new Wire(0, 0);
	}

	// connect wire to output
	connect_wire(w) {
		var is_on = this.output.value;
		this.output = w;

		if (this.output) {
			this.output.is_input = 0;
			this.output.update_value(is_on);
		}
	}

	toggle() {
		this.output.toggle();
	}

	out() {
		return this.output.value ? 1 : 0;
	}
};

export { Switch };
