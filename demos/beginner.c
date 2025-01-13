#include <stdio.h>
#include "../src/gate.h"
#include "../src/switch.h"

int main(void) {
	toggle_switch *sw = init_empty_switch();

	wire *w = init_wire(0, 0);

	connect_wire_to_switch(sw, w);

	toggle_switch_status(sw);

	printf("%d\n", w->val);

	toggle_switch_status(sw);

	printf("%d\n", w->val);

	return 0;
}
