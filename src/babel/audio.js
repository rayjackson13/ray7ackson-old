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
                link: '/music/somesay.mp3'
            },
            {
                id: 1,
                title: 'Something Special',
                link: ''
            },
            {
                id: 2,
                title: 'What Am I To Say',
                link: ''
            },
            {
                id: 3,
                title: 'Runnin\' Home To You',
                link: ''
            },
            {
                id: 4,
                title: 'Wicked Game',
                link: ''
            },
            {
                id: 5,
                title: 'Lost Without You',
                link: ''
            },
            {
                id: 6,
                title: 'Кладбище Самолётов',
                link: ''
            }
        ]
    }
]

const player = new Player({
    element: document.getElementById('audioPlayer'),
    playButton: document.getElementById('audioPlay'),
    nextButton: document.getElementById('audioNext'),
    prevButton: document.getElementById('audioPrev')
})

const buy = {
    price: document.getElementById('audioPrice'),
    link: document.getElementById('audioBuy')
}

const listMusic = document.querySelector('.music-player-content')
const currentAlbumN = 0

const showCurrentAlbum = () => {
    const currentAlbum = music[currentAlbumN]
    buy.price.innerText = currentAlbum.price
    buy.link.setAttribute('href', currentAlbum.link)
    fillMusic(currentAlbum.songs)
}

const fillMusic = (songs) => {
    for (let song of songs) {
        let a = document.createElement('span')
        a.setAttribute('data-uri', song.link)
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
    player.setTrack(song.getAttribute('data-uri'))
    player.play()
}

showCurrentAlbum()