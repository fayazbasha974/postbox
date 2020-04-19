import { Component, OnInit } from '@angular/core';
import { FindFriendService } from './find-friend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.page.html',
  styleUrls: ['./find-friend.page.scss'],
})
export class FindFriendPage implements OnInit {

  mobileNumber: number;
  findFriends: any;

  constructor(private friendService: FindFriendService, private router: Router) { }

  ngOnInit() {
  }

  Search() {
    this.friendService.findFriend({mobileNumber: this.mobileNumber}).subscribe(success => {
      console.log(success);
      this.findFriends = success[0];
    }, error => {
      console.log(error);
    });
  }

  sendRequest() {
    this.friendService.sendRequest({mobileNumber: this.findFriends.mobileNumber}).subscribe(success => {
      console.log(success);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error);
    });
  }

  back() {
    window.history.back();
  }

}
