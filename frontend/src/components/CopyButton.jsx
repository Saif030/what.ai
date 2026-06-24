import { useState } from 'react';
import { Copy } from 'lucide-react';

export default function CopyButton({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button className='flex items-center gap-1 text-sm' onClick={handleCopy}>
      <Copy size={14} />
      {isCopied ? 'Copied!' : 'Copy Text'}
    </button>
  );
}
