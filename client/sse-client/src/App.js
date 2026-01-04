import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    // Connect to SSE server - use environment variable for production
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4000";
    const eventSource = new EventSource(`${API_URL}/events`);

    eventSource.onopen = () => {
      setConnectionStatus('Connected');
    };

    eventSource.onmessage = (event) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        event.data
      ]);
    };

    eventSource.onerror = () => {
      setConnectionStatus('Connection Error');
    };

    // Cleanup when component unmounts
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📡 Live Server Updates (SSE)</h2>
      <p style={{ color: connectionStatus === 'Connected' ? 'green' : 'red' }}>
        Status: {connectionStatus}
      </p>
      <div style={{ marginTop: "20px" }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ 
            background: "#f0f0f0", 
            padding: "10px", 
            margin: "5px 0", 
            borderRadius: "4px" 
          }}>
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
