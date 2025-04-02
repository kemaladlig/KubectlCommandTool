
const mongoose = require('mongoose');
const Commands = require('../../command');

const commands = [
    {
      command: 'kubectl apply -f ./my-manifest.yaml',
      description: 'Create resource(s) defined in a manifest file.',
      guide: 'Apply the resources described in the specified manifest file.',
      category: 'object creation',
      tags: ['apply', 'manifest', 'resource']
    },
    {
      command: 'kubectl apply -f ./my1.yaml -f ./my2.yaml',
      description: 'Create resources from multiple manifest files.',
      guide: 'Apply resources described in multiple manifest files.',
      category: 'object creation',
      tags: ['apply', 'multiple', 'manifest']
    },
    {
      command: 'kubectl apply -f ./dir',
      description: 'Create resource(s) in all manifest files in a directory.',
      guide: 'Apply all resources described in the manifest files within a directory.',
      category: 'object creation',
      tags: ['apply', 'directory', 'manifest']
    },
    {
      command: 'kubectl apply -f https://example.com/manifest.yaml',
      description: 'Create resource(s) from a URL.',
      guide: 'Apply resources described in a manifest file from a URL.',
      category: 'object creation',
      tags: ['apply', 'url', 'manifest']
    },
    {
      command: 'kubectl create deployment nginx --image=nginx',
      description: 'Start a single instance of nginx.',
      guide: 'Use the create deployment command to start a basic nginx deployment.',
      category: 'object creation',
      tags: ['create', 'deployment', 'nginx']
    },
    {
      command: 'kubectl create job hello --image=busybox:1.28 -- echo "Hello World"',
      description: 'Create a Job which prints "Hello World".',
      guide: 'Define a Job resource that runs a simple task to print a message.',
      category: 'object creation',
      tags: ['create', 'job', 'hello']
    },
    {
      command: 'kubectl create cronjob hello --image=busybox:1.28 --schedule="*/1 * * * *" -- echo "Hello World"',
      description: 'Create a CronJob that prints "Hello World" every minute.',
      guide: 'Define a CronJob resource for scheduled tasks.',
      category: 'object creation',
      tags: ['create', 'cronjob', 'hello']
    },
    {
      command: 'kubectl apply -f - <<EOF\napiVersion: v1\nkind: Pod\nmetadata:\n  name: busybox-sleep\nspec:\n  containers:\n  - name: busybox\n    image: busybox:1.28\n    args:\n    - sleep\n    - "1000000"\n---\napiVersion: v1\nkind: Pod\nmetadata:\n  name: busybox-sleep-less\nspec:\n  containers:\n  - name: busybox\n    image: busybox:1.28\n    args:\n    - sleep\n    - "1000"\nEOF',
      description: 'Create multiple YAML objects from stdin.',
      guide: 'Apply multiple resource definitions provided via stdin.',
      category: 'object creation',
      tags: ['apply', 'stdin', 'yaml']
    },
    {
      command: 'kubectl apply -f - <<EOF\napiVersion: v1\nkind: Secret\nmetadata:\n  name: mysecret\ntype: Opaque\ndata:\n  password: $(echo -n "s33msi4" | base64 -w0)\n  username: $(echo -n "jane" | base64 -w0)\nEOF',
      description: 'Create a secret with several keys.',
      guide: 'Define and apply a secret resource using encoded data.',
      category: 'object creation',
      tags: ['apply', 'secret', 'base64']
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