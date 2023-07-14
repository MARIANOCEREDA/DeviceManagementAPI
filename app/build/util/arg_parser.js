"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function displayOptions() {
    const args = process.argv.slice(2);
    let port = 3000;
    args.forEach((arg, index) => {
        switch (arg) {
            case "--help":
                console.log("Displaying help...");
                console.log("--port <port>. Port to run server.");
                break;
            case "--port":
                // Assuming the next argument is the output file path
                port = parseInt(args[index + 1]);
                break;
            default:
                if (arg.startsWith("--")) {
                    console.log(`Unknown argument: ${arg}`);
                }
                break;
        }
    });
    return { port };
}
exports.default = displayOptions;
