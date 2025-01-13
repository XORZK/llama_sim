#include "wire.h"
#include "gate.h"
#include "led.h"
#include <assert.h>
#include <stdlib.h>

wire* init_wire(bool v, bool inp) {
	wire* w = (wire*) malloc(sizeof(wire));

	w->val = v;
	w->is_input = inp;
	w->gate = NULL;
	w->gate_type = -1;

	return w;
}

void delete_wire(wire *w) {
	if (!w)
		return;

	free(w);
}

void update_wire_value(wire *w, bool new_v) {
	if (!w)
		return;

	if (w->val == new_v)
		return;

	w->val = new_v;

	if (w->is_input) {
		if (w->gate_type == LED_GATE_ID) {
			led *l = (led*) w->gate;
			l->is_on = new_v;
		} else {
			update_gate_value(w->gate, w->gate_type);
		}
	}
}

void connect_wire_to_gate(wire *w, void *g, int type, int p) {
	if (!g || !w || type == UNDEFINED_GATE_ID)
		return;

	if (type == NOT_GATE_ID) {
		NOT *n = (NOT*) g;

		n->in = w;
	} else if (type == AND_GATE_ID) {
		AND *a = (AND*) g;
		assert(0 <= p && p < a->ports);

		a->in[p] = w;
	} else if (type == OR_GATE_ID) {
		OR *x = (OR*) g;
		assert(0 <= p && p < x->ports);

		x->in[p] = w;
	}

	w->gate = g;
	update_gate_value(g, type);
	w->is_input = 1;
	w->gate_type = type;
}
