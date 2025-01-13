# llama_sim
A simple logic circuit simulator.

*llama_sim* is a tool written in C that allows users to create and simulate logic circuits. These circuits are composed of elementary logic gates and electronics: switches, NOT gates, OR gates, AND gates, etc.

## the idea
- The idea is relatively simple in practice: a bunch of interconnected structures.
- All electronics (switches, gates, etc) are connected via "wires".
- Gates can have multiple input wires, but typically only have 1 output wire. 
	- Each gate holds references to each input and output wires.
- If a wire is an input to a gate, then it stores a pointer to the gate.
	- If the state of the wire changes (for example: by toggling the state of a switch), then we can adjust the state of the connected gate accordingly (using the pointer stored in the wire structure).
	- If the gates output changes as the input (wire) changes, then we update the state of the gates output wire (if it exists).
	- Similarly, if this output wire of gate #1 is an input to some other gate #2, then we repeat the same process, but now, we update the state of gate #2.
	- This process is repeated until our wire is NOT an input wire.

## simple demo: toggling a switch
```c
#include <stdio.h>
#include "src/gate.h"
#include "src/switch.h"

int main(void) {
	toggle_switch *sw = init_empty_switch();

	wire *w = init_wire(0, 0);

	// toggle switch sw: on
	toggle_switch_status(sw);

	// connects the wire w
	// to the output of switch sw
	connect_wire_to_switch(sw, w);

	printf("%d\n", w->val); // outputs: 1

	toggle_switch_status(sw);

	printf("%d\n", w->val); // outputs: 0

	return 0;
}
```


