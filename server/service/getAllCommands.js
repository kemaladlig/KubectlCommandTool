const mongoose = require('mongoose');
const Commands= require('../command.js');

const getAllCommands = async () =>{
    try {
        const commands = await Commands.find({});
        console.log("Komut sayısı : "+ commands.length);
        return commands;
    } catch (error) {
        console.error("Error getting commands: ", error);
        throw error;
    }
}

module.exports = getAllCommands;