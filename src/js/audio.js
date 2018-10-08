var music = [{
    title: 'Something Special',
    date: '2017-09-23',
    price: '7$',
    link: 'https://rayjackson.bandcamp.com/album/something-special',
    songs: [{
        id: 0,
        title: 'In Your Eyes',
        link: '/music/something_special/1.mp3'
    }, {
        id: 1,
        title: 'Something Special',
        link: '/music/something_special/2.mp3'
    }, {
        id: 2,
        title: 'What Am I To Say',
        link: '/music/something_special/3.mp3'
    }, {
        id: 3,
        title: 'Runnin\' Home To You',
        link: '/music/something_special/4.mp3'
    }, {
        id: 4,
        title: 'Wicked Game',
        link: '/music/something_special/5.mp3'
    }, {
        id: 5,
        title: 'Lost Without You',
        link: '/music/something_special/6.mp3'
    }, {
        id: 6,
        title: 'Кладбище Самолётов',
        link: '/music/something_special/7.mp3'
    }]
}, {
    title: 'Home - Single',
    date: '2017-10-23',
    price: '1$',
    link: 'https://rayjackson.bandcamp.com/album/home-single',
    songs: [{
        id: 0,
        title: 'Home',
        link: '/music/home/1.mp3'
    }]
}];

var playButton = document.getElementById('audioPlay');
var nextButton = document.getElementById('audioNext');
var prevButton = document.getElementById('audioPrev');

var player = new Player({
    element: document.getElementById('audioPlayer'),
    playButton: playButton,
    nextButton: nextButton,
    prevButton: prevButton
});

var buy = {
    price: document.getElementById('audioPrice'),
    link: document.getElementById('audioBuy')
};

var listMusic = document.querySelector('.music-player-content');
var albumItems = document.querySelectorAll('.music-player-albums--item');
var currentAlbumN = 0;
var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = albumItems[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var albumNode = _step.value;

        albumNode.onclick = function (e) {
            currentAlbumN = parseInt(e.currentTarget.getAttribute('data-album'));
            showCurrentAlbum();
        };
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

var showCurrentAlbum = function showCurrentAlbum() {
    clearMusic();
    player.element.isPlaying && player.pause();
    var albumNode = $('.music-player-albums--item[data-album=' + currentAlbumN + ']')[0];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = albumItems[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var node = _step2.value;

            node.classList.contains('active') && node.classList.remove('active');
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    albumNode.classList.add('active');
    var currentAlbum = music[currentAlbumN];
    buy.price.innerText = currentAlbum.price;
    buy.link.setAttribute('href', currentAlbum.link);

    player.setQueue(currentAlbum);
    fillMusic(currentAlbum.songs);
};

var clearMusic = function clearMusic() {
    var list = document.querySelector('.music-player-content');
    list.innerHTML = '';
};

var fillMusic = function fillMusic(songs) {
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
        for (var _iterator3 = songs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var song = _step3.value;

            var a = document.createElement('span');
            a.setAttribute('data-index', song.id);
            a.classList.add('music-player-content--item');
            listMusic.appendChild(a);

            var button = document.createElement('button');
            button.setAttribute('type', 'button');
            button.classList.add('music-player-content--item-button');
            button.onclick = songClick;
            a.appendChild(button);

            var icon = document.createElement('i');
            icon.classList.add('fas');
            icon.classList.add('fa-play');
            icon.classList.add('music-player-content--item-icon');
            button.appendChild(icon);

            var span = document.createElement('span');
            span.classList.add('music-player-content--item-name');
            span.innerText = song.title;
            a.appendChild(span);
        }
    } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                _iterator3.return();
            }
        } finally {
            if (_didIteratorError3) {
                throw _iteratorError3;
            }
        }
    }
};

var removeActive = function removeActive() {
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
        for (var _iterator4 = document.querySelectorAll('.music-player-content--item')[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
            var song = _step4.value;

            song.classList.contains('active') && song.classList.remove('active');
        }
    } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
            }
        } finally {
            if (_didIteratorError4) {
                throw _iteratorError4;
            }
        }
    }
};

var songClick = function songClick(e) {
    var button = e.currentTarget;
    var song = button.parentElement;
    button.classList.remove('fa-play');
    button.classList.add('fa-pause');
    removeActive();
    song.classList.add('active');
    player.setTrack(song.getAttribute('data-index'));
    player.play();
};

playButton.onclick = function () {
    if (player.element.paused) {
        if (player.element.getAttribute('src') !== null) {
            player.play();
        } else {
            removeActive();
            $('.music-player-content--item[data-index=' + 0 + ']').addClass('active');
            player.setTrack(0);
            player.play();
        }
    } else {
        player.pause();
    }
};

nextButton.onclick = function () {
    removeActive();
    player.playNext();
    if ($('.music-player-content--item[data-index=' + player.song + ']').length > 0) {
        $('.music-player-content--item[data-index=' + player.song + ']').addClass('active');
    } else {
        player.pause();
    }
};

prevButton.onclick = function () {
    removeActive();
    player.playPrev();
    if ($('.music-player-content--item[data-index=' + player.song + ']').length > 0) {
        $('.music-player-content--item[data-index=' + player.song + ']').addClass('active');
    }
};

player.element.onended = function () {
    removeActive();
    player.playNext();
    if ($('.music-player-content--item[data-index=' + player.song + ']').length > 0) {
        $('.music-player-content--item[data-index=' + player.song + ']').addClass('active');
    } else {
        player.pause();
    }
};

showCurrentAlbum();