const messages = require('../../lang/en/en');

class Utils {
    getDate(name) {
        const currentDate = new Date();
        let msg = messages.greeting || "Hello %1, Current Server Date and Time is %2";
        msg = msg.replace('%1', name).replace('%2', currentDate);
        return `<p style="color:blue;">${msg}</p>`;
    }
}

module.exports = Utils;