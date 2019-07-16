;(function() {
    const music = [
        {
            title: 'Something Special',
            date: '2017-09-23',
            price: '7$',
            link: 'https://rayjackson.bandcamp.com/album/something-special',
            songs: [
                {
                    id: 0,
                    title: 'In Your Eyes',
                    link: '/music/something_special/1.mp3'
                },
                {
                    id: 1,
                    title: 'Something Special',
                    link: '/music/something_special/2.mp3'
                },
                {
                    id: 2,
                    title: 'What Am I To Say',
                    link: '/music/something_special/3.mp3'
                },
                {
                    id: 3,
                    title: 'Runnin\' Home To You',
                    link: '/music/something_special/4.mp3'
                },
                {
                    id: 4,
                    title: 'Wicked Game',
                    link: '/music/something_special/5.mp3'
                },
                {
                    id: 5,
                    title: 'Lost Without You',
                    link: '/music/something_special/6.mp3'
                },
                {
                    id: 6,
                    title: 'Кладбище Самолётов',
                    link: '/music/something_special/7.mp3'
                }
            ]
        },
        {
            title: 'Home - Single',
            date: '2017-10-23',
            price: '1$',
            link: 'https://rayjackson.bandcamp.com/album/home-single',
            songs: [
                {
                    id: 0,
                    title: 'Home',
                    link: '/music/home/1.mp3'
                }
            ]
        }
    ]

    const playButton = document.getElementById('audioPlay')
    const nextButton = document.getElementById('audioNext')
    const prevButton = document.getElementById('audioPrev')

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
    let currentAlbumN = 0
    for (let albumNode of albumItems) {
        albumNode.onclick = (e) => {
            currentAlbumN = parseInt(e.currentTarget.getAttribute('data-album'))
            showCurrentAlbum()
        }
    }

    const showCurrentAlbum = () => {
        clearMusic()
        player.element.isPlaying && player.pause()
        const albumNode = $(`.music-player-albums--item[data-album=${currentAlbumN}]`)[0]
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
            } else {
                removeActive()
                $(`.music-player-content--item[data-index=${ 0 }]`).addClass('active')
                player.setTrack(0)
                player.play()
            }
        } else {
            player.pause()
        }
    }

    nextButton.onclick = () => {
        removeActive()
        player.playNext()
        if ($(`.music-player-content--item[data-index=${player.song}]`).length > 0) {
            $(`.music-player-content--item[data-index=${player.song}]`).addClass('active')
        } else {
            player.pause()
        }
    }

    prevButton.onclick = () => {
        removeActive()
        player.playPrev()
        if ($(`.music-player-content--item[data-index=${player.song}]`).length > 0) {
            $(`.music-player-content--item[data-index=${player.song}]`).addClass('active')
        }
    }

    player.element.onended = () => {
        removeActive()
        player.playNext()
        if ($(`.music-player-content--item[data-index=${player.song}]`).length > 0) {
            $(`.music-player-content--item[data-index=${player.song}]`).addClass('active')
        } else {
            player.pause()
        }
    }

    showCurrentAlbum()
})();