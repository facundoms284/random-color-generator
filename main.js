const mainContainer = document.getElementById('main');

let colors = [
    {
        fijo: false,
        color: obtenerColorHexadecimal(),
    },
    {
        fijo: false,
        color: obtenerColorHexadecimal(),
    },
    {
        fijo: false,
        color: obtenerColorHexadecimal(),
    },
];

const coloresGuardados = localStorage.getItem('colors');

if (coloresGuardados) {
    //Convierto nuevamente el string a un array de objetos
    const arrayDeObjetosColors = JSON.parse(coloresGuardados);
    if (arrayDeObjetosColors.length > 0) {
        colors = arrayDeObjetosColors;
    };
};


const guardarColores = () => {
    const coloresString = JSON.stringify(colors);
    localStorage.setItem('colors', coloresString);
};

const chequearLimite = () => {
    const maxColors = 6;
    const minColors = 2;
    const size = colors.length;

    if (size >= maxColors) {
            const elementosHTMl = document.getElementsByClassName('button-container');
            const arrayDeDivs = Array.from(elementosHTMl);
            arrayDeDivs.forEach((container) => {
            container.style.display = 'none';
        });
    };

    if (size <= minColors) {
        const elementosHTML = document.getElementsByClassName('button-delete');
        const arrayDeDeleteButtons = Array.from(elementosHTML);
        arrayDeDeleteButtons.forEach((button) => {
            button.style.display = 'none';
        });
    };
};

const agregarColor = (posicion) => {
    const nuevoColor = {
        fijo: false,
        color: obtenerColorHexadecimal(),
    };
    
    colors.splice(posicion, 0, nuevoColor);
    pintarColores();
};

const obtenerBotonAgregar = (posicion) => {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const button = document.createElement('button');
    button.classList.add('button-add');
    button.textContent = '+';
    buttonContainer.appendChild(button);
    
    button.addEventListener('click', () => agregarColor(posicion + 1));
    return buttonContainer;
};

const obtenerBotonEliminar = (posicion) => {

    const button = document.createElement('button');
    button.classList.add('button-delete');
    const img = document.createElement('img');
    img.src = './utils/images/delete-color.svg';
    button.appendChild(img);
    
    button.addEventListener('click', () => {
        colors.splice(posicion, 1);
        pintarColores();
    });
    return button;
};

const obtenerBotonDejarFijo = (posicion) => {
    const button = document.createElement('button');
    button.classList.add('button-set');
    const img = document.createElement('img');
    img.src = `${colors[posicion].fijo ? './utils/images/unlock-color' : './utils/images/lock'}.svg`;
    button.appendChild(img);
    
    button.addEventListener('click', () => {
        colors[posicion].fijo = !colors[posicion].fijo;
        button.innerHTML = `<img src="${colors[posicion].fijo ? './utils/images/unlock-color' : './utils/images/lock'}.svg">`;

        guardarColores();
    });
    return button;
};
    
const pintarContenedor = (color, posicion) => {

    //Creo los divs que voy a usar para mostrar los colores.
    const div = document.createElement('div');
    div.classList.add('container');
    div.style.backgroundColor = `#${color}`;

    const h1 = document.createElement('h1');
    h1.textContent = `#${color}`;

    const botonAñadirColor = obtenerBotonAgregar(posicion);
    const botonEliminarColor = obtenerBotonEliminar(posicion);
    const botonDejarFijo = obtenerBotonDejarFijo(posicion);

    div.appendChild(h1);
    div.appendChild(botonAñadirColor);
    div.appendChild(botonEliminarColor);
    div.appendChild(botonDejarFijo);

    //Agrego los divs a la section main.
    mainContainer.appendChild(div);
};


const pintarColores = () => {
    mainContainer.innerHTML = '';
    
    colors.forEach((item, index) => {
        pintarContenedor(item.color, index);
    });

    chequearLimite();
    guardarColores();
};

const pintarColoresAleatorios = () => {
    colors = colors.map((item) => {
        if (item.fijo) {
            return item;
        }
        return {
            fijo: false,
            color: obtenerColorHexadecimal(),
        }

    });
    pintarColores();
};

document.addEventListener('keyup', function (event) {
    if (event.code === 'Space') {
        pintarColoresAleatorios();
    }
});

pintarColoresAleatorios();