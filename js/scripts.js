const iniciar_sesion = document.getElementById('iniciar_sesion');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

iniciar_sesion.addEventListener('click', () => {
    modal_container.classList.add('show');
});

close.addEventListener('click', () => {
    modal_container.classList.remove('show');
});
