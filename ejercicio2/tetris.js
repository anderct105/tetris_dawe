// ************************************
// *     EJERCICIO 1                   *
// ************************************

// ============== Point =======================

function Point (x, y) {
	this.x = x;
	this.y = y;
}

// ============== Rectangle ====================
function Rectangle() {}

Rectangle.prototype.init = function(p1,p2) {
	this.px = p1.x;
	this.py = p1.y;
	this.width = p2.x - p1.x;
	this.height = p2.y - p1.y;
	this.lineWidth= 1;
	this.color = 'black';
}

Rectangle.prototype.draw = function() {
	ctx.fillStyle = this.color
	ctx.lineWidth = this.lineWidth
	ctx.fillRect(this.px, this.py, this.width, this.height)
	ctx.strokeRect(this.px, this.py, this.width, this.height)
}


Rectangle.prototype.setLineWidth = function(width) { this.lineWidth=width}
Rectangle.prototype.setFill = function(color) { this.color = color}

// ============== Block ===============================

function Block (pos, color) {
	var p1 = new Point (pos.x*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH, pos.y*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH)
	var p2 = new Point (Block.BLOCK_SIZE+pos.x*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH,Block.BLOCK_SIZE+pos.y*Block.BLOCK_SIZE + Block.OUTLINE_WIDTH);
	this.init(p1, p2)
	this.color = color
	this.lineWidth = Block.OUTLINE_WIDTH
}


Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// TU CÓDIGO: emplea el patrón de herencia (Block es un Rectangle)
Block.prototype = new Rectangle()
Block.prototype.constructor = Block




// ************************************
// *      EJERCICIO 2                  *
// ************************************


function Shape() {}


Shape.prototype.init = function(coords, color) {
	this.block_array = []
	coords.forEach(x => this.block_array.push(new Block(x, color)))
};

Shape.prototype.draw = function() {
	this.block_array.forEach(x => x.draw())
};
// ============== Shape ===================================

// ============= I_Shape ================================
function I_Shape(center) {
     var coords = [new Point(center.x - 2, center.y),
               new Point(center.x - 1, center.y),
               new Point(center.x , center.y),
               new Point(center.x + 1, center.y)];
    
     Shape.prototype.init.call(this, coords, "blue");   

}

I_Shape.prototype = new Shape()
I_Shape.prototype.constructor = I_Shape;

// =============== J_Shape =============================
function J_Shape(center) {
	var coords = [new Point(center.x + 1, center.y + 1),
		new Point(center.x - 1, center.y),
		new Point(center.x , center.y),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "orange");

}

J_Shape.prototype = new Shape()
J_Shape.prototype.constructor = J_Shape;

// ============ L Shape ===========================
function L_Shape(center) {
	var coords = [new Point(center.x - 1, center.y+1),
		new Point(center.x - 1, center.y),
		new Point(center.x , center.y),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "cyan");
}


L_Shape.prototype = new Shape()
L_Shape.prototype.constructor = L_Shape;

// ============ O Shape ===========================
function O_Shape(center) {

	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x - 1, center.y + 1),
		new Point(center.x , center.y),
		new Point(center.x , center.y + 1)];

	Shape.prototype.init.call(this, coords, "red");
}


O_Shape.prototype = new Shape()
O_Shape.prototype.constructor = O_Shape;

// ============ S Shape ===========================
function S_Shape(center) {

	var coords = [new Point(center.x + 1, center.y),
		new Point(center.x, center.y + 1),
		new Point(center.x , center.y),
		new Point(center.x - 1 , center.y + 1)];

	Shape.prototype.init.call(this, coords, "green");
}

S_Shape.prototype = new Shape()
S_Shape.prototype.constructor = S_Shape;

// ============ T Shape ===========================
function T_Shape(center) {

	var coords = [new Point(center.x + 1, center.y),
		new Point(center.x, center.y + 1),
		new Point(center.x , center.y),
		new Point(center.x - 1 , center.y)];

	Shape.prototype.init.call(this, coords, "yellow");
}

T_Shape.prototype = new Shape()
T_Shape.prototype.constructor = S_Shape;


// ============ Z Shape ===========================
function Z_Shape(center) {

		var coords = [new Point(center.x + 1, center.y + 1),
		new Point(center.x, center.y + 1),
		new Point(center.x , center.y),
		new Point(center.x - 1 , center.y)];

	Shape.prototype.init.call(this, coords, "magenta");
}

Z_Shape.prototype = new Shape()
Z_Shape.prototype.constructor = Z_Shape;
