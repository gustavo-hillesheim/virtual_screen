function random(max) {
	return Math.round(Math.random() * max);
}

class Game {

	constructor(screen) {
		
		this._screen = screen;
		this._framesRendered = 0;

		setInterval(() => {
			this._updateFps();
		}, 1000);
	}

	start() {
		this.isRunning = true;
		setTimeout(this._gameLoop, 0);
	}

	pause() {
		this.isRunning = false;
	}

	continue() {
		this.isRunning = true;
	}

	_gameLoop = () => {

		if (this.isRunning) {
			this._randomizeScreen();
			this._screen.paint();
			this._framesRendered++;
		}
		setTimeout(this._gameLoop, 0);
	}

	_randomizeScreen() {

    const pixelsToChange = random(this._screen.size / 100);
		for (let i = 0; i < pixelsToChange; i++) {
			const x = random(this._screen.width);
			const y = random(this._screen.height);
			const r = random(255);
			const g = random(255);
      const b = random(255);
      const a = random(100);
      const color = { r, g, b, a };
			this._screen.setPixel(x, y, color);
		}
	}

	_updateFps() {
		if (this.isRunning) {
			console.log('fps', this._framesRendered);
			this._framesRendered = 0;
		}
	}
}