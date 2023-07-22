"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function displayOptions() {
    const args = process.argv.slice(2);
    let port = 3000;
    let auth = 'jwt';
    args.forEach((arg, index) => {
        switch (arg) {
            case "--help":
                console.log("Displaying help...");
                console.log("--port <port>. Port to run server.");
                console.log("--auth [jwt,google]. Port to run server.");
                break;
            case "--port":
                // Assuming the next argument is the output file path
                port = parseInt(args[index + 1]);
                break;
            case "--auth":
                // Assuming the next argument is the output file path
                auth = args[index + 1];
                break;
            default:
                if (arg.startsWith("--")) {
                    console.log(`Unknown argument: ${arg}`);
                }
                break;
        }
    });
    return { port, auth };
}
exports.default = displayOptions;
