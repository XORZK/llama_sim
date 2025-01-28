import { Wire } from './src/wire.js'
import { NOT, AND, OR } from './src/gates.js'
import { Switch } from './src/switch.js'

var gates = [];

function draw() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
	const rect = canvas.getBoundingClientRect();

	var n1 = new NOT(0, 0);
	var n2 = new NOT(0, 0);
	var n3 = new AND(2);

	var s = new Switch();

	n1.set_pos(50, 50);
	n2.set_pos(100, 100);
	n3.set_pos(150, 150);

	gates.push(n1);
	gates.push(n2);
	gates.push(n3);

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

							if (on_output[0] || on_output[1] || on_gate) {
								var pos = input.p2;
								g.connect_wire(output.output, k);
								console.log("CONNECTED");
								output.output.p2 = pos;
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
}

window.onload = function() {
    draw();
};
