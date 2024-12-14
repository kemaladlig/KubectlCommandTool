
const mongoose = require('mongoose');
const Commands = require('../../command');
const commands = [
    {
      command: 'kubectl config view',
      description: 'Show Merged kubeconfig settings.',
      guide: 'Use this command to view merged kubeconfig settings.',
      category: 'context and configuration',
      tags: ['kubeconfig', 'view']
    },
    {
      command: 'KUBECONFIG=~/.kube/config:~/.kube/kubconfig2',
      description: 'Use multiple kubeconfig files at the same time and view merged config.',
      guide: 'Set the KUBECONFIG environment variable to use multiple config files.',
      category: 'context and configuration',
      tags: ['kubeconfig', 'multiple']
    },
    {
      command: 'kubectl config view -o jsonpath=\'{.users[?(@.name == "e2e")].user.password}\'',
      description: 'Get the password for the e2e user.',
      guide: 'Use jsonpath to extract the password for a specific user.',
      category: 'context and configuration',
      tags: ['jsonpath', 'user', 'password']
    },
    {
      command: 'kubectl config view --raw',
      description: 'Show merged kubeconfig settings and raw certificate data and exposed secrets.',
      guide: 'This command displays the raw merged kubeconfig settings.',
      category: 'context and configuration',
      tags: ['kubeconfig', 'raw', 'certificate']
    },
    {
      command: 'kubectl config view -o jsonpath=\'{.users[?(@.name == "e2e")].user.password}\'',
      description: 'Get the certificate for the e2e user.',
      guide: 'Use jsonpath to fetch certificate information for the specified user.',
      category: 'context and configuration',
      tags: ['jsonpath', 'user', 'certificate']
    },
    {
      command: 'kubectl config view --raw -o jsonpath=\'{.users[?(@.name == "e2e")].user.client-certificate-data}\' | base64 -d',
      description: 'Decode the client certificate for the e2e user.',
      guide: 'Extract and decode the client certificate data using base64.',
      category: 'context and configuration',
      tags: ['certificate', 'decode', 'base64']
    },
    {
      command: 'kubectl config view -o jsonpath=\'{.users[].name}\'',
      description: 'Display the first user.',
      guide: 'Use jsonpath to show the first user listed in kubeconfig.',
      category: 'context and configuration',
      tags: ['jsonpath', 'users']
    },
    {
      command: 'kubectl config view -o jsonpath=\'{.users[*].name}\'',
      description: 'Get a list of users.',
      guide: 'Use jsonpath to list all users from the kubeconfig.',
      category: 'context and configuration',
      tags: ['jsonpath', 'users']
    },
    {
      command: 'kubectl config get-contexts',
      description: 'Display list of contexts.',
      guide: 'Shows all contexts available in the kubeconfig.',
      category: 'context and configuration',
      tags: ['contexts', 'list']
    },
    {
      command: 'kubectl config get-contexts -o name',
      description: 'Get all context names.',
      guide: 'Use this command to retrieve names of all contexts.',
      category: 'context and configuration',
      tags: ['contexts', 'names']
    },
    {
      command: 'kubectl config current-context',
      description: 'Display the current-context.',
      guide: 'This command shows the context currently in use.',
      category: 'context and configuration',
      tags: ['contexts', 'current']
    },
    {
      command: 'kubectl config use-context my-cluster-name',
      description: 'Set the default context to my-cluster-name.',
      guide: 'Change the current context to a specific cluster.',
      category: 'context and configuration',
      tags: ['contexts', 'default', 'cluster']
    },
    {
      command: 'kubectl config set-cluster my-cluster-name',
      description: 'Set a cluster entry in the kubeconfig.',
      guide: 'Add or modify a cluster entry in the kubeconfig.',
      category: 'context and configuration',
      tags: ['cluster', 'kubeconfig']
    },
    {
      command: 'kubectl config set-cluster my-cluster-name --proxy-url=my-proxy-url',
      description: 'Configure the URL to a proxy server for this client.',
      guide: 'Set a proxy URL for the specified cluster.',
      category: 'context and configuration',
      tags: ['cluster', 'proxy', 'url']
    },
    {
      command: 'kubectl config set-credentials kubeuser/foo.kubernetes.com --username=kubeuser --password=kubepassword',
      description: 'Add a new user to your kubeconf that supports basic auth.',
      guide: 'Define a user with username and password in the kubeconfig.',
      category: 'context and configuration',
      tags: ['user', 'credentials', 'auth']
    },
    {
      command: 'kubectl config set-context --current --namespace=ggckad-s2',
      description: 'Permanently save the namespace for all subsequent kubectl commands in that context.',
      guide: 'Set a default namespace for the current context.',
      category: 'context and configuration',
      tags: ['namespace', 'context']
    },
    {
      command: 'kubectl config set-context gce --user=cluster-admin --namespace=foo \ && kubectl config use-context gce',
      description: 'Set a context utilizing a specific username and namespace.',
      guide: 'Create a context with a specific user and namespace, then switch to it.',
      category: 'context and configuration',
      tags: ['context', 'user', 'namespace']
    },
    {
      command: 'kubectl config unset users.foo',
      description: 'Delete user foo.',
      guide: 'This command removes a user entry from the kubeconfig.',
      category: 'context and configuration',
      tags: ['user', 'delete']
    },
    {
      command: "alias kx='f() { [ \"$1\" ] && kubectl config use-context $1 || kubectl config current-context ; } ; f'",
      description: 'Alias for quickly switching or displaying contexts.',
      guide: 'Define this alias to streamline context management.',
      category: 'context and configuration',
      tags: ['alias', 'contexts', 'switch']
    },
    {
      command: "alias kn='f() { [ \"$1\" ] && kubectl config set-context --current --namespace $1 || kubectl config view --minify | grep namespace | cut -d\" \" -f6 ; } ; f'",
      description: 'Short alias to set/show context/namespace.',
      guide: 'Use this alias for quick namespace management.',
      category: 'context and configuration',
      tags: ['alias', 'namespace']
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