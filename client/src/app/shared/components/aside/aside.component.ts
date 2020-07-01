import {Component, OnInit} from '@angular/core';

import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})
export class AsideComponent implements OnInit{

  users = null;
  userId = null;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.usersUpdate().subscribe(users => {
      this.users = users;
      this.userId = this.chatService.getSocket().id;
    });
  }
}
