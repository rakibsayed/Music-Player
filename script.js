const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

let songs = [
    {
        title : 'Enemy',
        artist: 'Imagin Dragon x JID',
    },
    {
        title : 'As It Was',
        artist: 'Harry Styles',
    },
    {
        title : 'Game Of Thrones Main Theme',
        artist: 'Ramin Djawadi',
    },
    {
        title : "Don't Be So Serious",
        artist : 'Low Roar'
    },
    {
      title : "Can't Stop The Feeling",
      artist : 'Justin Timberlake'
    }
];

// Check if Playing
let isPlaying = false;

// Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'Pause');
  music.play();
}

// Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');
  music.pause();
}

// Play or Pause Event Listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    music.src = `music/${song.title}.mp3`;
    image.src = `img/${song.title}.png`;
    music.addEventListener('loadedmetadata' , ()=>{
      var duration = music.duration;
      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
          durationSeconds = `0${durationSeconds}`;
          }
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    });
 };

 
// First Song
let songIndex = 0;

// Previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  if(isPlaying){
    playSong();
  }
  else{
    pauseSong();
  }
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  if(isPlaying){
    playSong();
  }
  else{
    pauseSong();
  }
}

// Update Progress Bar & Time
function updateProgressBar(e) {

  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    // Update progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    
    // Calculate display for currentTime
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  console.log(duration);
  music.currentTime = (clickX / width) * duration;
}

// Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);

// On Load - Select First Song
loadSong(songs[Math.floor(Math.random() * songs.length)]);

