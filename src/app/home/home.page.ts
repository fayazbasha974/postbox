import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HomeService } from './home.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  friends: any;
  total: any;
  isRequests: boolean;

  constructor(private homeService: HomeService, private router: Router, private loader: LoaderService) { }

  ngOnInit() {
    this.getDetails();
  }

  async getDetails(event?) {
    await this.loader.presentLoading();
    this.homeService.getDetails().subscribe(response => {
      this.total = response;
      this.friends = this.isRequests ? response.friendRequests : response.friends;
      event ? event.target.complete() : '';
      this.loader.dismissLoading();
    }, error => {
      event ? event.target.complete() : '';
      this.loader.dismissLoading();
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

  async acceptOrReject(friend: any, type: string) {
    await this.loader.presentLoading();
    this.homeService.acceptOrReject({ id: friend._id }, type).subscribe(success => {
      this.total.friendRequests = this.total.friendRequests.filter(request => request._id !== friend._id);
      this.friends = this.total.friendRequests;
      this.loader.dismissLoading();
    }, error => {
      console.log(error);
      this.loader.dismissLoading();
    });
  }



}
