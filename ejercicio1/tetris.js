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
	this.init(new Point(pos.x * Block.BLOCK_SIZE, pos.y * Block.BLOCK_SIZE), new Point(pos.x * Block.BLOCK_SIZE + Block.BLOCK_SIZE, pos.y * Block.BLOCK_SIZE + Block.BLOCK_SIZE))
	this.color = color
	this.lineWidth = Block.OUTLINE_WIDTH
	// TU CÓDIGO AQUÍ: este es el constructor de la clase Block. Recibe dos parámetros, pos y color. Pos = posición de la celda, por ejemplo, (9,19).
	// color = color que hay que emplear para pintar el bloque.
	// Internamente este método crea dos puntos (empleando las coordenadas del pixel)
	// y llama al método init de la clase Rectangle, pasándole como parámetro,
	// estos dos puntos.
	// Sería interesante que emplearas las constantes Block.BLOCK_SIZE y Block.OUTLINE_WIDTH,
	// para establecer la anchura del bloque y la anchura de la línea.

}



Block.BLOCK_SIZE = 30;
Block.OUTLINE_WIDTH = 2;

// TU CÓDIGO: emplea el patrón de herencia (Block es un Rectangle)
Block.prototype = new Rectangle()
Block.prototype.constructor = Block


