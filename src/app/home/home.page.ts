import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  friends: any;
  total: any;
  isRequests: boolean;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails(event?) {
    this.homeService.getDetails().subscribe(response => {
      this.total = response;
      this.friends = this.isRequests ? response.friendRequests : response.friends;
      event ? event.target.complete() : '';
    }, error => {
      event ? event.target.complete() : '';
    });
  }

  openChat(friend: any) {
    if (!this.isRequests) {
      this.router.navigate(['/chat'], { queryParams: friend });
    }
  }

  findFriend() {
    this.router.navigate(['/find-friend']);
  }

  showRequests() {
    this.isRequests = true;
    this.friends = this.total.friendRequests;
  }

  backHome() {
    this.isRequests = false;
    this.friends = this.total.friends;
  }

  acceptOrReject(friend: any, type: string) {
    this.homeService.acceptOrReject({ id: friend._id }, type).subscribe(success => {
      this.total.friendRequests = this.total.friendRequests.filter(request => request._id !== friend._id);
      this.friends = this.total.friendRequests;
    }, error => {
      console.log(error);
    });
  }



}
