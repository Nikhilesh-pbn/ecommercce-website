let Container = document.getElementById("cartContainer");
let getCart = localStorage.getItem("cart");
let parseTheCart = JSON.parse(getCart);

for(let each of parseTheCart){
    console.log(each);
}