#include "gate.h"
#include <stdio.h>
#include <stdlib.h>

void update_gate_value(void *g, int type) {
	if (type == UNDEFINED_GATE_ID)
		return;

	if (type == NOT_GATE_ID) {
		NOT *n = (NOT*) g;

		update_wire_value(n->out, n->in->val ? 0 : 1);
	} else if (type == AND_GATE_ID) {
		AND *a = (AND*) g;

		bool out = 1;

		for (int j = 0; j < a->ports; ++j) {
			if (out == 0) break;
			out &= (a->in[j] ? a->in[j]->val : 0);
		}

		update_wire_value(a->out, out);
	} else if (type == OR_GATE_ID) {
		OR *x = (OR*) g;

		bool out = 0;

		for (int j = 0; j < x->ports; ++j) {
			if (out == 1)
				break;

			out |= (x->in[j] ? x->in[j]->val : 0);
		}

		update_wire_value(x->out, out);
	}
}

NOT* init_not(wire *input) {
	NOT* g = (NOT*) malloc(sizeof(NOT));

	g->in = (input ? input : init_wire(0, 1));
	g->out = init_wire(g->in->val ? 0 : 1, 0);

	if (input) {
		input->gate = (void*) g;
		input->gate_type = NOT_GATE_ID;
	}

	return g;
}

void delete_not(NOT *g) {
	if (!g)
		return;

	delete_wire(g->in);
	delete_wire(g->out);

	free(g);
}

void print_not(NOT *g) {
	if (!g)
		return;

	printf("[%d] -> [NOT] -> [%d]\n", g->in->val, g->out->val);
}

void print_and(AND *g) {
	if (!g)
		return;

	printf("[");

	for (int j = 0; j < g->ports; ++j) {
		printf("%d", g->in[j] ? g->in[j]->val : 0);

		if (j < g->ports-1) {
			printf(",");
		}
	}

	printf("] -> [AND] -> [%d]\n", g->out->val);
}

AND* init_and(int ports) {
	AND* g = (AND*) malloc(sizeof(AND));

	g->ports = ports;
	g->in = (wire**) malloc(sizeof(wire*) * g->ports);
	g->out = init_wire(0, 0);

	for (int j = 0; j < g->ports; ++j) {
		g->in[ports] = NULL;
	}

	return g;
}

OR* init_or(int ports) {
	OR* g = (OR*) malloc(sizeof(OR));

	g->ports = ports;
	g->in = (wire**) malloc(sizeof(wire*) * g->ports);
	g->out = init_wire(0, 0);

	for (int j = 0; j < g->ports; ++j) {
		g->in[ports] = NULL;
	}

	return g;
}

void print_or(OR *g) {
	if (!g)
		return;

	printf("[");

	for (int j = 0; j < g->ports; ++j) {
		printf("%d", g->in[j] ? g->in[j]->val : 0);

		if (j < g->ports-1) {
			printf(",");
		}
	}

	printf("] -> [OR] -> [%d]\n", g->out->val);

}
