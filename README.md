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
	- This process is repeated until our wire is **NOT** an input wire or until we reach a dead end.

## structs

### `wire.h`
```c
typedef struct wire {
	bool val, is_input;
	void* gate;
	int gate_type; // gate and gate_type are only
				   // used if wire is an input, so when
				   // we update the value of wire, we can update
				   // the output of the gate.
} wire;
```

### `switch.h`
```c
typedef struct toggle_switch {
	bool is_on;
	wire *out;
} toggle_switch;
```

### `led.h`
```c
typedef struct led {
	bool is_on;
	wire *in;
} led;
```

### `gate.h`
```c
typedef struct NOT {
	wire *in, *out;
} NOT;

typedef struct AND {
	int ports;
	wire **in, *out;
} AND;

typedef struct OR {
	int ports;
	wire **in, *out;
} OR;
```

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

## example circuit
<p align="center" width="100%">
    <img width="100%" src="https://raw.githubusercontent.com/XORZK/llama_sim/refs/heads/main/img/circuit_example.png">
	circuit example (pt. 1) (using logic.ly)
</p>

<p align="center" width="100%">
    <img width="100%" src="https://raw.githubusercontent.com/XORZK/llama_sim/refs/heads/main/img/circuit_example_on.png">
	circuit example (pt. 2) (using logic.ly)
</p>

In the example above:
1. Switching on `s1` causes the signal in `w1` to be `ON`.
2. Since `s1` is an input wire to gate `g1`, then we need to recompute the output of `g1`. 
3. Since `g1` is a **NOT** gate, and its input is `ON`, then its output will be `OFF`.
4. By changing out output to our `g1` gate, our `w2` wire also changes state from `ON` to `OFF`, so we need to recompute the output of `g2`.
5. Since `g2` is an **OR** gate, and both its input are `OFF`, then its output will also be `OFF`.
6. Thus, our output (LED) is OFF.

### creating this circuit in `llama_sim`
```c
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

	printf("%d\n", l->is_on); // outputs: 1

	toggle_switch_status(s1);

	printf("%d\n", l->is_on); // outputs: 0

	return 0;
}
```
