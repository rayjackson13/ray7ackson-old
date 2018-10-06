class Player {
    constructor(values) {
        this.element = values.element
        this.playButton = values.playButton
        this.nextButton = values.nextButton
        this.prevButton = values.prevButton

        this.playButton.querySelector('i.fas').classList.add('fa-play-circle')
        
        this.element.onended = () => {
            this.playNext()
        }
    }

    setQueue(album) {
        this.queue = album.songs
    } 

    setTrack(index) {
        this.song = index
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
        this.setTrack(this.song)
        this.play()
    }

    playPrev() {
        this.song--
        this.setTrack(this.song)
        this.play()
    }
}