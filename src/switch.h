#ifndef SWITCH_H
#define SWITCH_H

#include "wire.h"

typedef struct toggle_switch {
	bool is_on;
	wire *out;
} toggle_switch;

// default to off
toggle_switch* init_switch(wire *out, bool init_state);

toggle_switch* init_empty_switch();

void toggle_switch_status(toggle_switch *s);

void connect_wire_to_switch(toggle_switch *sw, wire *w);

#endif
