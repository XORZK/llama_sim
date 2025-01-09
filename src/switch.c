#include "switch.h"
#include <stdlib.h>

toggle_switch* init_switch(wire *out, bool init_state) {
	toggle_switch *s = (toggle_switch*) malloc(sizeof(toggle_switch));

	s->is_on = init_state;
	s->out = out;

	if (s->out) {
		update_wire_value(s->out, init_state);
	}

	return s;
}

toggle_switch* init_empty_switch() {
	return init_switch(NULL, 0);
}

void toggle_switch_status(toggle_switch *s) {
	s->is_on = (s->is_on ? 0 : 1);

	update_wire_value(s->out, s->is_on);
}

void connect_wire_to_switch(toggle_switch *sw, wire *w) {
	if (!sw)
		return;

	w->is_input = 0;
	sw->out = w;

	if (sw->out) {
		update_wire_value(sw->out, sw->is_on);
	}
}
