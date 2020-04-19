import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from './chat.service';
import { SocketService } from '../socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  reciever: any;
  message: string;
  chatList: any;

  constructor(private router: Router, private activeRoute: ActivatedRoute, private chatService: ChatService, private socket: SocketService) { }

  ngOnInit() {
    this.checkToken();
    this.message = '';
    this.chatList = [];
    this.activeRoute.queryParams.subscribe(params => {
      this.reciever = params;
      this.getChat();
    });

    this.socket.io.on('msg', data => {
      if (data.sender == this.reciever.mobileNumber) {
        this.appendMessage(data);        
      } else {
        console.log('notification');
      }
    });
  }

  Submit() {
    this.chatService.postMessage({
      mobileNumber: this.reciever.mobileNumber,
      id: this.reciever._id,
      message: this.message
    }).subscribe(success => {
      this.appendMessage(success);
    }, error => {
      console.log(error);
    })
  }

  getChat() {
    this.chatService.getChat({mobileNumber: this.reciever.mobileNumber}).subscribe(
      success => {
        this.chatList = success;
      }, error => {
        console.log(error);
      }
    )
  }

  checkToken() {
    if (localStorage.getItem('token')) {
      this.socket.initialize(localStorage.getItem('mobileNumber'));
    }
  }

  appendMessage(data) {
    this.chatList.push(data);
    this.message = '';
  }

  back() {
    window.history.back();
  }

}
