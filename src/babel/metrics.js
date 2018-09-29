$(function() {
    $('a[data-link').click(function(e) {
        var attr = e.currentTarget.getAttribute('data-link');
        if (attr === 'soundcloud') {
            gtag('event', 'soundcloud', {
                'event_category': 'ads'
            });
        } else if (attr === 'bandcamp') {
            gtag('event', 'bandcamp', {
                'event_category': 'ads'
            });
        } else if (attr === 'vk') {
            gtag('event', 'vk', {
                'event_category': 'ads'
            });
        } else if (attr === 'twitter') {
            gtag('event', 'twitter', {
                'event_category': 'ads'
            });
        } else if (attr === 'instagram') {
            gtag('event', 'instagram', {
                'event_category': 'ads'
            });
        } else if (attr === 'ss') {
            gtag('event', 'somethingspecial', {
                'event_category': 'music'
            });
        } else if (attr === 'home') {
            gtag('event', 'home', {
                'event_category': 'music'
            });
        }
    })
})