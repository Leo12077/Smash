document.addEventListener('DOMContentLoaded', function() {
    var selectButtons = document.querySelectorAll('.select-button');
    selectButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var player = this.closest('.player').classList.contains('player1') ? 1 : 2;
            var image = this.previousElementSibling;
            selectCharacter(player, image);
        });
    });
});

function selectCharacter(player, image) {
    var selectedCharacterDiv = document.querySelector('.selectedCharacter' + player);
    var characterImage = selectedCharacterDiv.querySelector('img');
    var playerContainer = selectedCharacterDiv.parentNode;
    
   
    characterImage.src = image.src;
    

    if (player === 1) {
        playerContainer.style.left = '0';
    } else if (player === 2) {
        playerContainer.style.right = '0';
    }

    selectedCharacterDiv.classList.add('show');
}

function checkSelection() {
    var player1Selected = document.querySelector('.selectedCharacter1').classList.contains('show');
    var player2Selected = document.querySelector('.selectedCharacter2').classList.contains('show');

    if (player1Selected && player2Selected) {
        window.location.href = "mapas.html"; 
    } else {
        alert("Ambos jugadores deben seleccionar un personaje antes de continuar.");
    }
}
document.addEventListener('DOMContentLoaded', function() {
    
    var imgContainer1 = document.getElementById('imgContainer1');
    var imgContainer2 = document.getElementById('imgContainer2');
    var jugador1 = document.getElementById('jugador1');
    var jugador2 = document.getElementById('jugador2');
    var stepSize = 20;
    var keysPressed1 = {}; 
    var keysPressed2 = {}; 
    var anchoOriginal = jugador1.offsetWidth;
    var anchoOriginal2 = jugador2.offsetWidth;
    var minCollisionDistance = 50; 

    
    document.addEventListener('keydown', function(event) {
        
        if (event.key === 'a' || event.key === 'd' || event.key === 'm') {
            keysPressed1[event.key] = true;
        }
        
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'e') {
            keysPressed2[event.key] = true;
        }
        moveCharacters();
        checkCollision();
    });

  
    document.addEventListener('keyup', function(event) {
       
        if (event.key === 'a' || event.key === 'd' || event.key === 'm') {
            delete keysPressed1[event.key];
        }
       
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight' || event.key === 'e') {
            delete keysPressed2[event.key];
        }
        moveCharacters();
        checkCollision();
    });

   
    function moveCharacters() {
        
        
        var dx1 = 0;
        if (keysPressed1['a']) {
            dx1 -= stepSize;
            
        }
        if (keysPressed1['d']) {
            dx1 += stepSize;
          
        }
        moveCharacter(document.getElementById('img1'), dx1);

       
        var dx2 = 0;
        if (keysPressed2['ArrowLeft']) {
            dx2 -= stepSize;
          
        }
        if (keysPressed2['ArrowRight']) {
            dx2 += stepSize;
          
        }
        moveCharacter(document.getElementById('img2'), dx2);
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
        var distancia = Math.abs(rect1.left - rect2.left);
        if (distancia < minCollisionDistance) {
            if (keysPressed1['m']) {
                reduceWidth(jugador1);
            }
            if (keysPressed2['e']) {
                reduceWidth(jugador2);
            }
        }
    }


    function reduceWidth(jugador) {
        var anchoActual = jugador.offsetWidth;
        var reduccion = anchoOriginal * 0.05;
        var nuevoAncho = anchoActual - reduccion;
        jugador.style.width = nuevoAncho + 'px';
        if (nuevoAncho <= 0) {
            alert(jugador.id === 'jugador1' ? '¡Jugador 2 gana!' : '¡Jugador 1 gana!');
        }
    }
});

function seleccionarPersonajes1(){
    seleccionarPersonajes('p1');
    return;
}

function seleccionarPersonajes(personajeId) {
    var imgSrc;
    switch (personajeId) {
        case 'p1':
            imgSrc = 'img/FenixG.png';
            break;
        case 'p2':
            imgSrc = 'img/ReynaG.png';
            break;
        case 'p3':
            imgSrc = './img/OmenG.png';
            break;
        case 'p4':
            imgSrc = './img/ViperG.webp';
            break;
    }
    document.getElementById('imgContainer1').innerHTML = '<img id="img1" class="animated-img" src="' + imgSrc + '" alt="Jugador1">';
}

function seleccionarPersonajes2(personajeId2, jugador2) {
    var imgSrc2;
    switch (personajeId2) {
        case 'p1.2':
            imgSrc2 = './img/FenixG.png';
            break;
        case 'p2.2':
            imgSrc2 = './img/ReynaG.png';
            break;
        case 'p3.2':
            imgSrc2 = './img/OmenG.png';
            break;
        case 'p4.2':
            imgSrc2 = './img/ViperG.webp';
            break;
    }
    document.getElementById('imgContainer2').innerHTML = '<img id="img2" class="animated-img" src="' + imgSrc2 + '" alt="Jugador2">';
}