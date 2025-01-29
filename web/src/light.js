import { Gate } from "./gates.js";

class Light extends Gate {
    constructor() {
        super(1);
        this.text = "OFF";
    }

    update_value() {
        this.output.update_value(this.inputs[0].value);
        this.text = (this.output.value ? "ON" : "OFF");
    }

    draw(ctx) {
		ctx.fillStyle = "white";

		if (this.selected) {
			ctx.lineWidth = Gate.GATE_OUTLINE_LINE_WIDTH;
			ctx.strokeStyle = (this.output.value ? "#ADD8E6" : "#808080");
			ctx.beginPath();
			ctx.rect(this.pos[0], this.pos[1], Gate.GATE_WIDTH, Gate.GATE_HEIGHT);
			ctx.stroke();
		}

		ctx.lineWidth = Gate.GATE_LINE_WIDTH;
        ctx.fillStyle = (this.output.value ? "#ADD8E6" : "#FFFFFF");
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.rect(this.pos[0], this.pos[1], Gate.GATE_WIDTH, Gate.GATE_HEIGHT);
		ctx.fill();
        ctx.stroke();

        if (!this.output.value) {
            ctx.fillStyle = "black";
            ctx.font = "20px Consolas"
            ctx.fillText("OFF", this.pos[0] + 2*Gate.GATE_WIDTH/7, this.pos[1] + 7*Gate.GATE_HEIGHT/12);
        }

		for (var j = 0; j < this.ports; ++j) {
			this.inputs[j].draw(ctx);
		}
    }
};

export { Light };