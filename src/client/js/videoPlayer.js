const video = document.querySelector("video");
const playBtn = document.getElementById("play");
const playBtnIcon = playBtn.querySelector("i");
const muteBtn = document.getElementById("mute");
const muteBtnIcon = muteBtn.querySelector("i");
const volumeRange = document.getElementById("volume");
const currenTime = document.getElementById("currenTime");
const totalTime = document.getElementById("totalTime");
const timeline = document.getElementById("timeline");
const fullScreenBtn = document.getElementById("fullScreen");
const fullScreenBtnIcon = fullScreenBtn.querySelector("i");
const videoContainer = document.getElementById("videoContainer");
const videoControls = document.getElementById("videoControls");

let controlsTimeout = null;
let controlsMovementTimeout = null;
let volume = 0.5;
video.volume = volume;

const handlePlay = () => {
  // 비디오가 실행중이면 멈추게 하기
  if (video.paused) {
    video.play();
  } else {
    // 실행중이 아니면 실행하기
    video.pause();
  }
  playBtnIcon.classList = video.paused ? "fas fa-play" : "fas fa-pause";
};

const handleKeydown = (e) => {
  const spacebar = 32;
  const left = 37;
  const right = 39;
  if (e.which === spacebar) {
    handlePlay();
  } else if (e.which === left) {
    video.currenTime -= 5;
  } else if (e.which === right) {
    video.currentTime += 5;
  }
};

const handleMute = () => {
  if (video.muted) {
    video.muted = false;
    if (volume === "0") {
      video.volume = 0.5;
      volume = 0.5;
    }
  } else {
    video.muted = true;
  }
  muteBtnIcon.classList = video.muted
    ? "fas fa-volume-mute"
    : "fas fa-volume-up";
  volumeRange.value = video.muted ? 0 : volume;
};

const handleVolumeChange = (e) => {
  const {
    target: { value },
  } = e;
  if (video.muted) {
    video.muted = false;
    muteBtnIcon.classList = "fas fa-volume-mute";
  }
  if (value === "0") {
    video.muted = true;
    muteBtnIcon.classList = "fas fa-volume-mute";
  } else {
    muteBtnIcon.classList = "fas fa-volume-up";
  }
  volume = value;
  video.volume = value;
};

const formatTime = (seconds) =>
  new Date(seconds * 1000).toISOString().substr(14, 5);

const handleLoadedMetaData = () => {
  totalTime.innerText = formatTime(Math.floor(video.duration));
  timeline.max = Math.floor(video.duration);
};

const handleTimeUpdate = () => {
  currenTime.innerText = formatTime(Math.floor(video.currentTime));
  timeline.value = Math.floor(video.currentTime);
};

const handleTimelineChange = (e) => {
  const {
    target: { value },
  } = e;
  video.currentTime = value;
};

const handleFullScreen = () => {
  const fullScreen = document.fullscreenElement;
  if (fullScreen) {
    document.exitFullscreen();
    fullScreenBtnIcon.classList = "fas fa-expand";
  } else {
    videoContainer.requestFullscreen();
    fullScreenBtnIcon.classList = "fas fa-compress";
  }
};

const hideControls = () => videoControls.classList.remove("showing");

const handleMouseMove = () => {
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
    controlsTimeout = null;
  }
  if (controlsMovementTimeout) {
    clearTimeout(controlsMovementTimeout);
    controlsMovementTimeout = null;
  }
  videoControls.classList.add("showing");
  controlsMovementTimeout = setTimeout(hideControls, 3000);
};

const handleMouseLeave = () => {
  controlsTimeout = setTimeout(hideControls, 3000);
};

const handleEnded = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/videos/${id}/views`, { method: "POST" });
};

playBtn.addEventListener("click", handlePlay);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("click", handlePlay);
video.addEventListener("loadeddata", handleLoadedMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
video.addEventListener("ended", handleEnded);
videoContainer.addEventListener("mousemove", handleMouseMove);
videoContainer.addEventListener("mouseleave", handleMouseLeave);
timeline.addEventListener("input", handleTimelineChange);
fullScreenBtn.addEventListener("click", handleFullScreen);
document.addEventListener("keydown", handleKeydown);
