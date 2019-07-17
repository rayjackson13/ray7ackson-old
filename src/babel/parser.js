const { getSongById } = require('./music');

const getInfoString = (string) => {
    if (typeof string !== 'string') {
        return string
    }
    return string
        .replace('-', '')
        .replace('\'', '')
        .split(/(\s+)/g)
        .filter(el => el.trim().length > 0)
        .join('-')
}

module.exports = {
    setLinkReference: (album, song) => {
        if (!song) {
            return;
        }
        const { title, idGlobal: id } = song
        const link = `?${ id }-${ getInfoString(album) }-${ getInfoString(title) }`
        const { href } = window.location 
        const questionIndex = href.indexOf('?')
        let baseLink
        if (questionIndex === -1) {
            baseLink = href.slice(window.location.origin.length, href.length)
            window.history.pushState(null, null, baseLink + link)
            return
        }

        baseLink = href.slice(window.location.origin.length, questionIndex)
        window.history.replaceState(null, null, baseLink + link)
    },
    parseLinkReference: () => {
        const href = window.location.href
        const matches = href.match(/\/\?/gi)    
        if (!matches || !matches.length) {
            return { album: null, id: null}
        }
    
        const match = matches[0]
        const query = href.slice(href.indexOf(match) + match.length, href.length)
        const idSong = parseInt(query.split('-')[0])
        const { album, id } = getSongById(idSong)
        return { album, id }
    }
}