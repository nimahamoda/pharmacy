//
$(document).ready(function () {
  // بناء بطاقات الأقسام داخل #category
 const $row = $('#category');
$row.empty();
const cardsHtml = categories
  .filter(c => c.name !== "الكل")
  .map(cat =>
    `<div class="col">
      <a class="link" href="${cat.url}">
        <div class="card h-100 text-center border-3 border-navy">
          <img src="${cat.img}" class="card-img-top" alt="${cat.name}">
          <div class="card-body">
            <h5 class="card-title small">${cat.name}</h5>
          </div>
        </div>

      </a>
    </div>
    
    `
  ).join('');
$row.html(cardsHtml);

  // بناء قائمة Dropdown
  const $menu = $('#dropdown-menu');
  $menu.empty();
  const itemsHtml = categories.map(cat =>
    `<li><a class="dropdown-item" href="${cat.url}">${cat.name}</a></li>`
  ).join('');
  $menu.html(itemsHtml);

  // قائمة الفلترة
  const $categoryFilter = $('#category-filter');
  const $productList = $('#product-list');
  $categoryFilter.empty().append(`<option value="0">الكل</option>`);
  categories.forEach(cat => {
    $categoryFilter.append(`<option value="${cat.id}">${cat.name}</option>`);
  });

  // عرض المنتجات حسب الفئة
  function showProducts(filterCategory = "0") {
    $productList.empty();
    const filtered = filterCategory === "0" ? products : products.filter(p => p.categoryId == filterCategory);

    if (filtered.length === 0) {
      $productList.append('<p>لا توجد منتجات للفئة المختارة.</p>');
      return;
    }

    filtered.forEach(prod => {
      const $div = $(`
        <div class="product-card p-3 m-1 border text-center">
          <a href="#" class="link">
            <img src="${prod.image}" alt="${prod.name}" class="img-fluid rounded mb-3">
          </a>
          
          <h3 class="h5 mb-1"><a href="#">${prod.name}</a></h3>
   <span class="text-danger">
              <b>${prod.price}</b>₪
              </span>
          <p class="mb-2 small">${prod.desc}</p>
          
                        <p class="mb-0 center p-1">

            <button class="add-to-cart link btn btn-sm btn-outline-dark" data-id="${prod.id}">
           
            <i class="bi bi-cart-plus"></i> أضف إلى السلة
             
            </button>
          </p>
        </div>
      `);
      $productList.append($div);
    });
  }

  // زر الفلترة
  $('#filter-btn').on('click', function () {
    const selectedCategory = $categoryFilter.val() || "0";
    showProducts(selectedCategory);
  });

  // زر إعادة التعيين
  $('#reset-btn').on('click', function () {
    $categoryFilter.val('0');
    showProducts("0");
  });

  // أول مرة
  showProducts("0");
});

//   البحث والباركود
$(function () {
  const resultsDiv = $('#results');
  const readerDiv = $('#reader')[0];
  let html5QrCode;

  function showResults(items) {
    if (items.length === 0) {
      resultsDiv.html("<p>لا توجد نتائج</p>");
      return;
    }
    const html = items.map(p => `
       <div class="product-card p-3 m-1 border text-center">
          <a href="#" class="link">
            <img src="${p.image}" alt="${p.name}" class="img-fluid rounded mb-3">
          </a>
          
          <h3 class="h5 mb-1"><a href="#">${p.name}</a></h3>
   <span class="text-danger">
              <b>${p.price}</b>₪
              </span>
          <p class="mb-2 small">${p.desc}</p>
          
                        <p class="mb-0 center p-1">

            <button class="add-to-cart link btn btn-sm btn-outline-dark" data-id="${p.id}">
           
            <i class="bi bi-cart-plus"></i> أضف إلى السلة
             
            </button>
          </p>
        </div>
    `).join('');
    resultsDiv.html(html);
  }

  $('#text-search').on('input', function () {
    const val = $(this).val().trim();
    if (val === "") {
      resultsDiv.html("");
      return;
    }
    const filtered = products.filter(p => p.name.includes(val));
    showResults(filtered);
  });

  $('#start-scan-btn').on('click', function () {
    if (readerDiv.style.display === "none") {
      readerDiv.style.display = "block";

      html5QrCode = new Html5Qrcode("reader");
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        qrCodeMessage => {
          html5QrCode.stop().then(() => {
            readerDiv.style.display = "none";
            const found = products.filter(p => p.barcode === qrCodeMessage);
            if (found.length) {
              showResults(found);
            } else {
              resultsDiv.html("<p>لم يتم العثور على دواء مطابق للباركود.</p>");
            }
          }).catch(err => console.error("خطأ في إيقاف المسح:", err));
        },
        errorMessage => {
          // تجاهل أخطاء المسح
        }
      ).catch(err => alert("تعذر فتح الكاميرا: " + err));
    } else {
      html5QrCode.stop().then(() => {
        readerDiv.style.display = "none";
      });
    }
  });
});
//السلة// تحميل السلة من localStorage
let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

// حفظ السلة
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// تحديث رقم السلة
function updateCartCount() {
  const countSpan = document.getElementById("cart-count");
  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (countSpan) countSpan.textContent = totalCount;
}

// إضافة منتج إلى السلة
function addToCart(productId) {
  const existingItem = cartItems.find(item => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ productId: productId, quantity: 1 });
  }
  saveCart();
  updateCartCount();
  alert("تمت الإضافة إلى السلة!");
}

// عند النقر على زر "أضف إلى السلة"
$(document).on("click", ".add-to-cart", function (e) {
  e.preventDefault();
  const productId = parseInt($(this).data("id"));
  addToCart(productId);
});

// عرض محتوى السلة
function renderCart() {
  const $tbody = $("#cart-table-body");
  $tbody.empty();
  let total = 0;

  cartItems.forEach(item => {
    const product = products.find(p => p.id == item.productId);
    if (!product) return;

    const qty = item.quantity || 1;
    const subtotal = product.price * qty;
    total += subtotal;

    const $row = $(`
      <tr>
        <td class="product-thumbnail">
        <img src="${product.image}" style="max-width:90px; alt="${product.name}">
        </td>
        
        <td>${product.name}</td>
        <td>${product.price} ₪</td>
        <td>
          <input type="number" min="1" value="${qty}" class="form-control form-control-sm qty-input" data-id="${product.id}">
        </td>
        <td>${subtotal} ₪</td>
        <td><button class="btn btn-sm btn-danger remove-btn" data-id="${product.id}">X</button></td>
      </tr>
    `);
    $tbody.append($row);
  });

  $("#cart-total").text(total);
}

// تغيير الكمية
$(document).on("change", ".qty-input", function () {
  const id = +$(this).data("id");
  const qty = +$(this).val();
  const index = cartItems.findIndex(i => i.productId === id);
  if (index !== -1) {
    cartItems[index].quantity = qty;
    saveCart();
    renderCart();
    updateCartCount();
  }
});

// حذف منتج من السلة
$(document).on("click", ".remove-btn", function () {
  const id = +$(this).data("id");
  cartItems = cartItems.filter(i => i.productId !== id);
  saveCart();
  renderCart();
  updateCartCount();
});

// إفراغ السلة
function clearCart() {
  cartItems = [];
  saveCart();
  renderCart();
  updateCartCount();
  alert("تم إفراغ السلة!");
  location.reload(); // فقط لو محتاجة تعيدي تحميل
}

document.getElementById("clear-cart-btn").addEventListener("click", clearCart);

// عند تحميل الصفحة
updateCartCount();
renderCart();
// استخراج معرف النوع من عنوان الرابط
   