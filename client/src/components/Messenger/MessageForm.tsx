import React, {useState} from 'react';

import './MessageForm.css';

export const MessageForm: React.FC<{sendMessage: (message: string) => void}> = ({sendMessage}) => {
  const [message, setMessage] = useState<string>('');

  const handleSendMessage = (e: React.FormEvent) => {
    // Prevent form submission from reloading page
    e.preventDefault();
    sendMessage(message);
    // Clear the message value after sending
    setMessage('');
  };

  return (
    <form onSubmit={handleSendMessage}>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        className="message-text"
      />
      <button>Send Message</button>
    </form>
  );
};