
const mongoose = require('mongoose');
const Commands = require('../../command');

const commands = [
    {
      "command": "kubectl logs my-pod",
      "description": "Dump pod logs (stdout)",
      "guide": "Use this to retrieve logs from a pod's standard output",
      "category": "interacting with running pods",
      "tags": ["logs", "pod", "stdout"]
    },
    {
      "command": "kubectl logs -l name=myLabel",
      "description": "Dump pod logs with label 'name=myLabel' (stdout)",
      "guide": "Retrieve logs from all pods matching the specified label",
      "category": "interacting with running pods",
      "tags": ["logs", "label", "stdout"]
    },
    {
      "command": "kubectl logs my-pod --previous",
      "description": "Dump pod logs (stdout) for a previous instantiation of a container",
      "guide": "View logs from the last terminated instance of a pod's container",
      "category": "interacting with running pods",
      "tags": ["logs", "pod", "previous"]
    },
    {
      "command": "kubectl logs my-pod -c my-container",
      "description": "Dump logs of a specific container in a pod (stdout, multi-container case)",
      "guide": "Use this to retrieve logs for a specific container in a pod",
      "category": "interacting with running pods",
      "tags": ["logs", "container", "stdout"]
    },
    {
      "command": "kubectl logs -l name=myLabel -c my-container",
      "description": "Dump logs of a specific container with label 'name=myLabel' (stdout)",
      "guide": "Retrieve container logs for all pods matching the specified label",
      "category": "interacting with running pods",
      "tags": ["logs", "label", "container", "stdout"]
    },
    {
      "command": "kubectl logs my-pod -c my-container --previous",
      "description": "Dump logs of a specific container for its previous instance (stdout, multi-container case)",
      "guide": "View logs from the last terminated instance of a specific container in a pod",
      "category": "interacting with running pods",
      "tags": ["logs", "container", "previous", "stdout"]
    },
    {
      "command": "kubectl logs -f my-pod",
      "description": "Stream logs from a pod (stdout)",
      "guide": "Continuously stream logs from a pod to monitor activity",
      "category": "interacting with running pods",
      "tags": ["logs", "stream", "stdout"]
    },
    {
      "command": "kubectl logs -f my-pod -c my-container",
      "description": "Stream logs of a specific container in a pod (stdout)",
      "guide": "Monitor logs in real-time for a specific container in a pod",
      "category": "interacting with running pods",
      "tags": ["logs", "container", "stream", "stdout"]
    },
    {
      "command": "kubectl logs -f -l name=myLabel --all-containers",
      "description": "Stream logs from all containers in pods with label 'name=myLabel' (stdout)",
      "guide": "Real-time logging for all containers in pods matching a label",
      "category": "interacting with running pods",
      "tags": ["logs", "stream", "all-containers", "label"]
    },
    {
      "command": "kubectl run -i --tty busybox --image=busybox:1.28 -- sh",
      "description": "Run a pod as an interactive shell",
      "guide": "Launch an interactive shell session in a new pod",
      "category": "interacting with running pods",
      "tags": ["run", "interactive", "shell"]
    },
    {
      "command": "kubectl run nginx --image=nginx -n mynamespace",
      "description": "Start a single instance of an nginx pod in the namespace 'mynamespace'",
      "guide": "Deploy a basic pod in a specific namespace",
      "category": "interacting with running pods",
      "tags": ["run", "namespace", "nginx"]
    },
    {
      "command": "kubectl run nginx --image=nginx --dry-run=client -o yaml > pod.yaml",
      "description": "Generate a pod spec for nginx and save it to a file",
      "guide": "Create a YAML file to define a pod without running it",
      "category": "interacting with running pods",
      "tags": ["run", "dry-run", "yaml"]
    },
    {
      "command": "kubectl attach my-pod -i",
      "description": "Attach to a running container in a pod",
      "guide": "Connect to a running pod for interaction",
      "category": "interacting with running pods",
      "tags": ["attach", "container", "pod"]
    },
    {
      "command": "kubectl port-forward my-pod 5000:6000",
      "description": "Forward local port 5000 to port 6000 on the pod",
      "guide": "Use this to access a pod's application via local port",
      "category": "interacting with running pods",
      "tags": ["port-forward", "pod", "local"]
    },
    {
      "command": "kubectl exec my-pod -- ls /",
      "description": "Run a command in an existing pod (1 container case)",
      "guide": "Execute a command inside a running pod",
      "category": "interacting with running pods",
      "tags": ["exec", "command", "pod"]
    },
    {
      "command": "kubectl exec --stdin --tty my-pod -- /bin/sh",
      "description": "Access an interactive shell in a running pod (1 container case)",
      "guide": "Start an interactive shell session inside a pod",
      "category": "interacting with running pods",
      "tags": ["exec", "interactive", "shell"]
    },
    {
      "command": "kubectl exec my-pod -c my-container -- ls /",
      "description": "Run a command in a specific container in a pod",
      "guide": "Execute a command inside a specific container of a pod",
      "category": "interacting with running pods",
      "tags": ["exec", "container", "command"]
    },
    {
      "command": "kubectl debug my-pod -it --image=busybox:1.28",
      "description": "Create an interactive debugging session within an existing pod",
      "guide": "Debug a pod by creating a temporary debugging container",
      "category": "interacting with running pods",
      "tags": ["debug", "interactive", "pod"]
    },
    {
      "command": "kubectl debug node/my-node -it --image=busybox:1.28",
      "description": "Create an interactive debugging session on a node",
      "guide": "Debug a node by attaching a temporary container",
      "category": "interacting with running pods",
      "tags": ["debug", "node", "interactive"]
    },
    {
      "command": "kubectl top pod",
      "description": "Show metrics for all pods in the default namespace",
      "guide": "View resource usage metrics for pods",
      "category": "interacting with running pods",
      "tags": ["top", "metrics", "pods"]
    },
    {
      "command": "kubectl top pod POD_NAME --containers",
      "description": "Show metrics for a specific pod and its containers",
      "guide": "View detailed metrics for a pod and its containers",
      "category": "interacting with running pods",
      "tags": ["top", "metrics", "pod", "containers"]
    },
    {
      "command": "kubectl top pod POD_NAME --sort-by=cpu",
      "description": "Show metrics for a pod and sort by CPU usage",
      "guide": "Sort resource usage metrics by CPU or memory for a pod",
      "category": "interacting with running pods",
      "tags": ["top", "metrics", "sort", "cpu"]
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