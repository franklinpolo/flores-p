/* ==========================================
   CONFIGURACIÓN
========================================== */

const PASSWORD = "210826";

const INICIO_CANCION = 80;

let passwordActual = "";

let fotoActual = 0;

let intervaloFlores = null;


/* ==========================================
   ELEMENTOS
========================================== */

const musica =
    document.getElementById("musicaFondo");

const login =
    document.getElementById("pantallaLogin");

const dots =
    document.querySelectorAll(
        "#passwordDots span"
    );

const dotsContenedor =
    document.getElementById("passwordDots");

const mensajeLogin =
    document.getElementById("mensajeLogin");

const btnMusica =
    document.getElementById("btnMusicaGlobal");


/* ==========================================
   CONTRASEÑA
========================================== */

document
    .querySelectorAll(".numero")
    .forEach((boton) => {

        boton.addEventListener(
            "click",
            function () {

                if (
                    passwordActual.length >= 6
                ) {
                    return;
                }

                passwordActual +=
                    this.dataset.num;

                actualizarPassword();


                if (
                    passwordActual.length === 6
                ) {

                    comprobarPassword();

                }

            }
        );

    });


document
    .getElementById("btnBorrar")
    .addEventListener(
        "click",
        function () {

            passwordActual =
                passwordActual.slice(
                    0,
                    -1
                );

            mensajeLogin.textContent = "";

            actualizarPassword();

        }
    );


document
    .getElementById("btnLimpiar")
    .addEventListener(
        "click",
        function () {

            passwordActual = "";

            mensajeLogin.textContent = "";

            actualizarPassword();

        }
    );


function actualizarPassword() {

    dots.forEach(
        (dot,index) => {

            dot.classList.toggle(
                "lleno",
                index <
                passwordActual.length
            );

        }
    );

}


/* ==========================================
   VALIDACIÓN
========================================== */

function comprobarPassword() {

    if (
        passwordActual === PASSWORD
    ) {

        mensajeLogin.style.color =
            "#f5dc91";

        mensajeLogin.textContent =
            "Nuestra fecha ♡";


        /*
        La música empieza en el mismo
        clic del último número.
        */

        iniciarMusica();


        setTimeout(
            function () {

                mostrarPantalla(
                    "pantallaInicio"
                );

                btnMusica.classList.remove(
                    "oculto"
                );

            },
            550
        );

    }

    else {

        mensajeLogin.style.color =
            "#ff9999";

        mensajeLogin.textContent =
            "Esa no es nuestra fecha ♡";


        dotsContenedor.classList.remove(
            "error"
        );

        void dotsContenedor.offsetWidth;

        dotsContenedor.classList.add(
            "error"
        );


        setTimeout(
            function () {

                passwordActual = "";

                actualizarPassword();

            },
            600
        );

    }

}


/* ==========================================
   AUDIO DESDE 1:20
========================================== */

function iniciarMusica() {

    musica.volume = .65;


    if (
        musica.readyState >= 1
    ) {

        musica.currentTime =
            INICIO_CANCION;

        musica.play()
            .then(
                actualizarBotonesAudio
            )
            .catch(
                mostrarBotonAudio
            );

    }

    else {

        musica.addEventListener(
            "loadedmetadata",
            iniciarTrasCarga,
            {
                once: true
            }
        );

        musica.load();

    }

}


function iniciarTrasCarga() {

    musica.currentTime =
        INICIO_CANCION;

    musica.play()
        .then(
            actualizarBotonesAudio
        )
        .catch(
            mostrarBotonAudio
        );

}


function mostrarBotonAudio() {

    btnMusica.classList.remove(
        "oculto"
    );

    btnMusica.classList.add(
        "pausada"
    );

}


musica.addEventListener(
    "ended",
    function () {

        musica.currentTime =
            INICIO_CANCION;

        musica.play()
            .catch(() => {});

    }
);


/* ==========================================
   PAUSAR / REPRODUCIR
========================================== */

function alternarMusica() {

    if (
        musica.paused
    ) {

        if (
            musica.currentTime <
            INICIO_CANCION
        ) {

            musica.currentTime =
                INICIO_CANCION;

        }

        musica.play()
            .then(
                actualizarBotonesAudio
            )
            .catch(() => {});

    }

    else {

        musica.pause();

        actualizarBotonesAudio();

    }

}


btnMusica.addEventListener(
    "click",
    alternarMusica
);


document
    .querySelectorAll(
        ".btn-audio-mini"
    )
    .forEach((boton) => {

        boton.addEventListener(
            "click",
            alternarMusica
        );

    });


function actualizarBotonesAudio() {

    const pausado =
        musica.paused;


    btnMusica.textContent =
        pausado
            ? "♫"
            : "♪";


    btnMusica.classList.toggle(
        "pausada",
        pausado
    );


    document
        .querySelectorAll(
            ".btn-audio-mini"
        )
        .forEach((boton) => {

            boton.textContent =
                pausado
                    ? "♫"
                    : "♪";

        });

}


