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
                link: ''
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
        a.classList.add('music-player-content--item')
        a.onclick = songClick
        a.innerText = song.title
        listMusic.appendChild(a)
    }
}

const removeActive = () => {
    for (let song of document.querySelectorAll('.music-player-content--item')) {
        song.classList.contains('active') && song.classList.remove('active')
    }
}

const songClick = (e) => {
    const song = e.currentTarget
    removeActive()
    song.classList.add('active')
}

showCurrentAlbum()