
const mongoose = require('mongoose');
const Commands = require('../../command');

const commands = [
    {
        command: "kubectl cp /tmp/foo_dir my-pod:/tmp/bar_dir",
        description: "Copy /tmp/foo_dir local directory to /tmp/bar_dir in a remote pod in the current namespace",
        guide: "Use this to transfer a local directory to a pod's directory in the current namespace",
        category: "copying",
        tags: ["cp", "local", "directory", "pod", "namespace"]
      },
      {
        command: "kubectl cp /tmp/foo my-pod:/tmp/bar -c my-container",
        description: "Copy /tmp/foo local file to /tmp/bar in a remote pod in a specific container",
        guide: "Use this to transfer a local file to a specific container within a pod",
        category: "copying",
        tags: ["cp", "local", "file", "container", "pod"]
      },
      {
        command: "kubectl cp /tmp/foo my-namespace/my-pod:/tmp/bar",
        description: "Copy /tmp/foo local file to /tmp/bar in a remote pod in namespace my-namespace",
        guide: "Use this to transfer a local file to a pod's directory in a specific namespace",
        category: "copying",
        tags: ["cp", "local", "file", "namespace", "pod"]
      },
      {
        command: "kubectl cp my-namespace/my-pod:/tmp/foo /tmp/bar",
        description: "Copy /tmp/foo from a remote pod to /tmp/bar locally",
        guide: "Use this to retrieve a file from a remote pod to your local system",
        category: "copying",
        tags: ["cp", "remote", "file", "local", "pod", "namespace"]
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