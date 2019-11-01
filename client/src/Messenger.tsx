import React, {useState} from 'react';

export const Messenger: React.FC<{from: string, to: string}> = ({from, to}) => {
  const [message, setMessage] = useState<string>('');

  return (
    <div>
      <ul></ul>
      <form onSubmit={(e) => {e.preventDefault(); console.log(`message: ${message}`)}}>
        <label>
          Message
          <textarea value={message} onChange={e => setMessage(e.target.value)} />
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
};