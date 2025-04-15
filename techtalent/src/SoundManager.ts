// SoundManager.ts

export class SoundManager {
    private sfxClickCard: HTMLAudioElement;
    private sfxClickPage: HTMLAudioElement;
    private musicTracks: string[];
    private currentTrackIndex: number = 0;
    private musicPlayer: HTMLAudioElement;
    private isMuted: boolean = false;
  
    constructor(tracks: string[], sfxClickCardPath: string, sfxClickPagePath: string) {
      this.sfxClickCard = new Audio(sfxClickCardPath);
      this.sfxClickPage = new Audio(sfxClickPagePath);
      this.musicTracks = tracks;
      this.musicPlayer = new Audio(this.musicTracks[this.currentTrackIndex]);
      this.musicPlayer.loop = true;
    }
  
    playSfxCard() {
      this.sfxClickCard.currentTime = 0;
      this.sfxClickCard.play();
    }
  
    playSfxPage() {
      this.sfxClickPage.currentTime = 0;
      this.sfxClickPage.play();
    }
  
    playMusic() {
      this.musicPlayer.play();
    }
  
    pauseMusic() {
      this.musicPlayer.pause();
    }
  
    nextTrack() {
      this.currentTrackIndex = (this.currentTrackIndex + 1) % this.musicTracks.length;
      this.changeTrack();
    }
  
    prevTrack() {
      this.currentTrackIndex =
        (this.currentTrackIndex - 1 + this.musicTracks.length) % this.musicTracks.length;
      this.changeTrack();
    }
  
    changeTrack() {
      this.musicPlayer.src = this.musicTracks[this.currentTrackIndex];
      this.musicPlayer.play();
    }
  
    setVolume(value: number) {
      this.musicPlayer.volume = value;
    }
  
    toggleMute() {
      this.isMuted = !this.isMuted;
      this.musicPlayer.muted = this.isMuted;
    }
  }