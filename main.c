#include <stdio.h>
#include "src/gate.h"
#include "src/switch.h"

int main(void) {
	toggle_switch *sw = init_empty_switch();

	wire *w = init_wire(0, 0);

	toggle_switch_status(sw);

	connect_wire_to_switch(sw, w);

	printf("%d\n", w->val);

	return 0;
}
