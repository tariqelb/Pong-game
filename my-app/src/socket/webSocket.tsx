// websocketService.ts
import { io, Socket } from 'socket.io-client';

const serverUrl = 'ws://localhost:4012';

class WebSocketService {
  private socket: Socket | null = null;

  connect() 
  {
    this.socket = io(serverUrl, {
      path: '/',
      transportOptions: WebSocket,
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Error connecting to the WebSocket server 45 :', error);
    });
  }

  sendMessage(message: string) 
  {
    if (this.socket && this.socket.connected)
    {
      this.socket.emit('sendMessage', { message });
    }
  }
  
  disconnect() 
  {
    if (this.socket && this.socket.connected)
        this.socket.disconnect();
  }

  // Add more methods as needed
}

const websocketService = new WebSocketService();

export default websocketService;
