const parser = require('./parser')

class Player {
    constructor(values) {
        this.element = values.element
        this.playButton = values.playButton
        this.nextButton = values.nextButton
        this.prevButton = values.prevButton
    }

    setQueue(album) {
        this.queue = album.songs
        this.album = album.title
    } 

    setTrack(index) {
        this.song = index
        if (this.queue[index]) {
            parser.setLinkReference(this.album, this.queue[index])
            this.element.setAttribute('src', this.queue[index].link)
        }
    }

    play(errorAmount = 0) {
        var promise = this.element.play()
        if (promise) {
            promise
                .then(() => {
                    if (!errorAmount) {
                        this.createIcon('fa-pause-circle')
                    }
                }) 
                .catch((e) => {
                    console.warn('An error occured') 
                    if (errorAmount < 3) {
                        this.play(errorAmount + 1)
                        return
                    }

                    console.warn('Your browser blocks the music from starting.\n', e)
                    this.createIcon('fa-play-circle')
                })
        }
    } 

    pause() {
        this.element.pause()
        this.createIcon('fa-play-circle')
    }

    createIcon(className) {
        const svg = this.playButton.querySelector('svg')
        if (svg) {
            this.playButton.removeChild(svg)
        }
        const icon = document.createElement('i')
        icon.classList.add('fas')
        icon.classList.add(className)
        this.playButton.appendChild(icon)
    }

    playNext() {
        this.song++
        if (this.song < this.queue.length) {
            this.setTrack(this.song)
            this.play()
            return;
        }
        this.pause()
        this.song = 0
        this.setTrack(this.song)
    }

    playPrev() {
        if (this.song > 0) {
            this.song--
            this.setTrack(this.song)
            this.play()
            return
        }

        this.song = 0;
        this.setTrack(0);
        this.play();
    }
}

module.exports = Player