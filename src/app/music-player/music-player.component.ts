import { Component } from '@angular/core';

interface Track {
  title: string;
  img: string;
  file: string;
  artist: string;
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
    { title: 'just friends'                                           , img: 'just-friends.png'                    , file: 'music-player/just-friends.ogg'                    , artist: 'potsu' },
    { title: 'bossa uh'                                               , img: 'bossa-uh.png'                        , file: 'music-player/bossa-uh.ogg'                        , artist: 'potsu' },
    { title: 'have you heard'                                         , img: 'bossa-uh.png'                        , file: 'music-player/have-you-heard.ogg'                  , artist: 'potsu' },
    { title: 'in the pool'                                            , img: 'in-the-pool.png'                     , file: 'music-player/in-the-pool.ogg'                     , artist: 'kensuke ushio' },
    { title: 'City of Tears'                                          , img: 'city-of-tears.png'                   , file: 'music-player/city-of-tears.ogg'                   , artist: 'Christopher Larkin' },
    { title: 'Eternally Yours.'                                       , img: 'eternally-yours.png'                 , file: 'music-player/eternally-yours.ogg'                 , artist: 'YukiV4554' },
    { title: 'your smile is my smile'                                 , img: 'your-smile-is-my-smile.png'          , file: 'music-player/your-smile-is-my-smile.ogg'          , artist: 'YukiV4554' },
    { title: 'You showed me what happiness was and I held it forever.', img: 'You-showed-me-what-happiness-was.png', file: 'music-player/You-showed-me-what-happiness-was.ogg', artist: 'YukiV4554' },
    { title: 'A nameless flower lies in peace.'                       , img: 'A-nameless-flower-lies-in-peace.png' , file: 'music-player/A-nameless-flower-lies-in-peace.ogg' , artist: 'YukiV4554' },
    { title: `I'm happy that you're alive, thank you`                 , img: 'Im-happy-that-youre-alive.png'       , file: 'music-player/Im-happy-that-youre-alive.ogg'       , artist: 'YukiV4554' },
    { title: 'Every time you smile.'                                  , img: 'Every-time-you-smile.png'            , file: 'music-player/Every-time-you-smile.ogg'            , artist: 'YukiV4554' },
  ];

  get currentTrack(): Track {
    return this.tracks[this.currentTrackIndex];
  }

  get previousTrack(): Track {
    // wrap to last track if currentTrackIndex is 0
    const prevIndex =
      (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    return this.tracks[prevIndex];
  }

  get nextTrack(): Track {
    // wrap to first track if at last index
    const nextIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    return this.tracks[nextIndex];
  }


  currentTrackIndex = 0;
  audio = new Audio();
  volume = 0.2; // default
  progress = 0; // 0 to 100
  hovering = false;

  constructor() {
    this.loadTrack(this.currentTrackIndex)
    this.audio.volume = this.volume

    this.audio.addEventListener('timeupdate', () => {
      if (this.audio.duration) {
        this.progress = (this.audio.currentTime / this.audio.duration) * 100;
      }
    });

    // When the song ends, play the next one
    this.audio.addEventListener('ended', () => {
      this.next();
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

    if (this.isPlaying === false && this.isActive === true) {
      this.play()
    }
  }

  //====================================================================================================
  loadTrack(index: number) {
    this.audio.src = this.tracks[index].file;
    this.audio.load()
  }

  playToggle() {
    if (this.isPlaying === false) {
      this.audio.play()
      this.isPlaying = true
    } else {
      this.audio.pause()
      this.isPlaying = false
    }
  }

  play() {
    this.audio.play()
    this.isPlaying = true
  }

  next() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.loadTrack(this.currentTrackIndex);
    this.play();
  }

  previous() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length
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

  playTrack(index: number) {
    this.currentTrackIndex = index;
    this.loadTrack(this.currentTrackIndex);
    this.play();
  }


}
