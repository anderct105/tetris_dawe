// *     EJERCICIO 1                   *
// ************************************

// ============== Point =======================

function Point(x, y) {
	this.x = x;
	this.y = y;
}

// ============== Rectangle ====================
function Rectangle() {
}

Rectangle.prototype.init = function (p1, p2) {
	this.px = p1.x;
	this.py = p1.y;
	this.width = p2.x - p1.x;
	this.height = p2.y - p1.y;
	this.lineWidth = 1;
	this.color = 'black';
}

Rectangle.prototype.draw = function () {
	ctx.fillStyle = this.color
	ctx.lineWidth = this.lineWidth
	ctx.strokeStyle = 'black'
	ctx.fillRect(this.px, this.py, this.width, this.height)
	ctx.strokeRect(this.px, this.py, this.width, this.height)
}


Rectangle.prototype.setLineWidth = function (width) {
	this.lineWidth = width
}
Rectangle.prototype.setFill = function (color) {
	this.color = color
}

//** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.move = function (x, y) {
	this.px += x;
	this.py += y;
	this.draw();
}

//** Método introducido en el EJERCICIO 4 */

Rectangle.prototype.erase = function () {
	ctx.beginPath();
	ctx.lineWidth = this.lineWidth + 2;
	ctx.strokeStyle = Tetris.BOARD_COLOR;
	ctx.rect(this.px, this.py, this.width, this.height);
	ctx.stroke();
	ctx.fillStyle = Tetris.BOARD_COLOR;
	ctx.fill()

}


// ============== Block ===============================

function Block(pos, color) {
	var p1 = new Point(pos.x * Block.BLOCK_SIZE, pos.y * Block.BLOCK_SIZE)
	var p2 = new Point(Block.BLOCK_SIZE + pos.x * Block.BLOCK_SIZE, Block.BLOCK_SIZE + pos.y * Block.BLOCK_SIZE);
	this.init(p1, p2)
	this.color = color
	this.lineWidth = Block.OUTLINE_WIDTH
}

Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// TU CÓDIGO: emplea el patrón de herencia (Block es un Rectangle)
Block.prototype = new Rectangle()
Block.prototype.constructor = Block
/** Método introducido en el EJERCICIO 4 */

Block.prototype.move = function (dx, dy) {
	this.x += dx;
	this.y += dy;

	Rectangle.prototype.move.call(this, dx * Block.BLOCK_SIZE, dy * Block.BLOCK_SIZE);
}

/**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

Block.prototype.can_move = function(board, dx, dy) {
	if (dx  < 0 || dx > this.width * Block.BLOCK_SIZE  || dy < 0 || dy > this.height * Block.BLOCK_SIZE) {
		return false;
	}
	if (String([dx,dy]) in board.grid) {
		return false;
	}
	return true;
}


// ************************************
// *      EJERCICIO 2                  *
// ************************************

function Shape() {}


Shape.prototype.init = function(coords, color) {
	this.block_array = []
	coords.forEach(x => this.block_array.push(new Block(x, color)))
	this.blocks = this.block_array

};

Shape.prototype.draw = function() {
	this.block_array.forEach(x => x.draw())
};

/**************************************************
 *	 Código que se da dado para el EJERCICIO 5 *
 ***************************************************/

Shape.prototype.can_move = function(board, dx, dy) {
	if (dx  < 0 || dx > this.width * Block.BLOCK_SIZE  || dy < 0 || dy > this.height * Block.BLOCK_SIZE) {
		return false;
	}
	return true;
}


Shape.prototype.move = function(dx, dy) {

	for (block of this.blocks) {
		block.erase();
	}

	for (block of this.blocks) {
		block.move(dx,dy);
	}
};


// ============= I_Shape ================================
function I_Shape(center) {
	var coords = [new Point(center.x - 2, center.y),
		new Point(center.x - 1, center.y),
		new Point(center.x, center.y),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "blue");

}

// ============= I_Shape ================================
function I_Shape(center) {
	var coords = [new Point(center.x - 2, center.y),
		new Point(center.x - 1, center.y),
		new Point(center.x, center.y),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "blue");

}

I_Shape.prototype = new Shape()
I_Shape.prototype.constructor = I_Shape;

// =============== J_Shape =============================
function J_Shape(center) {
	var coords = [new Point(center.x + 1, center.y + 1),
		new Point(center.x - 1, center.y),
		new Point(center.x, center.y),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "orange");

}

J_Shape.prototype = new Shape()
J_Shape.prototype.constructor = J_Shape;

// ============ L Shape ===========================
function L_Shape(center) {
	var coords = [new Point(center.x - 1, center.y + 1),
		new Point(center.x - 1, center.y),
		new Point(center.x, center.y),
		new Point(center.x + 1, center.y)];

	Shape.prototype.init.call(this, coords, "cyan");

}

L_Shape.prototype = new Shape()
L_Shape.prototype.constructor = L_Shape;


// ============ O Shape ===========================
function O_Shape(center) {
	var coords = [new Point(center.x - 1, center.y),
		new Point(center.x - 1, center.y + 1),
		new Point(center.x, center.y),
		new Point(center.x, center.y + 1)];

	Shape.prototype.init.call(this, coords, "red");
	/* atributo introducido en el EJERCICIO 8 */

}

O_Shape.prototype = new Shape()
O_Shape.prototype.constructor = O_Shape;

