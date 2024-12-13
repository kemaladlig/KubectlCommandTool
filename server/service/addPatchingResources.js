
const mongoose = require('mongoose');
const Commands = require('../command');

const commands = [
    {
        "command": "kubectl patch node k8s-node-1 -p '{\"spec\":{\"unschedulable\":true}}'",
        "description": "Partially update a node",
        "guide": "Use this to update a node's spec and make it unschedulable",
        "category": "patching resources",
        "tags": ["patch", "node", "unschedulable"]
      },
      {
        "command": "kubectl patch pod valid-pod -p '{\"spec\":{\"containers\":[{\"name\":\"kubernetes-serve-hostname\",\"image\":\"new image\"}]}}'",
        "description": "Update a container's image; spec.containers[*].name is required because it's a merge key",
        "guide": "Use this to update the image of a container in a pod",
        "category": "patching resources",
        "tags": ["patch", "pod", "image", "container"]
      },
      {
        "command": "kubectl patch pod valid-pod --type='json' -p='[{\"op\": \"replace\", \"path\": \"/spec/containers/0/image\", \"value\":\"new image\"}]'",
        "description": "Update a container's image using a json patch with positional arrays",
        "guide": "Use this to replace the image of a container in a pod using a JSON patch",
        "category": "patching resources",
        "tags": ["patch", "json", "pod", "image", "container"]
      },
      {
        "command": "kubectl patch deployment valid-deployment --type json -p='[{\"op\": \"remove\", \"path\": \"/spec/template/spec/containers/0/livenessProbe\"}]'",
        "description": "Disable a deployment livenessProbe using a json patch with positional arrays",
        "guide": "Use this to remove a livenessProbe from a container in a deployment",
        "category": "patching resources",
        "tags": ["patch", "json", "deployment", "livenessProbe"]
      },
      {
        "command": "kubectl patch sa default --type='json' -p='[{\"op\": \"add\", \"path\": \"/secrets/1\", \"value\": {\"name\": \"whatever\"}}]'",
        "description": "Add a new element to a positional array",
        "guide": "Use this to add a new element to the secrets array in a service account",
        "category": "patching resources",
        "tags": ["patch", "json", "sa", "secrets", "add"]
      },
      {
        "command": "kubectl patch deployment nginx-deployment --subresource='scale' --type='merge' -p '{\"spec\":{\"replicas\":2}}'",
        "description": "Update a deployment's replica count by patching its scale subresource",
        "guide": "Use this to scale a deployment by updating the replica count",
        "category": "patching resources",
        "tags": ["patch", "deployment", "scale", "replica"]
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