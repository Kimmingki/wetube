const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const muteBtn = document.getElementById("mute");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");

let volume = 0.5;

video.volume = volume;

const handlePlay = (e) => {
  // 비디오가 실행중이면 멈추게 하기
  if (video.paused) {
    video.play();
  } else {
    // 실행중이 아니면 실행하기
    video.pause();
  }
  playBtn.innerText = video.paused ? "Play" : "Pause";
};

const handleMute = (e) => {
  if (video.muted) {
    video.muted = false;
  } else {
    video.muted = true;
  }
  muteBtn.innerText = video.muted ? "Unmute" : "Mute";
  volumeRange.value = video.muted ? 0 : volume;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtn.innerText = "Mute";
  }
  volume = value;
  video.volume = value;
};

const handleLoadedMetaData = () => {
  totalTime.innerText = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = Math.floor(video.currentTime);
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
