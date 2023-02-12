let pipe = document.getElementById("pipe");
let hole = document.getElementById("hole");
let bird = document.getElementById("bird");

let isJumping = 0;
let counter = 0;


setInterval(function () {
  //Funkcija koja obezbedjuje gravitaciju i detekciju kolizije

  //Pronalazi gornju ivicu ptice
  let birdTop = parseInt(window.getComputedStyle(bird).getPropertyValue("top"));
  if (isJumping == 0) {
    //Ukoliko je isJumping==0 ptica ce padati po 3px nize svakih 10 milisekundi
    bird.style.top = birdTop + 3 + "px";
  }
  //Pronalazi levu ivicu cevi kako bi detektovali koliziju
  let pipeLeft = parseInt(
    window.getComputedStyle(pipe).getPropertyValue("left")
  );
  //Pronalazi gornju ivicu rupe kroz koju prolazi ptica
  let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  let bTop = -(500 - birdTop);

  //Proverava da li je ptica udarila u cev ili pala na zemlju
  if (
    birdTop > 480 ||
    (pipeLeft < 20 &&
        pipeLeft > -50 &&
      (bTop < holeTop || bTop > holeTop + 130))
  ) {
    //alert("Game over. Score: " + (counter - 1));
    bird.style.top = 100 + "px";
    counter = 0;
  }
}, 10);

function jump() {
  isJumping = 1;
  let jumpLenght = 0;
  let jumpInterval = setInterval(function () {
    let birdTop = parseInt(
      window.getComputedStyle(bird).getPropertyValue("top")
    );
    if (birdTop > 6 && jumpLenght < 15) {
      bird.style.top = birdTop - 5 + "px";
    }
    if (jumpLenght > 20) {
      clearInterval(jumpInterval);
      isJumping = 0;
      jumpLenght = 0;
    }
    jumpLenght++;
  }, 10);
}

hole.addEventListener("animationiteration", () => {
    //Pomera rupu posle svake iteracije animacije na nasumicno generisanu poziciju
    let yPosition = -(Math.random() * 300 + 150);
    hole.style.top = yPosition + "px";
    //Brojac se povecava za jedan kako bi pratili osvojene poene
    counter++;
    document.getElementById("scoreText").innerHTML = counter - 1;
  });
  