/* Código introducido en el EJERCICIO 8*/
// O_Shape la pieza no rota. Sobreescribiremos el método can_rotate que ha heredado de la clase Shape

O_Shape.prototype.can_rotate = function (board) {
	return false;
};

// ============ S Shape ===========================
function S_Shape(center) {
	var coords = [new Point(center.x + 1, center.y),
		new Point(center.x, center.y + 1),
		new Point(center.x, center.y),
		new Point(center.x - 1, center.y + 1)];

	Shape.prototype.init.call(this, coords, "green");
	/* atributo introducido en el EJERCICIO 8 */

}


S_Shape.prototype = new Shape()
S_Shape.prototype.constructor = S_Shape;

// ============ T Shape ===========================
function T_Shape(center) {
	var coords = [new Point(center.x + 1, center.y),
		new Point(center.x, center.y + 1),
		new Point(center.x, center.y),
		new Point(center.x - 1, center.y)];

	Shape.prototype.init.call(this, coords, "yellow");


}

T_Shape.prototype = new Shape()
T_Shape.prototype.constructor = T_Shape;


// ============ Z Shape ===========================
function Z_Shape(center) {

	var coords = [new Point(center.x + 1, center.y + 1),
		new Point(center.x, center.y + 1),
		new Point(center.x, center.y),
		new Point(center.x - 1, center.y)];

	Shape.prototype.init.call(this, coords, "magenta");

}

Z_Shape.prototype = new Shape()
Z_Shape.prototype.constructor = Z_Shape;

// ************************************
// *     EJERCICIO 3               *
// ************************************

// ====================== BOARD ================

function Board(width, height) {
	this.width = width;
	this.height = height;
	this.grid = {}; /* 6. Estructura de datos introducida en el EJERCICIO 6 */

}

// Si la pieza nueva puede entrar en el tablero, pintarla y devolver true.
// Si no, devoler false

Board.prototype.draw_shape = function(shape){
	if (shape.can_move(this,0,0)){
		shape.draw();
		return true;
	}
	return false;
}
 /*****************************
 *	 EJERCICIO 6          *
 *****************************/

Board.prototype.add_shape = function(shape){
	shape.block_array.forEach(x => this.grid[String([x.px / Block.BLOCK_SIZE,x.py /Block.BLOCK_SIZE])] = x)
}


// ****************************
// *     EJERCICIO 5          *
// ****************************

Board.prototype.can_move = function(x,y){
	if (x < 0 || x + Block.BLOCK_SIZE > this.width * Block.BLOCK_SIZE  || y < 0 || y + Block.BLOCK_SIZE > this.height * Block.BLOCK_SIZE) {
		return false;
	}
	if (String([x / Block.BLOCK_SIZE,y / Block.BLOCK_SIZE]) in this.grid) {
		return false;
	}
	return true;
};

// ==================== Tetris ==========================

function Tetris() {
	this.board = new Board(Tetris.BOARD_WIDTH, Tetris.BOARD_HEIGHT);
}

Tetris.SHAPES = [I_Shape, J_Shape, L_Shape, O_Shape, S_Shape, T_Shape, Z_Shape];
Tetris.DIRECTION = {'Left':[-1, 0], 'Right':[1, 0], 'Down':[0, 1]};
Tetris.BOARD_WIDTH = 10;
Tetris.BOARD_HEIGHT = 20;
Tetris.BOARD_COLOR='white';

Tetris.prototype.create_new_shape = function(){
	const random = Math.floor(Math.random() * Tetris.SHAPES.length);
	return new Tetris.SHAPES[random](new Point(Tetris.BOARD_WIDTH / 2, 0))

}

Tetris.prototype.init = function(){

	/**************
	 EJERCICIO 4
	 ***************/

	// gestor de teclado

	document.addEventListener('keydown', this.key_pressed.bind(this), false);

	// Obtener una nueva pieza al azar y asignarla como pieza actual

	this.current_shape = this.create_new_shape()
	this.board.draw_shape(this.current_shape)

}


Tetris.prototype.key_pressed = function(e) {
	e.preventDefault()
	var key = e.keyCode ? e.keyCode : e.which;
	var codes_keys = {
		37 : 'Left',
		39 : 'Right',
		40 : 'Down',
		38 : 'Rotate',
		32 : 'Total_Down'
	};
	console.log(codes_keys[key])
	this.do_move(codes_keys[key])
}

Tetris.prototype.do_move = function(direction) {
	if (direction === 'Left' || direction === 'Down' || direction === 'Right') {
		var desplazamiento = Tetris.DIRECTION[direction]
		var new_positions = []
		this.current_shape.block_array.forEach(function (b) {
			var x_final = b.px + desplazamiento[0] * Block.BLOCK_SIZE
			var y_final = b.py + desplazamiento[1] * Block.BLOCK_SIZE
			new_positions.push(new Point(x_final, y_final))
		})
		var move = true
		for (var i = 0; i < new_positions.length; i++) {
			if (!this.board.can_move(new_positions[i].x, new_positions[i].y)) {
				move = false
			}
		}
		if (move) {
			this.current_shape.move(desplazamiento[0], desplazamiento[1])
			for (key in this.board.grid) {
				this.board.grid[key].draw()
			}
			return true;
		} else {
			if (direction === 'Down') {
				this.board.add_shape(this.current_shape)
				this.current_shape = this.create_new_shape()
				for (key in this.board.grid) {
					this.board.grid[key].draw()
				}

				}
				return false;
			}
		}
}