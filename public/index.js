window.addEventListener("message", async (event) => {
    let data_arr = event.data.split(';');
    for (const command_index in data_arr) {
        let command = data_arr[command_index];
        let input = getInput(command);
        switch (getCommand(command)) {
            case "bare":
                __uv$config.bare = input;
                break;
            case "url":
                if (!isUrl(input)) input = 'https://www.google.com/search?q=' + input;
                else if (!(input.startsWith('https://') || input.startsWith('http://'))) input = 'http://' + input;
                try {
                    await registerSW()
                } catch (err) {
                    throw err;
                };
                location.href = __uv$config.prefix + __uv$config.encodeUrl(input);
                break;
            default:
                console.log("Bad Input - " + command)
        }
    }
});

// returns true if input, false if command for the webpage, and null if neither
function getCommand(val){;
    return val.substr(0, val.indexOf(':'));
}

// cuts the command prefix from the window message
function getInput(val) {
    return val.substr(val.indexOf(':') + 1);
}

function isUrl(val = '') {
    if (/^http(s?):\/\//.test(val) || val.includes('.') && val.substr(0, 1) !== ' ') return true;
    return false;
}
