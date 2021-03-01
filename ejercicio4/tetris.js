/// ************************************
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
	this.init(new Point(pos.x * Block.BLOCK_SIZE, pos.y * Block.BLOCK_SIZE), new Point(pos.x * Block.BLOCK_SIZE + Block.BLOCK_SIZE, pos.y * Block.BLOCK_SIZE + Block.BLOCK_SIZE))
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

// ************************************
// *     EJERCICIO 3               *
// ************************************

// ====================== BOARD ================

function Board(width, height) {
	this.width = width;
	this.height = height;
}

// Si la pieza nueva puede entrar en el tablero, pintarla y devolver true.
// Si no, devoler false

Board.prototype.draw_shape = function(shape){
	if (this.can_move(0,0)){
		shape.draw();
		return true;
	}
	return false;
}


// En esta parte de la práctica devolveremos siempre 'true'
// pero, más adelante, tendremos que implementar este método
// que toma como parámetro la posición (x,y) de una casilla
// (a la que queremos mover una pieza) e indica si es posible
// ese movimiento o no (porque ya está ocupada o porque se sale
// de los límites del tablero)

Board.prototype.can_move = function(x,y){
	if (x  < 0 || x > this.width * Block.BLOCK_SIZE  || y < 0 || y > this.height * Block.BLOCK_SIZE) {
		return false;
	}
	return true;
}

// ==================== Tetris ==========================

function Tetris() {
	this.board = new Board(Tetris.BOARD_WIDTH, Tetris.BOARD_HEIGHT);
}

Tetris.SHAPES = [I_Shape, J_Shape, L_Shape, O_Shape, S_Shape, T_Shape, Z_Shape];
Tetris.DIRECTION = {'Left':[-1, 0], 'Right':[1, 0], 'Down':[0, 1]};
Tetris.BOARD_WIDTH = 10;
Tetris.BOARD_HEIGHT = 20;
Tetris.BOARD_COLOR='ivory';

Tetris.prototype.create_new_shape = function(){
	// https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
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
		32 : 'Rotate'
	};
	console.log(codes_keys[key])
	this.do_move(codes_keys[key])
        // TU CÓDIGO AQUÍ:
	// en la variable key se guardará el código ASCII de la tecla que
	// ha pulsado el usuario. ¿Cuál es el código key que corresponde
	// a mover la pieza hacia la izquierda, la derecha, abajo o a rotarla?


}

Tetris.prototype.do_move = function(direction) {
	var desplazamiento = Tetris.DIRECTION[direction]
	var new_positions = []
	this.current_shape.block_array.forEach(function (b){
		var x_final = b.px + desplazamiento[0] * Block.BLOCK_SIZE
		var y_final = b.py + desplazamiento[1] * Block.BLOCK_SIZE
		new_positions.push(new Point(x_final, y_final))
	})
	console.log(new_positions)
	var move = true
	for (var i = 0; i < new_positions.length; i++) {
		if (!this.board.can_move(new_positions[i].x, new_positions[i].y)) {
			move = false
		}
	}
	console.log(this.current_shape)
	console.log(move)
	if (move) {
		var cont = 0
		this.current_shape.block_array.forEach(function (b) {
			ctx.clearRect(b.px - b.lineWidth, b.py - b.lineWidth, Block.BLOCK_SIZE + 2*b.lineWidth, Block.BLOCK_SIZE + 2*b.lineWidth)
			//ctx.strokeRect(b.px, b.py, 0, 0)
			b.px = new_positions[cont].x
			b.py = new_positions[cont].y
			cont += 1
		})
		this.current_shape.draw()
	}
	console.log(this.current_shape)

	// TU CÓDIGO AQUÍ: el usuario ha pulsado la tecla Left, Right o Down (izquierda,
	// derecha o abajo). Tenemos que mover la pieza en la dirección correspondiente
	// a esa tecla. Recuerda que el array Tetris.DIRECTION guarda los desplazamientos 
	// en cada dirección, por tanto, si accedes a Tetris.DIRECTION[direction], 
	// obtendrás el desplazamiento (dx, dy). A continuación analiza si la pieza actual 
	// se puede mover con ese desplazamiento. En caso afirmativo, mueve la pieza. 
       
}
