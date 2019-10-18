let game;

function startRunning() {
	game && game.continue();
}
function stopRunning() {
	game && game.pause();
}

window.onload = function() {
	
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');
	game = new Game(new VirtualScreen(context));
	game.start();
}