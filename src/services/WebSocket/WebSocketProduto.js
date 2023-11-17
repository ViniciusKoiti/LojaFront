import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = new SockJS('http://localhost:8080/ws');
const stompClient = Stomp.over(socket);

stompClient.connect({}, (frame) => {
  console.log('Connected:', frame);

  stompClient.subscribe('/produto/promocaoIniciada', (message) => {
    const produtoComPromocao = JSON.parse(message.body);
  });
});
