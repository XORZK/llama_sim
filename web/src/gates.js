import { Wire } from './wire.js'

class Gate {
	static GATE_OUTLINE_LINE_WIDTH = 6;
	static GATE_LINE_WIDTH = 2;
	static GATE_WIDTH = 75;
	static GATE_HEIGHT = 75;

	constructor(ports) {
		this.dx = this.dy = 0;
		this.pos = [0,0];
		this.ports = ports;
		this.inputs = new Array(this.ports);
		this.output = new Wire(0, 0);
		this.selected = false;
		this.dragged = false;

		for (var j = 0; j < this.ports; ++j) {
			this.inputs[j] = new Wire(0, 1);
			this.inputs[j].connected[0] = true;
		}
	}

	update_value() {
		throw new Error("Implement update_value() function");
	}

	draw(ctx) {
		ctx.fillStyle = "white";

		if (this.selected) {
			ctx.lineWidth = Gate.GATE_OUTLINE_LINE_WIDTH;
			ctx.strokeStyle = "red";
			ctx.beginPath();
			ctx.rect(this.pos[0], this.pos[1], Gate.GATE_WIDTH, Gate.GATE_HEIGHT);
			ctx.stroke();
		}

		ctx.lineWidth = Gate.GATE_LINE_WIDTH;
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.rect(this.pos[0], this.pos[1], Gate.GATE_WIDTH, Gate.GATE_HEIGHT);
		ctx.fill();
		ctx.stroke();

		this.output.draw(ctx);

		for (var j = 0; j < this.ports; ++j) {
			this.inputs[j].draw(ctx);
		}
	}

	set_pos(x, y) {
		this.pos = [x,y];

		if (!this.output.con) {
			this.output.set_p2(x + Gate.GATE_WIDTH, y + Gate.GATE_HEIGHT/2);
		}

		this.output.set_p1(x + Gate.GATE_WIDTH, y + Gate.GATE_HEIGHT/2);


		// For now, assume only 1 or 2 inputs
		if (this.ports == 1) {
			if (!this.inputs[0].con) {
				this.inputs[0].set_p1(x, y + Gate.GATE_HEIGHT / 2);
			}

			this.inputs[0].set_p2(x, y + Gate.GATE_HEIGHT / 2);
		} else if (this.ports == 2) {
			if (!this.inputs[0].con) {
				this.inputs[0].set_p1(x, y + Gate.GATE_HEIGHT / 4);
			}

			this.inputs[0].set_p2(x, y + Gate.GATE_HEIGHT / 4);

			if (!this.inputs[1].con) {
				this.inputs[1].set_p1(x, y + 3 * Gate.GATE_HEIGHT / 4);
			}

			this.inputs[1].set_p2(x, y + 3 * Gate.GATE_HEIGHT / 4);
		}
	}

	connect_wire(w, p) {
		this.inputs[p] = w;
		w.gate = this;
		w.is_input = true;
		w.con = true;
		this.update_value();
	}

	out() {
		return this.output.value ? 1 : 0;
	}

	hovering(mx, my) {
		var w = Gate.GATE_WIDTH, h = Gate.GATE_HEIGHT;
		return (mx >= this.pos[0] && mx <= this.pos[0]+w && my >= this.pos[1] && my <= this.pos[1] + h);
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
