const music = [
    {
        idAlbum: 0,
        title: 'Something Special',
        date: '2017-09-23',
        price: '7$',
        link: 'https://rayjackson.bandcamp.com/album/something-special',
        songs: [
            {
                id: 0,
                idGlobal: 1,
                title: 'In Your Eyes',
                link: '/music/something_special/1.mp3'
            },
            {
                id: 1,
                idGlobal: 2,
                title: 'Something Special',
                link: '/music/something_special/2.mp3'
            },
            {
                id: 2,
                idGlobal: 3,
                title: 'What Am I To Say',
                link: '/music/something_special/3.mp3'
            },
            {
                id: 3,
                idGlobal: 4,
                title: 'Runnin\' Home To You',
                link: '/music/something_special/4.mp3'
            },
            {
                id: 4,
                idGlobal: 5,
                title: 'Wicked Game',
                link: '/music/something_special/5.mp3'
            },
            {
                id: 5,
                idGlobal: 6,
                title: 'Lost Without You',
                link: '/music/something_special/6.mp3'
            },
            {
                id: 6,
                idGlobal: 7,
                title: 'Кладбище Самолётов',
                link: '/music/something_special/7.mp3'
            }
        ]
    },
    {
        idAlbum: 1,
        title: 'Home - Single',
        date: '2017-10-23',
        price: '1$',
        link: 'https://rayjackson.bandcamp.com/album/home-single',
        songs: [
            {
                id: 0,
                idGlobal: 8,
                title: 'Home',
                link: '/music/home/1.mp3'
            }
        ]
    }
]

module.exports = {
    music: music,
    getSongById: (id) => {
        const idSong = parseInt(id)
        const found = music.find((val) => {
            return val.songs.filter((song) => {
                return song.idGlobal === idSong
            }).length
        })
        if (!found) {
            return { 
                album: null,
                id: null
            } 
        }
        const idNew = found.songs.find((val) => {
            return val.idGlobal === idSong
        })['id']

        return { 
            album: found,
            id: idNew
        } 
    }
}