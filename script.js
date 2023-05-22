// PART 1 Lesson 7

let cart = []

start();


const authBtn = document.getElementById('authButton')
const addProductBtn = document.getElementById('addNewProduct')

authBtn.addEventListener('click', authFunction)
addProductBtn.addEventListener('click', addNewProduct)

function authFunction() {
    // get data from form
    // send request
    // parse response
    // get authToken 9879845631sf3dfs6df54s6dfs6d5f4s6df

    sessionStorage.setItem('accessToken', '65sf465s4df6s5d4f8979w6r454fd');
    document.querySelector('.authForm').classList.add('d-none');

    document.querySelector('.page-content').classList.remove('d-none');
    document.querySelector('header').classList.remove('d-none');
}

function start() {
    if (!sessionStorage.getItem('accessToken')) {
        document.querySelector('.authForm').classList.remove('d-none');
        return
    }

    document.querySelector('.page-content').classList.remove('d-none');
    document.querySelector('header').classList.remove('d-none');

    if (!sessionStorage.getItem('cart')) {
        return;
    }

    cart = JSON.parse(sessionStorage.getItem('cart'))
    updateCartCounter(cart.length)
}

function addNewProduct() {
    cart.push({
        name: 'Test',
        id: new Date().toString()
    })
    sessionStorage.setItem('cart', JSON.stringify(cart))
    updateCartCounter(cart.length)
}

function updateCartCounter(counter) {
    document.querySelector('#productsCount').textContent = counter
}

window.addEventListener('storage', event => {
    cart = JSON.parse(sessionStorage.getItem('cart'))
    updateCartCounter(cart.length)
})


sessionStorage.setItem('cart', JSON.stringify(cart))

// document.cookie = "token='544564132154f6s45dfs'; domain:localhost"

// document.cookie = "token='544564132154f6s45df987s'; max-age=10"



//***********************************HHOOOMMMEEEE WWWOOORRRRRKKKKKK 7**************************************************************************** */

// Взяти за основу проект з заняття, що прикріплений в матеріалах, та додати ще декілька функцій 

// - створити декілька товарів на сторінці де, в кожного буде кнопка додати в корзину, і іконка "сердечко", яка додасть товар в wishlist (це має бути аналог корзини в localStorage) 
// - в блоці корзини рахуємо загальну суму товарів, що додані до корзини
// - зверху в topBar поруч з іконкою корзини треба відображати скільки товарів знаходиться зараз в wishList 

// По бажанню: 
// товарам які вже знаходяться в корзині чи в wishList треба змінювати стан кнопки та іконки як показано в прикріпленій схемі (при чому при оновленні сторінки стан має бути збережений)
const setCount = JSON.parse(localStorage.getItem('count'))
const wishList = JSON.parse(localStorage.getItem('wishlist'))
const cartItemId = JSON.parse(localStorage.getItem('cartItemId'));
const totalPrice = JSON.parse(localStorage.getItem('sum'));
const loveProducts = JSON.parse(localStorage.getItem('wishlistArr'));

const wishListArr = loveProducts ? loveProducts : [];
let count = setCount ? setCount : 0;
let wishListCount = wishList ? wishList : 0;
const arr = cartItemId ? cartItemId : [];
const sum = [];

document.querySelector('.wishlist span').innerHTML = wishListArr.length;
document.querySelector('.cart span').innerHTML = totalPrice ? count + ' - На ' + totalPrice + ' Kč' : 0  + ' Kč';

document.querySelectorAll('.cart__item button').forEach(item => {
    item.addEventListener('click', (e) => addProductsToCart(e))
})
document.querySelectorAll('.item-save img').forEach(item => {
    item.addEventListener('click', (e) => addProductsToWishlist(e.target))
})

function addProductsToCart(e){
    let cartItem = e.target.closest('.cart__item');
    if(!arr.includes(cartItem.dataset.cartitem)){
        arr.push(cartItem.dataset.cartitem);
        count++;
        localStorage.setItem('count', count);
        localStorage.setItem('cartItemId', JSON.stringify(arr));
        setTextButton()
        setSum()
    } 
}
function setTextButton(){
    const cartItemId = JSON.parse(localStorage.getItem('cartItemId'));
    if(cartItemId){
        cartItemId.forEach(item => {
            let cart = document.querySelector(`.cart__item[data-cartItem='${item}']`);
            cart.querySelector('button').textContent = 'В корзині';
            cart.querySelector('button').classList.add('btn-bgc');
        })
    }
}
function setSum(){
    const cartItemId = JSON.parse(localStorage.getItem('cartItemId'));
    if(cartItemId){
        sum.splice(0)
        cartItemId.forEach(item => {
            let cart = document.querySelector(`.cart__item[data-cartItem='${item}'] .item-price span`);
            sum.push(cart.innerHTML)
        })
        const initialValue = 0;
        const sumTotal = sum.reduce(
          (accumulator, currentValue) => Number(accumulator) + Number(currentValue),
          initialValue
        );
        document.querySelector('.cart span').innerHTML = count + ' - На ' + sumTotal + ' Kč';
        localStorage.setItem('sum', JSON.stringify(sumTotal))
        
    }
}

function addProductsToWishlist(e){
    let cartItem = e.closest('.cart__item');
    if(!wishListArr.includes(cartItem.dataset.cartitem)){
        wishListArr.push(cartItem.dataset.cartitem)
        localStorage.setItem('wishlistArr', JSON.stringify(wishListArr))
        document.querySelector('.wishlist span').innerHTML = wishListArr.length
    }
    cartItem.querySelector('.item-save').classList.add('d-none')
    cartItem.querySelector('.item-save__wishlist').classList.remove('d-none')
}

function setWishListCount(){
    const loveProducts = JSON.parse(localStorage.getItem('wishlistArr'));
    if(loveProducts){
        loveProducts.forEach(item => {
            document.querySelector(`.cart__item[data-cartitem='${item}'] .item-save`).classList.add('d-none')
            document.querySelector(`.cart__item[data-cartitem='${item}'] .item-save__wishlist`).classList.remove('d-none')
        })
    }
    
}
setWishListCount()
setTextButton()
