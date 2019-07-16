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
    
}