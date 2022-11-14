const playListDiv = document.getElementsByClassName("playList")[0];
const audo = document.getElementsByClassName("audo")[0];
const time = document.getElementsByClassName("time")[0];
const current = document.getElementsByClassName("current")[0];
const previousBtn = document.getElementsByClassName("previousBtn")[0];
const playBtn = document.getElementsByClassName("playBtn")[0];
const pauseBtn = document.getElementsByClassName("pauseBtn")[0];
const nextBtn = document.getElementsByClassName("nextBtn")[0];


const tracks = [
    {src:"./audio/file_example_MP3_2MG.mp3",title:"Example"},
    {src:"./audio/imagine.mp3",title:"Imagine"},
    {src:"./audio/Moe.mp3",title:"Moe Lay Phwe Tone"},
    {src:"./audio/thisIsMyFightSong.mp3",title:"This is My Fight Song"}
]

for(let i=0; i<tracks.length; i++){
    const audioTag = document.createElement("div");
    audioTag.classList.add("audTag");
    const trackTitle = (i+1).toString()+". "+tracks[i].title;
    audioTag.textContent = trackTitle;
    playListDiv.append(audioTag);
    audioTag.addEventListener("click",()=>{
        const trackSrc = tracks[i].src;
        audo.src =trackSrc;
        trackId = i;
        audo.play();
        playOrNot = true;
    })
}

let total = 0;
audo.addEventListener("loadeddata",()=>{
    total = audo.duration;
});
let currentTime = 0;
audo.addEventListener("timeupdate",()=>{
    currentTime = audo.currentTime;
    time.textContent = funOne(currentTime)+" / "+funOne(total);

    // for Progress 
    const progWidth = (500/total)*currentTime;
    current.style.width = progWidth.toString()+"px";
});

const funOne = (para)=>{
    const time = Math.floor(para);
    const min = Math.floor(time/60);
    const sec = time%60;

    const minTxt = min<10? "0"+min.toString() : min;
    const secTxt = sec<10? "0"+sec.toString() : sec;

    const res =  minTxt+":"+secTxt;
    return res;
}

// Control btns 
let trackId = 0;
let playOrNot = false;
playBtn.addEventListener("click",()=>{
    if(currentTime === 0){
        audo.src = tracks[trackId].src;
        audo.play();
    }else{
        audo.play();
    }
        playNpause();
        playOrNot = true;
})
pauseBtn.addEventListener("click",()=>{
    if(playOrNot){
        audo.pause();
        pauseBtn.style.display = "none";
        playBtn.style.display = "block";
        playOrNot = false;
    }
})
const playNpause = ()=>{
    pauseBtn.style.display = "block";
    playBtn.style.display = "none";
}
// Next and Previous bnts 
nextBtn.addEventListener("click",()=>{
    trackId += 1;
    if(trackId === 0){
        return;
    }
    srcChange(trackId);
})

previousBtn.addEventListener("click",()=>{
    trackId -= 1;
    if(trackId === tracks.length-1){
        return;
    }
    srcChange(trackId);
})

const srcChange = (a)=>{
    audo.src = tracks[a].src;
    audo.play();
}

