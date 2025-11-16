function BUFFER(a) {	
	return !!a;
}

function NOT(a) {
	return !a;
}

function AND(a, b) {
	return a && b;
}

function XOR(a, b) {
	return (a || b) && !(a && b);
}

function NAND(a, b) {
	return !(a && b)
}

function XNOR(a, b) {
	return (a && b) || (!a && !b);
}

function OR(a, b) {
	return a || b;
}

function NOR(a, b) {
	return (!a) && (!b);
}