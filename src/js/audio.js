var music = [{
    title: 'Something Special',
    date: '2017-09-23',
    price: '7$',
    link: 'https://rayjackson.bandcamp.com/album/something-special',
    songs: [{
        id: 0,
        title: 'In Your Eyes',
        link: ''
    }, {
        id: 1,
        title: 'Something Special',
        link: ''
    }, {
        id: 2,
        title: 'What Am I To Say',
        link: ''
    }, {
        id: 3,
        title: 'Runnin\' Home To You',
        link: ''
    }, {
        id: 4,
        title: 'Wicked Game',
        link: ''
    }, {
        id: 5,
        title: 'Lost Without You',
        link: ''
    }, {
        id: 6,
        title: 'Кладбище Самолётов',
        link: ''
    }]
}];

var buy = {
    price: document.getElementById('audioPrice'),
    link: document.getElementById('audioBuy')
};

var listMusic = document.querySelector('.music-player-content');
var currentAlbumN = 0;

var showCurrentAlbum = function showCurrentAlbum() {
    var currentAlbum = music[currentAlbumN];
    buy.price.innerText = currentAlbum.price;
    buy.link.setAttribute('href', currentAlbum.link);
    fillMusic(currentAlbum.songs);
};

var fillMusic = function fillMusic(songs) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = songs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var song = _step.value;

            var a = document.createElement('span');
            a.classList.add('music-player-content--item');
            a.onclick = songClick;
            a.innerText = song.title;
            listMusic.appendChild(a);
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
};

var removeActive = function removeActive() {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = document.querySelectorAll('.music-player-content--item')[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var song = _step2.value;

            song.classList.contains('active') && song.classList.remove('active');
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
};

var songClick = function songClick(e) {
    var song = e.currentTarget;
    removeActive();
    song.classList.add('active');
};

showCurrentAlbum();