import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideogalleryListPage } from './videogallery-list';

@NgModule({
  declarations: [
    VideogalleryListPage,
  ],
  imports: [
    IonicPageModule.forChild(VideogalleryListPage),
  ],
})
export class VideogalleryListPageModule {}
