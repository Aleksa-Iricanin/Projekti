let PoslednjeVreme = 0
const BRZINA_ZMIJE = 10;
const telo = [
  { x: 10, y: 10 },
]
xv = yv = 0
poslednja_xv = 0
poseldnja_yv = 0
const ploca = document.getElementById('ploca')
let hrana = { x: 15, y: 15 }
const velicina_table = 21
const velicina_table_random = 19
let vrednost_prosirenja = 1
function main(currentTime) {
  window.requestAnimationFrame(main)
  const sekundeOdPosldnjegRendera = (currentTime - PoslednjeVreme) / 1000
  if (sekundeOdPosldnjegRendera < 1 / BRZINA_ZMIJE) return
  PoslednjeVreme = currentTime
  azuriraj()
  crtaj(ploca)
  if (presek_sa_telom()) {
    alert("ujeo si se")
    window.location = './snake.html'
    return
  }
  if (izvan_table(telo[0])) {
    alert("otisa si izvan table")
    window.location = './snake.html'
    return
  }
}


window.requestAnimationFrame(main)

function dugme_pritisnutno(evt) {
  switch (evt.keyCode) {
    case 65:
      if (poslednja_xv !== 0) break
      xv = -1; yv = 0;
      break;
    case 87:
      if (poslednja_xy !== 0) break
      xv = 0; yv = -1;
      break;
    case 68:
      if (poslednja_xv !== 0) break
      xv = 1; yv = 0;
      break;
    case 83:
      if (poslednja_xy !== 0) break
      xv = 0; yv = 1;
      break;
  }
}

function azuriraj() {
  if (na_zmiji(hrana)) {
    Random_pozicija_hrane()
    produzi(1)
    produzi_zmiju()
  }
  document.addEventListener("keydown", dugme_pritisnutno);
  for (let i = telo.length - 2; i >= 0; i--) {
    telo[i + 1] = { ...telo[i] }
  }
  telo[0].x += xv;
  telo[0].y += yv;
  poslednja_xv = xv;
  poslednja_xy = yv;


}
function crtaj(ploca) {
  ploca.innerHTML = ''
  telo.forEach(niz => {
    const zmija = document.createElement('div')
    zmija.style.gridRowStart = niz.y
    zmija.style.gridColumnStart = niz.x
    zmija.classList.add('zmija')
    ploca.appendChild(zmija)

  })

  const hrana_e = document.createElement('div')
  hrana_e.style.gridRowStart = hrana.y
  hrana_e.style.gridColumnStart = hrana.x
  hrana_e.classList.add('jabuka')
  ploca.appendChild(hrana_e)

}


function Random_pozicija_hrane() {
  while (na_zmiji(hrana)) {
    hrana = random_mesto()
  }
}

function random_mesto() {
  return {
    x: Math.floor(Math.random() * velicina_table_random) + 1,
    y: Math.floor(Math.random() * velicina_table_random) + 1
  }
}

// function na_zmiji(pozicija, { ignorisi_glavu = false } = {}) {
//   return telo.some((niz, brojac) => {
//     if (ignorisi_glavu && brojac === 0) return false
//     return na_istoj(pozicija, niz)
//   })
// }

function na_zmiji(pozicija, { ignorisi_glavu = false } = {}) {
  return telo.some((niz, broj) => {
    if (ignorisi_glavu && broj == 0) return false
    return na_istoj(niz, pozicija)
  })
}

function presek_sa_telom() {
  return na_zmiji(telo[0], { ignorisi_glavu: true })
}

function na_istoj(s1, s2) {
  return s1.x == s2.x && s1.y == s2.y
}

function produzi_zmiju() {
  for (let i = 0; i < vrednost_prosirenja; i++) {
    telo.push({ ...telo[telo.length - 1] })
  }

  vrednost_prosirenja = 0
}
function produzi(k) {
  vrednost_prosirenja += k
}

function izvan_table(pozicija) {
  return (
    pozicija.x < 1 || pozicija.x > velicina_table ||
    pozicija.y < 1 || pozicija.y > velicina_table
  )
}
