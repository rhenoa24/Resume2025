import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DraggableModalDirective } from '../assets/directives/isDraggableModal.directive';
import { SpotlightDirective } from '../assets/directives/spotlight.directive';

import { TextPressureComponent } from './text-pressure/text-pressure.component';

import { HomepageComponent } from './homepage/homepage.component';
import { ProfileComponent } from './profile/profile.component';
import { MusicPlayerComponent } from './music-player/music-player.component';
import { BannerComponent } from './banner/banner.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SkillBarComponent } from './profile/skill-bar/skill-bar.component';
import { ServicesComponent } from './services/services.component';
import { ResumeComponent } from './resume/resume.component';
import { TimelineItemComponent } from './resume/timeline-item/timeline-item.component';
import { HexagonComponent } from './music-player/hexagon/hexagon.component';
import { BarsComponent } from './music-player/bars/bars.component';
import { RotatingTextComponent } from './banner/rotating-text/rotating-text.component';
import { MEICTComponent } from './resume/timeline-item/meict/meict.component';
import { DatadefendersComponent } from './resume/timeline-item/datadefenders/datadefenders.component';
import { ArtistComponent } from './resume/timeline-item/artist/artist.component';


@NgModule({
  declarations: [
    AppComponent,
    TextPressureComponent,
    HomepageComponent,
    ProfileComponent,
    MusicPlayerComponent,
    BannerComponent,
    NavMenuComponent,
    SkillBarComponent,
    ServicesComponent,
    ResumeComponent,
    TimelineItemComponent,
    HexagonComponent,
    BarsComponent,
    RotatingTextComponent,
    MEICTComponent,
    DraggableModalDirective,
    SpotlightDirective,
    DatadefendersComponent,
    ArtistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
