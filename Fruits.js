 const products = [
            { id: 1, name: "Mango", price: 100, category: "fresh", image: "images/mango.jpeg" },
            { id: 2, name: "Banana", price: 50, category: "fresh", image: "images/banana.jpg" },
            { id: 3, name: "Almonds", price: 800, category: "dry", image: "images/almonds.jpg" },
            { id: 4, name: "Cashews", price: 900, category: "dry", image: "images/cashew.jpg" },
            { id: 5, name: "Apples", price: 120, category: "fresh", image: "images/apples.jpg" },
            { id: 6, name: "Walnuts", price: 1000, category: "dry", image: "images/walnuts.jpg" },
            { id: 7, name: "Grapes", price: 80, category: "fresh", image: "images/grapes.jpg" },
            { id: 8, name: "Pistachios", price: 1200, category: "dry", image: "images/pistachious.jpg" },
            { id: 9, name: "Mango Ice Cream", price: 150, category: "icecream", image: "images/mangoicecream.jpg" },
            { id: 10, name: "Banana Ice Cream", price: 150, category: "icecream", image: "images/bananaicecream.jpg" },
            { id: 11, name: "Orange Juice", price: 80, category: "juices", image: "images/orangejuice.jpg" },
            { id: 12, name: "Apple Juice", price: 80, category: "juices", image: "images/applejuice.jpg" },
        ];

   


        let cart = [];

        function displayProducts(productsToDisplay) {
            const productList = document.getElementById('productList');
            productList.innerHTML = '';
            productsToDisplay.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'bg-white rounded-lg shadow-md p-4';
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover rounded">
                    <h3 class="font-semibold text-lg mt-2">${product.name}</h3>
                    <p class="text-gray-600">Price: ₹${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id})" class="mt-2 bg-green-600 text-white py-2 px-4 rounded">Add to Cart</button>
                `;
                productList.appendChild(productCard);
            });
        }

        function filterProducts(category) {
            if (category === 'all') {
                displayProducts(products);
            } else {
                const filtered = products.filter(product => product.category === category);
                displayProducts(filtered);
            }
        }

        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            const existingProduct = cart.find(item => item.id === productId);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        }

        function updateCart() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');

            cartCount.innerText = cart.length;
            cartItems.innerHTML = '';
            let total = 0;

            cart.forEach(item => {
                const itemTotal = item.price * item.quantity;
                total += itemTotal;
                const cartItem = document.createElement('div');
                cartItem.className = 'flex justify-between items-center py-2';
                cartItem.innerHTML = `<span>${item.name} x ${item.quantity}</span><span>₹${itemTotal.toFixed(2)}</span>`;
                cartItems.appendChild(cartItem);
            });

            cartTotal.innerText = `₹${total.toFixed(2)}`;
        }

        document.getElementById('cartToggle').addEventListener('click', () => {
            document.getElementById('cart').classList.toggle('open');
        });

        document.getElementById('cartClose').addEventListener('click', () => {
            document.getElementById('cart').classList.remove('open');
        });

        document.getElementById('checkout').addEventListener('click', () => {
            document.getElementById('payment').style.display = 'flex';
        });

        document.getElementById('cancelPayment').addEventListener('click', () => {
            document.getElementById('payment').style.display = 'none';
        });

        document.getElementById('paymentForm').addEventListener('submit', (e) => {
            e.preventDefault();
            document.getElementById('payment').style.display = 'none';
            document.getElementById('address').style.display = 'flex';
        });

        document.getElementById('cancelAddress').addEventListener('click', () => {
            document.getElementById('address').style.display = 'none';
        });

        document.getElementById('addressForm').addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Order placed successfully! Thank you for your purchase.');
            cart = [];
            updateCart();
            document.getElementById('address').style.display = 'none';
        });

        // Initial display of all products
        displayProducts(products);