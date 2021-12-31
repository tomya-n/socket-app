const express = require('express');
const http = require('http');

const socketIo = require('socket.io');

const app = express();
const server = http.Server(app);

const io = socketIo(server);

const PORT = 3000;
app.use(express.static("views"))

// ルーティングの設定。'/' にリクエストがあった場合 src/index.html を返す
app.get('/', (req, res) => {
  // console.log(__dirname);
  res.sendFile(__dirname + '/views/index.html');
});

// 3000番ポートでHTTPサーバーを起動
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

io.on('connection', (socket) => {
  console.log('connected');
  socket.on("sendMessage",function(message){
    console.log("投稿メッセージ",message);

    // 'receiveMessage' というイベントを発火、受信したメッセージを全てのクライアントに対して送信する
    io.emit('receiveMessage', message);
  })
});