
const mongoose = require('mongoose');
const Commands = require('../command');

const commands = [
    {
        "command": "kubectl delete -f ./pod.json",
        "description": "Delete a pod using the type and name specified in pod.json",
        "guide": "Use this to delete a pod defined in a JSON configuration file",
        "category": "deleting resources",
        "tags": ["delete", "pod", "json", "file"]
      },
      {
        "command": "kubectl delete pod unwanted --now",
        "description": "Delete a pod named 'unwanted' with no grace period",
        "guide": "Immediately delete a pod without waiting for the usual termination grace period",
        "category": "deleting resources",
        "tags": ["delete", "pod", "grace period", "now"]
      },
      {
        "command": "kubectl delete pod,service baz foo",
        "description": "Delete pods and services with the names 'baz' and 'foo'",
        "guide": "Use this to delete multiple resources (pods and services) by name",
        "category": "deleting resources",
        "tags": ["delete", "pod", "service", "multiple"]
      },
      {
        "command": "kubectl delete pods,services -l name=myLabel",
        "description": "Delete pods and services with the label 'name=myLabel'",
        "guide": "Use this to delete resources based on their label",
        "category": "deleting resources",
        "tags": ["delete", "label", "pods", "services", "myLabel"]
      },
      {
        "command": "kubectl -n my-ns delete pod,svc --all",
        "description": "Delete all pods and services in the namespace 'my-ns'",
        "guide": "Use this to delete every pod and service within a specific namespace",
        "category": "deleting resources",
        "tags": ["delete", "all", "namespace", "pods", "services"]
      },
      {
        "command": "kubectl get pods -n mynamespace --no-headers=true | awk '/pattern1|pattern2/{print $1}' | xargs kubectl delete -n mynamespace pod",
        "description": "Delete all pods in 'mynamespace' matching the patterns 'pattern1' or 'pattern2'",
        "guide": "Use this to delete specific pods by filtering their names with patterns using 'awk'",
        "category": "deleting resources",
        "tags": ["delete", "pattern", "pods", "namespace", "awk"]
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