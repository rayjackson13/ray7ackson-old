let animationTimeout;

const scrollTo = (to, duration) => {
    if (!duration) {
        clearTimeout(animationTimeout);
        return;
    }

    const difference = to - window.pageYOffset;
    const tick = difference / duration * 10;

    animationTimeout = setTimeout(() => {
        scrollBy(tick);
        if (window.pageYOffset === to) {
            clearTimeout(animationTimeout);
            return;
        }

        scrollTo(to, duration - 10)
    }, 10);
};

const scrollBy = (yOffset) => {
    window.scrollBy(0, yOffset);
};

module.exports = {
    scrollToElement: (element, duration) => {
        scrollTo(element.offsetTop, duration);
    },
    scrollCenter: (element, duration) => {
        const windowHeight = window.innerHeight;
        const elementHeight = element.offsetHeight;
        const top = windowHeight > elementHeight 
            ? element.offsetTop - ((windowHeight - elementHeight) / 2) 
            : element.offsetTop;
        scrollTo(top, duration);
    }
};