import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import io from 'socket.io-client';

import {keysDev} from '../../../config/keys';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket = io(keysDev.BASE_URL);

  getSocket() {
    return this.socket;
  }

  connect() {
    return new Observable(observer => {
      this.socket.on('connect', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
  }

  usersUpdate() {
    return new Observable(observer => {
      this.socket.on('users:update', (data) => {
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
  }

  messageNew() {
    return new Observable(observer => {
      this.socket.on('message:new', message => {
        observer.next(message);
      });
      return () => { this.socket.disconnect(); };
    });
  }
}
