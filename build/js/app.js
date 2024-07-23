document.addEventListener('DOMContentLoaded', function() {
    gallery();
})

function gallery () {
    const galeria = document.querySelector('.galeria-imagenes')
    const CANTIDAD_DE_IMAGENES = 16;
    for(let i = 1; i <= CANTIDAD_DE_IMAGENES; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `source/imgs/${i}.jpg`;

        galeria.appendChild(imagen);
    }

}