#include "led.h"
#include <stdlib.h>

led* init_led(wire *in) {
	led *l = (led*) malloc(sizeof(l));
	l->in = in;

	if (l->in) {
		l->is_on = l->in->val;
	}

	return l;
}

void disconnect_input(led *l) {
	if (!l)
		return;

	l->in = NULL;
	l->is_on = 0;
}

void connect_wire_to_led(led *l, wire *in) {
	if (!l)
		return;

	l->in = in;

	if (l->in) {
		l->is_on = l->in->val;
	}
}
