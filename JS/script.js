//Selecting all required tags

const outer = document.querySelector(".outer"),
    musicImg = outer.querySelector("img"),
    musicName = outer.querySelector(".song-detail .name"),
    musicArtist = outer.querySelector(".song-detail .artist"),
    playPause = outer.querySelector(".play-pause"),
    prev = outer.querySelector("#prev"),
    next = outer.querySelector("#next"),
    mainAudio = outer.querySelector("#aud"),
    progressBar=outer.querySelector(".progress-bar"),
    progressArea=outer.querySelector(".progress"),
    musicList=outer.querySelector(".music"),
    showMore=outer.querySelector("#more-music"),
    hide=musicList.querySelector("#close");
    


showMore.addEventListener("click", ()=>{
    
    musicList.classList.toggle("show");

});

hide.addEventListener("click", ()=>{
    
    showMore.click();
});

let index = Math.floor((Math.random()* Music.length)+1);

window.addEventListener("load", () => {
    loadMusic(index);
    playingNow();
})

//load music function
function loadMusic() {

    musicName.innerText = Music[index - 1].name;
    musicArtist.innerText = Music[index - 1].artist;
    musicImg.src = `Images/${Music[index - 1].img}.jpg`;
    mainAudio.src = `songs/${Music[index- 1].src}.mp3`;
}
//Play Music fucntion
function playMusic() {

    outer.classList.add("paused");
    playPause.querySelector("i").innerText = "pause";
    mainAudio.play();
  
}

//Pause Music fucntion
function pauseMusic() {
    outer.classList.remove("paused");
    playPause.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
}

//prev music function
function prevMusic() {
    index--; //decrement of musicIndex by 1
    //if musicIndex is less than 1 then musicIndex will be the array length so the last music play
    index < 1 ? index = Music.length : index = index;
    loadMusic(index);
    playMusic();
    playingNow();
    
}

//next music function
function nextMusic() {
    index++; //increment of musicIndex by 1
    //if musicIndex is greater than array length then musicIndex will be 1 so the first music play
    index > Music.length ? index = 1 : index = index;
    loadMusic(index);
    playMusic();
    playingNow();
}

// play or pause button event
playPause.addEventListener("click", () => {

    const isMusicPlay = outer.classList.contains("paused");
    //if isPlayMusic is true then call pauseMusic else call playMusic
    isMusicPlay ? pauseMusic() : playMusic();
    playingNow();
});

prev.addEventListener("click", () => {

    let getText=repeat.innerText;
    switch(getText){

        case 'repeat':
            prevMusic();
            break;
        case 'repeat_one' :
            mainAudio.currentTime=0; //play same song
            loadMusic(index);
            playMusic();
            break;
        case 'shuffle' :
            let randindex=Math.floor((Math.random()* Music.length)+1);
            do{
                let randindex=Math.floor((Math.random()* Music.length)+1);
            } while(index==randindex);
            index=randindex;
            loadMusic(index);
            playMusic();
            playingNow();
            break;
        }
        
});



next.addEventListener("click", () => {

    let getText=repeat.innerText;
    switch(getText){

        case 'repeat':
            nextMusic();
            break;
        case 'repeat_one' :
            mainAudio.currentTime=0; //play same song
            loadMusic(index);
            playMusic();
            break;
        case 'shuffle' :
            let randindex=Math.floor((Math.random()* Music.length)+1);
            do{
                let randindex=Math.floor((Math.random()* Music.length)+1);
            } while(index==randindex);
            index=randindex;
            loadMusic(index);
            playMusic();
            playingNow();
            break;
        }
        playingNow();

});

