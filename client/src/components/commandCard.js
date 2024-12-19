import React from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../styles/commandCard.css';

function CommandCard({ command, description }) {

  const handleCopy = async () => {

    try {
      if (!command || typeof command !== 'string') {
        throw new Error('Geçersiz komut: Command boş veya geçersiz bir türde.');
      }

      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(command);
        toast.success(`Komut başarıyla kopyalandı.`, {
          position: 'bottom-center',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark'
        });
      } else {
        throw new Error("Tarayıcınız clipboard API'sini desteklemiyor.");
      }
    } catch (error) {
      console.error('Kopyalama hatası:', error.message);
      toast.error(`Kopyalama hatası: ${error.message}`);
    }
  };

  return (
    <div className="command-card p-3 mb-3 border rounded-3 text-light">
      {/* Komut ve ikon */}
      <div className="d-flex align-items-center justify-content-between">
        <pre className="command-text mb-0">{command}</pre>
        <FaRegCopy
          size={24}
          className="copy-icon"
          onClick={handleCopy}
        />
      </div>

      {/* Açıklama (description) */}
      {description && (
        <p className="description-text mt-3">
          {description}
        </p>
      )}
    </div>
  );
}

export default CommandCard;
