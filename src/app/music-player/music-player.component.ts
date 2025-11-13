import { Component } from '@angular/core';

interface Track {
  title: string;
  file: string;
}

@Component({
  selector: 'music-player',
  standalone: false,
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css'
})

export class MusicPlayerComponent {
  protected isActive: boolean = false;
  protected isPlaying: boolean = false;
  protected toggleDisabled = false; // disable toggle during animation
  private readonly animationDuration = 500; // in ms, matches your 0.4s animation

  tracks: Track[] = [
    { title: 'just friends', file: '/music-player/just-friends.ogg' },
    { title: 'bossa uh', file: '/music-player/bossa-uh.ogg' },
  ];

  currentTrackIndex = 0;
  audio = new Audio();
  volume = 0.2; // default 50%
  constructor() {
    this.loadTrack(this.currentTrackIndex)
    this.audio.volume = this.volume
  }

  //====================================================================================================
  protected Toggle() {
    if (this.toggleDisabled) return // ignore clicks if disabled

    this.isActive = !this.isActive
    this.toggleDisabled = true

    setTimeout(() => {
      this.toggleDisabled = false
    }, this.animationDuration)

    if (this.isPlaying === false) {
      this.play()
    }
  }

  //====================================================================================================
  loadTrack(index: number) {
    this.audio.src = this.tracks[index].file;
    this.audio.load()
  }

  play() {
    this.audio.play()
    this.isPlaying = true
  }

  pause() {
    this.audio.pause()
    this.isPlaying = false
  }

  next() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length
    this.loadTrack(this.currentTrackIndex)
    this.play()
  }

  previous() {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length
    this.loadTrack(this.currentTrackIndex)
    this.play()
  }

  setVolume(event: any) {
    this.volume = event.target.value / 100;
    this.audio.volume = this.volume;
  }

}
