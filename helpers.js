function obtenerNumeroAleatorio(min, max) {

            //Obtengo un numero decimal
            const decimal = Math.random(); //Ej 0.563456345
            //Obtengo un número
            const numero = decimal * max; //Ej 0.563456345 * 5 = 2.9123456
            //Obtengo el numero entero.
            const numeroEntero = Math.floor(numero); //Ej 2.9123456 -> 2
            return  numeroEntero + min; //Ej 2 + 1 = 3 
        }

        //Declaro los caracteres que se pueden utilizar para obtener un color hexadecimal.
        const chars = ['A', 'B', 'C', 'D', 'E', 'F', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        //Por ejemplo: FE69C8

        function obtenerColorHexadecimal() {

            //creo una variable que va a ser la que al final voy a retornar con el color hexadecimal.
            let color = '';
            const contador = 6;

            //creo un bucle que se va a repetir 6 veces, (un color hexadecimal se forma por 6 caracteres).
            for (let i = 0; i < contador; i++) {
                //Tengo 16 posibles caracteres que puedo utilizar para obtener el color hexadecimal.
                //Obtengo un numero aleatorio entre 0 y 15 porque el array chars su index empieza en 0.
                const num = obtenerNumeroAleatorio(0, 15); //Esto me va a dar el index del array chars.
                const char = chars[num]; //Creo una constante con el caracter correspondiente al index que obtuvo la funcion "obtenerNumeroAleatorio" del array chars. ej, num = 3 -> char = 'D'
                color = color + char; //Concateno los 6 caracteres que voy obteniendo para formar el color hexadecimal. ej, '' + 'D' = 'D' ----- 'D' + 'E' = 'DE' ----- 'DE' + '5' = 'DE5'
            }
            return color; //Retorno el color hexadecimal. ej: 'D04E5A
        }