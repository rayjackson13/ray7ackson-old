var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(values) {
        _classCallCheck(this, Player);

        this.element = values.element;
        this.playButton = values.playButton;
        this.nextButton = values.nextButton;
        this.prevButton = values.prevButton;

        this.playButton.querySelector('i.fas').classList.add('fa-play-circle');
    }

    _createClass(Player, [{
        key: 'setQueue',
        value: function setQueue(album) {
            this.queue = album.songs;
        }
    }, {
        key: 'setTrack',
        value: function setTrack(index) {
            this.song = index;
            this.element.setAttribute('src', this.queue[index].link);
        }
    }, {
        key: 'play',
        value: function play() {
            this.element.play();
            this.playButton.removeChild(this.playButton.querySelector('svg'));
            var icon = document.createElement('i');
            icon.classList.add('fas');
            icon.classList.add('fa-pause-circle');
            this.playButton.appendChild(icon);
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.element.pause();
            this.playButton.removeChild(this.playButton.querySelector('svg'));
            var icon = document.createElement('i');
            icon.classList.add('fas');
            icon.classList.add('fa-play-circle');
            this.playButton.appendChild(icon);
        }
    }, {
        key: 'playNext',
        value: function playNext() {
            this.song++;
            if (this.song < this.queue.length) {
                this.setTrack(this.song);
                this.play();
            } else {
                this.pause();
                this.song = 0;
                this.setTrack(this.song);
            }
        }
    }, {
        key: 'playPrev',
        value: function playPrev() {
            this.song--;
            this.setTrack(this.song);
            this.play();
        }
    }]);

    return Player;
}();