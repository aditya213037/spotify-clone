console.log("Welcome to spotify");
//Intialise the variables
let songIndex = 0;
let audioElement = new Audio("audio/1.mp3");
let container = document.getElementsByClassName("container");
let masterPlay = document.getElementById("masterplay");
let progbar = document.getElementById("progbar");
let gif = document.getElementById("gif");
let mastersong = document.getElementById("mastersong");
let songpl = document.getElementById("songpl");
// let S0 = document.getElementById("S0");
// let S1 = document.getElementById("S1");
// let S2 = document.getElementById("S2");
// let S3 = document.getElementById("S3");
// let S4 = document.getElementById("S4");
// let S5 = document.getElementById("S5");
// let S6 = document.getElementById("S6");
let songItem = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let songs = [
  { songName: "Let me down slowly", filePath: "audio/1.mp3", coverPath: "img/cover1.jpeg" },
  { songName: "Dusk till dawn", filePath: "audio/2.mp3", coverPath: "img/cover2.jpeg" },
  { songName: "Collide", filePath: "audio/3.mp3", coverPath: "img/cover3.jpeg" },
  { songName: "Closer", filePath: "audio/4.mp3", coverPath: "img/cover4.jpeg" },
  { songName: "Perfect", filePath: "audio/5.mp3", coverPath: "img/cover5.jpeg" },
  { songName: "The Hills", filePath: "audio/6.mp3", coverPath: "img/cover6.jpeg" },
  { songName: "Call out my name", filePath: "audio/7.mp3", coverPath: "img/cover7.jpeg"},
];

songItem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});
// audioElement.play();
// Handle play and pause click
masterplay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;//fa-solid songItemPlay
        songpl.innerHTML = songs[songIndex].songName;
        songItemPlay.forEach((element,i)=>{
            element.classList.remove('fa-circle-play');
            element.classList.add('fa-circle-pause');
        })
        // container.style.backgroundImage = songs[songIndex].coverPath;
        // S0.classList.remove('fa-circle-play')
        // S0.classList.add('fa-circle-pause')
        
    }
    
    else{
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        songpl.innerHTML = songs[songIndex].songName;
        songItemPlay.forEach((element)=>{
            element.classList.remove('fa-circle-pause');
            element.classList.add('fa-circle-play');
        })
        // S0.classList.remove('fa-circle-pause')
        // S0.classList.add('fa-circle-play')
        // document.getElementsByClassName("container").style.backgroundImage ="url(songs[songIndex].coverPath)";
    }
})

//Listen to events
audioElement.addEventListener("timeupdate",()=>{
    console.log("timeupdate");
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progbar.value = progress;
});
progbar.addEventListener('change', ()=>{
    audioElement.currentTime = ((progbar.value * audioElement.duration)/100);
});

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play');

    })
}
  
  document.getElementById('masterplay').addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      audioElement.play();
      masterplay.classList.remove('fa-circle-play');
      masterplay.classList.add('fa-circle-pause');
      gif.style.opacity = 1;
      songpl.innerHTML = songs[songIndex].songName;
      makeAllPlays();
    } else {
      audioElement.pause();
      masterplay.classList.remove('fa-circle-pause');
      masterplay.classList.add('fa-circle-play');
      gif.style.opacity = 0;
      songpl.innerHTML = songs[songIndex].songName;
      makeAllPlays();
    }
  
    if (songIndex === -1) {
      audioElement.src = `audio/1.mp3`;
      songIndex = 0;
    }
  });
  







Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(audioElement.paused || audioElement.currentTime<=0){
            songIndex = parseInt(e.target.id);
            console.log(e.target);
            makeAllPlays();
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `audio/${songIndex+1}.mp3`;
            mastersong.innerHTML = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play()
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
            songpl.innerHTML = songs[songIndex].songName;

        }
        else{
            audioElement.pause()
            songIndex = parseInt(e.target.id);
            makeAllPlays();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioElement.src = `audio/${songIndex+1}.mp3`;
            mastersong.innerHTML = songs[songIndex].songName;
            audioElement.currentTime = 0;
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
            
            gif.style.opacity = 0;
            songpl.innerHTML = songs[songIndex].songName;
        }
                
                
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = `audio/${songIndex+1}.mp3`;
    mastersong.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    songpl.innerHTML = songs[songIndex].songName;
    container.getElementsByTagName("background") = songs[songIndex].coverPath;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -=1;
    }
    audioElement.src = `audio/${songIndex+1}.mp3`;
    mastersong.innerHTML = songs[songIndex].songName;
    songpl.innerHTML = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    container.getElementsByTagName("background") = songs[songIndex].coverPath;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})