//Updating the progress bar
mainAudio.addEventListener("timeupdate", (e)=>{

    const currentTime=e.target.currentTime; //getting current itme og song
    const duration=e.target.duration; //getting the duration of the song
    let progressWidth=(currentTime/duration)*100;
    progressBar.style.width=`${progressWidth}%`;
   
    let musicCurrentTime=outer.querySelector(".current"),
        musicDuration=outer.querySelector(".duration");

    mainAudio.addEventListener("loadeddata", ()=>{
        
        
        //update duration of song
        let audioDuration= mainAudio.duration;
        let totalMin= Math.floor(audioDuration/60);
        let totalSec= Math.floor(audioDuration%60);

        //Adding zero of sec<10
        if(totalSec<10){
            totalSec= `0${totalSec}`;
        }
        musicDuration.innerText=`${totalMin}:${totalSec}`;
    });
        //update playing song time
        let currentMin= Math.floor(currentTime/60);
        let currentSec= Math.floor(currentTime%60);

        //Adding zero of sec<10
        if(currentSec<10){
            currentSec= `0${currentSec}`;
        }
        musicCurrentTime.innerText=`${currentMin}:${currentSec}`;
});

//Updating current time by progress bar
progressArea.addEventListener("click", (e)=>{

    let progressbarval=progressArea.clientWidth; //getting width of Progress Bar
    let clicked= e.offsetX;
    let songduration=mainAudio.duration;

    mainAudio.currentTime=(clicked/ progressbarval)*songduration;
    playMusic();

});

//Repeat and shuffle
const repeat=outer.querySelector("#repeat-plist");
repeat.addEventListener("click", ()=>{

    //get innertext icon and do functioning accordingly

    let getText=repeat.innerText;
    switch(getText){

        case 'repeat':
            repeat.innerText="repeat_one";
            repeat.setAttribute("title", "Song looped");
            break;
        case 'repeat_one' :
            repeat.innerText="shuffle";
            repeat.setAttribute("title", "Playback shuffled");
            break;
        case 'shuffle' :
            repeat.innerText="repeat";
            repeat.setAttribute("title", "Playlist looped");
            break;
    }

});

mainAudio.addEventListener("ended", ()=>{

    let getText=repeat.innerText;
    switch(getText){

        case 'repeat':
            nextMusic();
            break;
        case 'repeat_one' :
            mainAudio.currentTime=0; //play same song
            loadMusic(index);
            playMusic();
            break;
        case 'shuffle' :
            let randindex=Math.floor((Math.random()* Music.length)+1);
            do{
                let randindex=Math.floor((Math.random()* Music.length)+1);
            } while(index==randindex);
            index=randindex;
            loadMusic(index);
            playMusic();
            playingNow();
            break;
    }
});

const ulTag=outer.querySelector("ul");

for (let i=0; i<Music.length; i++)
{
    let liTag= `<li li-index="${i+1}">
                    <div class="row">
                        <span> ${Music[i].name} </span>
                        <p> ${Music[i].artist}</p>
                    </div>
                    <audio class="${Music[i].src}" src="songs/${Music[i].src}.mp3"> </audio>
                    <span id="${Music[i].src}" class="duration"> 3:40 </span>
                </li>`;
    ulTag.insertAdjacentHTML("beforeend", liTag);

    let liAudioDuration=ulTag.querySelector(`#${Music[i].src}`);
    let liAudio=ulTag.querySelector(`.${Music[i].src}`);

    liAudio.addEventListener("loadeddata", ()=>
    {
        let audioDuration= liAudio.duration;
        let totalMin= Math.floor(audioDuration/60);
        let totalSec= Math.floor(audioDuration%60);

        //Adding zero of sec<10
        if(totalSec<10){
            totalSec= `0${totalSec}`;
        }
        liAudioDuration.innerText=`${totalMin}:${totalSec}`;
        liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`);
        
    });
}

const liTags=ulTag.querySelectorAll("li");

function playingNow()
{
    for(let j=0; j<liTags.length; j++)
{
    let audioTag=liTags[j].querySelector(".duration");

    if(liTags[j].classList.contains("playing"))
    {
        liTags[j].classList.remove("playing");
        let ad=audioTag.getAttribute("t-duration");
        audioTag.innerText=ad;
    }
    if(liTags[j].getAttribute("li-index")==index){
        
        liTags[j].classList.add("playing");
        audioTag.innerText="Playing";
        
    }
    liTags[j].setAttribute("onclick","clicked(this)");
}
}

function clicked(element){

    let getLiIndex=element.getAttribute("li-index");
    index=getLiIndex;
    loadMusic(index);
    playMusic();
    playingNow();
}