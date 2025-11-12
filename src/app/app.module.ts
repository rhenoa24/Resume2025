import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextPressureComponent } from './text-pressure/text-pressure.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { BannerComponent } from './banner/banner.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    TextPressureComponent,
    HomepageComponent,
    ProfileComponent,
    MusicPlayerComponent,
    BannerComponent,
    NavMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
