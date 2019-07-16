const parser = require('./parser')

class Player {
    constructor(values) {
        this.element = values.element
        this.playButton = values.playButton
        this.nextButton = values.nextButton
        this.prevButton = values.prevButton

        this.playButton.querySelector('i.fas').classList.add('fa-play-circle')
    }

    setQueue(album) {
        this.queue = album.songs
        this.album = album.title
    } 

    setTrack(index) {
        this.song = index
        parser.setLinkReference(this.album, this.queue[index])
        this.element.setAttribute('src', this.queue[index].link)
    }

    play() {
        this.element.play()
        this.playButton.removeChild(this.playButton.querySelector('svg'))
        const icon = document.createElement('i')
        icon.classList.add('fas')
        icon.classList.add('fa-pause-circle')
        this.playButton.appendChild(icon)
    }

    pause() {
        this.element.pause()
        this.playButton.removeChild(this.playButton.querySelector('svg'))
        const icon = document.createElement('i')
        icon.classList.add('fas')
        icon.classList.add('fa-play-circle')
        this.playButton.appendChild(icon)
    }

    playNext() {
        this.song++
        if (this.song < this.queue.length) {
        this.setTrack(this.song)
        this.play()
        } else {
            this.pause()
            this.song = 0
            this.setTrack(this.song)
        }
    }

    playPrev() {
        this.song--
        this.setTrack(this.song)
        this.play()
    }
}

module.exports = Player