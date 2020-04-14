import { Injectable } from '@angular/core';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  io;

  constructor() { }

  initialize(mobileNumber) {
    // this.io = io('http://localhost:3000/');
    this.io = io('https://fazit.herokuapp.com/');
    this.io.emit('changeId', mobileNumber);
  }

}
