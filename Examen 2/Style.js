document.addEventListener('DOMContentLoaded', function() {
    var img1 = document.getElementById('img1');
    var img2 = document.getElementById('img2');
    var stepSize = 10; 
    var keysPressed = {}; 
    var jugador1 = document.getElementById('jugador1');
    var anchoOriginal = jugador1.offsetWidth;
    var jugador2 = document.getElementById('jugador2');
    var anchoOriginal2 = jugador2.offsetWidth;

    document.addEventListener('keydown', function(event) {
        keysPressed[event.key] = true; 
        moveCharacters(event.key); 
        checkCollision(); 
    });

    document.addEventListener('keyup', function(event) {
        delete keysPressed[event.key]; 
    });

    function moveCharacters(keyPressed) {
        if (keyPressed === 'a') {
            moveCharacter(img1, -stepSize);
        }
        if (keyPressed === 'd') {
            moveCharacter(img1, stepSize);
        }
        if (keyPressed === 'ArrowLeft') {
            moveCharacter(img2, -stepSize); 
        }
        if (keyPressed === 'ArrowRight') {
            moveCharacter(img2, stepSize); 
        }
    }

    function moveCharacter(character, dx) {
        var rect = character.getBoundingClientRect();
        var newX = rect.left + dx;


        newX = Math.max(0, Math.min(window.innerWidth - rect.width, newX));

        character.style.left = newX + 'px';
    }

    function checkCollision() {
        var rect1 = img1.getBoundingClientRect();
        var rect2 = img2.getBoundingClientRect();
    
        // Coordenadas del centro de cada personaje
        var x1 = rect1.left + rect1.width / 2;
        var y1 = rect1.top + rect1.height / 2;
        var x2 = rect2.left + rect2.width / 2;
        var y2 = rect2.top + rect2.height / 2;
    
      
        var distancia= Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    
   
        var sumawidth = rect1.width;

        
    
      
        if (distancia < sumawidth) {
            if (keysPressed['e']) {
                var anchoActual = jugador1.offsetWidth;

    var reduccion = anchoOriginal * 0.1;
    var nuevoAncho = anchoActual - reduccion;
    


    jugador1.style.width = nuevoAncho + 'px';
    

    if (nuevoAncho <= 0) {
        alert('¡Jugador 2 gana!');
    }
            }
            if (keysPressed['m']) {
                var anchoActual2 = jugador2.offsetWidth;

    var reduccion2= anchoOriginal2 * 0.1;
    var nuevoAncho2 = anchoActual2 - reduccion2;


    jugador2.style.width = nuevoAncho2 + 'px';

    if (nuevoAncho2 <= 0) {
        alert('¡Jugador 1 gana!');
    }
            }
        }
    }
});