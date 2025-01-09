#ifndef WIRE_H
#define WIRE_H

#include <stdbool.h>

typedef struct wire {
	bool val, is_input;
	void* gate;
	int gate_type; // gate and gate_type are only
				   // used if wire is an input, so when
				   // we update the value of wire, we can update
				   // the output of the gate.
} wire;

wire* init_wire(bool v, bool inp);

void delete_wire(wire* w);

void update_wire_value(wire *w, bool new_v);

void connect_wire_to_gate(wire *w, void *g, int type, int p);

#endif
