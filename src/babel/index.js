const handleAudio = require('./audio');
const handleFloatingMenu = require('./follow');
const handleMetrics = require('./metrics');
const handleSlider = require('./slider');
const initializeSnow = require('./topper');

;(() => {
    handleFloatingMenu();
    
    window.onload = () => {
        handleMetrics();
        handleSlider(); 
        handleAudio();
        initializeSnow();
    }
})();