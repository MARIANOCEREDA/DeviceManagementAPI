import yargs from 'yargs'

// Define the command-line interface
const argv = yargs
.option('auth', {
    alias: 'a',
    describe: 'Authentication method',
    choices: ['jwt', 'cookies'],
    demandOption: true,
})
.option(
    'port',
    {
        alias:'p',
        describe:'Server port',
        demandOption:true
    }
)
.help()
.alias('help', 'h')
.argv;  

export default argv;