function addListenersToButtons() {
    var toCart = document.querySelectorAll('.catalog_cart__btn');
    for (var i=0; i<toCart.length; i++){
        toCart[i].addEventListener('click', function(e){
            e.preventDefault();
            var element = e.target.parentNode.parentNode.parentNode;
            var price = Number(element.dataset.price);
            element = e.target.parentNode.previousElementSibling;
            var title = element.innerText;
            addToCart(title, price);
        })
    }
}

console.log(document.querySelector('.catalog_cart__btn').parentNode.previousElementSibling);
console.log(document.querySelector('.catalog_cart__btn').parentNode.parentNode.parentNode);

var svgClose = `<div onclick="removeFromCart(event, this)" class="catalog_basket__close"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="512px" height="512px" viewBox="0 0 44.238 44.238" style="enable-background:new 0 0 44.238 44.238;" xml:space="preserve">
<g>
    <g>
        <g>
            <path d="M15.533,29.455c-0.192,0-0.384-0.073-0.53-0.22c-0.293-0.293-0.293-0.769,0-1.062l13.171-13.171     c0.293-0.293,0.768-0.293,1.061,0s0.293,0.768,0,1.061L16.063,29.235C15.917,29.382,15.725,29.455,15.533,29.455z" fill="#546e7a"/>
        </g>
        <g>
            <path d="M28.704,29.455c-0.192,0-0.384-0.073-0.53-0.22L15.002,16.064c-0.293-0.293-0.293-0.768,0-1.061s0.768-0.293,1.061,0     l13.171,13.171c0.293,0.293,0.293,0.769,0,1.062C29.088,29.382,28.896,29.455,28.704,29.455z" fill="#546e7a"/>
        </g>
        <path d="M22.119,44.237C9.922,44.237,0,34.315,0,22.12C0,9.924,9.922,0.001,22.119,0.001S44.238,9.923,44.238,22.12    S34.314,44.237,22.119,44.237z M22.119,1.501C10.75,1.501,1.5,10.751,1.5,22.12s9.25,20.619,20.619,20.619    s20.619-9.25,20.619-20.619S33.488,1.501,22.119,1.501z" fill="#546e7a"/>
    </g>
</g>
</svg></div>`

function addToCart(title, price) {
    var el = document.createElement('div');
    el.classList.add('catalog_basket__line');
    el.innerHTML = "<div class='catalog_basket__product'>" + title +
    "</div><div class='catalog_basket__price price'>" + price +
    "</div>" + svgClose;
    document.querySelector('.catalog_basket__list').appendChild(el);
}

//6.  изменение расположения : слушаем клик, изменяем класс Add Remove. ничего не должно происходить по клику на активную кнопку

var catalogListViewItem = document.querySelectorAll('.catalog_view__item');
var catalogListView = document.querySelector('.catalog__list');

catalogListViewItem[0].addEventListener('click', function (e){
    e.preventDefault();
    catalogListView.classList.remove('catalog__list--three');
    catalogListViewItem[0].classList.add('catalog_view__item--active');
    catalogListView.classList.add('catalog__list--two');
    catalogListViewItem[1].classList.remove('catalog_view__item--active');
})

catalogListViewItem[1].addEventListener('click', function (e){
    e.preventDefault();
    catalogListView.classList.remove('catalog__list--two');
    catalogListViewItem[1].classList.add('catalog_view__item--active');
    catalogListView.classList.add('catalog__list--three');
    catalogListViewItem[0].classList.remove('catalog_view__item--active');
})

//7.

var filterOpenClose = document.querySelectorAll('.filter__title');
var filterItem = document.querySelectorAll('.catalog_filters__item');

for (var i=0; i<filterOpenClose.length; i++) {
    filterOpenClose[i].addEventListener('click', function(e){
        e.preventDefault;
        e.target.parentNode.classList.toggle('filter--open');          
    })
}