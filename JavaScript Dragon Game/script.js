let dino = document.querySelector('.dino');
let obstacle = document.querySelector('.obstacle');
let gameOver = document.querySelector('.gameOver');
let counter = 0;
let jump = false;

//audio

let audioElement = new Audio('music.mp3');
let audioDeathElement = new Audio('gameover.mp3');

window.addEventListener('keydown' , (event)=>{
    audioElement.play();
})


document.onkeydown = function(e){
    console.log("Key Code is: " , e.keyCode);
    //upward arrow key
    if(e.keyCode === 38){
        let dino = document.querySelector('.dino');
        dino.classList.add('animateDino'); // adding animation if up button pressed
        //now, we need to remove this animation after its been applied
        jump = true;
        setTimeout(()=>{
            dino.classList.remove('animateDino');
        },700);
    }
    // forward arrow
    if(e.keyCode === 39){
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + 'px';
    }
    //backword arrow
    if(e.keyCode === 37){
        let dino = document.querySelector('.dino');
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + 'px';
    }

}
// to check if both collide, we need to check it after every milliseconds(interval)
setInterval(()=>{
    // now we need to find the left position(dx) of both dino and obstacle(NOTE:- dino hawa me bhi ho sakta, therefore we need to check the y value also)
    let dino = document.querySelector('.dino');
    let obstacle = document.querySelector('.obstacle');
    let gameOver = document.querySelector('.gameOver');
// ======================================
    // let dx = dino.offsetLeft;
    // let dy = dino.offsetTop;

    // let ox = obstacle.offsetLeft;
    // let oy = obstacle.offsetTop;
    
    // if((dx===ox || dx > ox) && oy!=503 ){
    //     console.log('gameOver');
    // }
// ======================================
    // find the distance from left of the window and the top of the window

    //we parsed it to integer because 
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));
    
    //finding the difference
    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);
    // console.log(offsetX , offsetY);
    // now taking some random offset values
    if(offsetX <73 && offsetY<52){
        gameOver.textContent = 'Game Over- Reload to Play again';
        obstacle.classList.remove('obstacleAni');
        // score = false;
        counter = 0;
        document.getElementById('score').textContent = '0';
        audioDeathElement.play();
       
        setTimeout(()=>{
          audioDeathElement.pause();
          audioElement.pause();
        },1000)
    }
    else{
       if(jump && dx>ox){
        counter++;
        document.getElementById('score').textContent = `${counter}`;
        jump = false;
       
//  =========now to make the game tough, we increase the speed of the obstacle after every successful jump
    //    obstacle.style.animationDuration = '1s';  //. this bloody works!!
//                                OR
// we see that jaise hi animation change ho raha hai, obstacle jhatka khaa raha, ye moment bohot crucial hai, aur hm nhi chahte ki obstcale iss time jhatka khaaye, jab user kood jaaye, uske baad jhatka khaaye vo to problem nhi, therefore we put the below code in a set timeOut function
       setTimeout(()=>{
        let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));  // float becasue duration can be 0.4s also
        let newDur = aniDur - 0.1;
        // to be fair, after some time, animation-duration itni slow ho jaegi ki baar baar haar jaoge
        // therefore check if animation-duration= 3s, we dont change it now
        if(newDur >= 3){
            obstacle.style.animationDuration = newDur + 's'; 
        }
        obstacle.style.animationDuration = newDur + 's';
       }, 200)
       
       }
    }
},10)

    // dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    // ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    
// const changeScore = (score)=>{if(dx>ox  && score)
//     {
//         counter++;
//         document.getElementById('score').textContent = `${counter}`;
//         score = false;
//     }
// };
console.log(dino.getBoundingClientRect());
console.log(obstacle.getBoundingClientRect());