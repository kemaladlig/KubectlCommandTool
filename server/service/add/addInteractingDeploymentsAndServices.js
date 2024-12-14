
const mongoose = require('mongoose');
const Commands = require('../../command');

const commands = [
    {
        command: "kubectl logs deploy/my-deployment",
        description: "Dump Pod logs for a Deployment (single-container case)",
        guide: "Use this to view logs from a Deployment with a single container",
        category: "interacting deployments and services",
        tags: ["logs", "deploy", "single-container"]
      },
      {
        command: "kubectl logs deploy/my-deployment -c my-container",
        description: "Dump Pod logs for a Deployment (multi-container case)",
        guide: "Use this to view logs from a specific container in a Deployment",
        category: "interacting deployments and services",
        tags: ["logs", "deploy", "multi-container", "container"]
      },
      {
        command: "kubectl port-forward svc/my-service 5000",
        description: "Listen on local port 5000 and forward to port 5000 on Service backend",
        guide: "Use this to create a port-forward to a Service's backend on the same port",
        category: "interacting deployments and services",
        tags: ["port-forward", "service", "local-port", "backend"]
      },
      {
        command: "kubectl port-forward svc/my-service 5000:my-service-port",
        description: "Listen on local port 5000 and forward to Service target port with name <my-service-port>",
        guide: "Use this to create a port-forward from a local port to a named port on a Service",
        category: "interacting deployments and services",
        tags: ["port-forward", "service", "local-port", "target-port"]
      },
      {
        command: "kubectl port-forward deploy/my-deployment 5000:6000",
        description: "Listen on local port 5000 and forward to port 6000 on a Pod created by <my-deployment>",
        guide: "Use this to forward traffic from a local port to a specific port on a Pod created by a Deployment",
        category: "interacting deployments and services",
        tags: ["port-forward", "deploy", "pod", "local-port", "target-port"]
      },
      {
        command: "kubectl exec deploy/my-deployment -- ls",
        description: "Run command in the first Pod and first container in Deployment (single- or multi-container cases)",
        guide: "Use this to execute a command in a Pod created by a Deployment",
        category: "interacting deployments and services",
        tags: ["exec", "deploy", "command", "pod", "container"]
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