/**
 * List of hostnames that are allowed to run serviceworkers on http:
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

async function registerSW() {
    if (
        location.protocol !== "https:" &&
        !swAllowedHostnames.includes(location.hostname)
    )
        throw new Error("Service workers cannot be registered without https.");

    if (!navigator.serviceWorker)
        throw new Error("Your browser doesn't support service workers.");

    // written by Stack Overflow
    console.log(__uv$config);
    await navigator.serviceWorker.register("/uv/sw.js", {
        scope: __uv$config.prefix,
    }).then(function() {
        return navigator.serviceWorker.ready;
    }).then(function(reg) {
        reg.pushManager.subscribe({userVisibleOnly: true}).then(function(sub) {
            reg.active.postMessage(JSON.stringify(__uv$config));
        });
    }).catch(function(error) {
        console.log('Error : ', error);
    });
}
