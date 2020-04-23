import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

import { FindFriendService } from './find-friend.service';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-find-friend',
  templateUrl: './find-friend.page.html',
  styleUrls: ['./find-friend.page.scss'],
})
export class FindFriendPage implements OnInit {

  mobileNumber: number;
  findFriends: any;

  constructor(private friendService: FindFriendService, private router: Router, private loader: LoaderService, private toastController: ToastController) { }

  ngOnInit() {
  }

  async Search() {
    await this.loader.presentLoading();
    this.friendService.findFriend({mobileNumber: this.mobileNumber}).subscribe(success => {
      this.findFriends = success[0];
      this.loader.dismissLoading();
      if (success['msg']) {
        this.presentToast(success['msg'], 3000);
      }
    }, error => {
      console.log(error);
      this.loader.dismissLoading();
    });
  }

  async sendRequest() {
    await this.loader.presentLoading();
    this.friendService.sendRequest(this.findFriends).subscribe(success => {
      this.findFriends = '';
      this.loader.dismissLoading();
      this.presentToast('Sent Request', 3000);
    }, error => {
      console.log(error);
      this.loader.dismissLoading();
      this.presentToast('Error Try Later', 3000);
    });
  }

  back() {
    window.history.back();
  }

  async presentToast(message, duration) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

}
