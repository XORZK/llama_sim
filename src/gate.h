#ifndef GATES_H
#define GATES_H

#include "wire.h"

#define UNDEFINED_GATE_ID -1
#define NOT_GATE_ID 1
#define AND_GATE_ID 2
#define OR_GATE_ID 3

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

void update_gate_value(void *g, int type);

NOT* init_not(wire *input);

void delete_not(NOT* g);

void print_not(NOT *gate);

AND* init_and(int ports);

void print_and(AND *gate);

OR* init_or(int ports);

void print_or(OR *gate);

#endif
