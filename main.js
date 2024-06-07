const mainContainer = document.getElementById('main');

let colors = [
    obtenerColorHexadecimal(),
    obtenerColorHexadecimal(),
    obtenerColorHexadecimal(),
];

const chequearLimites = (() => {
    const maxColors = 6;
    const size = colors.length;
    if (size >= maxColors) {
        const buttonContainers = document.getElementsByClassName('button-container');
        const containers = Array.from(buttonContainers);
        containers.forEach((container) => {
            container.style.display = 'none';
        });
    }
})


const pintarContenedor = (color, index) => {
    //Creo un div por cada color.
    const div = document.createElement('div');
    //A cada div le asigno un bg color.
    div.style.backgroundColor = `#${color}`;
    
    //Creo un h1
    const h1 = document.createElement('h1');
    //A cada h1 le cambio el texto a el color hexadecimal.
    h1.textContent = `#${color}`;
    //Agrego el h1 al div.
    div.appendChild(h1);

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    const button = document.createElement('button');
    button.textContent = '+';

    button.addEventListener('click', function () {
        const newColor = obtenerColorHexadecimal();
        colors.splice(index + 1, 0, newColor);
        pintarColores();
        chequearLimites();
    });

    div.appendChild(buttonContainer);
    buttonContainer.appendChild(button);

    //A cada div le asigno la class container
    div.classList.add('container');
    
    //Agrego cada div a la section main.
    mainContainer.appendChild(div);
}

const pintarColores = () => {
    mainContainer.innerHTML = '';

    colors.forEach(pintarContenedor)
    chequearLimites();
};

const pintarColoresAleatorios = () => {
    colors = colors.map(obtenerColorHexadecimal);
    pintarColores();
}

document.addEventListener('keyup', function (event) {
    if (event.code === 'Space') {
        pintarColoresAleatorios();
    }
});

pintarColoresAleatorios();
