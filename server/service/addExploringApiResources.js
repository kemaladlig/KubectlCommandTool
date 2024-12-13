
const mongoose = require('mongoose');
const Commands = require('../command');

const commands = [
    {
        command: "kubectl api-resources",
        description: "List all supported resource types along with their shortnames, API group, whether they are namespaced, and kind",
        guide: "Use this to explore all resource types available in the Kubernetes API",
        category: "exploring api resources",
        tags: ["api-resources", "list", "resource-types"]
      },
      {
        command: "kubectl api-resources --namespaced=true",
        description: "List all namespaced resources",
        guide: "Use this to see resources that are scoped to namespaces",
        category: "exploring api resources",
        tags: ["api-resources", "namespaced", "list"]
      },
      {
        command: "kubectl api-resources --namespaced=false",
        description: "List all non-namespaced resources",
        guide: "Use this to see resources that are not tied to namespaces",
        category: "exploring api resources",
        tags: ["api-resources", "non-namespaced", "list"]
      },
      {
        command: "kubectl api-resources -o name",
        description: "List all resources with simple output (only the resource name)",
        guide: "Use this to quickly get the names of all resources",
        category: "exploring api resources",
        tags: ["api-resources", "output", "simple", "names"]
      },
      {
        command: "kubectl api-resources -o wide",
        description: "List all resources with expanded (aka 'wide') output",
        guide: "Use this to get detailed information about all resources in the API",
        category: "exploring api resources",
        tags: ["api-resources", "output", "wide", "details"]
      },
      {
        command: "kubectl api-resources --verbs=list,get",
        description: "List all resources that support the 'list' and 'get' request verbs",
        guide: "Use this to filter resources based on supported HTTP verbs",
        category: "exploring api resources",
        tags: ["api-resources", "verbs", "list", "get"]
      },
      {
        command: "kubectl api-resources --api-group=extensions",
        description: "List all resources in the 'extensions' API group",
        guide: "Use this to see resources belonging to a specific API group",
        category: "exploring api resources",
        tags: ["api-resources", "api-group", "extensions", "list"]
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