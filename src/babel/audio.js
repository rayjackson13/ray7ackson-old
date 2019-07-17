const Player = require('./player')
const music = require('./music').music
const parser = require('./parser')
const scroller = require('./scroller')

module.exports = () => {
    const playButton = document.getElementById('audioPlay')
    const nextButton = document.getElementById('audioNext')
    const prevButton = document.getElementById('audioPrev')
    const { album, id } = parser.parseLinkReference()

    const player = new Player({
        element: document.getElementById('audioPlayer'),
        playButton,
        nextButton,
        prevButton
    })

    const buy = {
        price: document.getElementById('audioPrice'),
        link: document.getElementById('audioBuy')
    }

    const listMusic = document.querySelector('.music-player-content')
    const albumItems = document.querySelectorAll('.music-player-albums--item')
    let currentAlbumN = album && album.idAlbum || 0  
    for (let albumNode of albumItems) {
        albumNode.onclick = (e) => {
            currentAlbumN = parseInt(e.currentTarget.getAttribute('data-album'))
            showCurrentAlbum()
        }
    }

    const showCurrentAlbum = () => {
        clearMusic()
        player.element.isPlaying && player.pause()
        const albumNode = document.querySelector(`.music-player-albums--item[data-album="${currentAlbumN}"]`)
        for (let node of albumItems) {
            node.classList.contains('active') && node.classList.remove('active')
        }
        albumNode.classList.add('active')
        const currentAlbum = music[currentAlbumN]
        buy.price.innerText = currentAlbum.price
        buy.link.setAttribute('href', currentAlbum.link)

        player.setQueue(currentAlbum)
        fillMusic(currentAlbum.songs)
    }

    const clearMusic = () => {
        const list = document.querySelector('.music-player-content')
        list.innerHTML = ''
    }

    const fillMusic = (songs) => {
        for (let song of songs) {
            let a = document.createElement('span')
            a.setAttribute('data-index', song.id)
            a.classList.add('music-player-content--item')
            listMusic.appendChild(a)

            let button = document.createElement('button')
            button.setAttribute('type', 'button')
            button.classList.add('music-player-content--item-button')
            button.onclick = songClick
            a.appendChild(button)

            let icon = document.createElement('i')
            icon.classList.add('fas')
            icon.classList.add('fa-play')
            icon.classList.add('music-player-content--item-icon')
            button.appendChild(icon)

            let span = document.createElement('span')
            span.classList.add('music-player-content--item-name')
            span.innerText = song.title
            a.appendChild(span)
        }
    }

    const removeActive = () => {
        for (let song of document.querySelectorAll('.music-player-content--item')) {
            song.classList.contains('active') && song.classList.remove('active')
        }
    }

    const songClick = (e) => {
        const button = e.currentTarget
        const song = button.parentElement
        button.classList.remove('fa-play')
        button.classList.add('fa-pause')
        removeActive()
        song.classList.add('active')
        player.setTrack(song.getAttribute('data-index'))
        player.play()
    }

    playButton.onclick = () => {
        if (player.element.paused) {
            if (player.element.getAttribute('src') !== null) {
                player.play()
                return;
            }

            removeActive()
            const item = document.querySelector(`.music-player-content--item[data-index="${ 0 }"]`);
            if (item) {
                item.classList.add('active')
                player.setTrack(0)
                player.play()
            }
            return;
        }

        player.pause()
    }

    const playNext = () => {
        removeActive()
        player.playNext()
        const item = document.querySelector(`.music-player-content--item[data-index="${player.song}"]`);
        if (item) {
            item.classList.add('active')
            return
        } 

        player.pause()
    }

    nextButton.onclick = playNext

    prevButton.onclick = () => {
        removeActive()
        player.playPrev()
        const item = document.querySelector(`.music-player-content--item[data-index="${player.song}"]`);
        if (item) {
            item.classList.add('active');
        } 
    }

    player.element.onended = playNext

    setCurrentSong = () => {
        if (!album || id === null) {
            return
        }
        player.setQueue(album)
        player.setTrack(id)
        const element = document.querySelector(`.music-player-content--item[data-index="${player.song}"]`)
        if (!element) {
            return
        }
        element.classList.add('active')
        player.play()
    }

    scrollToView = () => {
        if (!album || id === null) {
            return
        }

        const element = document.querySelector('.music') 
        scroller.scrollCenter(element, 250)  
    }

    showCurrentAlbum()
    setTimeout(setCurrentSong, 500)
    scrollToView() 
}