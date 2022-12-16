const detectPort = require('detect-port-alt');
const inquirer = require('inquirer');

exports.choosePort = async (defaultPort) => {
    try{
        const port = await detectPort(defaultPort);
        console.log("порты", port === defaultPort)
        if(port === defaultPort) {
            return defaultPort;
        } else {
            const message = `Port ${defaultPort} is already in use.`;
            if(process.stdout.isTTY) {
                const questionName = "changePort";
                const question =  {
                    type: 'confirm',
                    name: questionName,
                    message: `${message} Do you want to run the app on another port?`,
                    default: true,
                }
                const result = await inquirer.createPromptModule(question);
                return result.prompts.confirm ? port : null;
            }
            console.log(message);
        }
    } catch(err) {
        console.log(`Error!`);
        console.error(err.message || err);
    }
    return null
}