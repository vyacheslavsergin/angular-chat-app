import {AfterViewInit, Component, Host, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';

import {isEmpty} from '../shared/utils';
import {ChatService} from '../shared/services/chat.service';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.scss']
})
export class ChatPageComponent implements AfterViewInit, OnInit, OnDestroy {

  @HostBinding('class.app-chat-page') appChatPage: Host = true;

  form: FormGroup;

  node = null;

  user = null;
  room: string = null;
  message: string = null;
  messages = [];

  constructor(private route: ActivatedRoute,
              private chatService: ChatService) {
  }

  ngOnInit(): void {

    this.chatService.connect().subscribe(data => {
        console.log('/**');
        console.log('* connect', data);
        console.log('*/');
    });

    this.form = new FormGroup({
      message: new FormControl(
        null
      )
    });

    this.route.queryParams.subscribe((params: Params) => {
      this.user = {
        name: params.name,
        room: params.room,
      };

      this.chatService.getSocket().emit('join', this.user, data => {
        if (typeof data === 'string') {
          console.error(data);
        } else {
          this.user.id = data.userId;
          this.initializeConnection();
        }
      });
    });
  }

  ngAfterViewInit() {
    this.node = document.documentElement;
  }

  scrollToBottom() {
    setTimeout(() => {
      document.documentElement.scrollTop = this.node.scrollHeight;
    });
  }

  initializeConnection() {
    this.chatService.messageNew().subscribe(message => {

      this.scrollToBottom();

      this.messages = [...this.messages, message];
    });
  }

  ngOnDestroy() {
    this.chatService.getSocket().emit('disconnect');
    this.chatService.getSocket().off();
  }

  sendMessage() {
    console.log('sendMessage');

    const messageData = {
      text: this.form.value.message,
      name: this.user.name,
      id: this.user.id,
    };

    this.chatService.getSocket().emit('message:create', messageData, err => {
      if (err) {
        console.error(err);
      } else {
        this.form.reset({
          message: ''
        });
      }
    });
  }

  onKeyDownHandler(event: any) {

    if (event.key === 'Enter') {
      event.preventDefault();
    }

    if (event.key !== 'Enter' || isEmpty(this.form.value.message)) {
      return;
    }

    this.sendMessage();
  }
}
