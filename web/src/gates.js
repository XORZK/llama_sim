import { Wire } from './wire.js'

class Gate {
	static GATE_LINE_WIDTH = 2;

	constructor(ports) {
		this.pos = [0,0];
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

	draw(ctx) {
		throw new Error("Implement draw(ctx) function");
	}

	set_pos(x, y) {
		this.pos = [x,y];
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

	draw(ctx) {
		ctx.lineWidth = Gate.GATE_LINE_WIDTH;
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.moveTo(this.pos[0], this.pos[1]);
		ctx.lineTo(this.pos[0] - 25, this.pos[1] + 20);
		ctx.lineTo(this.pos[0] - 25, this.pos[1] - 20);
		ctx.lineTo(this.pos[0], this.pos[1]);
		ctx.fill();
		ctx.stroke();
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

	draw(ctx) {
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

	draw(ctx) {
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
