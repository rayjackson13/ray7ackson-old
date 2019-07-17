const onLinkClicked = (e) => {
    var attr = e.currentTarget.getAttribute('data-link');
    switch (attr) {
        case 'soundcloud':
        case 'bandcamp':
        case 'vk':
        case 'twitter':
        case 'instagram':
            return gtag('event', attr, {
                'event_category': 'ads'
            });
        case 'ss':
        case 'home':
        default:
            return gtag('event', attr, {
                'event_category': 'music'
            });
    }
}

module.exports = () => {
    const buttons = document.querySelectorAll('a[data-link]');
    buttons.forEach(btn => btn.addEventListener('click', onLinkClicked));
}