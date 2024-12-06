let longPressTriggered = false;
let longPressTimer;
let animationInProgress = false;
const namecontent = document.getElementById('name-content');
const urlcontent = document.getElementById('url-content');
const imgcontent = document.getElementById('img-content');
const addsavecontent = document.getElementById('add-save-content');
const tableBody = document.querySelector('table tbody'); // Tabloyu seçiyoruz, tbody kısmı önemlidir.

addsavecontent.addEventListener('click', function () {
  // Formdan verileri alıyoruz (inputlar ve img)
  const name = namecontent.value.trim() || 'No Name'; // İsim boşsa 'No Name'
  const url = urlcontent.value.trim() || 'No URL'; // URL boşsa 'No URL'
  const imgFile = imgcontent.files[0]; // Resim dosyasını alıyoruz

  // Eğer bir resim dosyası seçildiyse, URL'sini alırız
  const imagePath = imgFile ? URL.createObjectURL(imgFile) : 'default-image.jpg'; // Resim yoksa varsayılan resim

  // Yeni bir satır eklemek için HTML oluşturma
  const newRow = document.createElement('tr');
  newRow.classList.add('table-row'); // Satır için bir sınıf ekliyoruz

  // Yeni hücre (td) oluşturuyoruz
  const contentCell = document.createElement('td');
  contentCell.classList.add('content-cell'); // Hücreye sınıf ekliyoruz

  // İçeriği düzenliyoruz (resim ve input'ları birleştiriyoruz)
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content'); // content div'ine sınıf ekliyoruz

  // İçeriğe img ve inputları ekliyoruz
  const imgElementToAdd = document.createElement('img');
  imgElementToAdd.src = imagePath; // Resim
  imgElementToAdd.style.maxWidth = '100px'; // Resmin boyutunu küçültüyoruz
  imgElementToAdd.classList.add('contentimg'); // Resme sınıf ekliyoruz
  contentDiv.appendChild(imgElementToAdd);

  const nameInputToAdd = document.createElement('input');
  nameInputToAdd.type = 'text';
  nameInputToAdd.placeholder = 'Lütfen İsim Giriniz.';
  nameInputToAdd.value = name;
  contentDiv.appendChild(nameInputToAdd);

  const urlInputToAdd = document.createElement('input');
  urlInputToAdd.type = 'text';
  urlInputToAdd.placeholder = 'Lütfen URL Giriniz.';
  urlInputToAdd.value = url;
  contentDiv.appendChild(urlInputToAdd);

  // Hücreye div'i ekliyoruz
  contentCell.appendChild(contentDiv);
  newRow.appendChild(contentCell);

  // Yeni satırı tabloya ekliyoruz
  tableBody.appendChild(newRow);

  // Girişleri sıfırlama
  namecontent.value = '';
  urlcontent.value = '';
  imgcontent.value = ''; // Resim sıfırlama

  // Yeni eklenen içerik için de uzun basma olayını bağlama
  addLongPressEvent(contentDiv);
});

// ".content" öğelerine basılı tutma olayını dinleriz
function addLongPressEvent(contentElement) {
  contentElement.addEventListener('mousedown', function () {
    console.log("tıklandı süre başlıyor");

    // Eğer uzun basma daha önce tetiklenmediyse (ilk kez basılma)
    if (!longPressTriggered) {
      // 1 saniye boyunca basılı tutulmasını bekleyecek bir zamanlayıcı başlatılır
      longPressTimer = setTimeout(() => {
        console.log("başladı animasyon");

        // Animasyon zaten başlamışsa devam etmesin, yoksa başlasın
        if (!animationInProgress) {
          // Tüm content öğelerine aynı anda animasyonu uygula
          document.querySelectorAll('.content').forEach(function (el) {
            el.classList.add('move-left-right');
          });

          // Submit butonunu görünür yap
          document.querySelectorAll('.submit-content').forEach(function (submitBtn) {
            submitBtn.style.display = 'block';
          });

          // Animasyon başladığı için flag'i true yapıyoruz
          animationInProgress = true;
        }

        // longPressTriggered bayrağını true yaparak animasyonun sadece bir kere tetiklenmesini sağlarız
        longPressTriggered = true;
      }, 1000); // 1000 ms = 1 saniye
    }
  });

  // ".content" öğesinden basma işlemi bırakıldığında (mouseup)
  contentElement.addEventListener('mouseup', function () {
    // Zamanlayıcıyı temizle (uzun basma işlemi iptal edilirse)
    clearTimeout(longPressTimer);
  });

  // Eğer mouse dışarıya çıkarsa da zamanlayıcıyı temizle
  contentElement.addEventListener('mouseleave', function () {
    // Zamanlayıcıyı temizle (uzun basma işlemi iptal edilirse)
    clearTimeout(longPressTimer);
  });
}

// Kaydetme işlemi yapılınca animasyonu durdurma
document.querySelectorAll('.submit-content').forEach(function (submitButton) {
  submitButton.addEventListener('click', function () {
    // "content" sınıfına sahip tüm öğeleri seçer (content div'leri)
    const contentDivs = document.querySelectorAll('.content');

    // Her bir content div'inden "move-left-right" sınıfını kaldırarak sallanma animasyonunu durdurur
    contentDivs.forEach(div => {
      div.classList.remove('move-left-right'); // div'e uygulanan animasyonu kaldırır
    });

    // Submit butonunu gizle
    this.style.display = 'none';

    // Animasyonun bittiğini belirtiyoruz
    animationInProgress = false;
    
    // longPressTriggered bayrağını sıfırlama (yeni içerik için uzun basma işlemi tetiklenebilir)
    longPressTriggered = false;
  });
});

// Yeni içerik eklemek için butona tıklama
addsavecontent.addEventListener("click", function () {
  const name = document.getElementById("name-content").value;
  const url = document.getElementById("url-content").value;
  const imgFile = document.getElementById("img-content").files[0];

  if (name && url && imgFile) {
    const wrapper = document.querySelector(".wrapper");

    // Yeni içerik bloğu oluşturma
    const content = document.createElement("div");
    content.className = "content";

    // Görsel ekleme
    const img = document.createElement("img");
    img.src = URL.createObjectURL(imgFile);
    img.alt = "User Image";
    img.className = "contentimg";
    content.appendChild(img);

    // İsim inputu
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = name;
    nameInput.className = "name";
    content.appendChild(nameInput);

    // URL inputu
    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.value = url;
    urlInput.className = "url";
    content.appendChild(urlInput);

    wrapper.appendChild(content);
    alert("Yeni içerik başarıyla eklendi!");
  } else {
    alert("Lütfen tüm alanları doldurun!");
  }
});
