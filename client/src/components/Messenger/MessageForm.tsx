import React, {useState} from 'react';

import './MessageForm.css';

export interface MessageFormProps {
  sendMessage: (message: string) => void;
}

export const MessageForm: React.FC<MessageFormProps> = ({sendMessage}) => {
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
        data-testid="messageFormText"
      />
      <button>Send Message</button>
    </form>
  );
};