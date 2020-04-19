import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loading: any;

  constructor(private loadingCtrl: LoadingController) { }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Please wait...',
      duration: 2000
    });
    await this.loading.present();
  }

  async dismissLoading() {
    await this.loading.dismiss();
  }

}
