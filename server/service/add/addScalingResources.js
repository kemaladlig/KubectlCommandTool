
const mongoose = require('mongoose');
const Commands = require('../../command');

const commands = [
    {
        "command": "kubectl scale --replicas=3 rs/foo",
        "description": "Scale a replicaset named 'foo' to 3 replicas",
        "guide": "Use this to increase or decrease the number of pods in the 'foo' replicaset",
        "category": "scaling resources",
        "tags": ["scale", "replicas", "replicaset", "foo"]
      },
      {
        "command": "kubectl scale --replicas=3 -f foo.yaml",
        "description": "Scale a resource specified in 'foo.yaml' to 3 replicas",
        "guide": "Apply scaling to a resource defined in a YAML configuration file",
        "category": "scaling resources",
        "tags": ["scale", "replicas", "yaml", "foo"]
      },
      {
        "command": "kubectl scale --current-replicas=2 --replicas=3 deployment/mysql",
        "description": "Scale the 'mysql' deployment to 3 replicas if its current size is 2",
        "guide": "Use this to scale a deployment with a condition on its current replica count",
        "category": "scaling resources",
        "tags": ["scale", "replicas", "deployment", "mysql"]
      },
      {
        "command": "kubectl scale --replicas=5 rc/foo rc/bar rc/baz",
        "description": "Scale multiple replication controllers ('foo', 'bar', 'baz') to 5 replicas each",
        "guide": "Scale multiple replication controllers simultaneously",
        "category": "scaling resources",
        "tags": ["scale", "replicas", "rc", "foo", "bar", "baz"]
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