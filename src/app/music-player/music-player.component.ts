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
  volume = 0.2; // default
  progress = 0; // 0 to 100


  constructor() {
    this.loadTrack(this.currentTrackIndex)
    this.audio.volume = this.volume

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration) {
        this.progress = (this.audio.currentTime / this.audio.duration) * 100;
      }
    });
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

  seek(event: any) {
    const value = event.target.value;
    if (this.audio.duration) {
      this.audio.currentTime = (value / 100) * this.audio.duration;
    }
  }

  formatTime(time: number): string {
    if (!time) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }


}
