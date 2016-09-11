
var cart = []

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

function getJSON(url, onSuccess) {
		var request = new XMLHttpRequest(); 
		request.open('get', url, true) 
		request.onreadystatechange =  function(){ 
				if(request.readyState===4){ 
				var response=JSON.parse(request.responseText); 
				onSuccess(response) 
				}; 
		}; 
		request.send();
		return request;
}

//location.href.replace('index.html', 'data.json')

getJSON(location.origin + '/data.json', function(coupons) {
		render(coupons)
		addListenersToButtons();
})


var tmpObject = {
		"title": "sint culpa reprehenderit id",
		"discount": 89,
		"priceOld": 49,
		"priceNew": 5.4,
		"special": false,
		"metro": "admiralteiskaya",
		"dateFrom": "2016-07-01T12:12:26 -03:00",
		"dateTo": "2016-09-12T04:10:39 -03:00",
		"type": "food"
}

function renderCoupon(coupon) {
	var el = document.createElement('a');
	el.setAttribute('href','javascript:void(0);');
	el.dataset.type = coupon.type;
	el.dataset.special = coupon.special;
	el.dataset.price = coupon.priceNew;
	el.dataset.dateTo = coupon.dateTo;
	el.dataset.dateFrom = coupon.dateFrom;
	el.dataset.metro = coupon.metro;
	el.dataset.discount = coupon.discount;
	el.className = "catalog_cart catalog__item";

	var createHtml ='<div class="catalog_cart__image"><img src="'+ coupon.backgroundUrl + '">';
	if (coupon.special) {
		el.classList.add('catalog_cart--special');
		var initialTimerValues = calculateTimer(coupon.dateTo);
		createHtml += '<div class="catalog_cart__timer timer">' +
		'<div class="timer__item"><span>' + initialTimerValues[0] + '</span><span>day</span></div>' +
		'<div class="timer__item"><span>' + initialTimerValues[1] + '</span><span>hour</span></div>' +
		'<div class="timer__item"><span>' + initialTimerValues[2] + '</span><span>min</span></div>' +
		'<div class="timer__item"><span>' + initialTimerValues[3] + '</span><span>sec</span></div>' +
		'</div>'
	}

	createHtml += '</div>'+

	'<div class="catalog_cart__content">' +
	'<div class="catalog_cart__discount">' + coupon.discount + '%' + '</div>' +
	'<p class="catalog_cart__title">' + coupon.title + '</p>' +
	'<div class="catalog_cart__footer">' +
	'<p class="catalog_cart__price">' +
	'<span class="price catalog_cart__price_old">' + coupon.priceOld + '</span>' +
	'<span class="price catalog_cart__price_new">' + coupon.priceNew + '</span>' +
	'</p>' +
	'<div class="catalog_cart__btn">' +
	'<p class="btn">to cart</p>' +
	'</div>' +
	'</div>' +
	'</div>';
	el.innerHTML = createHtml;
	return el;
}

function calculateTimer(dateTo){
	dateTo = dateTo.split(' ').join('.000');
	//console.log(1, dateTo) 
	new Date();
	dateTo = new Date(dateTo);
	//console.log('fin', dateTo);
	var now = new Date();
	//console.log('now', now);
	var timeLeft = dateTo - now;
	//console.log(timeLeft);
	var days = Math.floor(timeLeft/(1000*60*60*24));
	//console.log(days);
	var remains = timeLeft - days*(1000*60*60*24);
	//console.log(remains);
	var hours = Math.floor(remains/(1000*3600));
	//console.log(hours);
	remains = remains - hours*(1000*3600);
	var minutes = Math.floor(remains/(1000*60));
	remains = remains - minutes*(1000*60);
	var seconds = Math.floor(remains/(1000));
		if (timeLeft < 0) {
			document.querySelector('.catalog_cart').classList.remove('.catalog_cart--special');
			document.querySelector('.catalog_cart').classList.add('.catalog_cart--disabled');
		}
	return [1,2,3,4];
}




function render (coupons) {
		var list = document.querySelector('.catalog__list');
		for (var i = 0; i < coupons.length ; i++) {
				var coupon = renderCoupon(coupons[i]);
				list.appendChild(coupon)
		}
}

// с помощью if проверить есть ли класс disabled
/* подписаться на клики: addEventListener */

function addListenersToButtons() {
		var toCart = document.querySelectorAll('.catalog_cart__btn');
		for (var i=0; i<toCart.length; i++) {
				toCart[i].addEventListener('click', function(e){
						e.preventDefault();
						var element = e.target.parentNode.parentNode.parentNode.parentNode;
						var price = Number(element.dataset.price);
						element = e.target.parentNode.parentNode.previousElementSibling;
						var title = element.innerText;
						addToCart(title,price);
				})
		}
}

console.log(document.querySelectorAll('.catalog_cart__btn'));
//console.log(el);
		/* создать объект */
		/* создать элемент. document.createElement('div'), .innerHTML */
		/* appendChild к списку */
		/* обновить тотал */
