
const mongoose = require('mongoose');
const Commands = require('../../command');

const commands = [
    {
        command: "kubectl cordon my-node",
        description: "Mark my-node as unschedulable",
        guide: "Use this to prevent new pods from being scheduled on my-node",
        category: "interacting nodes and cluster",
        tags: ["cordon", "node", "unschedulable"]
      },
      {
        command: "kubectl drain my-node",
        description: "Drain my-node in preparation for maintenance",
        guide: "Use this to evict all pods from my-node for maintenance purposes",
        category: "interacting nodes and cluster",
        tags: ["drain", "node", "maintenance"]
      },
      {
        command: "kubectl uncordon my-node",
        description: "Mark my-node as schedulable",
        guide: "Use this to allow pods to be scheduled on my-node again",
        category: "interacting nodes and cluster",
        tags: ["uncordon", "node", "schedulable"]
      },
      {
        command: "kubectl top node",
        description: "Show metrics for all nodes",
        guide: "Use this to monitor resource usage across all nodes",
        category: "interacting nodes and cluster",
        tags: ["top", "node", "metrics", "all-nodes"]
      },
      {
        command: "kubectl top node my-node",
        description: "Show metrics for a given node",
        guide: "Use this to monitor resource usage on a specific node",
        category: "interacting nodes and cluster",
        tags: ["top", "node", "metrics", "specific-node"]
      },
      {
        command: "kubectl cluster-info",
        description: "Display addresses of the master and services",
        guide: "Use this to get details about the cluster's master and services",
        category: "interacting nodes and cluster",
        tags: ["cluster-info", "master", "services"]
      },
      {
        command: "kubectl cluster-info dump",
        description: "Dump current cluster state to stdout",
        guide: "Use this to output the entire cluster's current state to the console",
        category: "interacting nodes and cluster",
        tags: ["cluster-info", "dump", "state", "stdout"]
      },
      {
        command: "kubectl cluster-info dump --output-directory=/path/to/cluster-state",
        description: "Dump current cluster state to /path/to/cluster-state",
        guide: "Use this to save the current cluster state to a specified directory",
        category: "interacting nodes and cluster",
        tags: ["cluster-info", "dump", "state", "directory"]
      },
      {
        command: "kubectl get nodes -o='custom-columns=NodeName:.metadata.name,TaintKey:.spec.taints[*].key,TaintValue:.spec.taints[*].value,TaintEffect:.spec.taints[*].effect'",
        description: "View existing taints on the current nodes",
        guide: "Use this to see a list of taints applied to nodes in the cluster",
        category: "interacting nodes and cluster",
        tags: ["get", "nodes", "taints", "custom-columns"]
      },
      {
        command: "kubectl taint nodes foo dedicated=special-user:NoSchedule",
        description: "If a taint with that key and effect already exists, its value is replaced as specified",
        guide: "Use this to apply or update a taint on a node to control pod scheduling",
        category: "interacting nodes and cluster",
        tags: ["taint", "nodes", "scheduling"]
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