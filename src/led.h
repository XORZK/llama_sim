#ifndef LED_H
#define LED_H

#include <stdbool.h>
typedef struct led {
	bool is_on;
	wire *in;
} led;

led* init_led(wire *in);

void disconnect_input(led *l);

void connect_wire_to_led(led *l, wire *in);

#endif