function addToCart(title, price) {
		var el = document.createElement('div');
		el.classList.add('catalog_basket__line');
		el.innerHTML = "<div class='catalog_basket__product'>" + title +
		"</div><div class='catalog_basket__price price'>" + price +
		"</div>" + svgClose;
		el.dataset.position = cart.length;
		document.querySelector('.catalog_basket__list').appendChild(el);
		cart.push({ title:title, price: price})
		updateTotal()
}

function updateTotal() {
		var sum = 0;
		for(var i=0;i<cart.length; i++){
				if(cart[i]!== null) {
						sum+=cart[i].price;
				}
		}
		document.querySelector(".catalog_basket__summ_text").innerHTML=sum;

				/* подсчитать тотал на основе cart */
				/* найти элемент тотала, обновить число */
}

function removeFromCart(e, context) {
		var parent = context.parentNode;
		console.log(parent);
		var position = Number(parent.dataset.position);
		cart[position] = null;
		parent.remove();
		updateTotal();
}


//1. addEventListener, 
//2. найти массив купонов, на кнопку, 
//3.применить функцию сортировки(.sort()) к массиву купонов 
//4. сравнить data атрибуты купонов 
//5. очистить catalog_list и записать в него отсортированный массив купонов

var priceBtn = document.querySelector('[data-sort-type=price]');
var discountBtn = document.querySelector('[data-sort-type=discount]');

function makeSortable(target, sortFunction) {
		target.addEventListener('click', function(e) {
				e.preventDefault();
				var getAllBlocks = document.querySelectorAll('.catalog__item');
				var getSortedBlocks = Array.from(getAllBlocks).sort(sortFunction); //сортировка
				var catalogList = document.querySelector('.catalog__list');
				catalogList.innerHTML = '';
				for (var i=0, len = getAllBlocks.length; i<len; i++) {
						catalogList.appendChild(getSortedBlocks[i]);
				}
		})
}
makeSortable(priceBtn, function (a, b) {
		return Number(a.dataset.price) - Number(b.dataset.price);
})

makeSortable(discountBtn, function (a, b) {
		return Number(b.dataset.discount) - Number(a.dataset.discount);
})

//6. venf,tkmys) изменение расположения : слушаем клик, изменяем класс Add Remove? ничего не должно происходить по клику на активную кнопку

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
				// for (var j=0; j<filterItem.length; j++) {
				//     filterItem[j].classList.toggle('filter--open');
				//}
						
		})
}

//8. фильтр (магия....)

//9. .catalog_basket .btn 

var getCloseBlock = document.querySelector('.modal__close');
var getUnderlay = document.querySelector('.modal_underlay');
var getModalBlock = document.querySelector('.modal_order')

var buyBtn = document.querySelector('.catalog_basket .btn');
buyBtn.addEventListener('click', function(e) {
		e.preventDefault();
		getModalBlock.style.display ='block';
		getUnderlay.style.display ='block';
});

getUnderlay.addEventListener('click', closeModal);
getCloseBlock.addEventListener('click', closeModal);

function closeModal (e) {
		e.preventDefault();
		getModalBlock.style.display ='none';
		getUnderlay.style.display ='none';
}

// 1. валидация имени. 
// 2. Найти input:name:name
// 3. Получить значение 
// 4. value.match(....) ->null -> array
// 5. if ( == null){(inp:name:name).style.border = '3pxsolidred'}
document.forms.order.elements.name.addEventListener('input', function(e) {
		if (validate(this, /[a-zа-я]+\s?[a-zа-я]+/i) === null) {
				this.style.borderColor = 'red';
				this.style.color = 'red'
		} else {
				this.style.borderColor = 'black';
				this.style.color = 'black';
		}  
})
		document.forms.order.elements.phone.addEventListener('input', function(e) {
		if (validate(this, /^\+?[\(\)\-0-9]+$/) === null) {
				this.style.borderColor = 'red';
				this.style.color = 'red'
		} else {
				this.style.borderColor = 'black';
				this.style.color = 'black';
		}
})
		document.forms.order.elements.mail.addEventListener('input', function(e) {
		if (validate(this, /.+@.+\..+/) === null) {
				this.style.borderColor = 'red';
				this.style.color = 'red'
		} else {
				this.style.borderColor = 'black';
				this.style.color = 'black';
		}
})

function validate (input, regular) {
		return input.value.match(regular);
}

function validateCheckBoxes() {
		var flag = false;
		var checkInputs = document.forms.order.elements.delivery;
		for (var i=0; i<checkInputs.length; i++) {
				if (checkInputs[i].checked) {
						flag = true;
				}
		}
		return flag;
}

document.forms.order.elements.sendBtn.addEventListener('click', function(e){
	e.preventDefault();
	validateCheckBoxes();  
})

//1. валидация
//2. подсветить поле если ошибка
//3. Написать сообщение в div под формой
