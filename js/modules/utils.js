const lang = require('../lang/en/en');

class Utils {
    getDate(name) {
        const lang = new Messages(); // 
        const message = lang.greeting.replace('%1', name);
        const serverTime = new Date();
        
        // Return entirely in blue using server-generated inline HTML styling
        return `<div style="color: blue;">${message} ${serverTime}</div>`;
    }
}

module.exports = Utils;