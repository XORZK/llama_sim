import { Gate } from './gates.js'

class Wire {
	static WIRE_RADIUS = 10;
	static WIRE_LINE_WIDTH = 2;
	static WIRE_CIRCLE_WIDTH = 2;

	constructor(v, inp) {
		this.value = v;
		this.is_input = inp;
		this.gate = null;
		this.p1 = [0, 0];
		this.p2 = [0, 0];
		this.selected = [false,false];
		this.dragged = [false,false];
		this.connected = [false, false];
		this.con = false;
	}

	set_p1(x,y) {
		this.p1 = [x,y];
	}

	set_p2(x,y) {
		this.p2 = [x,y];
	}

	draw(ctx) {
		ctx.lineWidth = Wire.WIRE_LINE_WIDTH;
		ctx.beginPath();
		ctx.moveTo(this.p1[0], this.p1[1]);
		ctx.lineTo(this.p2[0], this.p2[1]);
		ctx.stroke();

		ctx.fillStyle = (this.selected[0] ? "grey" : "white");
		ctx.lineWidth = Wire.WIRE_CIRCLE_WIDTH;
		ctx.beginPath();
		ctx.arc(this.p1[0], this.p1[1], Wire.WIRE_RADIUS, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();

		ctx.fillStyle = (this.selected[1] ? "grey" : "white");
		ctx.beginPath();
		ctx.arc(this.p2[0], this.p2[1], Wire.WIRE_RADIUS, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.fill();
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

	hovering(mx, my) {
		var d1 = (this.p1[0]-mx)*(this.p1[0]-mx)+(this.p1[1]-my)*(this.p1[1]-my),
			d2 = (this.p2[0]-mx)*(this.p2[0]-mx)+(this.p2[1]-my)*(this.p2[1]-my);
		var r = Wire.WIRE_RADIUS;

		return [d1<=r*r,d2<=r*r]
	}
};

export { Wire };
