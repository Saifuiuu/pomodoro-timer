//acessing all form html 
const timer=document.getElementById("timer");
const start=document.getElementById("start-btn");
const pause=document.getElementById("pause-btn");
const reset=document.getElementById("reset-btn");
const counter=document.getElementById("Sessions-counter");

let mode=1;
localStorage.setItem("Mode",mode);

//break working

let breakTime=5*60;
let bInterval;
localStorage.setItem("Btime",breakTime);

const updateBreakTimer=()=>{
    const bMinutes=Math.floor(breakTime/60);
    const bseconds=breakTime%60;

     timer.innerHTML=`${bMinutes.toString().padStart(2,"0")}:
     ${bseconds.toString().padStart(2,"0")}`;
}

const startBreak=()=>{
    clearInterval(bInterval);
    breakTime=parseInt(localStorage.getItem("Btime")) || 5*60;
bInterval=setInterval(()=>{
    breakTime--;
    updateBreakTimer();

    if(breakTime===0){
        alert("break finish ");
        mode=1;
        localStorage.setItem("Mode",mode);
        startTimer();
        clearInterval(bInterval);
    }
},1000)
}

const stopbTimer=()=>{
    clearInterval(bInterval);
    localStorage.setItem("Btime",breakTime);
}



// counter for sessions
let DailysessionsCounter=0;
DailysessionsCounter=localStorage.getItem("counter");

counter.innerHTML=`${DailysessionsCounter}`;

let today=new Date();
let year = today.getFullYear();
let month=String(today.getMonth()+1).padStart(2,"0");

let day=String(today.getDate()).padStart(2,"0");

let formattedDate=`${year}-${month}-${day}`;

//saving to local storage
localStorage.setItem("counter",DailysessionsCounter);
localStorage.setItem("date",formattedDate);
counter.innerHTML=`${DailysessionsCounter}`;
let timeleft=10;
let interval;




const updatetimer=()=>{
    const minutes=Math.floor(timeleft/60);
    const seconds=timeleft%60;
    timer.innerHTML=`${minutes.toString().padStart(2,"0")}:
    ${seconds.toString().padStart(2,"0")}`;
    
};

const startTimer=()=>{
    clearInterval(interval);
    timeleft=parseInt(localStorage.getItem("Timeleft")) || 10;
    interval=setInterval(()=>{
        timeleft--;
        updatetimer();

        if(timeleft <= 0){
            clearInterval(interval);

            formattedDate=localStorage.getItem("date");

            const today=new Date().toISOString().split("T")[0];
            if(formattedDate===today){

                DailysessionsCounter= parseInt(localStorage.getItem("counter")) || 0;
DailysessionsCounter++;
localStorage.setItem("counter",DailysessionsCounter);
counter.innerHTML=`${DailysessionsCounter}`;

 
                
            }
            else{
                DailysessionsCounter=0;
                DailysessionsCounter++;
localStorage.setItem("counter",DailysessionsCounter);
counter.innerHTML=`${DailysessionsCounter}`;
            }

            
            alert("Time's up!");
            timeleft =10;
            localStorage.setItem("Timeleft",timeleft);
            updateBreakTimer();
            mode=0;
            localStorage.setItem("Mode",mode);

           
            
        }

    },1000)
}

const  stopTimer=()=>{
    clearInterval(interval);
    localStorage.setItem("Timeleft",timeleft);
}

const resetTimer=()=>{
    clearInterval(interval);
    timeleft=10;
    localStorage.setItem("Timeleft",timeleft);
   
    updatetimer();
   
}

const chekerstart=()=>{
    mode=parseInt(localStorage.getItem("Mode"));
    if(mode===1){
        updatetimer();
        startTimer();
    }
    else{
        updateBreakTimer();
        startBreak();
    }
}

const checkpause=()=>{
    mode= parseInt(localStorage.getItem("Mode"));
    if(mode===1){
        stopTimer();

    }
    else{
        stopbTimer();
    }
}


const checkreset=()=>{
mode=parseInt(localStorage.getItem("Mode"));
if(mode===1){
    resetTimer();
}
else{
    stopbTimer();
    breakTime=5*60;
    updateBreakTimer();
    mode=1;
   localStorage.setItem("Mode",mode);
}

}









start.addEventListener("click",chekerstart);
pause.addEventListener("click",checkpause);

reset.addEventListener("click",checkreset);
