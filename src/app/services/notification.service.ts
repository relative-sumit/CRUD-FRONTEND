import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = this.socket.fromEvent<string>('notification');

  constructor(private socket: Socket) { }

  joinRoom(userId: string) {
    this.socket.emit('join', userId);
  }

  sendNotification(employeeId: string, name: string) {
    this.socket.emit('private-message', { employeeId, name });
  }
}
