
const mongoose = require('mongoose');
const Commands = require('../command');

const commands = [
    {
        "command": "kubectl edit svc/docker-registry",
        "description": "Edit the service named docker-registry",
        "guide": "Use this to open the service configuration in your default editor for modifications",
        "category": "editing resources",
        "tags": ["edit", "svc", "service", "docker-registry"]
      },
      {
        "command": "KUBE_EDITOR=\"nano\" kubectl edit svc/docker-registry",
        "description": "Use an alternative editor to edit the service named docker-registry",
        "guide": "Use this to specify a custom editor (e.g., nano) when editing a service configuration",
        "category": "editing resources",
        "tags": ["edit", "svc", "service", "docker-registry", "editor", "nano"]
      }
          
  ];

  const addCommands = async () => {
    try {
      for (const cmd of commands) {
        const commandDoc = new Commands(cmd);
  
        try {
          await commandDoc.save();
          console.log(`Command added: ${cmd.command}`);
        } catch (error) {
          if (error.code === 11000) {
            console.log(`Duplicate command skipped: ${cmd.command}`);
          } else {
            console.error(`Error adding command: ${cmd.command}`, error);
          }
        }
      }
  
      console.log('All commands processed.');
      mongoose.connection.close();
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      mongoose.connection.close();
    }
  };
  
  
module.exports = addCommands;