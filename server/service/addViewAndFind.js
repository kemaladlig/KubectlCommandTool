
const mongoose = require('mongoose');
const Commands = require('../command');

const commands = [
    {
      command: "kubectl get services",
      description: "List all services in the namespace",
      guide: "Use this to get an overview of all services available",
      category: "viewing and finding resources",
      tags: ["get", "services", "list"]
    },
    {
      command: "kubectl get pods --all-namespaces",
      description: "List all pods in all namespaces",
      guide: "Use this to view pods across all namespaces",
      category: "viewing and finding resources",
      tags: ["get", "pods", "all", "namespaces"]
    },
    {
      command: "kubectl get pods -o wide",
      description: "List all pods in the current namespace, with more details",
      guide: "Use this to get more detailed information about pods",
      category: "viewing and finding resources",
      tags: ["get", "pods", "wide"]
    },
    {
      command: "kubectl get deployment my-dep",
      description: "List a particular deployment",
      guide: "Use this to view details of a specific deployment",
      category: "viewing and finding resources",
      tags: ["get", "deployment", "list"]
    },
    {
      command: "kubectl get pods",
      description: "List all pods in the namespace",
      guide: "Use this to view pods in the current namespace",
      category: "viewing and finding resources",
      tags: ["get", "pods", "list"]
    },
    {
      command: "kubectl get pod my-pod -o yaml",
      description: "Get a pod's YAML",
      guide: "Use this to view a pod's configuration in YAML format",
      category: "viewing and finding resources",
      tags: ["get", "pod", "yaml"]
    },
    {
      command: "kubectl describe nodes my-node",
      description: "Describe a particular node",
      guide: "Use this to get detailed information about a node",
      category: "viewing and finding resources",
      tags: ["describe", "nodes"]
    },
    {
      command: "kubectl describe pods my-pod",
      description: "Describe a particular pod",
      guide: "Use this to get detailed information about a pod",
      category: "viewing and finding resources",
      tags: ["describe", "pods"]
    },
    {
      command: "kubectl get services --sort-by=.metadata.name",
      description: "List services sorted by name",
      guide: "Use this to sort services by their name",
      category: "viewing and finding resources",
      tags: ["get", "services", "sort"]
    },
    {
      command: "kubectl get pods --sort-by='.status.containerStatuses[0].restartCount'",
      description: "List pods sorted by restart count",
      guide: "Use this to sort pods by their restart count",
      category: "viewing and finding resources",
      tags: ["get", "pods", "sort", "restartCount"]
    },
    {
      command: "kubectl get pv --sort-by=.spec.capacity.storage",
      description: "List persistent volumes sorted by capacity",
      guide: "Use this to sort persistent volumes by their storage capacity",
      category: "viewing and finding resources",
      tags: ["get", "pv", "sort", "capacity"]
    },
    {
      command: "kubectl get pods --selector=app=cassandra -o jsonpath='{.items[*].metadata.labels.version}'",
      description: "Get the version label of all pods with label app=cassandra",
      guide: "Use this to retrieve the version label for all Cassandra app pods",
      category: "viewing and finding resources",
      tags: ["get", "pods", "selector", "version"]
    },
    {
      command: "kubectl get configmap myconfig -o jsonpath='{.data.ca\\.crt}'",
      description: "Retrieve the value of a key with dots, e.g. 'ca.crt'",
      guide: "Use this to get the value of a specific key in a configmap",
      category: "viewing and finding resources",
      tags: ["get", "configmap", "key"]
    },
    {
      command: "kubectl get secret my-secret --template='{{index .data \"key-name-with-dashes\"}}'",
      description: "Retrieve a base64 encoded value with dashes instead of underscores",
      guide: "Use this to get a specific key's value from a secret",
      category: "viewing and finding resources",
      tags: ["get", "secret", "base64"]
    },
    {
      command: "kubectl get node --selector='!node-role.kubernetes.io/control-plane'",
      description: "Get all worker nodes excluding control-plane nodes",
      guide: "Use this to get worker nodes by excluding control-plane nodes",
      category: "viewing and finding resources",
      tags: ["get", "node", "worker", "exclude"]
    },
    {
      command: "kubectl get pods --field-selector=status.phase=Running",
      description: "Get all running pods in the namespace",
      guide: "Use this to view only the running pods in the current namespace",
      category: "viewing and finding resources",
      tags: ["get", "pods", "running"]
    },
    {
      command: "kubectl get nodes -o jsonpath='{.items[*].status.addresses[?(@.type==\"ExternalIP\")].address}'",
      description: "Get external IPs of all nodes",
      guide: "Use this to retrieve the external IPs of all nodes",
      category: "viewing and finding resources",
      tags: ["get", "nodes", "externalIP"]
    },
    {
      command: "sel=${$(kubectl get rc my-rc --output=json | jq -j '.spec.selector | to_entries | .[] | \"\(.key)=\(.value),\"')%?} echo $(kubectl get pods --selector=$sel --output=jsonpath={.items..metadata.name})",
      description: "List names of pods that belong to a particular RC",
      guide: "Use this to list pod names associated with a replication controller",
      category: "viewing and finding resources",
      tags: ["get", "pods", "rc", "names"]
    },
    {
      command: "kubectl get pods --show-labels",
      description: "Show labels for all pods",
      guide: "Use this to view the labels of all pods",
      category: "viewing and finding resources",
      tags: ["get", "pods", "labels"]
    },
    {
      command: "JSONPATH='{range .items[*]}{@.metadata.name}:{range @.status.conditions[*]}{@.type}={@.status};{end}{end}' && kubectl get nodes -o jsonpath=\"$JSONPATH\" | grep \"Ready=True\"",
      description: "Check which nodes are ready",
      guide: "Use this to find nodes that are in the 'Ready' state",
      category: "viewing and finding resources",
      tags: ["get", "nodes", "ready"]
    },
    {
      command: "kubectl get node -o custom-columns='NODE_NAME:.metadata.name,STATUS:.status.conditions[?(@.type==\"Ready\")].status'",
      description: "Check which nodes are ready with custom columns",
      guide: "Use this to display nodes and their readiness status in custom columns",
      category: "viewing and finding resources",
      tags: ["get", "node", "status", "custom"]
    },
    {
      command: "kubectl get secret my-secret -o go-template='{{range $k,$v := .data}}{{\"### \"}}{{$k}}{{\"\\n\"}}{{$v|base64decode}}{{\"\\n\\n\"}}{{end}}'",
      description: "Output decoded secrets without external tools",
      guide: "Use this to decode the base64 secrets directly in the terminal",
      category: "viewing and finding resources",
      tags: ["get", "secret", "decode"]
    },
    {
      command: "kubectl get pods -o json | jq '.items[].spec.containers[].env[]?.valueFrom.secretKeyRef.name' | grep -v null | sort | uniq",
      description: "List all secrets currently in use by a pod",
      guide: "Use this to view all secrets used by containers in pods",
      category: "viewing and finding resources",
      tags: ["get", "pods", "secret", "env"]
    },
    {
      command: "kubectl get pods --all-namespaces -o jsonpath='{range .items[*].status.initContainerStatuses[*]}{.containerID}{\"\\n\"}{end}' | cut -d/ -f3",
      description: "List all containerIDs of initContainers of all pods",
      guide: "Use this to list the container IDs of initContainers for all pods",
      category: "viewing and finding resources",
      tags: ["get", "pods", "initContainers"]
    },
    {
      command: "kubectl get events --sort-by=.metadata.creationTimestamp",
      description: "List events sorted by timestamp",
      guide: "Use this to view events sorted by their creation time",
      category: "viewing and finding resources",
      tags: ["get", "events", "sort", "timestamp"]
    },
    {
      command: "kubectl events --types=Warning",
      description: "List all warning events",
      guide: "Use this to view only warning events",
      category: "viewing and finding resources",
      tags: ["get", "events", "warning"]
    },
    {
      command: "kubectl diff -f ./my-manifest.yaml",
      description: "Compare the current state of the cluster against the state that the cluster would be in if the manifest was applied",
      guide: "Use this to check the differences between the current and desired state",
      category: "viewing and finding resources",
      tags: ["diff", "manifest", "compare"]
    },
    {
      command: "kubectl get nodes -o json | jq -c 'paths|join(\".\")'",
      description: "Produce a period-delimited tree of all keys returned for nodes",
      guide: "Use this to explore all keys in the nodes JSON structure",
      category: "viewing and finding resources",
      tags: ["get", "nodes", "jq"]
    },
    {
      command: "kubectl get pods -o json | jq -c 'paths|join(\".\")'",
      description: "Produce a period-delimited tree of all keys returned for pods",
      guide: "Use this to explore all keys in the pods JSON structure",
      category: "viewing and finding resources",
      tags: ["get", "pods", "jq"]
    },
    {
      command: "for pod in $(kubectl get po --output=jsonpath={.items..metadata.name}); do echo $pod && kubectl exec -it $pod -- env; done",
      description: "Produce ENV for all pods",
      guide: "Use this to run commands across all pods in the namespace",
      category: "viewing and finding resources",
      tags: ["exec", "env", "pods"]
    },
    {
      command: "kubectl get deployment nginx-deployment --subresource=status",
      description: "Get a deployment's status subresource",
      guide: "Use this to view the status of a deployment",
      category: "viewing and finding resources",
      tags: ["get", "deployment", "status"]
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