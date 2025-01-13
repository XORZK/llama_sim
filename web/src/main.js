import { Wire } from './wire.js'
import { Gate, NOT, AND, OR } from './gates.js'
import { Switch } from './switch.js'

var s = new Switch();
var w = new Wire(0, 0);
var a = new OR(5);

s.connect_wire(w);
a.connect_wire(w, 1);

console.log(s.out());
console.log(a.out());

s.toggle();

console.log(s.out());
console.log(a.out());
