import { Wire } from "./wire.js"

class Gate {
	constructor(ports) {
		this.ports = ports;
		this.inputs = new Array(this.ports);
		this.output = new Wire(0, 0);

		for (var j = 0; j < this.ports; ++j) {
			this.inputs[j] = new Wire(0, 1);
		}
	}

	update_value() {
		throw new Error("Implement update_value() function");
	}

	connect_wire(w, p) {
		this.inputs[p] = w;
		w.gate = this;
		w.is_input = true;
		this.update_value();
	}

	out() {
		return this.output.value ? 1 : 0;
	}
};

class NOT extends Gate {
	constructor() {
		super(1);

		this.update_value();
	}

	update_value() {
		this.output.update_value(this.inputs[0].value ? 0 : 1);
	}
};

class AND extends Gate {
	constructor(p) {
		super(p);

		this.update_value();
	}

	update_value() {
		var out = true;

		for (var j = 0; j < this.ports; ++j) {
			if (!this.inputs[j].value) {
				out = false;
				break;
			}
		}

		this.output.update_value(out);
	}
};

class OR extends Gate {
	constructor(p) {
		super(p);

		this.update_value();
	}

	update_value() {
		var out = false;

		for (var j = 0; j < this.ports; ++j) {
			if (this.inputs[j].value) {
				out = true;
				break;
			}
		}

		this.output.update_value(out);
	}
};

export { Gate, NOT, AND, OR };
