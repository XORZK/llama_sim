# llama_sim
A simple logic circuit simulator.

*llama_sim* is a tool written in C that allows users to create and simulate logic circuits. These circuits are composed of elementary logic gates and electronics: switches, NOT gates, OR gates, AND gates, etc.

## demo: toggling a switch
```c
#include <stdio.h>
#include "src/gate.h"
#include "src/switch.h"

int main(void) {
	toggle_switch *sw = init_empty_switch();

	wire *w = init_wire(0, 0);

	toggle_switch_status(sw); // turns switch sw on

	// connects the wire w
	// to the output of switch sw
	connect_wire_to_switch(sw, w);

	printf("%d\n", w->val); // outputs: 1

	return 0;
}
```
