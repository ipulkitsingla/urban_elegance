function addtocart(name, price, originalPrice, image) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];

   const existingItem = cart.find(item => item.name === name);

   if (existingItem) {
       existingItem.quantity += 1;
   } else {
       cart.push({
           name: name,
           price: price,
           originalPrice: originalPrice,
           image: image,
           quantity: 1
       });
   }

   localStorage.setItem('cart', JSON.stringify(cart));
   alert(name + ' added to cart!');
   displayCart();
}

function displayCart() {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   const cartContainer = document.getElementById('cart-items');
   const totalMRP = document.getElementById('total-mrp');
   const totalPrice = document.getElementById('total-price');
   const totalDiscount = document.getElementById('discount');
   const totalitembag = document.getElementById('totalnum');
   const totalcheckout = document.getElementById('itemscheckout');
   const cartCount = document.getElementById("cart-count");

   let MRP = 0;
   let Price = 0;
   let discount = 0;
   let count = 0;
   cartContainer.innerHTML = '';

   if (cart.length === 0) {
       cartContainer.innerHTML = '<p>Your cart is empty.</p>';
       cartCount.textContent = '0'; 
       totalMRP.textContent = '₹0';
       totalPrice.textContent = '₹0';
       totalDiscount.textContent = '- ₹0';
       totalitembag.textContent = '0 items';
       totalcheckout.textContent = '0';
       return;
   }

   cart.forEach(item => {
       const itemDiv = document.createElement('tr');
       itemDiv.classList.add('cart-item');
       itemDiv.innerHTML = `
           <td><img src="${item.image}" alt="${item.name}"></td>
           <td>${item.name}</td>
           <td>₹${item.originalPrice}</td>
           <td>₹${item.price}</td>
           <td>
               <button id="bfun" onclick="changeQuantity('${item.name}', 'increase')">+</button>
               ${item.quantity}
               <button id="bfun" onclick="changeQuantity('${item.name}', 'decrease')">-</button>
           </td>
           <td>₹${item.price * item.quantity}</td>
           <td>
               <button id="bfun" onclick="removeFromCart('${item.name}')">Remove</button>
           </td>
       `;
       cartContainer.appendChild(itemDiv);
       MRP += item.originalPrice * item.quantity;
       Price += item.price * item.quantity;
       count += item.quantity;
   });

   discount = MRP - Price;
   totalMRP.textContent = '₹' + MRP;
   totalPrice.textContent = '₹' + Price;
   totalDiscount.textContent = '- ₹' + discount;
   totalitembag.textContent = cart.length + ' items';
   totalcheckout.textContent = cart.length;
   cartCount.textContent = count > 0 ? count : '0';

   localStorage.setItem('totalpayment', Price);
}


function removeFromCart(name) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   cart = cart.filter(item => item.name !== name);
   localStorage.setItem('cart', JSON.stringify(cart));
   displayCart();
}

function changeQuantity(name, action) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   const item = cart.find(item => item.name === name);

   if (item) {
       if (action === 'increase') {
           item.quantity += 1;
       } else if (action === 'decrease') {
           if (item.quantity === 1) {
               cart = cart.filter(cartItem => cartItem.name !== name);
           } else {
               item.quantity -= 1;
           }
       }
   }

   localStorage.setItem('cart', JSON.stringify(cart));
   displayCart();
}
function checkCartBeforePayment(event) {
   const cart = JSON.parse(localStorage.getItem('cart')) || [];
   if (cart.length === 0) {
       event.preventDefault(); // Prevent navigation
       alert("Your cart is empty. Add items to proceed with payment.");
   }
}

window.onload = displayCart;
