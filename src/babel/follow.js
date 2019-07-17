const FIXED = 'fixed-top'

const handleFloatingMenu = (wrapper, header) => {
    const scroll = window.pageYOffset;
    const offset = wrapper.offsetTop;
    const { classList } = header;
    if (scroll < offset && classList.contains(FIXED)) {
        classList.remove(FIXED); 
    }

    if (scroll >= offset) {
        classList.add(FIXED)
    }
}

module.exports = () => {
    follow = document.querySelector('.header-follow');
    header = document.querySelector('.header-follow > .navbar');

    window.addEventListener('scroll', () => handleFloatingMenu(follow, header));
    handleFloatingMenu(follow, header);
}