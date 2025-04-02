const Commands= require('../command.js');

const getAllCommands = async () =>{
    try {
        const commands = await Commands.find({});
        return commands;
    } catch (error) {
        console.error("Error getting commands: ", error);
        throw error;
    }
}

module.exports = getAllCommands;