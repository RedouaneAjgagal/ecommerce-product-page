// Images on zoom mode
const mainImgZoomMode = document.querySelector(".mainImgZoomMode");
const thumbnailsZoomMode = document.querySelectorAll(".thumbnailZoomMode");
const onClickImages = document.querySelector(".images.onClick");
const closeImages = document.querySelector(".closeOnClickImages");
const layerzoomMode = document.querySelector(".zoomMode");
// Images on normal mode
const mainImage = document.querySelector(".mainImgNormalMode");
const thumbnails = document.querySelectorAll(".thumbnail");
const mainImages = document.querySelectorAll(".mainImg");
const mainImg = document.querySelector(".mainImg");
// amount of products
const plus = document.querySelector(".plus");
const minus = document.querySelector(".minus");
const amount = document.getElementById("number");
// Cart toggle
const cart = document.querySelector(".cart");
const insideCart = document.querySelector(".insideCart");
// Add to cart - check out - Cart amount
const addToCart = document.querySelector(".addToCartBtn");
const emptyCart = document.querySelector(".emptyCart");
const fullCart = document.querySelector(".fullCart");
const cartAmount = document.querySelector(".cartAmount");
// Checkout DOM
const checkOutImg = document.querySelector(".checkOutImg");
const checkOutTitle = document.querySelector(".checkOutTitle");
const checkOutPrice = document.querySelector(".productPrice");
const checkOutQuantity = document.querySelector(".quantity");
const checkOutTotal = document.querySelector(".total");
// Product Dom
const productImg = document.getElementById("productImg").src;
const productTitle = document.querySelector(".productTitle");
const productPrice = document.querySelector(".price");
// add to cart
const deleteBtn = document.querySelector(".delete");
// Humburger menu
const toggle = document.querySelector(".toggle");
const navLinks = document.querySelector(".navLinks");
const layerBurger = document.querySelector(".burgerMenu");
function toggleFun(target) {
    target.addEventListener("click", () => {
        navLinks.classList.toggle("open");
        toggle.classList.toggle("active");
        if (navLinks.classList.contains("open")) {
            toggle.setAttribute("aria-expanded", "true");
            toggle.firstElementChild.setAttribute("src", "./images/icon-close.svg");
            document.body.classList.add("no-scroll");
            layerBurger.classList.add("open");
        } else {
            toggle.setAttribute("aria-expanded", "false");
            toggle.firstElementChild.setAttribute("src", "./images/icon-menu.svg");
            if (!insideCart.classList.contains("open")) {
                document.body.classList.remove("no-scroll");
            }
            layerBurger.classList.remove("open");
        }
    });
}
toggleFun(toggle);
toggleFun(layerBurger);
// amount of products
plus.addEventListener("click", () => {
    amount.value++;
});
minus.addEventListener("click", (e) => {
    amount.value < 2 ? e.preventDefault() : amount.value--;
});
// Cart toggle
cart.addEventListener("click", () => {
    insideCart.classList.toggle("open");
    document.body.classList.toggle("no-scroll");
});
// Add to cart - check out - Cart amount
addToCart.addEventListener("click", () => {
    const regex = /[.0-9]/g
    const checkOutPriceNum = productPrice.innerText.match(regex).join('');
    const checkOutQuantityNum = checkOutQuantity.innerText.match(regex).join('');
    if (amount.value !== '') {
        if (fullCart.classList.contains("enable")) {
            const quantity = Number(checkOutQuantityNum) + Number(amount.value);
            checkOutQuantity.innerText = 'x ' + quantity;
            checkOutTotal.innerText = '$' + (quantity * checkOutPriceNum).toFixed(2);
        } else {
            emptyCart.classList.add("disable");
            fullCart.classList.add("enable");
            checkOutImg.setAttribute("src", productImg);
            checkOutTitle.innerText = productTitle.innerText;
            checkOutPrice.innerText = '$' + checkOutPriceNum;
            checkOutQuantity.innerText = 'x ' + Number(amount.value);
            checkOutTotal.innerText = '$' + (Number(amount.value) * checkOutPriceNum).toFixed(2);
        }
        cartAmount.classList.add("active");
    }
    const cartAmountNum = checkOutQuantity.innerText.match(regex).join('');
    cartAmountNum > 9 ? cartAmount.innerText = '+9' : cartAmount.innerText = cartAmountNum;
});
// Clear Btn shop cart
deleteBtn.addEventListener("click", () => {
    emptyCart.classList.remove("disable");
    fullCart.classList.remove("enable");
    cartAmount.classList.remove("active");
});
// Click on the main image - Open Zoom mode
mainImage.addEventListener("click", () => {
    onClickImages.classList.add("active");
    layerzoomMode.classList.add("open");
    document.body.classList.add("no-scroll");
    mainImgZoomMode.setAttribute("src", mainImage.src);
    const regex = /[0-9]/g;
    const match = mainImage.src.match(regex).slice(-1).join("");
    for (let i = 0; i < thumbnailsZoomMode.length; i++) {
        thumbnailsZoomMode.forEach(img => {
            img.classList.remove("active");
        });
        thumbnailsZoomMode[Number(match) - 1].classList.add("active");
    }
});
// Close Btn on Zoom mode
function closeImagesFun(target) {
    target.addEventListener("click", () => {
        onClickImages.classList.remove("active");
        layerzoomMode.classList.remove("open");
        if (!insideCart.classList.contains("open")) {
            document.body.classList.remove("no-scroll");
        }
    });
}
closeImagesFun(closeImages);
closeImagesFun(layerzoomMode);
// display thumbnail on main img
thumbnails.forEach(img => {
    img.addEventListener("click", (e) => {
        for (let i = 0; i < thumbnails.length; i++) {
            thumbnails[i].classList.remove("active");
        }
        const source = e.target.src.slice(0, -14) + '.jpg';
        for (let i = 0; i < mainImages.length; i++) {
            mainImages[i].setAttribute("src", source);
        }
        e.target.classList.add("active");
    });
});
// Display thumbnail on main img (ZoomMode)
thumbnailsZoomMode.forEach(img => {
    img.addEventListener("click", (e) => {
        for (let i = 0; i < thumbnailsZoomMode.length; i++) {
            thumbnailsZoomMode[i].classList.remove("active");
        }
        const source = e.target.src.slice(0, -14) + '.jpg';
        mainImgZoomMode.setAttribute("src", source);
        e.target.classList.add("active");
    });
});
// // previous - next buttons
function previousPlus(mode, next, previous) {
    const nexts = document.querySelector(next);
    const previouss = document.querySelector(previous);
    let calc = 1;
    const regex = /[0-9]/g;
    // Next
    nexts.addEventListener("click", () => {
        thumbnailsZoomMode.forEach(img => {
            img.classList.remove("active");
        });
        const match = mode.src.match(regex).slice(-1).join('');
        const source = mode.src.slice(0, -5) + (Number(match) + calc) + '.jpg';
        if ((Number(match) + calc) > 4) {
            thumbnailsZoomMode[0].classList.add("active");
            mode.setAttribute("src", source.slice(0, -5) + '1.jpg');
        } else {
            thumbnailsZoomMode[Number(match)].classList.add("active");
            mode.setAttribute("src", source);
        }
    });
    // Previous
    previouss.addEventListener("click", () => {
        thumbnailsZoomMode.forEach(img => {
            img.classList.remove("active");
        });
        const match = mode.src.match(regex).slice(-1).join('');
        const source = mode.src.slice(0, -5) + (Number(match) - calc) + '.jpg';
        if ((Number(match) - calc) < 1) {
            mode.setAttribute("src", source.slice(0, -5) + '4.jpg');
            thumbnailsZoomMode[3].classList.add("active");
        } else {
            thumbnailsZoomMode[Number(match) - 2].classList.add("active");
            mode.setAttribute("src", source);
        }
    });
}
previousPlus(mainImgZoomMode, '.nextZoomMode', '.previousZoomMode');
previousPlus(mainImg, '.next', '.previous');
