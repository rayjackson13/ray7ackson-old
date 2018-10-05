class Player {
    constructor(values) {
        this.element = values.element
        this.playButton = values.playButton
        this.nextButton = values.nextButton
        this.prevButton = values.prevButton

        this.playButton.querySelector('i.fas').classList.add('fa-play-circle')

        this.playButton.onclick = () => {
            if (this.element.paused) {
                this.element.getAttribute('src') !== null && this.play()
            } else {
                this.pause()
            }
        }
    }

    setTrack(uri) {
        this.element.setAttribute('src', uri)
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
}