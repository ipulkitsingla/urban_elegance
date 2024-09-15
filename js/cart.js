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
}

function displayCart() {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];
   const cartContainer = document.getElementById('cart-items');
   const totalMRP = document.getElementById('total-mrp');
   const totalPrice = document.getElementById('total-price');
   const totalDiscount = document.getElementById('discount');
   const totalitembag = document.getElementById('totalnum');
   const totalcheckout = document.getElementById('itemscheckout');
   let MRP = 0;
   let Price = 0;
   let discout = 0;
   cartContainer.innerHTML = '';

   if (cart.length === 0) {
      cartContainer.innerHTML = '<p>Your cart is empty.</p>';
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
          <button onclick="changeQuantity('${item.name}', 'increase')">+</button>
          ${item.quantity}
          <button onclick="changeQuantity('${item.name}', 'decrease')">-</button>
        </td>
        <td>₹${item.price * item.quantity}</td>
        <td>
          <button onclick="removeFromCart('${item.name}')">Remove</button>
        </td>
      `;
      cartContainer.appendChild(itemDiv);
      MRP += item.originalPrice * item.quantity;
      Price += item.price * item.quantity;
      discout = MRP - Price;

      totalMRP.textContent = '₹' + MRP;
      totalPrice.textContent = '₹' + Price;
      totalDiscount.textContent = '- ₹' + discout;
      totalitembag.textContent = cart.length + ' items';
      totalcheckout.textContent = cart.length;
   });
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

window.onload = displayCart;