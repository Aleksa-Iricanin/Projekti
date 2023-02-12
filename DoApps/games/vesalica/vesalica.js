var igra = {
  pokusaj : 5,
  reci : ["papir", "sabiranje", "iskrcavanje", "ogledalo", "tastatura",
  "televizija", "informatika", "radijator", "avion", "singidunum", "varjaca", "detektiv", "poslasticarnica"],
  rec : null, 
  duzina : 0,
  tacni : 0, 
  pogresni : 0, 


  hImg : null, 
  hrec : null, 
  hChar : null, 
  hLives : null, 
  
  init : () => {

    igra.hImg = document.getElementById("slikaIgre");
    igra.hrec = document.getElementById("reci");
    igra.hChar = document.getElementById("karakter");
    igra.hLives = document.getElementById("zivot");

    for (var i=65; i<91; i++) {
      let charnow = document.createElement("input");
      charnow.type = "button";
      charnow.value = String.fromCharCode(i);
      charnow.disabled = true;
      charnow.onclick = () => { igra.check(charnow); };
      igra.hChar.appendChild(charnow);
    }

    let rst = document.getElementById("restart");
    rst.onclick = igra.reset;
    rst.disabled = false;
    igra.reset();
  },

  toggle : (disable) => {
    let all = igra.hChar.getElementsByTagName("input");
    for (var i of all) { i.disabled = disable; }
  },


  reset : () => {
    igra.tacni = 0;
    igra.pogresni = 0;
    igra.hLives.innerHTML = igra.pokusaj;
    igra.hImg.style.opacity = 0;

    igra.rec = igra.reci[Math.floor(Math.random() * Math.floor(igra.reci.length))];
    igra.rec = igra.rec.toUpperCase();
    igra.duzina = igra.rec.length;
    
    igra.hrec.innerHTML = "";
    for (var i=0; i<igra.rec.length; i++) {
      var charnow = document.createElement("span");
      charnow.innerHTML = "_";
      charnow.id = "hangrec-" + i;
      igra.hrec.appendChild(charnow);
    }

    igra.toggle(false);
  },

  check : (char) => {
    var index = 0, hits = [];
    while (index >= 0) {
      index = igra.rec.indexOf(char.value, index);
      if (index == -1) { break; }
      else {
        hits.push(index);
        index++;
      }
    }

    if (hits.length > 0) {
      for (var hit of hits) {
        document.getElementById("hangrec-" + hit).innerHTML = char.value;
      }

      igra.tacni += hits.length;
      if (igra.tacni == igra.duzina) {
        igra.toggle(true);
        alert("POBEDA!");
      }
    }

    else {
      igra.pogresni++;
      var ostalo = igra.pokusaj - igra.pogresni;
      igra.hLives.innerHTML = ostalo;
      igra.hImg.style.opacity = (1 - (ostalo/igra.pokusaj)).toFixed(2);

      if (igra.pogresni == igra.pokusaj) {
        igra.toggle(true);
        alert("PORAZ!");
      }
    }

    char.disabled = true;
  }
};
window.addEventListener("DOMContentLoaded", igra.init);
