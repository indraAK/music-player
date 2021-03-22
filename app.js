// Daftar lagu
const songs = [
   {
      title: 'Pura Pura Lupa',
      artist: 'Mahen',
      image: 'song-1.jpg',
      audio: 'song-1.mp3'
   },
   {
      title: 'Best Day Of My Life',
      artist: 'American Authors',
      image: 'song-2.jpg',
      audio: 'song-2.mp3'
   },
   {
      title: 'Closer',
      artist: 'The Chainsmokers, Halsey',
      image: 'song-3.jpg',
      audio: 'song-3.mp3'
   },
   {
      title: 'Wanitaku',
      artist: 'NOAH',
      image: 'song-4.jpg',
      audio: 'song-4.mp3'
   }
];

let songIndex = 0;

const audio = document.querySelector('audio');
const togglePlay = document.getElementById('toggle-play');
const musicImg = document.getElementById('music-img');
const progressBar = document.getElementById('progress-bar');
const progressBarCircle = document.querySelector('.progress-circle-fill');
const durationTimeEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

// Putar lagu
function playSong() {
   togglePlay.title = 'Jeda';
   togglePlay.querySelector('.icon').textContent = 'pause_circle';
   musicImg.classList.add('rotate');
   audio.play();
}

// Jeda lagu
function pauseSong() {
   togglePlay.title = 'Putar';
   togglePlay.querySelector('.icon').textContent = 'play_circle';
   musicImg.classList.remove('rotate');
   audio.pause();
}

// Update progress bar
function updateProgressBar() {
   const { currentTime, duration } = audio;
   const percentage = (currentTime / duration) * 100;

   progressBar.style.width = `${percentage}%`;
   progressBarCircle.style.cssText = `
      stroke: #09de6e;
      stroke-dasharray: ${percentage * 3}%, 301.593px;
   `;
}

// Menampilkan total durasi lagu
function displayDurationTime() {
   const { duration } = audio;
   let minutes = Math.floor(duration / 60);
   let seconds = Math.floor(duration % 60);

   minutes = minutes < 10 ? `0${minutes}` : minutes;
   seconds = seconds < 10 ? `0${seconds}` : seconds;

   durationTimeEl.textContent = `${minutes}:${seconds}`;
}

// Menampilkan waktu yg sedang berjalan dari lagu yg sedang diputar
function displayCurrentTime() {
   const { currentTime } = audio;
   let minutes = Math.floor(currentTime / 60);
   let seconds = Math.floor(currentTime % 60);
   minutes = `${(minutes < 10) ? '0' : ''}${minutes}`;
   seconds = `${(seconds < 10) ? '0' : ''}${seconds}`;

   currentTimeEl.textContent = `${minutes}:${seconds}`;
}

// Setel waktu lagu berdasarkan progress bar yg diklik
function setCurrentTime(event) {
   const { offsetX } = event;
   const { clientWidth } = this;

   if (offsetX < 0) return;

   const currentTime = (offsetX / clientWidth) * audio.duration;
   audio.currentTime = currentTime;
}

// Lagu berikutnya
function nextSong() {
   songIndex += 1;

   // jika songindex melebihi dari jumlah lagu, maka set songindex menjadi 0
   if (songIndex > songs.length - 1) songIndex = 0;

   const song = songs[songIndex];
   updateSong(song);
}

// Lagu sebelumnya
function prevSong() {
   songIndex -= 1;

   // jika songindex kurang dari 0, set songindex menjadi total jumlah song -1
   if (songIndex < 0) songIndex = songs.length - 1;

   const song = songs[songIndex];
   updateSong(song);
}

// Update song
function updateSong(song) {
   audio.src = `./songs/${song.audio}`;
   musicImg.src = `./images/songs/${song.image}`;
   title.textContent = song.title;
   artist.textContent = song.artist;

   playSong();
}

// Toggle play
togglePlay.addEventListener('click', () => {
   if (audio.paused) {
      playSong();
   } else {
      pauseSong();
   }
});

audio.addEventListener('timeupdate', () => {
   updateProgressBar();
   displayCurrentTime();
});

progress.addEventListener('click', setCurrentTime);

audio.addEventListener('canplay', () => {
   displayDurationTime();
});

audio.addEventListener('ended', () => {
   musicImg.classList.remove('rotate');

   setTimeout(nextSong, 2000);
});

nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);

console.dir(audio);
