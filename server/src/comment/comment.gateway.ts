import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: { origin: "http://localhost:3000", credentials: true },
})
export class CommentGateway {
  @WebSocketServer()
  server: Server;

  emitNewComment(videoId: string, comment: any) {
    this.server.to(`video:${videoId}`).emit("newComment", comment);
  }

  @SubscribeMessage("joinVideo")
  handleJoinVideo(
    @MessageBody() videoId: string,
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`video:${videoId}`);
  }
}
