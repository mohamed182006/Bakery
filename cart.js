window.addEventListener("focus", function () {
    // كل ما المستخدم يروح ويرجع للصفحة
    showbox();           // 1- عرض المنتجات الجديدة في السلة
    updateCartButtons(); // 2- تحديث ألوان أيقونات السلة
    updateCartCount();   // 3- تحديث العداد
});




// عند تحميل الصفحة، نعرض السلة والمنتجات المضافة مسبقًا
window.onload = function () {

    showbox();           // 1- عرض جميع المنتجات الموجودة في السلة
    updateCartButtons(); // 2- ضبط ألوان أيقونات السلة وتعطيل الأزرار للمنتجات الموجودة
    updateCartCount();   // تحديث العداد
}

function addtocart(button) {
    // 1- أوصل للكارد بتاع المنتج اللي اتضغط عليه
    let product = button.closest(".pro-card");




    let selected = {
        img: product.querySelector(".pro-img").src,
        title: product.querySelector(".pro-title").innerText,
        des: product.querySelector(".pro-des").innerText,
        price: product.querySelector(".pro-price").innerText.replace('$', ''),
        star: product.querySelector(".pro-star").src,
        rat: product.querySelector(".pro-rat").innerText
    };



    // 4- جيب الموجود من قبل (لو فاضي يبقى مصفوفة فاضية)
    let cartbox = JSON.parse(localStorage.getItem("cartbox")) || [];

    // 5- تحقق إذا المنتج موجود بالفعل لتجنب التكرار
    let exists = cartbox.some(item => item.title === selected.title);



    if (exists) {

        alert("This product is already in the cart ✅");

        return; // توقف إذا المنتج موجود

    }





    // 6- أضف المنتج الجديد
    cartbox.push(selected);

    // 7- خزّنهم تاني في localStorage
    localStorage.setItem("cartbox", JSON.stringify(cartbox));

    // 8- تغيير لون أيقونة السلة للمنتج
    let carticon = button.querySelector('i');
    carticon.style.color = "#78350f";

    // // 9- تعطيل الزر بعد الضغط لمنع الضغط مرة ثانية
    // button.disabled = true;

    // 10- حدث السلة على الصفحة فورًا
    showbox();

    updateCartCount(); // لتحديث العداد فور إضافة المنتج

    // 11- رسالة تأكيد للمستخدم
    alert("The product has been added successfully✅");

    updateCartButtons();


}




// دالة عرض السلة على الصفحة
function showbox() {
    // 1- جلب المنتجات من localStorage
    let cartbox = JSON.parse(localStorage.getItem("cartbox")) || [];
    let cartContainer = document.getElementById("cartbox");

    // 2- إفراغ محتوى السلة قبل إعادة عرض المنتجات
    cartContainer.innerHTML = "";

    // 3- إنشاء HTML لكل منتج وإضافته للسلة

    cartbox.forEach((item, index) => {
        cartContainer.innerHTML += `
    <div class=" pro-card w-[470px] bg-amber-50 rounded-3xl translate-x-3.5 translate-y-5 p-3 mb-3">
      <img class=" pro-img w-[120px] h-[100px] rounded-3xl m-auto" src="${item.img}" alt="${item.title}">
      <div class="p-2 text-center">
        <h3 class="text-2xl text-amber-950 font-medium">${item.title}</h3>
       

        <h4 class="text-3xl font-medium">${item.price}$</h4>
        <div class=" flex flex-col items-center gap-2">
        

        <button onclick="goToProduct(${index})" class=" rounded-2xl w-40 mt-4 p-2  text-amber-50  bg-amber-950 ">show product</button>

        <button onclick="removeFromCart(${index})" class="text-red-600 font-bold mt-2 text-2xl">
           <i class="fa-solid fa-trash-can"></i>
         </button>
        </div>
      </div>
    </div>
  `;
    });


    // زر شراء الكل يظهر مرة واحدة بعد كل المنتجات
    cartContainer.innerHTML += `
        <div class="w-full flex justify-center mt-10 mb-3">
            <button id="buyAllBtn" class="hidden bg-white text-amber-950 text-2xl font-medium py-2 px-9 rounded-lg ">
                Order All
            </button>
        </div>
    `;

    // إضافة حدث للزر
    const buyAllBtn = document.getElementById("buyAllBtn");
    if (buyAllBtn) {

        if (cartbox.length > 0) {
            buyAllBtn.classList.remove("hidden"); // لو فيه منتجات، نعرض الزرار
        } else {
            buyAllBtn.classList.add("hidden"); // لو مفيش منتجات، نخفي الزرار
        }

        buyAllBtn.addEventListener("click", () => {
            localStorage.setItem("orderMode", "all");
            location.href = "p3.html"; // غيّر للصفحة اللي عايزها
        });
    }

};








function goToProduct(index) {
    let cartbox = JSON.parse(localStorage.getItem("cartbox")) || [];
    let item = cartbox[index];

    localStorage.setItem("selected", JSON.stringify(item));
    location.href = "pro.html";
}



// دالة لضبط ألوان الأيقونات وتعطيل أزرار المنتجات الموجودة بالفعل
function updateCartButtons() {
    // جلب المنتجات الموجودة في السلة
    let cartbox = JSON.parse(localStorage.getItem("cartbox")) || [];

    // جلب جميع أزرار السلة
    let cartbtns = document.querySelectorAll(".cart");

    cartbtns.forEach(button => {
        let product = button.closest(".pro-card");
        let proTitle = product.querySelector(".pro-title").innerText;


        let carticon = button.querySelector('i');


        // إذا المنتج موجود في السلة مسبقًا
        if (cartbox.some(item => item.title === proTitle)) {
            // 1- تغيير لون الأيقونة

            carticon.style.color = "#78350f";


        } else {
            carticon.style.color = "";

        }
    });
}




let cartCount = document.querySelectorAll(".cart-count");

// دالة لتحديث العداد
function updateCartCount() {
    let cartbox = JSON.parse(localStorage.getItem("cartbox")) || [];
    let count = cartbox.length;

    // تحديث كل عناصر العداد (للموبايل واللاب)
    cartCount.forEach(c => {
        if (count > 0) {
            c.innerText = count;        // حط العدد داخل العداد
            c.classList.remove("hidden"); // خلي العداد ظاهر
        } else {
            c.classList.add("hidden");  // لو مفيش منتجات أخفي العداد
        }
    });
}

function removeFromCart(index) {

    let cartbox = JSON.parse(localStorage.getItem("cartbox")) || [];

    cartbox.splice(index, 1);


    localStorage.setItem("cartbox", JSON.stringify(cartbox));




    showbox();
    updateCartButtons();
    updateCartCount();


}










