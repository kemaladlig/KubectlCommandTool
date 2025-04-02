
const mongoose = require('mongoose');
const Commands = require('../../command');

const commands = [
    {
        "command": "kubectl set image deployment/frontend www=image:v2",
        "description": "Rolling update 'www' containers of 'frontend' deployment, updating the image",
        "guide": "Use this to update the image of the containers in a deployment",
        "category": "updating resources",
        "tags": ["set", "image", "deployment", "update"]
      },
      {
        "command": "kubectl rollout history deployment/frontend",
        "description": "Check the history of deployments including the revision",
        "guide": "Use this to view the deployment's revision history",
        "category": "updating resources",
        "tags": ["rollout", "history", "deployment"]
      },
      {
        "command": "kubectl rollout undo deployment/frontend",
        "description": "Rollback to the previous deployment",
        "guide": "Use this to rollback a deployment to its previous state",
        "category": "updating resources",
        "tags": ["rollout", "undo", "deployment"]
      },
      {
        "command": "kubectl rollout undo deployment/frontend --to-revision=2",
        "description": "Rollback to a specific revision",
        "guide": "Use this to rollback a deployment to a specific revision",
        "category": "updating resources",
        "tags": ["rollout", "undo", "deployment", "revision"]
      },
      {
        "command": "kubectl rollout status -w deployment/frontend",
        "description": "Watch rolling update status of 'frontend' deployment until completion",
        "guide": "Use this to watch the status of a rolling update until it finishes",
        "category": "updating resources",
        "tags": ["rollout", "status", "deployment", "watch"]
      },
      {
        "command": "kubectl rollout restart deployment/frontend",
        "description": "Rolling restart of the 'frontend' deployment",
        "guide": "Use this to restart a deployment, causing the containers to be recreated",
        "category": "updating resources",
        "tags": ["rollout", "restart", "deployment"]
      },
      {
        "command": "cat pod.json | kubectl replace -f -",
        "description": "Replace a pod based on the JSON passed into stdin",
        "guide": "Use this to replace a pod with the configuration from a JSON file",
        "category": "updating resources",
        "tags": ["replace", "pod", "json"]
      },
      {
        "command": "kubectl replace --force -f ./pod.json",
        "description": "Force replace, delete and then re-create the resource. Will cause a service outage.",
        "guide": "Use this to forcefully replace a resource, potentially causing downtime",
        "category": "updating resources",
        "tags": ["replace", "force", "pod", "service"]
      },
      {
        "command": "kubectl expose rc nginx --port=80 --target-port=8000",
        "description": "Create a service for a replicated nginx, which serves on port 80 and connects to the containers on port 8000",
        "guide": "Use this to expose a replication controller as a service",
        "category": "updating resources",
        "tags": ["expose", "rc", "nginx", "service"]
      },
      {
        "command": "kubectl get pod mypod -o yaml | sed 's/\\(image: myimage\\):.*$/\\1:v4/' | kubectl replace -f -",
        "description": "Update a single-container pod's image version (tag) to v4",
        "guide": "Use this to update the image version of a pod container",
        "category": "updating resources",
        "tags": ["update", "image", "pod", "replace"]
      },
      {
        "command": "kubectl label pods my-pod new-label=awesome",
        "description": "Add a Label",
        "guide": "Use this to add a label to a pod",
        "category": "updating resources",
        "tags": ["label", "add", "pod"]
      },
      {
        "command": "kubectl label pods my-pod new-label-",
        "description": "Remove a label",
        "guide": "Use this to remove a label from a pod",
        "category": "updating resources",
        "tags": ["label", "remove", "pod"]
      },
      {
        "command": "kubectl label pods my-pod new-label=new-value --overwrite",
        "description": "Overwrite an existing label with a new value",
        "guide": "Use this to update the value of an existing label",
        "category": "updating resources",
        "tags": ["label", "overwrite", "pod"]
      },
      {
        "command": "kubectl annotate pods my-pod icon-url=http://goo.gl/XXBTWq",
        "description": "Add an annotation",
        "guide": "Use this to add an annotation to a pod",
        "category": "updating resources",
        "tags": ["annotate", "add", "pod"]
      },
      {
        "command": "kubectl annotate pods my-pod icon-url-",
        "description": "Remove annotation",
        "guide": "Use this to remove an annotation from a pod",
        "category": "updating resources",
        "tags": ["annotate", "remove", "pod"]
      },
      {
        "command": "kubectl autoscale deployment foo --min=2 --max=10",
        "description": "Auto scale a deployment 'foo' with min and max replicas",
        "guide": "Use this to automatically scale the number of replicas of a deployment",
        "category": "updating resources",
        "tags": ["autoscale", "deployment", "scale"]
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