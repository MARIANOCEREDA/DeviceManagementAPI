import log4js from 'log4js'

let loggerConfig = {

    appenders:{
        file:{
            type:'file',
            filename:'./log/log.log'
        },
        console:{
            type:'stdout'
        }
    },

    categories:{
        default:{
            appenders:['file', 'console'],
            level:'trace'
        }
    }

}

log4js.configure(loggerConfig)

export default name => log4js.getLogger(name)