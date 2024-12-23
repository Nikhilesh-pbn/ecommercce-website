let cart = [];

const loadCartFromLocalStorage = () =>{
    const storedCart = localStorage.getItem('cart');
    if(storedCart){
        cart = JSON.parse(storedCart)
        updateCartCount();
}
};

loadCartFromLocalStorage();
class Product {
    constructor(name, specs, price, discount, rating, image) {
        this.name = name;
        this.specs = specs;
        this.price = price;
        this.discount = discount;
        this.rating = rating;
        this.image = image;
    }

    static addToDOM(product, container) {
        const productBox = document.createElement('div');
        productBox.classList.add('product-box');

        productBox.innerHTML = `
            <div class="image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-info">
                <p class="prod-name">${product.name} <br>${product.specs}</p>
                <p class="price">${product.price} <span style="color: green;">(${product.discount})</span></p>
                <p class="rating">${product.rating}<i class="fa-solid fa-star" style="color: #6d2ad1;"></i>/5</p>
                <button class="addToCart"><i class="fa-solid fa-cart-plus"></i> Add to Cart</button>
            </div>
        `;

        productBox.querySelector('.addToCart').addEventListener('click', () => {
            let getFromStorageIfCartItemIsThere = localStorage.getItem("cart");
            let parseTheAboveItems = JSON.parse(getFromStorageIfCartItemIsThere) || [];
            if(parseTheAboveItems.some(item => item.name === product.name)){
                alert("Product already in cart");
            }else{
                cart.push(product);
                updateCartCount();
                localStorage.setItem("cart", JSON.stringify(cart));
            }
            
            
        });

        container.appendChild(productBox);
    }
}

const productList = document.getElementById('productList');
const searchInput = document.getElementById('searchInput');


const products = [
    new Product("Samsung Galaxy S23 Ultra", "(12GB RAM, 256GB Storage)", "Rs.79,999", "47% off", 4.5, "https://m.media-amazon.com/images/I/71lD7eGdW-L._AC_UY327_FMwebp_QL65_.jpg",1),
    new Product("OnePlus 12R 5G", "(8GB RAM, 256GB Storage)", "Rs.42,999", "EMI-₹2,085", 4.0, "https://m.media-amazon.com/images/I/71XNeka-BRL._AC_UY327_FMwebp_QL65_.jpg",2),
    new Product("Redmi Note 13 Pro+", "(8GB RAM, 256GB Storage)", "Rs.27,998", "18% off", 3.9, "https://m.media-amazon.com/images/I/31k+gXNf-hL._AC_UF480,480_SR480,480_.jpg",3),
    new Product("realme GT 6T 5G", "(8GB RAM, 256GB Storage)", "Rs.32,999", "8% off", 4.3, "https://m.media-amazon.com/images/I/41Pi7EciJqL._AC_.jpg",4),
    new Product("iQOO Neo9 Pro 5G", "(8GB RAM, 256GB Storage)", "Rs.35,999", "14% off", 4.4, "https://m.media-amazon.com/images/I/718jcIFYaAL._AC_.jpg",5),
    new Product("HONOR 200 5G", "(8GB RAM, 256GB Storage)", "Rs.29,998", "25% off", 4.1, "https://m.media-amazon.com/images/I/71yVqjq0aeL._AC_.jpg",6),
    new Product("realme GT 7 Pro", "(8GB RAM, 256GB Storage)", "Rs.59,998", "14% off", 4.1, "https://m.media-amazon.com/images/I/41WpAGDeZyL._AC_UF480,480_SR480,480_.jpg",7),
    new Product("Apple iPhone 16 5G", "(Black, 128GB)", "Rs.77,400", "3% off", 4.4, "https://m.media-amazon.com/images/I/615O-NFQKdL._AC_UL480_FMwebp_QL65_.jpg",8),
    new Product("iQOO Z7 Pro 5G", "(8GB RAM, 256GB Storage)", "Rs.21,998", "21% off", 4.5, "https://m.media-amazon.com/images/I/61Id6WJDWqL._AC_UL480_FMwebp_QL65_.jpg",9),
    new Product("Samsung Galaxy M35 5G", "(8GB RAM, 256GB Storage)", "Rs.21,499", "22% off", 4.0, "https://m.media-amazon.com/images/I/81nJiu51M+L._AC_UL480_FMwebp_QL65_.jpg",10),
    new Product("OnePlus Nord 4 5G", "(8GB RAM, 256GB Storage)", "Rs.32,999", "10% off", 4.0, "https://m.media-amazon.com/images/I/616wnQmPQ-L._AC_UL480_FMwebp_QL65_.jpg",11),
    new Product("iQOO Z9s Pro 5G", "(12GB RAM, 256GB Storage)", "Rs.28,999", "15% off", 4.4, "https://m.media-amazon.com/images/I/711ZTkL0l8L._AC_UL480_FMwebp_QL65_.jpg",12),
    new Product("Apple iPhone 15 Pro Max", "(256GB Storage)", "Rs.1,39,900", "2% off", 4.7, "https://m.media-amazon.com/images/I/81dT7CUY6GL._AC_UY327_FMwebp_QL65_.jpg",13),
    new Product("Samsung Galaxy Z Flip 5", "(8GB RAM, 256GB Storage)", "Rs.1,09,999", "10% off", 4.5, "https://m.media-amazon.com/images/I/61Tl1z+Hn0L._AC_UY327_FMwebp_QL65_.jpg",14),
    new Product("Asus ROG Phone 7", "(16GB RAM, 512GB Storage)", "Rs.74,999", "6% off", 4.8, "https://28mobile.com/cdn/shop/products/rog-phone-7-ultimate@2x.jpg?v=1682165739",15),
    new Product("OnePlus Open", "(16GB RAM, 512GB Storage)", "Rs.99,999", "29% off", 4.5, "https://m.media-amazon.com/images/I/71pKVhll1IL._AC_UY327_FMwebp_QL65_.jpg",16),
    new Product("OnePlus Nord CE4 Lite 5G", "(8GB RAM, 128GB Storage)", "Rs.17,999", "10% off", 4.0, "https://m.media-amazon.com/images/I/61Io5-ojWUL._AC_UY327_FMwebp_QL65_.jpg",17),
    new Product("Apple iphone 13", "(Red, 128GB Storage)", "Rs.45,490", "29% off", 4.5, "https://m.media-amazon.com/images/I/71gm8v4uPBL._AC_UY327_FMwebp_QL65_.jpg",18)
];


products.forEach(product => Product.addToDOM(product, productList));

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('search') === 'realme') {
    searchInput.value = "realme";
    searchInput.dispatchEvent(new Event('input'));
}

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    Array.from(productList.getElementsByClassName('product-box')).forEach(box => {
        const productName = box.querySelector('.prod-name').innerText.toLowerCase();
        box.style.display = productName.includes(query) ? 'block' : 'none';
    });
});


function updateCartCount() {
    let elements = document.getElementById("cartCount");
    elements.textContent = cart.length;
}

