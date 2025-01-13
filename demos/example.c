#include <stdio.h>
#include "../src/gate.h"
#include "../src/switch.h"
#include "../src/led.h"

int main(void) {
	led *l = init_led(NULL);
	toggle_switch *s1 = init_empty_switch(), *s2 = init_empty_switch();
	wire *w1 = init_wire(0, 0), *w3 = init_wire(0, 0);

	connect_wire_to_switch(s1, w1);
	connect_wire_to_switch(s2, w3);

	NOT *g1 = init_not(NULL);
	connect_wire_to_gate(w1, (void*) g1, NOT_GATE_ID, 0);

	OR *g2 = init_or(2);
	connect_wire_to_gate(g1->out, (void*) g2, OR_GATE_ID, 0);
	connect_wire_to_gate(w3, (void*) g2, OR_GATE_ID, 1);
	connect_wire_to_led(l, g2->out);

	printf("%d\n", l->is_on);

	toggle_switch_status(s1);

	printf("%d\n", l->is_on);

	return 0;
}
