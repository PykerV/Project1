const products = [{
	id: 1,
	title: 'queen panel bed',
	image: './images/product-1.jpeg',
	price: 12
}, {
	id: 2,
	title: 'king panel bed',
	image: './images/product-2.jpeg',
	price: 16
}, {
	id: 3,
	title: 'Single Panel Bed',
	image: './images/product-3.jpeg',
	price: 10
}, {
	id: 4,
	title: 'Twin Panel Bed',
	image: './images/product-4.jpeg',
	price: 22
}
]

let order = []
let orderIds = []
const addToOrder = (event) => {
	let id = event.target.attributes[0].nodeValue
	orderIds.push(parseInt(id))
	document.getElementById('cart-items').innerHTML = orderIds.length
	renderOrderItems()
}

const renderProducts = () => {
	let temp = ''
	products.forEach(product => {
		temp += `<article class="product">
            <div class="img-container"><img class="product-img" src="${product.image}">
                <button datasrc="${product.id}"  onclick="addToOrder(event)" class="bag-btn addOrder"><i class="fas fa-shopping-cart"></i>Add to cart<i
                        class="fas fa-shopping-cart"></i></button>
            </div>
            <h3>${product.title}</h3>
        </article>`
	})
	document.getElementById('products').innerHTML = temp
	
}
renderProducts()
const uniqueArray = (array) => {
	let mymap = new Map()
	return array.filter(el => {
		const val = mymap.get(el.title)
		if (val) {
			if (el.id < val) {
				mymap.delete(el.title)
				mymap.set(el.title, el.id)
				return true
			} else {
				return false
			}
		}
		mymap.set(el.title, el.id)
		return true
	})
}
const renderNewCount = () => {
	let tt = []
	let temp = ''
	tt = uniqueArray(order)
	let sum = 0
	tt.forEach(t => {
		sum += t.count * t.price
	})
	document.getElementById('cart-total').innerHTML = sum
	tt.forEach(product => {
		if (product.count) {
			temp += `
            <div class="cart-item"><img src="${product.image}">
                <div><h4>${product.title}</h4><h5>${product.price}</h5><span datasrc="${product.id}" class="remove-item" onclick="remove(event)">remove</span></div>
                <div><i datasrc="${product.id}" class="fas fa-chevron-up" onclick="countUp(event)"></i>
                    <p class="item-amount">${product.count}</p><i datasrc="${product.id}" class="fas fa-chevron-down"  onclick="countDown(event)"></i></div>
            </div>
        `
		}
		
	})
	document.getElementById('cart-content').innerHTML = temp
}
const renderOrderItems = () => {
	let temp = ''
	order = []
	products.forEach(product => {
		orderIds.forEach(id => {
			if (product.id === id) {
				order.push(Object.assign({ count: 0 }, product))
			}
		})
	})
	let sum = 0
	
	order.forEach(item => {
		sum += item.price
		orderIds.forEach(id => {
			if (item.id === id) {
				item.count += 1
			}
		})
		
	})
	let tt = []
	tt = uniqueArray(order)
	
	console.log(order, 'lastorder')
	document.getElementById('cart-total').innerHTML = sum
	tt.forEach(product => {
		temp += `
            <div class="cart-item"><img src="${product.image}">
                <div><h4>${product.title}</h4><h5>${product.price}</h5><span datasrc="${product.id}" class="remove-item" onclick="remove(event)">remove</span></div>
                <div><i datasrc="${product.id}" class="fas fa-chevron-up" onclick="countUp(event)"></i>
                    <p class="item-amount">${product.count}</p><i datasrc="${product.id}" class="fas fa-chevron-down"  onclick="countDown(event)"></i></div>
            </div>
        `
	})
	document.getElementById('cart-content').innerHTML = temp
}
const showCart = () => {
	document.getElementById('sub-cart-overlay').classList.add('transparentBcg')
	document.getElementById('cart').classList.add('showCart')
}
const closeOverlay = () => {
	document.getElementById('sub-cart-overlay').classList.remove('transparentBcg')
	document.getElementById('cart').classList.remove('showCart')
	
}
const clearCloseOverlay = () => {
	order = []
	orderIds = []
	closeOverlay()
	document.getElementById('cart-items').innerHTML = ''
	renderOrderItems()
}
const remove = (event) => {
	let temp = event.target.attributes[0].nodeValue
	
	order = order.filter(item => {
		return item.id !== parseInt(temp)
	})
	
	orderIds = orderIds.filter(id => {
		return id !== parseInt(temp)
	})
	
	document.getElementById('cart-items').innerHTML = orderIds.length
	renderOrderItems()
	
}
const countUp = (event) => {
	let temp = event.target.attributes[0].nodeValue
	order.forEach(item => {
		if (item.id === parseInt(temp)) {
			item.count += 1
		}
	})
	renderNewCount()
}
const countDown = (event) => {
	let temp = event.target.attributes[0].nodeValue
	order.forEach(item => {
		if (item.id === parseInt(temp)) {
			item.count -= 1
		}
	})
	renderNewCount()
}


