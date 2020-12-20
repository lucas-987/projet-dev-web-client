export default {
    shuffleArray: (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    },

    randInt: (max) => {
        return Math.floor(Math.random() * Math.floor(max - 1) + 1);
    }
}