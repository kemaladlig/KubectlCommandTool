const connectDB = require('../db'); // db.js dosyasındaki MongoDB bağlantısı
const Commands = require('../command'); // Command modelini dahil et

// Yeni komut verisini oluştur
const newCommand = new Commands({
  command: 'kubectl config view',
  description: 'Show Merged kubeconfig settings.',
  examples: [
    {
      commandexp: 'kubectl config view',
      description: 'View the merged kubeconfig settings'
    },
    {
      commandexp: 'kubectl config view --raw',
      description: 'View the raw kubeconfig settings, including certificates'
    }
  ],
  guide: 'This command helps to view the merged kubeconfig settings.',
  category: 'Configuration',
  tags: ['kubeconfig', 'config', 'settings'],
  related_commands: [
    'kubectl config get-contexts',
    'kubectl config use-context'
  ]
});

// Komut verisini kaydetmek için bir fonksiyon oluştur
const addCommand = async () => {
  try {
    // Komutu veritabanına kaydet
    await newCommand.save();
    console.log('Yeni komut başarıyla eklendi');
  } catch (err) {
    console.error('Komut eklenirken hata:', err);
  }
};

// addCommand fonksiyonunu dışa aktar
module.exports = addCommand;