/* ==========================================
   CAMBIO DE PANTALLA
========================================== */

function mostrarPantalla(id) {

    document
        .querySelectorAll(
            ".pantalla"
        )
        .forEach((pantalla) => {

            pantalla.classList.remove(
                "activa"
            );

        });


    const destino =
        document.getElementById(id);


    destino.scrollTop = 0;

    destino.classList.add(
        "activa"
    );


    if (
        id === "pantallaFlores"
    ) {

        comenzarFlores();

    }

}


document
    .querySelectorAll(
        ".btn-menu"
    )
    .forEach((boton) => {

        boton.addEventListener(
            "click",
            function () {

                mostrarPantalla(
                    this.dataset.destino
                );

            }
        );

    });


document
    .querySelectorAll(
        ".btn-volver"
    )
    .forEach((boton) => {

        boton.addEventListener(
            "click",
            function () {

                mostrarPantalla(
                    "pantallaInicio"
                );

            }
        );

    });


/* ==========================================
   CONTADOR
========================================== */

const fechaInicio =
    new Date(
        "2026-08-21T00:00:00"
    );


function actualizarContador() {

    let diferencia =
        new Date() -
        fechaInicio;


    if (
        diferencia < 0
    ) {

        diferencia = 0;

    }


    const total =
        Math.floor(
            diferencia / 1000
        );


    const dias =
        Math.floor(
            total / 86400
        );


    const horas =
        Math.floor(
            (total % 86400)
            / 3600
        );


    const minutos =
        Math.floor(
            (total % 3600)
            / 60
        );


    const segundos =
        total % 60;


    document.getElementById(
        "dias"
    ).textContent =
        String(dias)
        .padStart(2,"0");


    document.getElementById(
        "horas"
    ).textContent =
        String(horas)
        .padStart(2,"0");


    document.getElementById(
        "minutos"
    ).textContent =
        String(minutos)
        .padStart(2,"0");


    document.getElementById(
        "segundos"
    ).textContent =
        String(segundos)
        .padStart(2,"0");

}


actualizarContador();

setInterval(
    actualizarContador,
    1000
);


/* ==========================================
   FOTOS
========================================== */

const fotos = [

    {
        src:
            "ssets/images/foto1.png",

        frase:
            "Todo recuerdo contigo tiene algo especial."
    },

    {
        src:
            "ssets/images/foto2.png",

        frase:
            "Una de mis sonrisas favoritas."
    },

    {
        src:
            "ssets/images/foto3.png",

        frase:
            "Me gusta compartir hasta los momentos más simples contigo."
    },

    {
        src:
            "ssets/images/foto4.png",

        frase:
            "Quiero seguir creando recuerdos así a tu lado."
    },

    {
        src:
            "ssets/images/foto5.png",

        frase:
            "Tu sonrisa hace que cualquier momento se vea más bonito."
    },

    {
        src:
            "ssets/images/foto6.png",

        frase:
            "Hasta nuestras fotos improvisadas terminan siendo especiales."
    },

    {
        src:
            "ssets/images/foto7.png",

        frase:
            "Un recuerdo más para nuestra pequeña historia."
    }

];


const imagen =
    document.getElementById(
        "imagenCarrusel"
    );

const numero =
    document.getElementById(
        "numeroFoto"
    );

const frase =
    document.getElementById(
        "fraseFoto"
    );

const marco =
    document.querySelector(
        ".marco-foto"
    );

const miniaturas =
    document.querySelectorAll(
        ".miniaturas button"
    );

const contenedorIndicadores =
    document.getElementById(
        "indicadoresFotos"
    );


/* CREAR PUNTOS */

fotos.forEach(
    (_,index) => {

        const punto =
            document.createElement(
                "span"
            );

        punto.classList.add(
            "indicador"
        );


        punto.addEventListener(
            "click",
            function () {

                cambiarFoto(index);

            }
        );


        contenedorIndicadores
            .appendChild(punto);

    }
);


const indicadores =
    document.querySelectorAll(
        ".indicador"
    );


function cambiarFoto(index) {

    fotoActual = index;


    if (
        fotoActual < 0
    ) {

        fotoActual =
            fotos.length - 1;

    }


    if (
        fotoActual >=
        fotos.length
    ) {

        fotoActual = 0;

    }


    marco.classList.add(
        "cambiando"
    );


    setTimeout(
        function () {

            imagen.src =
                fotos[fotoActual].src;

            frase.textContent =
                fotos[fotoActual].frase;

            numero.textContent =
                `${String(
                    fotoActual + 1
                ).padStart(
                    2,"0"
                )} / 07`;


            indicadores.forEach(
                (punto,index) => {

                    punto.classList.toggle(
                        "activo",
                        index ===
                        fotoActual
                    );

                }
            );


            miniaturas.forEach(
                (miniatura,index) => {

                    miniatura.classList.toggle(
                        "activa",
                        index ===
                        fotoActual
                    );

                }
            );


            marco.classList.remove(
                "cambiando"
            );

        },
        150
    );

}


