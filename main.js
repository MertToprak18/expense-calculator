//! html elemanlarını çağırma
let form = document.getElementById("add-form");
let list = document.getElementById("list");
let addBtn = document.getElementById("addBtn");
let checkbox = document.getElementById("checkbox");
let toplamSpan = document.getElementById("price-info");
let kullaniciAdi = document.querySelector("#kullaniciAdi");

//! formun gönderilme olayını izleyecez. event dinleyecez.

form.addEventListener("submit", addExpense);

//! Kullanıcıyı LOCALSTORAGE kısmına yani tarayıcının deposuna kaydeder.
kullaniciAdi.addEventListener("change", (event) => {
  localStorage.setItem("Kullanici_Adi", event.target.value);
});

//!eğer varsa kullanıcınn ismini localstorage'dan al ve inputun yerine koy.
const getUser = () => {
  const username = localStorage.getItem("Kullanici_Adi");
  kullaniciAdi.value = username;
};

document.addEventListener("DOMContentLoaded", getUser);

let toplamFiyat = 0;
function updateTotal(price) {
  toplamFiyat += price;

  toplamSpan.innerText = toplamFiyat;
}

// harcamayı listeye ekleme fonksiyonu oluştur.

function addExpense(event) {
  // sayfayı yenilemeyi engelleyen fonksiyon
  event.preventDefault();
  // inputtaki değerlere erişme- target[0] da harcamanın ismi var target[1] de fiyatı var
  let title = event.target[0].value;
  let price = event.target[1].valueAsNumber;

  //!1- inputlardan biri dahi boş ise : uyarı ver ve fonksiyonu durdur

  if (!title.trim() || !price) {
    alert("Lütfen formu doldurunuz");
    return;
  }

  //! 2- inputlar doluysa bir kart oluştur ve html'e gönder

  const harcamaDiv = document.createElement("div");

  harcamaDiv.classList.add("harcama");

  if (checkbox.checked === true) {
    harcamaDiv.classList.add("odendi");
  }

  harcamaDiv.innerHTML = `
    <h3 id="title">${title}</h3>
    <h3 id="price">${price}</h3>
    <div  class="buttons">

     <div id="updateBtn" class="setting-btn">
      BTN
     </div>

    <div class="del">
      <div id="delete">Delete</div>
    </div>
    </div>
   `;

  list.appendChild(harcamaDiv);

  // 1. basit yöntem listenin htmline yeni li elemanı ekledik. += diyerek öncekinin silinmesini engelledik
  // list.innerHTML += `
  // <li>
  //   <h3>${title}</h3>
  //   <h3>${price}</h3>
  //   <div  class="del">
  //     <div id="delete">Delete</div>
  //   </div>
  // </li>
  // `;

  //! toplam fiyatı güncelle güncellerken inputtan gelen pricei gönder

  updateTotal(price);

  event.target[0].value = "";
  event.target[1].value = "";
  event.target[2].checked = false;
}

/* liste alanındaki tıklanma olaylarını izle */

list.addEventListener("click", handleUpdate);

//! harcamayı siler veya günceller */

function handleUpdate(event) {
  /* event.target ile nereye tıkladığımız hangi elemente tıkladığımızı bulduk */
  let element = event.target;

  // tıklanılan elemanın idsi delete ise silme işlemini yap
  if (element.id === "delete") {
    // htmlden silmek istiyorsam remove methodunu kullan

    // butonun kapsayıcısına eriş

    const parent = element.parentElement.parentElement.parentElement;
    const price = Number(parent.children[1].innerText);
    updateTotal(-price);
    parent.remove();
  }
  if (element.id === "updateBtn") {
    const parent = element.parentElement.parentElement;
    parent.classList.toggle("odendi");
  }
}
