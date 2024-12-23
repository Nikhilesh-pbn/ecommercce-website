
const laptopsContainer = document.querySelector('.products');


const laptops = [
    {
        name: "Apple MacBook AIR Apple M2 - (8 GB/256 GB SSD/Mac OS Monterey) MLY33HN/A",
        specs: [
            "Apple M2 Processor",
            "8 GB Unified Memory RAM",
            "Mac OS Operating System",
            "256 GB SSD",
            "34.54 cm (13.6 Inch) Display",
            "1 Year Limited Warranty",
        ],
        price: "₹73,990",
        originalPrice: "₹99,000",
        discount: "25% off",
        rating: 4.7,
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/2/v/v/-original-imagfdeqter4sj2j.jpeg?q=70",
    },
    {
        name: "HP Pavilion x360 - (16GB/512GB SSD/Windows 11 Home) 14-dy1053TU",
        specs: [
            "Intel Core i5 11th Gen",
            "16 GB DDR4 RAM",
            "Windows 11 Home",
            "512 GB SSD",
            "35.56 cm (14 Inch) Display",
            "1 Year Onsite Warranty",
        ],
        price: "₹67,490",
        originalPrice: "₹78,999",
        discount: "15% off",
        rating: 4.5,
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/v/p/y/-original-imagykgqcddyzpja.jpeg?q=70",
    },
    {
        name: "Dell Inspiron 14",
        specs: [
            "Intel Core i5 13th Gen",
            "16 GB DDR4 RAM",
            "Windows 11 Operating System",
            "512 GB SSD",
            "35.56 cm (14 Inch) Display",
            "1 Year Warranty"
        ],
        price: "₹58,990",
        originalPrice: "₹75,000",
        discount: "21% off",
        rating: 4.5,
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/t/0/y/inspiron-14-7440-plus-thin-and-light-laptop-dell-original-imah76qquan37u3x.jpeg?q=70",
    },
    {
        name: "Lenovo Ideapad Slim 5",
        specs: [
            "AMD Ryzen 5 7530U",
            "16 GB DDR4 RAM",
            "Windows 11 Operating System",
            "512 GB SSD",
            "39.62 cm (15.6 Inch) Display",
            "2 Years Warranty"
        ],
        price: "₹55,499",
        originalPrice: "₹70,000",
        discount: "20% off",
        rating: 4.3,
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/z/y/v/-original-imahyyhhy2nzycck.jpeg?q=70",
    },
    {
        name: "Acer Aspire 7",
        specs: [
            "AMD Ryzen 7 5800H",
            "8 GB DDR4 RAM",
            "Windows 11 Operating System",
            "512 GB SSD",
            "39.62 cm (15.6 Inch) Display",
            "NVIDIA GeForce GTX 1650"
        ],
        price: "₹51,990",
        originalPrice: "₹65,999",
        discount: "21% off",
        rating: 4.2,
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/y/f/i/nh-qaysi-001-nh-qaysi-004-un-qaysi-016-gaming-laptop-acer-original-imah39afktgghhz6.jpeg?q=70",
    },
    {
        name: "MSI Katana GF76",
        specs: [
            "Intel Core i7 12th Gen",
            "16 GB DDR4 RAM",
            "Windows 11 Operating System",
            "512 GB SSD",
            "43.94 cm (17.3 Inch) Display",
            "NVIDIA GeForce RTX 3050"
        ],
        price: "₹92,990",
        originalPrice: "₹1,19,990",
        discount: "23% off",
        rating: 4.6,
        image: "https://m.media-amazon.com/images/I/81FNbr+8j9L._SX679_.jpg",
    },
    {
        name: "ASUS VivoBook 15",
        specs: [
            "Intel Core i3 11th Gen",
            "8 GB DDR4 RAM",
            "Windows 11 Operating System",
            "512 GB SSD",
            "39.62 cm (15.6 Inch) Display",
            "2 Years Warranty"
        ],
        price: "₹36,990",
        originalPrice: "₹45,000",
        discount: "18% off",
        rating: 4.1,
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/y/6/e/-original-imah4dgwhghr66kw.jpeg?q=70",
    },
    {
        name: "LG Gram 16",
        specs: [
            "Intel Core i5 12th Gen",
            "16 GB LPDDR5 RAM",
            "Windows 11 Operating System",
            "512 GB SSD",
            "40.64 cm (16 Inch) Display",
            "1 Year Warranty"
        ],
        price: "₹89,999",
        originalPrice: "₹1,25,000",
        discount: "28% off",
        rating: 4.6,
        image: "https://m.media-amazon.com/images/I/61593LcVFAL.jpg",
    },
    {
        name: "Samsung Galaxy Book3",
        specs: [
            "Intel Core i5 13th Gen",
            "16 GB LPDDR5 RAM",
            "Windows 11 Operating System",
            "512 GB SSD",
            "35.56 cm (14 Inch) Display",
            "2 Years Warranty"
        ],
        price: "₹94,990",
        originalPrice: "₹1,19,990",
        discount: "21% off",
        rating: 4.5,
        image: "https://rukminim2.flixcart.com/image/312/312/xif0q/computer/j/3/f/-original-imahfu5nynahgvfy.jpeg?q=70",
    },
    
];


function addLaptop(laptop) {
    const productBox = document.createElement('div');
    productBox.classList.add('product-box');

    const specsList = laptop.specs.map(spec => `<li>${spec}</li>`).join('');

    productBox.innerHTML = `
        <div class="image">
            <img src="${laptop.image}" alt="${laptop.name}">
        </div>
        <div class="prod-info">
            <p class="name">${laptop.name}</p>
            <div class="rating"><p>${laptop.rating}</p><i class="fa-solid fa-star" style="color: #ffffff;"></i></div>
            <div class="specs">
                <ul>${specsList}</ul>
            </div>
        </div>
        <div class="price-details">
            <p class="price">${laptop.price}</p>
            <div class="discount"><p>${laptop.originalPrice}</p><span style="color: green;">${laptop.discount}</span></div>
            <p style="font-size: 13px; margin-bottom: 10px;">Free Delivery</p>
            <p style="color: green; font-size: 14px;">Save extra with combos and coupons</p>
        </div>
    `;

    laptopsContainer.appendChild(productBox);
}


laptops.forEach(laptop => addLaptop(laptop));
