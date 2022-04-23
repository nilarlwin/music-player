const playListContainerTag =
  document.getElementsByClassName("playListContainer")[0];

const currentAndTotalTimeTag = document.getElementsByClassName(
  "currentAndTotalTime"
)[0];

const currentProgressTag = document.getElementById("currentProgress");
const audioTag = document.getElementsByClassName("audioTag")[0];
const playButtonTag = document.getElementsByClassName("playButton")[0];
const pauseButtonTag = document.getElementsByClassName("pauseButton")[0];
const previousButtonTag = document.getElementsByClassName("previousButton")[0];
const nextButtonTag = document.getElementsByClassName("nextButton")[0];

const tracks = [
  {
    trackId: "music/track4.mp3",
    title: "၀မ်းနည်းခြင်းမှတ်တမ်း - စိုင်းစိုင်းခမ်းလှိုင်",
  },
  {
    trackId: "music/track6.mp3",
    title: "အလကားပဲ - နီနီခင်ဇော်",
  },
  {
    trackId: "music/track5.mp3",
    title: "အဆင်ပြေပါတယ် - နီနီခင်ဇော်",
  },
  {
    trackId: "music/track2.mp3",
    title: "လမ်းမကြီးရဲံ့ဘေး - ၀ိုင်းစုခိုင်သိန်း",
  },
  {
    trackId: "music/irene1.mp3",
    title: "အိုင်းရင်းဇင်မာမြင့် - နှလုံးသားအရင်းအနှီး",
  },
];

for (let i = 0; i < tracks.length; i++) {
  const trackTag = document.createElement("div");
  trackTag.addEventListener("click", () => {
    const trackId = tracks[i].trackId;
    audioTag.src = trackId;
    audioTag.play();
    isPlaying = true;
    updatePlayAndPauseButton();
    currentPlayingIndex = i;
  });
  trackTag.classList.add("trackItem");
  const title = (i + 1).toString() + ". " + tracks[i].title;
  trackTag.textContent = title;
  playListContainerTag.append(trackTag);
}

let duration = 0;
let durationText = "00:00";
audioTag.addEventListener("loadeddata", () => {
  duration = Math.floor(audioTag.duration); // 147.92938
  //   const minutes = Math.floor(duration / 60);
  //   const seconds = duration % 60;

  //   const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
  //   const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
  durationText = createMinuteAndSecondText(duration);

  //console.log(minuteText + ":" + secondText);
});

audioTag.addEventListener("timeupdate", () => {
  //console.log("Current played time: ", audioTag.currentTime);
  const currentTime = Math.floor(audioTag.currentTime); // 147.92938
  //   const minutes = Math.floor(currentTime / 60);
  //   const seconds = currentTime % 60;

  //   const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
  //   const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
  const currentTimeText = createMinuteAndSecondText(currentTime);
  const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
  // console.log(
  //   "currentTimeTextAndDurationText: ",
  //   currentTimeTextAndDurationText
  // );
  currentAndTotalTimeTag.textContent = currentTimeTextAndDurationText;
  updateCurrentProgress(currentTime);
});

const updateCurrentProgress = (currentTime) => {
  const currentProgressWidth = (500 / duration) * currentTime;
  currentProgressTag.style.width = currentProgressWidth.toString() + "px"; //5px;
};

const createMinuteAndSecondText = (totalSecond) => {
  const minutes = Math.floor(totalSecond / 60);
  const seconds = totalSecond % 60;

  const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
  const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
  return minuteText + ":" + secondText;
};

let currentPlayingIndex = 0;
let isPlaying = false;
playButtonTag.addEventListener("click", () => {
  const currentTime = Math.floor(audioTag.currentTime);
  isPlaying = true;
  if (currentTime === 0) {
    const songIdToPlay = tracks[currentPlayingIndex].trackId;
    audioTag.src = songIdToPlay;
    audioTag.play();
    updatePlayAndPauseButton();
  } else {
    audioTag.play();
    updatePlayAndPauseButton();
  }
});

pauseButtonTag.addEventListener("click", () => {
  isPlaying = false;
  audioTag.pause();
  updatePlayAndPauseButton();
});

previousButtonTag.addEventListener("click", () => {
  if (currentPlayingIndex === 0) {
    return;
  }
  currentPlayingIndex -= 1;
  const songIdToPlay = tracks[currentPlayingIndex].trackId;
  audioTag.src = songIdToPlay;
  audioTag.play();
  isPlaying = true;
  updatePlayAndPauseButton();
});

nextButtonTag.addEventListener("click", () => {
  if (currentPlayingIndex === tracks.length - 1) {
    return;
  }
  currentPlayingIndex += 1;
  const songIdToPlay = tracks[currentPlayingIndex].trackId;
  audioTag.src = songIdToPlay;
  audioTag.play();
  isPlaying = true;
  updatePlayAndPauseButton();
});

const updatePlayAndPauseButton = () => {
  if (isPlaying) {
    playButtonTag.style.display = "none";
    pauseButtonTag.style.display = "inline";
  } else {
    playButtonTag.style.display = "inline";
    pauseButtonTag.style.display = "none";
  }
};
