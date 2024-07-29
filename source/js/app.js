document.addEventListener('DOMContentLoaded', function() {
    gallery();
    navegacion();
    enlace();
    unclick();
    sectionSl();
})


function sectionSl () {
    const navLinks = document.querySelectorAll('.links a');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();


            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: 'smooth'});
        });
    });
}

function enlace () {
    document.addEventListener('scroll', function () {
        const section = document.querySelectorAll('section')
        const links = document.querySelectorAll('.links a')

        let actual = ''

        section.forEach(section =>{
            const top = section.offsetTop;
            const height = section.clientHeight;

            if(window.scrollY >= (top - height / 3)){
                actual = section.id
            }
        })

        links.forEach(link =>{
            link.classList.remove('actual');
            if(link.getAttribute('href') === '#' + actual){
                link.classList.add('actual');
            }
        })
    })
}

function navegacion() {
    const header = document.querySelector('.header');
    const firstSection = document.querySelector('.firstSection');

    window.addEventListener('scroll', function() {
        if(firstSection.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed'); //Esto es para que la barra de navegación se quede en la parte superior de la pantalla
        }
        else{
            header.classList.remove('fixed');
        }
    })
}

function gallery () {
    const galeria = document.querySelector('.galeria-imagenes')
    const CANTIDAD_DE_IMAGENES = 16;
    for(let i = 1; i <= CANTIDAD_DE_IMAGENES; i++){
        const imagen = document.createElement('PICTURE')
        imagen.innerHTML = `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;
        // imagen.src = `src/img/gallery/thumb/${i}.jpg`
        imagen.alt = 'Imagen de galeria'

        //EventHandler
        imagen.onclick = function () {
            modal(i);
        }
        galeria.appendChild(imagen)
    }

}

function unclick() {
    const wrapper = document.querySelector('.btn-hero');
    const question = document.querySelector('.question');
    const yesBtn = document.querySelector('.yes-btn');
    const noBtn = document.querySelector('.no-btn');
    

    yesBtn.addEventListener('click', () => {
        question.innerHTML = "Yo tambien quiero besarte!";
    });

    noBtn.addEventListener('mouseover', () => {
        const wrapperRect = wrapper.getBoundingClientRect();
        const noRect = noBtn.getBoundingClientRect();
    
        // Ensure `i` and `j` are within the bounds of the wrapper
        const i = Math.floor(Math.random() * (wrapperRect.width - noRect.width));
        const j = Math.floor(Math.random() * (wrapperRect.height - noRect.height));
    
        noBtn.style.left = i + 'px';
        noBtn.style.top = j + 'px';
    });
}

function modal (i) {
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML= `
        <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
    `;

    const modal = document.createElement('DIV')
    modal.classList.add('modal');
    modal.onclick = cerrarModal;

    const body = document.querySelector('body')
    body.classList.add('overflow')
    body.appendChild(modal)

    const botonCerrar = document.createElement('BUTTON')
    botonCerrar.textContent = 'X'
    botonCerrar.classList.add('cerrarModal')
    botonCerrar.onclick = cerrarModal

    modal.appendChild(imagen)
    modal.appendChild(botonCerrar);
}

function cerrarModal (){
    const modal = document.querySelector('.modal')
    modal.classList.add('fade-out')
    setTimeout(() => {
        modal?.remove()

        const body = document.querySelector('body')
        body.classList.remove('ovewflow')
    }, 500)
}

