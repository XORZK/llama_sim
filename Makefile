OUT=llsim
IN=src/wire.c src/gate.c src/switch.c src/led.c demos/beginner.c
LIB=

default:
	gcc -g -std=c17 -O3 -lm $(IN) -o $(OUT) $(LIB) && ./$(OUT)

docs:
	doxygen $(DOC)

