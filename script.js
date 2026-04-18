let level = 0;
let nomorSoal = 0;
let nyawa = 3;

let soal = [
  [
    // LEVEL 1
    { gambar: "kota1.png", jawaban: "lampung" },
    { gambar: "kota2.png", jawaban: "batu" },
    { gambar: "kota3.png", jawaban: "surabaya" },
    { gambar: "kota4.png", jawaban: "sukabumi" },
    { gambar: "kota5.png", jawaban: "balikpapan" },
  ],

  [
    // LEVEL 2
    { gambar: "kota6.png", jawaban: "jambi" },
    { gambar: "kota7.png", jawaban: "bandung" },
    { gambar: "kota8.png", jawaban: "salatiga" },
    { gambar: "kota9.png", jawaban: "banjar" },
    { gambar: "kota10.png", jawaban: "kupang" },
  ],

  [
    // LEVEL 3
    { gambar: "kota11.png", jawaban: "jember" },
    { gambar: "kota12.png", jawaban: "madiun" },
    { gambar: "kota13.png", jawaban: "denpasar" },
    { gambar: "kota14.png", jawaban: "bengkulu" },
    { gambar: "kota15.png", jawaban: "jepara" },
  ],

  [
    // LEVEL 4
    { gambar: "kota16.png", jawaban: "baubau" },
    { gambar: "kota17.png", jawaban: "tangerang" },
    { gambar: "kota18.png", jawaban: "manado" },
    { gambar: "kota19.png", jawaban: "banyuwangi" },
    { gambar: "kota20.png", jawaban: "pekanbaru" },
  ],

  [
    // LEVEL 5
    { gambar: "kota21.png", jawaban: "banda aceh" },
    { gambar: "kota22.png", jawaban: "singkawang" },
    { gambar: "kota23.png", jawaban: "jayapura" },
    { gambar: "kota24.png", jawaban: "yogyakarta" },
    { gambar: "kota25.png", jawaban: "palangkaraya" },
  ],
];

function tampilkanSoal() {
  let s = soal[level][nomorSoal];

  // Level
  document.getElementById("levelText").innerText = "Level " + (level + 1);

  // nomor soal
  document.getElementById("nomorSoal").innerText =
    "Soal " + (nomorSoal + 1) + " / " + soal[level].length;

  //   nyawa
  document.getElementById("nyawa").innerText = "❤️".repeat(nyawa);

  //   gambar
  document.getElementById("gambarSoal").src = "images/" + s.gambar;
}

function cekJawaban() {
  let jawabanUser = document
    .getElementById("inputjawaban")
    .value.toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

  // ================== JAWABAN BENAR ==================
  if (jawabanUser === soal[level][nomorSoal].jawaban) {
    let hasil = document.getElementById("hasil");

    hasil.className = "";
    void hasil.offsetWidth;

    hasil.className = "benar";

    let s = document.getElementById("soundBenar");
    s.currentTime = 0;
    s.play();

    nomorSoal++;

    // masih ada soal di level ini
    if (nomorSoal < soal[level].length) {
      document.getElementById("inputjawaban").value = "";

      setTimeout(() => {
        tampilkanSoal();
      }, 800);
    } else {
      // pindah level
      level++;
      nomorSoal = 0;

      if (level < soal.length) {
        document.getElementById("inputjawaban").value = "";
        document.getElementById("hasil").innerText = "";
        showPopup("Naik ke Level " + (level + 1));

        setTimeout(() => {
          tampilkanSoal();
        }, 1000); // 1 detik aja biar ga lama
      } else {
        let hasil = document.getElementById("hasil");

        hasil.className = "";
        void hasil.offsetWidth;

        hasil.innerText = "Benar!";
        hasil.className = "benar";

        let s = document.getElementById("soundMenang");
        s.currentTime = 0;
        s.play();

        showPopup("Selamat! Kamu menyelesaikan semua level", true);

        let soundLevel = document.getElementById("soundLevelup");
        soundLevel.currentTime = 0;
        soundLevel.play();
      }
    }
  }

  // ================== JAWABAN SALAH ==================
  else {
    nyawa--;

    if (nyawa > 0) {
      let hasil = document.getElementById("hasil");

      let s = document.getElementById("soundSalah");
      s.currentTime = 0;
      s.play();
      let input = document.getElementById("inputjawaban");

      input.classList.add("shake");

      setTimeout(() => {
        input.classList.remove("shake");
      }, 300);

      hasil.className = "salah";

      document.getElementById("inputjawaban").value = "";
      document.getElementById("inputjawaban").focus();
      setTimeout(() => {
        tampilkanSoal();
      }, 800);
    } else {
      let hasil = document.getElementById("hasil");
      showPopup("Game Over! Mulai dari awal!", true);

      let s = document.getElementById("soundGameover");
      s.currentTime = 0;
      s.play();
      hasil.className = "salah";
    }
  }
}

// awal
tampilkanSoal();

// tekan ENTER untuk cek jawaban
document
  .getElementById("inputjawaban")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      cekJawaban();
    }
  });

function showPopup(text, showButton = false) {
  let popup = document.getElementById("popup");
  let popupText = document.getElementById("popupText");
  let btn = document.getElementById("btnMainLagi");

  popupText.innerText = text;
  popup.style.display = "flex";

  document.getElementById("inputjawaban").disabled = true;

  if (showButton) {
    btn.style.display = "inline-block";
  } else {
    btn.style.display = "none";

    setTimeout(() => {
      popup.style.display = "none";

      document.getElementById("inputjawaban").disabled = false;
      document.getElementById("inputjawaban").focus();
    }, 1500);
  }

  popupText.className = "";

  if (text.toLowerCase().includes("game over")) {
    popupText.classList.add("gameover");
  }
}

function mainLagi() {
  level = 0;
  nomorSoal = 0;
  nyawa = 3;

  let input = document.getElementById("inputjawaban");

  input.value = "";
  input.disabled = false;
  input.focus();

  document.getElementById("hasil").innerText = "";

  document.getElementById("popup").style.display = "none";
  document.getElementById("btnMainLagi").style.display = "none";

  tampilkanSoal();
}
