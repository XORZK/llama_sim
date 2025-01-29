import { Wire } from './src/wire.js'
import { NOT, AND, OR } from './src/gates.js'
import { Switch } from './src/switch.js'
import { Light } from './src/light.js'

var gates = [];

function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
	const rect = canvas.getBoundingClientRect();

	var n1 = new NOT(0, 0);
	var n2 = new NOT(0, 0);
	var n3 = new AND(2);

	var s1 = new Switch(),
		s2 = new Switch();

	var l1 = new Light();

	n1.set_pos(50, 50);
	n2.set_pos(100, 100);
	n3.set_pos(150, 150);
	s1.set_pos(200, 200);
	s2.set_pos(250, 250);
	l1.set_pos(300, 300);

	gates.push(n1);
	gates.push(n2);
	gates.push(n3);
	gates.push(s1);
	gates.push(s2);
	gates.push(l1);

	for (var j = 0; j < gates.length; ++j) {
		gates[j].draw(ctx);
	}

	document.addEventListener("mousemove", (event) => {
		const mouseX = event.clientX - rect.left, mouseY = event.clientY - rect.top;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var wire_selected = false, gate_selected = false;

		for (var j = 0; j < gates.length; ++j) {
			var g = gates[j];

			// check wires
			for (var k = 0; k < g.inputs.length; ++k) {
				var input = g.inputs[k];
				var on_input = input.hovering(mouseX, mouseY);

				if (!input.dragged[0] && !input.dragged[1]) {
					if (on_input[0]) {
						input.selected = [1,0];
						wire_selected = 1;
					} else {
						input.selected = [0,0];
					}
				// check possible connect: in -> out
				} else if (input.dragged[0]) {
					input.set_p1(mouseX, mouseY);
				}			
			}

			if (!gate_selected && !wire_selected) {
				var on_target = g.hovering(mouseX, mouseY);
				g.selected = on_target;

				gate_selected = (gate_selected | g.selected);

				if (!g.selected) {
					g.dragged = 0;
				}
				
				if (g.selected && g.dragged) {
					g.set_pos(mouseX - g.dx, mouseY - g.dy);
				}
			}

			g.draw(ctx);
		}
	});

	document.addEventListener("mousedown", (event) => {
		const mouseX = event.clientX - rect.left, mouseY = event.clientY - rect.top;

		for (var j = 0; j < gates.length; ++j) {
			var g = gates[j];

			var has_wire = false;

			for (var k = 0; k < g.inputs.length; ++k) {
				var wire = g.inputs[k];
				if (wire.con)
					continue;
				wire.dragged = wire.selected.slice();
				if (wire.dragged[0] || wire.dragged[1]) {
					has_wire = true;
					break;
				}
			}

			if (!has_wire && g.selected) {
				g.dragged = true;
				g.dx = (mouseX - g.pos[0]);
				g.dy = (mouseY - g.pos[1]);
			}
		}
	});

	document.addEventListener("mouseup", (event) => {
		const mouseX = event.clientX - rect.left, mouseY = event.clientY - rect.top;
		for (var j = 0; j < gates.length; ++j) {
			var g = gates[j];

			for (var k = 0; k < g.inputs.length; ++k) {
				var input = g.inputs[k];
				if (input.dragged[0]) {
					for (var l = 0; l < gates.length; ++l) {
							if (l == j)
								continue;

							var output = gates[l];
							var on_output = output.output.hovering(mouseX, mouseY);
							var on_gate = output.hovering(mouseX, mouseY);

							if (output.connected)
								continue;

							if (on_output[0] || on_output[1] || on_gate) {
								var pos = input.p2;
								g.connect_wire(output.output, k);
								output.output.p2 = pos;
								output.connected = true;
							}
						}

				}
				input.dragged[0] = false;
				input.dragged[1] = false;
			}

			if (g.selected) {
				g.dragged = false;
			}
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key == "Enter") {
			for (var j = 0; j < gates.length; ++j) {
				var g = gates[j];

				if (g.selected && g instanceof Switch) {
					g.update_value();
					g.draw(ctx);
				}
			}

			for (var j = 0; j < gates.length; ++j) {
				var g = gates[j];
				g.draw(ctx);
			}
		}
	});
}

window.onload = function() {
    draw();
};
