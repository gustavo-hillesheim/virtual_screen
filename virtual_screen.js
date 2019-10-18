class VirtualScreen {
	
	constructor(context, scale = 1) {
		
		this.scale = scale;
		this._context = context;
		context.scale(scale, scale);
		
		this._getScreenSize();
		this._createScreen();
	}
	
	_createScreen() {
		this._screen = new Array(this._screenSize);
		this._changed = [];
	}

	_getScreenSize() {

		const screenHeight = window.innerHeight;
		const screenWidth = window.innerWidth;
		this.height = screenHeight;
		this.width = screenWidth;
		this.size = Math.floor(screenHeight * screenWidth / this.scale * this.scale);
		this._context.canvas.width = screenWidth;
		this._context.canvas.height = screenHeight;
	}

	setPixel(x, y, color) {
		
		color = this._convertColor(color);
		const pixelIndex = y * this.width + x;
		const currentColor = this._screen[pixelIndex];
		if (color !== currentColor) {
			this._screen[pixelIndex] = color;
			this._changed.push(pixelIndex);
		}
	}

	_convertColor(color) {

		if (typeof color === 'string')
			return color;

		if (typeof color === 'number')
			return `rgb(${color}, ${color}, ${color})`;

		if (Array.isArray(color)) {
			if (color.length > 3)
				return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`;
			return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
		}

		if (color.r && color.g && color.b) {
			if (color.a)
				return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
			return `rgb(${color.r}, ${color.g}, ${color.b})`;
		}

		return null;
	}

	paint() {
		
		while (this._changed && this._changed.length) {
			const screenIndex = this._changed.pop();
			const { x, y } = this._calculateCoordinates(screenIndex);
			this._context.fillStyle = this._screen[screenIndex];
			this._context.fillRect(x, y, this.scale, this.scale);
		}
	}

	_calculateCoordinates(screenIndex) {
		
		return {
			x: screenIndex % this.width,
			y: Math.floor(screenIndex / this.width)
		};
	}
}