document
    .getElementById(
        "fotoAnterior"
    )
    .addEventListener(
        "click",
        function () {

            cambiarFoto(
                fotoActual - 1
            );

        }
    );


document
    .getElementById(
        "fotoSiguiente"
    )
    .addEventListener(
        "click",
        function () {

            cambiarFoto(
                fotoActual + 1
            );

        }
    );


miniaturas.forEach(
    (miniatura) => {

        miniatura.addEventListener(
            "click",
            function () {

                cambiarFoto(
                    Number(
                        this.dataset.foto
                    )
                );

            }
        );

    }
);


cambiarFoto(0);


/* ==========================================
   DESLIZAR CON EL DEDO
========================================== */

let touchInicio = 0;


marco.addEventListener(
    "touchstart",
    function (evento) {

        touchInicio =
            evento.changedTouches[0]
            .screenX;

    },
    {
        passive: true
    }
);


marco.addEventListener(
    "touchend",
    function (evento) {

        const final =
            evento.changedTouches[0]
            .screenX;


        const diferencia =
            touchInicio - final;


        if (
            Math.abs(
                diferencia
            ) > 50
        ) {

            cambiarFoto(
                diferencia > 0
                    ? fotoActual + 1
                    : fotoActual - 1
            );

        }

    },
    {
        passive: true
    }
);


/* ==========================================
   FLORES CAYENDO
========================================== */

const lluvia =
    document.getElementById(
        "lluviaFlores"
    );


function crearFlor() {

    const flor =
        document.createElement(
            "span"
        );


    flor.classList.add(
        "flor-caida"
    );


    const opciones = [
        "🌻",
        "🌼",
        "💛"
    ];


    flor.textContent =
        opciones[
            Math.floor(
                Math.random()
                * opciones.length
            )
        ];


    flor.style.left =
        Math.random()
        * 100
        + "%";


    flor.style.fontSize =
        16
        +
        Math.random()
        * 25
        +
        "px";


    flor.style.animationDuration =
        5
        +
        Math.random()
        * 5
        +
        "s";


    lluvia.appendChild(
        flor
    );


    setTimeout(
        function () {

            flor.remove();

        },
        11000
    );

}


function comenzarFlores() {

    if (
        intervaloFlores
    ) {

        clearInterval(
            intervaloFlores
        );

    }


    for (
        let i = 0;
        i < 15;
        i++
    ) {

        setTimeout(
            crearFlor,
            i * 100
        );

    }


    intervaloFlores =
        setInterval(
            crearFlor,
            750
        );

}


/* ==========================================
   SORPRESA FINAL
========================================== */

document
    .getElementById(
        "btnSorpresaFinal"
    )
    .addEventListener(
        "click",
        function () {

            document
                .getElementById(
                    "sorpresaFinal"
                )
                .classList.add(
                    "visible"
                );


            this.style.display =
                "none";


            for (
                let i = 0;
                i < 25;
                i++
            ) {

                setTimeout(
                    crearFlor,
                    i * 80
                );

            }

        }
    );


/* ==========================================
   ESTRELLAS FUGACES
========================================== */

const espacioFugaces =
    document.getElementById(
        "estrellasFugaces"
    );


function estrellaFugaz() {

    const estrella =
        document.createElement(
            "span"
        );


    estrella.classList.add(
        "estrella-fugaz"
    );


    estrella.style.top =
        Math.random()
        * 45
        + "%";


    estrella.style.left =
        60
        +
        Math.random()
        * 40
        + "%";


    espacioFugaces.appendChild(
        estrella
    );


    setTimeout(
        function () {

            estrella.remove();

        },
        1800
    );

}


setInterval(
    estrellaFugaz,
    4500
);


/* ==========================================
   TECLADO DE PC
========================================== */

document.addEventListener(
    "keydown",
    function (evento) {

        if (
            !login.classList.contains(
                "activa"
            )
        ) {

            return;

        }


        if (
            /^[0-9]$/.test(
                evento.key
            )
            &&
            passwordActual.length < 6
        ) {

            passwordActual +=
                evento.key;

            actualizarPassword();


            if (
                passwordActual.length === 6
            ) {

                comprobarPassword();

            }

        }


        if (
            evento.key ===
            "Backspace"
        ) {

            passwordActual =
                passwordActual.slice(
                    0,-1
                );

            actualizarPassword();

        }

    }
);