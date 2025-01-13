import { Wire } from './src/wire.js'
import { Gate, NOT, AND, OR } from './src/gates.js'
import { Switch } from './src/switch.js'

var wires = [];
var gates = [];

function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
	const rect = canvas.getBoundingClientRect();

	var n = new NOT(0, 0);
	n.set_pos(50, 50);

	gates.push(n);

	for (var j = 0; j < gates.length; ++j) {
		n.draw(ctx);
	}

	document.addEventListener("mousemove", (event) => {
		const mouseX = event.clientX - rect.left, mouseY = event.clientY - rect.top;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var wire_selected = false;

		for (var j = 0; j < wires.length; ++j) {
			var w = wires[j];
			var p1 = w.p1, p2 = w.p2;

			var d1 = (p1[0]-mouseX)*(p1[0]-mouseX)+(p1[1]-mouseY)*(p1[1]-mouseY),
				d2 = (p2[0]-mouseX)*(p2[0]-mouseX)+(p2[1]-mouseY)*(p2[1]-mouseY);

			if (!wire_selected) {
				if (!(w.dragged[0] || w.dragged[1])) {
					var rs = Wire.WIRE_RADIUS * Wire.WIRE_RADIUS;
					if (d1 <= rs) {
						w.selected = [true,false];
						wire_selected = true;
					} else if (d2 <= rs) {
						w.selected = [false,true];
						wire_selected = true;
					} else {
						w.selected = [false,false];
					}
				} else {
					if (w.dragged[0]) {
						w.p1 = [mouseX, mouseY];
					} else {
						w.p2 = [mouseX, mouseY];
					}
				}
			}

			wires[j].draw(ctx);
		}

		for (var j = 0; j < gates.length; ++j) {
			gates[j].draw(ctx);
		}
	});

	document.addEventListener("mousedown", (event) => {
		const mouseX = event.clientX - rect.left, mouseY = event.clientY - rect.top;

		for (var j = 0; j < wires.length; ++j) {
			var w = wires[j];
			if (w.selected[0]) {
				w.dragged[0] = true;
			} else if (w.selected[1]) {
				w.dragged[1] = true;
			}
		}
	});

	document.addEventListener("mouseup", (event) => {
		const mouseX = event.clientX - rect.left, mouseY = event.clientY - rect.top;

		for (var j = 0; j < wires.length; ++j) {
			var w = wires[j];
			if (w.selected[0]) {
				w.dragged[0] = false;
			} else if (w.selected[1]) {
				w.dragged[1] = false;
			}
		}
	});
}

window.onload = function() {
    draw();
};
