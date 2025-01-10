import { Gate } from './gates.js'

class Wire {
	constructor(v, inp) {
		this.value = v;
		this.is_input = inp;
		this.gate = null;
	}

	update_value(new_v) {
		this.value = new_v;

		if (this.is_input && this.gate != null) {
			this.gate.update_value();
		}
	}

	toggle() {
		this.update_value(this.value ? 0 : 1);
	}
};

export { Wire };
