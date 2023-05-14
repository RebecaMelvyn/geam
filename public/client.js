

function App() {
  return 'heyy';
}

let ws

function connect() {
  ws = new WebSocket('ws://localhost:3000/ws');
  ws.onopen = () => {
    console.log('Connected');
    chatStatus.style.backgroundColor = 'green';
  };

  ws.onclose = () => {
    console.log('Disconnected');
    chatStatus.style.backgroundColor = 'red';
    setTimeout(connect, 1000);
  };

  ws.onerror = (error) => {
    console.log('Error', error);
  };

  ws.onmessage = (event) => {
    console.log('Message from server', event.data);
    const { type, data } = JSON.parse(event.data);
    console.log(data);
    if (type === 'reply') {
      addMessage(
        data.user.name,
        data.msg
      );
    }
  };
}

connect()
