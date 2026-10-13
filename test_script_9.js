
        function copyPixCode() {
            const copyText = document.getElementById("pix-copia-cola");
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            alert("Código Pix copiado!");
        }

        // Initialize Supabase Client
        let supabaseClient = null;
        if (window.SUPABASE_URL && window.SUPABASE_URL !== "YOUR_SUPABASE_URL" &&
            window.SUPABASE_ANON_KEY && window.SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY") {
            try {
                const { createClient } = supabase;
                supabaseClient = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
                window.supabaseClient = supabaseClient;
            } catch (err) {
                console.error("Erro ao inicializar Supabase:", err);
            }
        }

        // Global Cart and Menu variables
        const defaultDishes = [
            // FRANGO
            { id: 'price-frango-desfiado-pure-batata-doce-legumes', name: '01. Frango desfiado com purê de batata doce e legumes', category: 'Frango', priceP: '19,50', priceG: '27,50' },
            { id: 'price-frango-desfiado-arroz-integral-legumes', name: '02. Frango desfiado com arroz integral e legumes', category: 'Frango', priceP: '19,50', priceG: '27,50' },
            { id: 'price-frango-desfiado-pure-mandioca-legumes', name: '03. Frango desfiado com purê de mandioca e legumes', category: 'Frango', priceP: '19,50', priceG: '27,50' },
            { id: 'price-frango-legumes', name: '04. Frango com legumes', category: 'Frango', priceP: '19,50', priceG: '—' },
            { id: 'price-macarrao-frango-desfiado', name: '05. Macarrão com frango desfiado', category: 'Frango', priceP: '19,50', priceG: '27,50' },
            { id: 'price-escondidinho-frango-moido-mandioca', name: '06. Escondidinho de frango moído com mandioca', category: 'Frango', priceP: '19,50', priceG: '27,50' },
            { id: 'price-escondidinho-frango-moido-batata-doce', name: '07. Escondidinho de frango moído com batata doce', category: 'Frango', priceP: '19,50', priceG: '27,50' },
            // GOURMET
            { id: 'price-escondidinho-frango-mussarela-bufala', name: '08. Escondidinho de frango com mussarela de búfala', category: 'Gourmet', priceP: '27,50', priceG: '34,50' },
            { id: 'price-nhoque-batata-doce-patinho-moido', name: '09. Nhoque de batata doce com patinho moído', category: 'Gourmet', priceP: '28,50', priceG: '35,50' },
            { id: 'price-macarrao-patinho-moido', name: '10. Macarrão com patinho moído', category: 'Gourmet', priceP: '28,50', priceG: '35,50' },
            { id: 'price-strogonoff-frango-arroz-branco', name: '20. Strogonoff de frango com arroz branco', category: 'Gourmet', priceP: '30,50', priceG: '38,50' },
            { id: 'price-nhoque-batata-doce-frango-desfiado', name: '22. Nhoque de batata doce com frango desfiado', category: 'Gourmet', priceP: '22,50', priceG: '29,50' },
            { id: 'price-penne-frango-desfiado-molho', name: '23. Penne com frango desfiado ao molho', category: 'Gourmet', priceP: '22,50', priceG: '29,50' },
            // PATINHO
            { id: 'price-patinho-desfiado-arroz-integral-legumes', name: '11. Patinho desfiado com arroz integral e legumes', category: 'Patinho', priceP: '25,50', priceG: '33,50' },
            { id: 'price-patinho-desfiado-pure-batata-doce-legumes', name: '12. Patinho desfiado com purê de batata doce e legumes', category: 'Patinho', priceP: '25,50', priceG: '33,50' },
            { id: 'price-escondidinho-mandioca-patinho-moido', name: '13. Escondidinho de mandioca com patinho moído', category: 'Patinho', priceP: '25,50', priceG: '33,50' },
            { id: 'price-patinho-legumes', name: '14. Patinho com legumes', category: 'Patinho', priceP: '25,50', priceG: '—' },
            { id: 'price-patinho-desfiado-pure-mandioca-legumes', name: '15. Patinho desfiado com purê de mandioca e legumes', category: 'Patinho', priceP: '25,50', priceG: '33,50' },
            { id: 'price-patinho-moido-arroz-branco-legumes', name: '16. Patinho moído com arroz branco e legumes', category: 'Patinho', priceP: '25,50', priceG: '33,50' },
            // SALGADOS E DOCES PROTEICOS
            { id: 'price-coxinha-fit', name: '30. Coxinha Fit', category: 'Salgados', priceP: '8,50', priceG: '—' },
            { id: 'price-kibes', name: '31. Kibes', category: 'Salgados', priceP: '8,50', priceG: '—' },
            { id: 'price-nugfit', name: '32. NugFit', category: 'Salgados', priceP: '12,90', priceG: '—' },
            { id: 'price-pizza-fit', name: '33. Pizza Fit', category: 'Salgados', priceP: '14,90', priceG: '—' },
            { id: 'price-quiche-fit', name: '34. Quiche', category: 'Salgados', priceP: '9,90', priceG: '—' },
            { id: 'price-sucos', name: '35. Sucos', category: 'Salgados', priceP: '10,90', priceG: '—' },
            { id: 'price-tortas-fit', name: '36. Tortas', category: 'Salgados', priceP: '11,90', priceG: '—' }
        ];

        function getDeletedDishIds() {
            try {
                return JSON.parse(localStorage.getItem('cleanfoods_deleted_dishes')) || [];
            } catch (e) {
                return [];
            }
        }

        let rawDishes = JSON.parse(localStorage.getItem('cleanfoods_dishes_v2')) || defaultDishes;
        let dishes = rawDishes.filter(d => !getDeletedDishIds().includes(d.id));
        let cart = JSON.parse(localStorage.getItem('cleanfoods_cart')) || {};
        let appliedCoupon = null;

        function ensureSalgados(dishList) {
            return dishList;
        }
        dishes = ensureSalgados(dishes);
        localStorage.setItem('cleanfoods_dishes_v2', JSON.stringify(dishes));

        function isValidPrice(v) {
            if (!v) return false;
            const s = String(v).trim();
            if (s === '' || s === '—' || s === '-') return false;
            const n = parseFloat(s.replace(',', '.'));
            return !isNaN(n) && n > 0;
        }

        function renderDishPriceOptions(dish) {
            const hasP = isValidPrice(dish.priceP);
            const hasG = isValidPrice(dish.priceG);

            if (hasP && hasG) {
                return `
                    <div class="flex justify-between items-center text-xs font-semibold w-full">
                        <span class="text-gray-400">P <span class="text-white bg-cf-gray px-2 py-1 rounded ml-1 cursor-pointer hover:bg-cf-yellow hover:text-cf-black transition-all inline-flex items-center gap-1" onclick="addToCart('${dish.id}', 'P')">R$ <span id="val-${dish.id}-p">${dish.priceP}</span> <i class="fa-solid fa-plus text-[10px]"></i></span></span>
                        <span class="text-cf-yellow">G <span class="bg-cf-yellow text-cf-black px-2 py-1 rounded ml-1 cursor-pointer hover:bg-white hover:text-cf-black transition-all inline-flex items-center gap-1" onclick="addToCart('${dish.id}', 'G')">R$ <span id="val-${dish.id}-g">${dish.priceG}</span> <i class="fa-solid fa-plus text-[10px]"></i></span></span>
                    </div>
                `;
            }

            const singlePrice = hasP ? dish.priceP : (hasG ? dish.priceG : '');
            const singleSize = hasP ? 'P' : 'G';

            if (singlePrice) {
                return `
                    <div class="flex justify-center items-center text-xs font-semibold w-full">
                        <span class="bg-cf-yellow text-cf-black px-3.5 py-1.5 rounded cursor-pointer hover:bg-white hover:text-cf-black transition-all inline-flex items-center gap-1.5 font-bold text-xs sm:text-sm" onclick="addToCart('${dish.id}', '${singleSize}')">
                            R$ <span id="val-${dish.id}-single">${singlePrice}</span> <i class="fa-solid fa-plus text-[10px]"></i>
                        </span>
                    </div>
                `;
            }

            return `
                <div class="flex justify-center items-center text-xs font-semibold w-full">
                    <span class="text-gray-500 bg-cf-darkgray border border-gray-800 px-2.5 py-1 rounded cursor-not-allowed">—</span>
                </div>
            `;
        }

        let activeCategory = 'Todos';

        function filterCategory(category) {
            activeCategory = category;
            const categories = ['Todos', 'Frango', 'Patinho', 'Gourmet', 'Salgados'];
            categories.forEach(cat => {
                const btn = document.getElementById('filter-btn-' + cat);
                if (btn) {
                    if (cat === category) {
                        btn.className = "bg-cf-yellow text-cf-black font-heading font-bold tracking-tight tracking-wider px-3 sm:px-6 py-2 sm:py-3 border-2 border-cf-yellow hover:bg-white hover:text-cf-black hover:border-white transition-all uppercase text-xs sm:text-base rounded-sm cursor-hover shadow-lg";
                    } else {
                        btn.className = "bg-cf-darkgray text-white font-heading font-bold tracking-tight tracking-wider px-3 sm:px-6 py-2 sm:py-3 border-2 border-cf-gray hover:bg-cf-yellow hover:text-cf-black hover:border-cf-yellow transition-all uppercase text-xs sm:text-base rounded-sm cursor-hover shadow-lg";
                    }
                }
            });
            renderDishesGrid();
        }

        function renderDishesGrid() {
            const grid = document.getElementById('dishes-grid');
            if (!grid) return;
            grid.innerHTML = '';
            let filteredDishes = activeCategory === 'Todos' ? dishes : dishes.filter(d => d.category === activeCategory);
            filteredDishes = filteredDishes.filter(d => d.available !== false && !getDeletedDishIds().includes(d.id));

            if (filteredDishes.length === 0) {
                grid.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500 font-semibold italic">Nenhum prato disponível nesta categoria.</div>`;
                return;
            }

            filteredDishes.forEach(dish => {
                const placeholderImg = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23666%22%3E%3Cpath d=%22M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z%22/%3E%3C/svg%3E';
                const imgSrc = dish.image || placeholderImg;
                const priceOptionsHTML = renderDishPriceOptions(dish);

                const card = document.createElement('div');
                card.className = 'bg-cf-darkgray border border-gray-800 rounded-lg overflow-hidden flex flex-col group hover:border-cf-yellow transition-colors cursor-hover shadow-lg';
                card.innerHTML = `
                    <div class="h-40 sm:h-48 bg-cf-black overflow-hidden relative cursor-pointer group-hover:opacity-90" onclick="openDishDetail('${dish.id}')">
                        <img src="${imgSrc}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                            <i class="fa-solid fa-magnifying-glass-plus text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100 duration-300"></i>
                        </div>
                    </div>
                    <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                        <div class="text-xs text-cf-yellow font-bold uppercase mb-1 tracking-widest">${dish.category === 'Salgados' ? 'Salgados e Doces' : 'Linha ' + dish.category}</div>
                        <div class="text-base sm:text-lg font-heading font-bold tracking-tight text-white uppercase mb-4 line-clamp-2">${dish.name}</div>
                        <div class="mt-auto">${priceOptionsHTML}</div>
                    </div>`;
                grid.appendChild(card);
            });
        }
// Supabase Database helpers
        async function loadDishes() {
            let deletedIds = getDeletedDishIds();

            if (supabaseClient) {
                try {
                    const { data: setSetting } = await supabaseClient.from('settings').select('*').eq('key', 'deleted_dishes').maybeSingle();
                    if (setSetting && setSetting.value) {
                        try {
                            const remoteDeleted = JSON.parse(setSetting.value);
                            if (Array.isArray(remoteDeleted)) {
                                deletedIds = Array.from(new Set([...deletedIds, ...remoteDeleted]));
                                localStorage.setItem('cleanfoods_deleted_dishes', JSON.stringify(deletedIds));
                            }
                        } catch (e) {}
                    }

                    const { data, error } = await supabaseClient.from('dishes').select('*');
                    if (error) throw error;
                    if (data && data.length > 0) {
                        dishes = data.filter(d => !deletedIds.includes(d.id)).map(d => ({
                            id: d.id,
                            name: d.name,
                            category: d.category,
                            priceP: d.price_p || d.priceP || '0,00',
                            priceG: d.price_g || d.priceG || '0,00',
                            available: d.available !== false,
                            image: d.image || '',
                            nutrition: d.nutrition
                        })).sort((a, b) => a.name.localeCompare(b.name, 'pt-BR', { numeric: true }));
                        dishes = ensureSalgados(dishes);
                    } else {
                        // Seed database
                        const dbDishes = defaultDishes.filter(d => !deletedIds.includes(d.id)).map(d => ({
                            id: d.id,
                            name: d.name,
                            category: d.category,
                            price_p: d.priceP,
                            price_g: d.priceG
                        }));
                        const { error: insertError } = await supabaseClient.from('dishes').insert(dbDishes);
                        if (insertError) throw insertError;
                        dishes = defaultDishes.filter(d => !deletedIds.includes(d.id));
                    }
                } catch (err) {
                    console.error("Erro ao carregar pratos do Supabase:", err);
                    dishes = JSON.parse(localStorage.getItem('cleanfoods_dishes_v2')) || defaultDishes;
                    dishes = dishes.filter(d => !deletedIds.includes(d.id));
                    dishes = ensureSalgados(dishes);
                }
            } else {
                dishes = JSON.parse(localStorage.getItem('cleanfoods_dishes_v2')) || defaultDishes;
                dishes = dishes.filter(d => !deletedIds.includes(d.id));
                dishes = ensureSalgados(dishes);
            }
            filterCategory('Todos');
        }

        async function loadSettings() {
            let savedWhatsapp = localStorage.getItem('cleanfoods_whatsapp');
            let savedAddress = localStorage.getItem('cleanfoods_address');
            let savedFrete = localStorage.getItem('cleanfoods_frete');

            if (supabaseClient) {
                try {
                    const { data, error } = await supabaseClient.from('settings').select('*');
                    if (error) throw error;
                    if (data) {
                        const waSetting = data.find(s => s.key === 'whatsapp');
                        if (waSetting) savedWhatsapp = waSetting.value;
                        const addrSetting = data.find(s => s.key === 'address');
                        if (addrSetting) savedAddress = addrSetting.value;
                        const freteSetting = data.find(s => s.key === 'frete');
                        if (freteSetting) savedFrete = freteSetting.value;
                    }
                } catch (err) {
                    console.error("Erro ao carregar configurações do Supabase:", err);
                }
            }

            if (savedFrete) window.systemShippingFee = parseFloat(savedFrete);
            else window.systemShippingFee = 0;

            if (savedWhatsapp) {
                const waLinks = document.querySelectorAll('a[href*="wa.me/"]');
                waLinks.forEach(link => {
                    link.href = 'https://wa.me/55' + savedWhatsapp;
                });
                const textSpan = document.getElementById('val-whatsapp-text');
                if (textSpan && savedWhatsapp.length >= 10) {
                    const ddd = savedWhatsapp.substring(0, 2);
                    const prefix = savedWhatsapp.length === 11 ? savedWhatsapp.substring(2, 7) : savedWhatsapp.substring(2, 6);
                    const suffix = savedWhatsapp.length === 11 ? savedWhatsapp.substring(7) : savedWhatsapp.substring(6);
                    textSpan.innerText = `(${ddd}) ${prefix}-${suffix}`;
                }
            }

            if (savedAddress) {
                const addressSpan = document.getElementById('val-address-text');
                if (addressSpan) addressSpan.innerText = savedAddress;
            }
        }

        async function loadCoupons() {
            let activeCoupons = [];
            if (supabaseClient) {
                try {
                    const { data, error } = await supabaseClient.from('coupons').select('*').eq('active', true);
                    if (error) throw error;
                    activeCoupons = data || [];
                } catch (err) {
                    console.error("Erro ao carregar cupons do Supabase:", err);
                    const savedCoupons = JSON.parse(localStorage.getItem('cleanfoods_coupons')) || [];
                    activeCoupons = savedCoupons.filter(c => c.active);
                }
            } else {
                const savedCoupons = JSON.parse(localStorage.getItem('cleanfoods_coupons')) || [];
                activeCoupons = savedCoupons.filter(c => c.active);
            }

            if (activeCoupons.length > 0) {
                const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
                const todayDay = daysOfWeek[new Date().getDay()];
                const activeCoupon = activeCoupons.find(c => c.day === todayDay || c.day === 'Todo Dia');
                if (activeCoupon) {
                    const banner = document.getElementById('promo-coupon-banner');
                    const discountVal = document.getElementById('coupon-discount-val');
                    const codeVal = document.getElementById('coupon-code-val');
                    if (banner && discountVal && codeVal) {
                        discountVal.innerText = activeCoupon.discount;
                        codeVal.innerText = activeCoupon.code;
                        banner.classList.remove('hidden');
                    }
                    const couponInput = document.getElementById('cart-coupon-input');
                    if (couponInput) {
                        couponInput.value = activeCoupon.code;
                        applyCartCoupon();
                    }
                }
            }
        }

        // Custom Cursor Logic
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorOutline = document.querySelector('.cursor-outline');
        const hoverables = document.querySelectorAll('.cursor-hover, a, button');

        // Only activate custom cursor on non-touch devices
        if (window.matchMedia("(pointer: fine)").matches) {
            window.addEventListener('mousemove', (e) => {
                const posX = e.clientX;
                const posY = e.clientY;

                // Move dot instantly
                cursorDot.style.left = `${posX}px`;
                cursorDot.style.top = `${posY}px`;

                // Move outline with slight delay (requestAnimationFrame for smoothness)
                cursorOutline.animate({
                    left: `${posX}px`,
                    top: `${posY}px`
                }, { duration: 500, fill: "forwards" });
            });

            hoverables.forEach(elem => {
                elem.addEventListener('mouseenter', () => {
                    document.body.classList.add('cursor-hover');
                });
                elem.addEventListener('mouseleave', () => {
                    document.body.classList.remove('cursor-hover');
                });
            });
        }

        // Cart toggle
        function toggleCart() {
            const drawer = document.getElementById('cart-drawer');
            if (drawer) {
                const isOpen = drawer.classList.toggle('open');
                if (isOpen) {
                    document.body.classList.add('cart-open-overflow');
                    sessionStorage.setItem('cleanfoods_ui_cart_open', 'true');
                } else {
                    document.body.classList.remove('cart-open-overflow');
                    sessionStorage.setItem('cleanfoods_ui_cart_open', 'false');
                }
            }
        }

        // Success toast notification
        function showToast(text) {
            const toast = document.getElementById('toast-success');
            const toastText = document.getElementById('toast-text');
            if (!toast || !toastText) return;

            toastText.innerText = text;
            toast.classList.remove('-translate-y-24', 'md:translate-y-24', 'opacity-0');
            toast.classList.add('translate-y-0', 'opacity-100');

            setTimeout(() => {
                toast.classList.remove('translate-y-0', 'opacity-100');
                toast.classList.add('-translate-y-24', 'md:translate-y-24', 'opacity-0');
            }, 3000);
        }

        function addToCart(dishId, size) {
            const dish = dishes.find(d => d.id === dishId);
            if (!dish) {
                console.error("Prato não encontrado:", dishId);
                return;
            }

            let priceStr = '';
            if (size === 'P') priceStr = dish.priceP;
            else if (size === 'G') priceStr = dish.priceG;
            else priceStr = (dish.priceP && dish.priceP !== '—' && dish.priceP !== '') ? dish.priceP : dish.priceG;

            if (!priceStr || priceStr === '—' || priceStr === '') {
                showToast("ESTE PRODUTO NÃO ESTÁ DISPONÍVEL!");
                return;
            }
            const price = parseFloat(priceStr.replace(',', '.'));
            if (isNaN(price) || price <= 0) {
                showToast("PREÇO INVÁLIDO PARA ESTE ITEM!");
                return;
            }

            const key = `${dishId}-${size}`;

            if (cart[key]) {
                cart[key].quantity += 1;
            } else {
                cart[key] = {
                    dishId: dishId,
                    name: dish.name,
                    size: size,
                    price: price,
                    quantity: 1,
                    category: dish.category
                };
            }

            localStorage.setItem('cleanfoods_cart', JSON.stringify(cart));
            updateCartBadges();
            renderCart();

            // Animate floating cart button to draw attention
            const floatingCart = document.getElementById('floating-cart');
            if (floatingCart) {
                floatingCart.classList.add('animate-bounce');
                setTimeout(() => {
                    floatingCart.classList.remove('animate-bounce');
                }, 1000);
            }

            showToast("PRODUTO ADICIONADO AO CARRINHO!");
        }

        // Update Cart Badges count
        function updateCartBadges() {
            let totalItems = 0;
            for (const key in cart) {
                totalItems += cart[key].quantity;
            }

            const badgeHeader = document.getElementById('cart-badge-header');
            const badgeFloat = document.getElementById('cart-badge-float');

            if (badgeHeader) {
                if (totalItems > 0) {
                    badgeHeader.innerText = totalItems;
                    badgeHeader.classList.remove('hidden');
                } else {
                    badgeHeader.classList.add('hidden');
                }
            }

            if (badgeFloat) {
                if (totalItems > 0) {
                    badgeFloat.innerText = totalItems;
                    badgeFloat.classList.remove('hidden');
                } else {
                    badgeFloat.classList.add('hidden');
                }
            }
        }

        // Update Item Quantity inside the cart
        function updateQuantity(key, delta) {
            if (!cart[key]) return;

            cart[key].quantity += delta;
            if (cart[key].quantity <= 0) {
                delete cart[key];
            }

            localStorage.setItem('cleanfoods_cart', JSON.stringify(cart));
            updateCartBadges();
            renderCart();
        }

        // Remove item from cart
        function removeFromCart(key) {
            if (cart[key]) {
                delete cart[key];
                localStorage.setItem('cleanfoods_cart', JSON.stringify(cart));
                updateCartBadges();
                renderCart();
                showToast("ITEM REMOVIDO!");
            }
        }

        // Validate and apply custom coupon codes
        async function applyCartCoupon() {
            const input = document.getElementById('cart-coupon-input');
            const feedback = document.getElementById('coupon-feedback');
            if (!input || !feedback) return;

            const code = input.value.trim().toUpperCase();
            if (!code) {
                feedback.innerText = "Informe o código do cupom!";
                feedback.className = "text-xs font-bold mt-2 text-red-500";
                feedback.classList.remove('hidden');
                appliedCoupon = null;
                renderCart();
                return;
            }

            let coupon = null;
            const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
            const todayDay = daysOfWeek[new Date().getDay()];

            if (supabaseClient) {
                try {
                    const { data, error } = await supabaseClient.from('coupons').select('*').eq('code', code);
                    if (error) throw error;
                    if (data && data.length > 0) {
                        coupon = data[0];
                    }
                } catch (err) {
                    console.error("Erro ao verificar cupom no Supabase:", err);
                }
            }

            if (!coupon) {
                const savedCoupons = JSON.parse(localStorage.getItem('cleanfoods_coupons')) || [];
                coupon = savedCoupons.find(c => c.code === code);
            }

            if (!coupon) {
                feedback.innerText = "Cupom inexistente!";
                feedback.className = "text-xs font-bold mt-2 text-red-500";
                feedback.classList.remove('hidden');
                appliedCoupon = null;
                renderCart();
                return;
            }

            if (!coupon.active) {
                feedback.innerText = "Este cupom está desativado!";
                feedback.className = "text-xs font-bold mt-2 text-red-500";
                feedback.classList.remove('hidden');
                appliedCoupon = null;
                renderCart();
                return;
            }

            if (coupon.day !== 'Todo Dia' && coupon.day !== todayDay) {
                feedback.innerText = `Este cupom só é válido de ${coupon.day}!`;
                feedback.className = "text-xs font-bold mt-2 text-red-500";
                feedback.classList.remove('hidden');
                appliedCoupon = null;
                renderCart();
                return;
            }

            // Success
            appliedCoupon = coupon;
            feedback.innerText = `Cupom aplicado! Desconto de ${coupon.discount}%`;
            feedback.className = "text-xs font-bold mt-2 text-green-500";
            feedback.classList.remove('hidden');
            renderCart();
        }

        // Render products list inside the drawer
        function renderCart() {
            const listContainer = document.getElementById('cart-items-list');
            if (!listContainer) return;

            listContainer.innerHTML = '';

            let subtotal = 0;
            let hasItems = false;

            for (const key in cart) {
                hasItems = true;
                const item = cart[key];
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;

                const itemRow = document.createElement('div');
                itemRow.className = 'bg-cf-black p-4 border border-cf-gray rounded flex items-center justify-between gap-3';
                itemRow.innerHTML = `
                    <div class="flex-1">
                        <div class="text-sm font-bold text-white uppercase">${item.name}</div>
                        <div class="text-xs text-gray-400 font-semibold mt-1">Tamanho: <span class="text-cf-black font-bold">${item.size}</span> | Unitário: R$ ${item.price.toFixed(2).replace('.', ',')}</div>
                        <div class="text-sm font-heading font-bold tracking-tight text-cf-black font-bold mt-1">Total: R$ ${itemTotal.toFixed(2).replace('.', ',')}</div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="flex items-center bg-cf-darkgray border border-cf-gray rounded overflow-hidden">
                            <button onclick="updateQuantity('${key}', -1)" class="px-2.5 py-1 text-gray-400 hover:text-white hover:bg-cf-gray transition-colors text-xs font-bold">-</button>
                            <span class="px-3 py-1 text-sm font-bold text-white select-none">${item.quantity}</span>
                            <button onclick="updateQuantity('${key}', 1)" class="px-2.5 py-1 text-gray-400 hover:text-white hover:bg-cf-gray transition-colors text-xs font-bold">+</button>
                        </div>
                        <button onclick="removeFromCart('${key}')" class="text-red-500 hover:text-red-400 p-1 transition-colors text-sm cursor-hover">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                `;
                listContainer.appendChild(itemRow);
            }

            if (!hasItems) {
                listContainer.innerHTML = `
                    <div class="text-center py-8 text-gray-500 font-semibold italic">
                        Seu carrinho está vazio. Adicione combustível!
                    </div>
                `;
            }

            const subtotalSpan = document.getElementById('cart-subtotal-val');
            const discountRow = document.getElementById('cart-discount-row');
            const discountLabel = document.getElementById('cart-discount-label');
            const discountSpan = document.getElementById('cart-discount-val');
            const totalSpan = document.getElementById('cart-total-val');

            let discountAmount = 0;
            if (appliedCoupon && subtotal > 0) {
                discountAmount = subtotal * (appliedCoupon.discount / 100);
                if (discountRow) discountRow.classList.remove('hidden');
                if (discountLabel) discountLabel.innerText = `Desconto (${appliedCoupon.discount}%)`;
                if (discountSpan) discountSpan.innerText = `-R$ ${discountAmount.toFixed(2).replace('.', ',')}`;
            } else {
                if (discountRow) discountRow.classList.add('hidden');
            }

            let shippingFee = getEffectiveShippingFee();
            let totalMarmitas = 0;
            for (const key in cart) totalMarmitas += cart[key].quantity;
            if (totalMarmitas >= 30) shippingFee = 0; // Combo monstro gives frete grátis

            const shippingRow = document.getElementById('cart-shipping-row');
            const shippingSpan = document.getElementById('cart-shipping-val');
            if (shippingRow && shippingSpan) {
                shippingRow.classList.remove('hidden');
                if (shippingFee > 0) {
                    shippingSpan.innerText = `R$ ${shippingFee.toFixed(2).replace('.', ',')}`;
                } else {
                    shippingSpan.innerText = `GRÁTIS (Combo 30)`;
                }
            }

            const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

            if (subtotalSpan) subtotalSpan.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
            if (totalSpan) totalSpan.innerText = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;

            // Checkout Summary Update
            const checkoutList = document.getElementById('checkout-items-list');
            if (checkoutList) {
                checkoutList.innerHTML = '';
                for (const key in cart) {
                    const item = cart[key];
                    const itemRow = document.createElement('div');
                    itemRow.className = 'flex justify-between';
                    itemRow.innerHTML = `
                        <span>${item.quantity}x ${item.name} (${item.size})</span>
                        <span>R$ ${(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                    `;
                    checkoutList.appendChild(itemRow);
                }
            }

            const chkSubtotalSpan = document.getElementById('checkout-subtotal-val');
            const chkDiscountRow = document.getElementById('checkout-discount-row');
            const chkDiscountLabel = document.getElementById('checkout-discount-label');
            const chkDiscountSpan = document.getElementById('checkout-discount-val');
            const chkShippingRow = document.getElementById('checkout-shipping-row');
            const chkShippingSpan = document.getElementById('checkout-shipping-val');
            const chkTotalSpan = document.getElementById('checkout-total-val');

            if (appliedCoupon && subtotal > 0) {
                if (chkDiscountRow) chkDiscountRow.classList.remove('hidden');
                if (chkDiscountLabel) chkDiscountLabel.innerText = `Desconto (${appliedCoupon.discount}%)`;
                if (chkDiscountSpan) chkDiscountSpan.innerText = `-R$ ${discountAmount.toFixed(2).replace('.', ',')}`;
            } else {
                if (chkDiscountRow) chkDiscountRow.classList.add('hidden');
            }

            if (chkShippingRow && chkShippingSpan) {
                chkShippingRow.classList.remove('hidden');
                if (shippingFee > 0) {
                    chkShippingSpan.innerText = `R$ ${shippingFee.toFixed(2).replace('.', ',')}`;
                } else {
                    chkShippingSpan.innerText = `GRÁTIS (Combo 30)`;
                }
            }

            if (chkSubtotalSpan) chkSubtotalSpan.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
            if (chkTotalSpan) chkTotalSpan.innerText = `R$ ${finalTotal.toFixed(2).replace('.', ',')}`;
        }

        const DEFAULT_SHIPPING_FEE = 15.00;

        function getEffectiveShippingFee() {
            if (typeof window.systemShippingFee === 'number' && !isNaN(window.systemShippingFee) && window.systemShippingFee > 0) {
                return window.systemShippingFee;
            }
            const savedFrete = localStorage.getItem('cleanfoods_frete');
            if (savedFrete !== null && savedFrete !== undefined && savedFrete !== '') {
                const parsed = parseFloat(savedFrete.replace(',', '.'));
                if (!isNaN(parsed) && parsed > 0) return parsed;
            }
            return DEFAULT_SHIPPING_FEE;
        }

        async function loadSettings() {
            let savedWhatsapp = localStorage.getItem('cleanfoods_whatsapp');
            let savedAddress = localStorage.getItem('cleanfoods_address');
            let savedFrete = localStorage.getItem('cleanfoods_frete');

            if (supabaseClient) {
                try {
                    const { data, error } = await supabaseClient.from('settings').select('*');
                    if (error) throw error;
                    if (data) {
                        const waSetting = data.find(s => s.key === 'whatsapp');
                        if (waSetting) savedWhatsapp = waSetting.value;
                        const addrSetting = data.find(s => s.key === 'address');
                        if (addrSetting) savedAddress = addrSetting.value;
                        const freteSetting = data.find(s => s.key === 'frete');
                        if (freteSetting) savedFrete = freteSetting.value;
                    }
                } catch (err) {
                    console.error("Erro ao carregar configurações do Supabase:", err);
                }
            }

            if (savedFrete !== null && savedFrete !== undefined && savedFrete !== '') {
                const parsed = parseFloat(savedFrete.replace(',', '.'));
                window.systemShippingFee = !isNaN(parsed) && parsed > 0 ? parsed : DEFAULT_SHIPPING_FEE;
            } else {
                window.systemShippingFee = DEFAULT_SHIPPING_FEE;
            }
            localStorage.setItem('cleanfoods_frete', window.systemShippingFee.toFixed(2));
            renderCart();
        }

        // Toggle Checkout Modal
        function toggleCheckoutModal() {
            const modal = document.getElementById('checkout-modal');
            if (!modal) return;

            if (modal.classList.contains('hidden')) {
                // Pre-fill inputs from localStorage if saved
                const savedName = localStorage.getItem('cleanfoods_client_name') || '';
                const savedPhone = localStorage.getItem('cleanfoods_client_phone') || '';
                const savedAddress = localStorage.getItem('cleanfoods_client_address') || '';
                const savedNotes = localStorage.getItem('cleanfoods_client_notes') || '';
                const savedDate = localStorage.getItem('cleanfoods_client_delivery_date') || '';
                const savedTime = localStorage.getItem('cleanfoods_client_delivery_time') || '';

                const nameInput = document.getElementById('client-name');
                const phoneInput = document.getElementById('client-phone');
                const addressTextarea = document.getElementById('client-address');
                const notesTextarea = document.getElementById('client-notes');
                const dateInput = document.getElementById('delivery-date');
                const timeInput = document.getElementById('delivery-time');

                if (nameInput && savedName) nameInput.value = savedName;
                if (phoneInput && savedPhone) phoneInput.value = savedPhone;
                if (addressTextarea && savedAddress) addressTextarea.value = savedAddress;
                if (notesTextarea && savedNotes) notesTextarea.value = savedNotes;

                if (timeInput && savedTime) timeInput.value = savedTime;

                renderDateChips();
                renderTimeChips();

                sessionStorage.setItem('cleanfoods_ui_checkout_open', 'true');

                modal.classList.remove('hidden');
                document.body.classList.add('cart-open-overflow');
                setTimeout(() => {
                    modal.classList.remove('opacity-0');
                }, 10);
            } else {
                sessionStorage.setItem('cleanfoods_ui_checkout_open', 'false');
                modal.classList.add('opacity-0');
                document.body.classList.remove('cart-open-overflow');
                setTimeout(() => {
                    modal.classList.add('hidden');
                }, 300);
            }
        }

        const AVAILABLE_DELIVERY_TIME_SLOTS = [
            '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
            '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
            '17:00', '17:30', '18:00', '18:30', '19:00'
        ];

        function renderDateChips() {
            const container = document.getElementById('date-chips-container');
            const hiddenInput = document.getElementById('delivery-date');
            if (!container || !hiddenInput) return;

            container.innerHTML = '';
            const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
            const savedDate = localStorage.getItem('cleanfoods_client_delivery_date');
            const today = new Date();

            let selectedIsoDate = savedDate || '';

            for (let i = 0; i <= 7; i++) {
                const d = new Date(today);
                d.setDate(today.getDate() + i);

                const year = d.getFullYear();
                const month = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                const isoDate = `${year}-${month}-${day}`;

                if (i === 0 && !selectedIsoDate) {
                    selectedIsoDate = isoDate;
                }

                const dayLabel = i === 0 ? 'Hoje' : (i === 1 ? 'Amanhã' : daysOfWeek[d.getDay()]);

                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `px-3.5 py-2.5 rounded border text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex flex-col items-center justify-center min-w-[75px] select-none ${selectedIsoDate === isoDate
                        ? 'bg-cf-black text-cf-black border-cf-yellow shadow-[0_0_12px_rgba(246,197,0,0.4)] scale-105 font-heading font-bold tracking-tight text-sm'
                        : 'bg-cf-black text-cf-black/70 font-semibold border-cf-gray hover:border-cf-yellow hover:text-white'
                    }`;
                btn.innerHTML = `
                    <span class="uppercase tracking-wider text-[10px] opacity-80">${dayLabel}</span>
                    <span class="font-heading font-bold tracking-tight text-sm">${day}/${month}</span>
                `;

                btn.onclick = () => {
                    hiddenInput.value = isoDate;
                    localStorage.setItem('cleanfoods_client_delivery_date', isoDate);
                    renderDateChips();
                    renderTimeChips();
                };

                container.appendChild(btn);
            }

            hiddenInput.value = selectedIsoDate;
            localStorage.setItem('cleanfoods_client_delivery_date', selectedIsoDate);
        }

        function renderTimeChips() {
            const container = document.getElementById('time-chips-container');
            const hiddenInput = document.getElementById('delivery-time');
            if (!container || !hiddenInput) return;

            container.innerHTML = '';
            const savedTime = localStorage.getItem('cleanfoods_client_delivery_time') || '';
            let selectedTime = savedTime;

            const selectedDate = localStorage.getItem('cleanfoods_client_delivery_date') || '';
            
            // Horário de Brasília
            const bsbTime = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' }));
            const currentHour = bsbTime.getHours();
            const currentMinute = bsbTime.getMinutes();
            
            const bsbYear = bsbTime.getFullYear();
            const bsbMonth = String(bsbTime.getMonth() + 1).padStart(2, '0');
            const bsbDay = String(bsbTime.getDate()).padStart(2, '0');
            const bsbDateStr = `${bsbYear}-${bsbMonth}-${bsbDay}`;
            
            const isToday = (selectedDate === bsbDateStr) || (selectedDate === '');

            let availableSlots = AVAILABLE_DELIVERY_TIME_SLOTS;

            if (isToday) {
                availableSlots = AVAILABLE_DELIVERY_TIME_SLOTS.filter(slot => {
                    const [slotHourStr, slotMinuteStr] = slot.split(':');
                    const slotHour = parseInt(slotHourStr, 10);
                    const slotMinute = parseInt(slotMinuteStr, 10);
                    if (slotHour > currentHour) return true;
                    if (slotHour === currentHour && slotMinute > currentMinute) return true;
                    return false;
                });
            }

            if (availableSlots.length === 0) {
                container.innerHTML = '<span class="text-xs text-gray-500 font-bold block w-full text-center py-2">Nenhum horário disponível para hoje.</span>';
                if (selectedTime !== '') {
                    hiddenInput.value = '';
                    localStorage.removeItem('cleanfoods_client_delivery_time');
                }
                return;
            }

            if (selectedTime && !availableSlots.includes(selectedTime)) {
                selectedTime = '';
                hiddenInput.value = '';
                localStorage.removeItem('cleanfoods_client_delivery_time');
            }

            availableSlots.forEach((slot) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = `py-2 px-2 rounded border text-xs font-heading font-bold tracking-tight tracking-wider transition-all cursor-pointer text-center select-none ${selectedTime === slot
                        ? 'bg-cf-black text-cf-black border-cf-yellow shadow-[0_0_10px_rgba(246,197,0,0.4)] scale-105'
                        : 'bg-cf-black text-white border-cf-gray hover:border-cf-yellow hover:text-cf-black font-bold'
                    }`;
                btn.innerText = slot;

                btn.onclick = () => {
                    hiddenInput.value = slot;
                    localStorage.setItem('cleanfoods_client_delivery_time', slot);
                    renderTimeChips();
                };

                container.appendChild(btn);
            });

            hiddenInput.value = selectedTime;
        }

        // Setup live auto-saving and restoration for client checkout form fields & modals
        function initCheckoutFormStatePersistence() {
            renderDateChips();
            renderTimeChips();

            // Máscara de Telefone Automática (11) 99999-9999
            const phoneInput = document.getElementById('client-phone');
            if (phoneInput) {
                const formatPhone = (val) => {
                    let v = val.replace(/\D/g, '');
                    if (v.length > 11) v = v.slice(0, 11);
                    if (v.length > 6) return `(${v.slice(0, 2)}) ${v.slice(2, 7)}-${v.slice(7)}`;
                    if (v.length > 2) return `(${v.slice(0, 2)}) ${v.slice(2)}`;
                    if (v.length > 0) return `(${v}`;
                    return '';
                };

                if (phoneInput.value) {
                    phoneInput.value = formatPhone(phoneInput.value);
                }

                phoneInput.addEventListener('keydown', (e) => {
                    if (e.key === 'Backspace') {
                        const pos = e.target.selectionStart;
                        const val = e.target.value;
                        // Se o cursor está logo após um separador, pula o separador
                        if (pos > 0 && /[\s\-\(\)]/.test(val[pos - 1])) {
                            e.preventDefault();
                            const newVal = val.slice(0, pos - 2) + val.slice(pos);
                            e.target.value = formatPhone(newVal);
                            // Reposiciona o cursor
                            const newPos = pos - 2;
                            e.target.setSelectionRange(newPos < 0 ? 0 : newPos, newPos < 0 ? 0 : newPos);
                        }
                    }
                });

                phoneInput.addEventListener('input', (e) => {
                    const pos = e.target.selectionStart;
                    const oldLen = e.target.value.length;
                    e.target.value = formatPhone(e.target.value);
                    const newLen = e.target.value.length;
                    const newPos = pos + (newLen - oldLen);
                    e.target.setSelectionRange(newPos, newPos);
                });
            }

            const fields = [
                { id: 'client-name', key: 'cleanfoods_client_name' },
                { id: 'client-phone', key: 'cleanfoods_client_phone' },
                { id: 'client-address', key: 'cleanfoods_client_address' },
                { id: 'client-notes', key: 'cleanfoods_client_notes' },
                { id: 'delivery-date', key: 'cleanfoods_client_delivery_date' },
                { id: 'delivery-time', key: 'cleanfoods_client_delivery_time' }
            ];

            fields.forEach(f => {
                const el = document.getElementById(f.id);
                if (el) {
                    const savedVal = localStorage.getItem(f.key);
                    if (savedVal && !el.value) {
                        el.value = savedVal;
                    }
                    el.addEventListener('input', () => localStorage.setItem(f.key, el.value));
                    el.addEventListener('change', () => localStorage.setItem(f.key, el.value));
                }
            });

            // Save and restore scroll position
            let scrollTimer;
            window.addEventListener('scroll', () => {
                clearTimeout(scrollTimer);
                scrollTimer = setTimeout(() => {
                    sessionStorage.setItem('cleanfoods_client_scroll_y', window.scrollY.toString());
                }, 100);
            });

            const savedScroll = sessionStorage.getItem('cleanfoods_client_scroll_y');
            if (savedScroll && parseFloat(savedScroll) > 0) {
                window.scrollTo({ top: parseFloat(savedScroll), behavior: 'instant' });
            }

            // Restore Checkout Modal or Cart Drawer if open prior to refresh
            const isCheckoutOpen = sessionStorage.getItem('cleanfoods_ui_checkout_open');
            if (isCheckoutOpen === 'true') {
                const modal = document.getElementById('checkout-modal');
                if (modal && modal.classList.contains('hidden')) {
                    toggleCheckoutModal();
                }
            } else {
                const isCartOpen = sessionStorage.getItem('cleanfoods_ui_cart_open');
                if (isCartOpen === 'true') {
                    const cartDrawer = document.getElementById('cart-drawer');
                    if (cartDrawer && !cartDrawer.classList.contains('open')) {
                        toggleCart();
                    }
                }
            }
        }

        // Close Thank You Modal
        function closeThankYouModal() {
            const thankModal = document.getElementById('thank-you-modal');
            if (thankModal) {
                thankModal.classList.add('opacity-0');
                setTimeout(() => {
                    thankModal.classList.add('hidden');
                }, 300);
            }
            document.body.classList.remove('cart-open-overflow');
        }

        // Validate checkout modal fields and submit order locally
        let isSubmitting = false;
        async function submitCheckoutForm() {
            if (isSubmitting) return;
            const nameInput = document.getElementById('client-name');
            const phoneInput = document.getElementById('client-phone');
            const addressInput = document.getElementById('client-address');

            const notesInput = document.getElementById('client-notes');
            const dateInput = document.getElementById('delivery-date');
            const timeInput = document.getElementById('delivery-time');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const address = addressInput ? addressInput.value.trim() : '';
            let payment = 'Aguardando';
            const notes = notesInput ? notesInput.value.trim() : '';
            const deliveryDate = dateInput ? dateInput.value : '';
            const deliveryTime = timeInput ? timeInput.value : '';

            if (!name) {
                alert("Por favor, preencha o campo Nome Completo.");
                if (nameInput) nameInput.focus();
                return;
            }
            if (!phone) {
                alert("Por favor, preencha o campo Telefone.");
                if (phoneInput) phoneInput.focus();
                return;
            }
            if (!address) {
                alert("Por favor, preencha o campo Endereço de Entrega.");
                if (addressInput) addressInput.focus();
                return;
            }
            if (!payment) {
                alert("Por favor, escolha uma Forma de Pagamento.");
                if (paymentInput) paymentInput.focus();
                return;
            }
            if (!deliveryDate) {
                alert("Por favor, selecione a Data da Entrega.");
                if (dateInput) dateInput.focus();
                return;
            }
            if (!deliveryTime) {
                alert("Por favor, informe o Horário da Entrega.");
                if (timeInput) timeInput.focus();
                return;
            }

            // Validar formato do telefone (mínimo 10 dígitos)
            const phoneDigits = phone.replace(/\D/g, '');
            if (phoneDigits.length < 10 || phoneDigits.length > 11) {
                alert("Informe um telefone válido com DDD (ex: 11999998888)");
                if (phoneInput) phoneInput.focus();
                return;
            }

            // Validar horário (11:00 às 19:00)
            const [hours, minutes] = deliveryTime.split(':').map(Number);
            if (hours < 11 || (hours === 19 && minutes > 0) || hours > 19) {
                alert("O horário de entrega deve ser entre 11h e 19h.");
                if (timeInput) timeInput.focus();
                return;
            }

            // Validar data da entrega (de hoje até hoje + 7 dias)
            const selectedDate = new Date(deliveryDate + 'T00:00:00');
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const maxDate = new Date(today);
            maxDate.setDate(today.getDate() + 7);

            if (selectedDate < today || selectedDate > maxDate) {
                alert("A data de entrega deve ser a partir de hoje e no máximo nos próximos 7 dias.");
                if (dateInput) dateInput.focus();
                return;
            }

            isSubmitting = true;

            // Save details to localStorage for future use
            localStorage.setItem('cleanfoods_client_name', name);
            localStorage.setItem('cleanfoods_client_phone', phone);
            localStorage.setItem('cleanfoods_client_address', address);

            // Calculate pricing
            let subtotal = 0;
            let totalMarmitas = 0;
            const orderItems = [];
            for (const key in cart) {
                const item = cart[key];
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                totalMarmitas += item.quantity;
                orderItems.push({
                    name: item.name,
                    size: item.size,
                    price: item.price,
                    quantity: item.quantity
                });
            }

            // Combo Monstro discount
            let comboDiscountPercent = 0;
            let comboBonus = '';
            if (totalMarmitas >= 30) {
                comboDiscountPercent = 20;
                comboBonus = 'Frete Grátis';
            } else if (totalMarmitas >= 20) {
                comboDiscountPercent = 10;
                comboBonus = '1 Salgado Cortesia';
            } else if (totalMarmitas >= 10) {
                comboDiscountPercent = 5;
            }

            if (comboBonus) {
                orderItems.push({
                    name: `🎁 BRINDE: ${comboBonus}`,
                    size: 'Único',
                    price: 0,
                    quantity: 1
                });
            }

            // Revalidar cupom antes de aplicar
            if (appliedCoupon) {
                const daysOfWeek = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
                const todayDay = daysOfWeek[new Date().getDay()];
                if (!appliedCoupon.active || (appliedCoupon.day !== 'Todo Dia' && appliedCoupon.day !== todayDay)) {
                    appliedCoupon = null;
                }
            }

            let couponDiscountPercent = appliedCoupon ? appliedCoupon.discount : 0;
            let discountAmount = 0;

            if (comboDiscountPercent >= couponDiscountPercent) {
                discountAmount = subtotal * (comboDiscountPercent / 100);
            } else {
                discountAmount = subtotal * (couponDiscountPercent / 100);
            }

            let shippingFee = getEffectiveShippingFee();
            if (totalMarmitas >= 30) {
                shippingFee = 0;
            }

            const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

            if (shippingFee > 0) {
                orderItems.push({
                    name: `🚚 Taxa de Entrega (Frete)`,
                    size: 'Único',
                    price: shippingFee,
                    quantity: 1
                });
            }

            // Generate unique order ID
            const orderId = 'CF-' + Date.now().toString(36).slice(-5).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();

            // Create Order Object
            const order = {
                id: orderId,
                clientName: name,
                clientPhone: phone,
                address: address,
                payment: payment,
                notes: notes,
                deliveryDate: deliveryDate,
                deliveryTime: deliveryTime,
                items: orderItems,
                subtotal: subtotal.toFixed(2),
                discount: discountAmount.toFixed(2),
                total: finalTotal.toFixed(2),
                status: 'Pendente',
                date: new Date().toISOString()
            };

            // ------------------ NEW FLOW ------------------
            window.currentOrderData = order;

            // Esconde form e mostra o Mercado Pago
            document.getElementById('checkout-form').classList.add('hidden');
            const paymentStep = document.getElementById('payment-step-container');
            if (paymentStep) paymentStep.classList.remove('hidden');

            // Set Pix total display
            const pixTotal = document.getElementById('pix-direct-total');
            if (pixTotal) pixTotal.innerText = `R$ ${parseFloat(order.total).toFixed(2).replace('.', ',')}`;

            // Default to Pix selected
            selectPaymentMethod('pix');

            isSubmitting = false;
        }

        function selectPaymentMethod(method) {
            const pixContainer = document.getElementById('pix-direct-container');
            const cardWrapper = document.getElementById('card-brick-wrapper');
            const btnPix = document.getElementById('pmt-select-pix');
            const btnCard = document.getElementById('pmt-select-card');

            if (method === 'pix') {
                pixContainer.classList.remove('hidden');
                cardWrapper.classList.add('hidden');
                btnPix.className = 'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded border-2 border-cf-yellow bg-cf-black text-cf-black font-heading font-bold tracking-tight text-base uppercase tracking-wider transition-all cursor-pointer';
                btnCard.className = 'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded border-2 border-cf-gray bg-cf-black text-white font-heading font-bold tracking-tight text-base uppercase tracking-wider transition-all cursor-pointer hover:border-cf-yellow';
            } else {
                pixContainer.classList.add('hidden');
                cardWrapper.classList.remove('hidden');
                btnCard.className = 'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded border-2 border-cf-yellow bg-cf-black text-cf-black font-heading font-bold tracking-tight text-base uppercase tracking-wider transition-all cursor-pointer';
                btnPix.className = 'flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded border-2 border-cf-gray bg-cf-black text-white font-heading font-bold tracking-tight text-base uppercase tracking-wider transition-all cursor-pointer hover:border-cf-yellow';
                // Initialize brick only when card is selected
                initializePaymentBrick();
            }
        }

        async function handleDirectPixPayment() {
            const order = window.currentOrderData;
            if (!order) return;

            const payBtn = document.getElementById('pix-direct-pay-btn');
            const loadingDiv = document.getElementById('pix-direct-loading');
            payBtn.classList.add('hidden');
            loadingDiv.classList.remove('hidden');

            // Pré-salva o pedido no banco para passar na validação de segurança do backend
            if (window.supabaseClient) {
                try {
                    const dbOrder = {
                        id: order.id,
                        client_name: order.clientName,
                        client_phone: order.clientPhone,
                        address: order.address,
                        payment: 'Pix',
                        notes: order.notes,
                        delivery_date: order.deliveryDate,
                        delivery_time: order.deliveryTime,
                        items: order.items,
                        subtotal: parseFloat(order.subtotal),
                        discount: parseFloat(order.discount),
                        total: parseFloat(order.total),
                        status: 'Pendente'
                    };
                    const { error } = await window.supabaseClient.from('orders').insert([dbOrder]);
                    if (error && error.code !== '23505') {
                        console.error("Erro ao pré-salvar pedido:", error);
                    }
                } catch (err) {
                    console.error("Erro na tentativa de pré-salvar pedido:", err);
                }
            }

            // Gera email limpo para o Mercado Pago (API backend)
            const cleanPhone = (order.clientPhone || '').replace(/\D/g, '');
            const cleanName = (order.clientName || 'cliente')
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            const validEmail = cleanPhone.length >= 10
                ? `cliente_${cleanPhone}@cleanfoodsp.com.br`
                : `${cleanName || 'cliente'}@cleanfoodsp.com.br`;

            const paymentData = {
                transaction_amount: parseFloat(order.total),
                payment_method_id: 'pix',
                description: `Pedido ${order.id} - ${order.clientName}`,
                external_reference: order.id,
                payer: {
                    email: validEmail,
                    first_name: order.clientName.split(' ')[0] || 'Cliente',
                    last_name: order.clientName.split(' ').slice(1).join(' ') || 'CleanFoods'
                }
            };

            try {
                const response = await fetch(`${window.SUPABASE_URL}/functions/v1/create-payment`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${window.SUPABASE_ANON_KEY}`
                    },
                    body: JSON.stringify(paymentData),
                });

                const data = await response.json();

                if (!response.ok || data.error || data.status === 'rejected' || data.code) {
                    payBtn.classList.remove('hidden');
                    loadingDiv.classList.add('hidden');
                    alert("Erro no pagamento: " + (data.error || data.message || "Pagamento recusado"));
                    return;
                }

                // Sucesso - finaliza e mostra QR Code
                finalizeAndSaveOrder('Pix', data);
            } catch (error) {
                payBtn.classList.remove('hidden');
                loadingDiv.classList.add('hidden');
                alert("Erro de conexão ao processar pagamento.");
                console.error(error);
            }
        }

        function goBackToCheckoutForm() {
            document.getElementById('payment-step-container').classList.add('hidden');
            document.getElementById('checkout-form').classList.remove('hidden');
            // Reset Pix button state
            const payBtn = document.getElementById('pix-direct-pay-btn');
            const loadingDiv = document.getElementById('pix-direct-loading');
            if (payBtn) payBtn.classList.remove('hidden');
            if (loadingDiv) loadingDiv.classList.add('hidden');
        }

        async function finalizeAndSaveOrder(paymentMethod, mpResponse, isPaymentInProcess = false) {
            const order = window.currentOrderData;
            order.payment = paymentMethod;

            // Save Order to Supabase or fallback
            if (window.supabaseClient) {
                try {
                    const dbOrder = {
                        id: order.id,
                        client_name: order.clientName,
                        client_phone: order.clientPhone,
                        address: order.address,
                        payment: order.payment,
                        notes: order.notes,
                        delivery_date: order.deliveryDate,
                        delivery_time: order.deliveryTime,
                        items: order.items,
                        subtotal: parseFloat(order.subtotal),
                        discount: parseFloat(order.discount),
                        total: parseFloat(order.total),
                        status: order.status
                    };
                    const { error } = await window.supabaseClient.from('orders').upsert([dbOrder], { onConflict: 'id' });
                    if (error) throw error;
                } catch (err) {
                    console.error("Erro ao enviar pedido para o Supabase, salvando localmente:", err);
                    let orders = JSON.parse(localStorage.getItem('cleanfoods_orders')) || [];
                    orders.push(order);
                    localStorage.setItem('cleanfoods_orders', JSON.stringify(orders));
                }
            } else {
                let orders = JSON.parse(localStorage.getItem('cleanfoods_orders')) || [];
                orders.push(order);
                localStorage.setItem('cleanfoods_orders', JSON.stringify(orders));
            }

            // Save Transaction automatically for Financeiro
            const transactionObj = {
                id: 'TX-' + order.id,
                type: 'Entrada',
                description: `Pedido #${order.id} - ${order.clientName}`,
                value: parseFloat(order.total),
                date: new Date().toISOString(),
                category: 'Pedido'
            };

            if (window.supabaseClient) {
                try {
                    const { error } = await window.supabaseClient.from('transactions').insert([transactionObj]);
                    if (error && error.code !== '23505') console.error("Erro ao salvar transação no Supabase:", error);
                } catch (err) {
                    console.error("Erro ao salvar transação:", err);
                    let transactions = JSON.parse(localStorage.getItem('cleanfoods_transactions')) || [];
                    transactions.push(transactionObj);
                    localStorage.setItem('cleanfoods_transactions', JSON.stringify(transactions));
                }
            } else {
                let transactions = JSON.parse(localStorage.getItem('cleanfoods_transactions')) || [];
                transactions.push(transactionObj);
                localStorage.setItem('cleanfoods_transactions', JSON.stringify(transactions));
            }

            // Show success
            const orderIdSpan = document.getElementById('thank-order-id');
            const orderTotalSpan = document.getElementById('thank-order-total');
            const orderPaymentSpan = document.getElementById('thank-order-payment');
            const orderDeliverySpan = document.getElementById('thank-order-delivery');

            if (orderIdSpan) orderIdSpan.innerText = '#' + order.id;
            if (orderTotalSpan) orderTotalSpan.innerText = 'R$ ' + parseFloat(order.total).toFixed(2).replace('.', ',');
            if (orderPaymentSpan) orderPaymentSpan.innerText = paymentMethod;
            if (orderDeliverySpan) {
                const parts = order.deliveryDate.split('-');
                const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : order.deliveryDate;
                orderDeliverySpan.innerText = `${formattedDate} às ${order.deliveryTime}`;
            }

            const pixInfoContainer = document.getElementById('pix-payment-info');

            const tyTitle = document.getElementById('thank-you-title');
            const tyMessage = document.getElementById('thank-you-message');

            const tySubtitle = document.getElementById('thank-you-subtitle');
            let pollingInterval = null;
            async function pollOrderStatus(orderId, mpPaymentId) {
                if (pollingInterval) clearInterval(pollingInterval);
                function onPaymentApproved() {
                    clearInterval(pollingInterval);
                    if (tyTitle) tyTitle.innerText = 'Pedido Recebido!';
                    if (tySubtitle) tySubtitle.innerText = 'Seu pagamento foi confirmado!';
                    if (tyMessage) tyMessage.innerText = 'Estamos preparando tudo. Em breve seu pedido estará pronto!';
                    if (pixInfoContainer) pixInfoContainer.classList.add('hidden');
                }
                pollingInterval = setInterval(async () => {
                    try {
                        // Consulta o status diretamente no Mercado Pago
                        if (mpPaymentId) {
                            const mpRes = await fetch(`${window.SUPABASE_URL}/functions/v1/check-payment-status`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${window.SUPABASE_ANON_KEY}`
                                },
                                body: JSON.stringify({ mp_payment_id: String(mpPaymentId), order_id: orderId }),
                            });
                            const mpData = await mpRes.json();
                            console.log('[Polling MP] status:', mpData.mp_status);
                            if (mpRes.ok && mpData.approved) {
                                onPaymentApproved();
                                return;
                            }
                        }
                        // Fallback: verifica o banco de dados
                        const dbRes = await fetch(`${window.SUPABASE_URL}/functions/v1/check-order-status`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${window.SUPABASE_ANON_KEY}`
                            },
                            body: JSON.stringify({ order_id: orderId }),
                        });
                        const dbData = await dbRes.json();
                        if (dbRes.ok && dbData.status === 'Em Preparo') {
                            onPaymentApproved();
                        }
                    } catch (e) {
                        console.error('Polling error', e);
                    }
                }, 4000);
            }

            if (paymentMethod === 'Pix') {
                if (tyTitle) tyTitle.innerText = 'Aguardando Pagamento';
                if (tySubtitle) tySubtitle.innerText = 'Falta pouco!';
                if (tyMessage) tyMessage.innerText = 'Realize o pagamento utilizando o QR Code ou Copia e Cola abaixo. Seu pedido será preparado automaticamente após a confirmação!';
                if (mpResponse && mpResponse.point_of_interaction) {
                    const qrCodeBase64 = mpResponse.point_of_interaction.transaction_data.qr_code_base64;
                    const qrCodeString = mpResponse.point_of_interaction.transaction_data.qr_code;
                    document.getElementById('pix-qr-code').src = `data:image/jpeg;base64,${qrCodeBase64}`;
                    document.getElementById('pix-copia-cola').value = qrCodeString;
                    if (pixInfoContainer) pixInfoContainer.classList.remove('hidden');
                    pollOrderStatus(order.id, mpResponse.id);
                } else {
                    if (pixInfoContainer) pixInfoContainer.classList.add('hidden');
                }
            } else if (isPaymentInProcess) {
                // Cartão em análise pelo Mercado Pago
                if (tyTitle) tyTitle.innerText = 'Pagamento em Análise';
                if (tySubtitle) tySubtitle.innerText = 'Quase lá!';
                if (tyMessage) tyMessage.innerText = 'Seu pagamento está sendo analisado pelo Mercado Pago. Assim que for aprovado, seu pedido será preparado automaticamente. Você será notificado!';
                if (pixInfoContainer) pixInfoContainer.classList.add('hidden');
                // Polling para verificar quando o pagamento for aprovado
                if (mpResponse && mpResponse.id) {
                    pollOrderStatus(order.id, mpResponse.id);
                }
            } else {
                if (tyTitle) tyTitle.innerText = 'Pedido Recebido!';
                if (tySubtitle) tySubtitle.innerText = 'Obrigado pela preferência!';
                if (tyMessage) tyMessage.innerText = 'Seu combustível já está sendo preparado pela nossa equipe. Você pode acompanhar o status ou falar conosco a qualquer momento!';
                if (pixInfoContainer) pixInfoContainer.classList.add('hidden');
            }

            const thankModal = document.getElementById('thank-you-modal');
            if (thankModal) {
                thankModal.classList.remove('hidden');
                setTimeout(() => {
                    thankModal.classList.remove('opacity-0');
                }, 10);
            }

            const checkoutModal = document.getElementById('checkout-modal');
            if (checkoutModal) {
                checkoutModal.classList.add('opacity-0');
                setTimeout(() => {
                    checkoutModal.classList.add('hidden');
                }, 300);
            }

            cart = {};
            localStorage.setItem('cleanfoods_cart', JSON.stringify(cart));
            if (typeof updateCartBadges === 'function') updateCartBadges();
            if (typeof renderCart === 'function') renderCart();
        }

        let isBrickInitialized = false;
        async function initializePaymentBrick() {
            // Always re-initialize to reset Brick state for new orders
            if (!window.MP_PUBLIC_KEY) {
                console.error("Chave do Mercado Pago não configurada.");
                return;
            }

            const order = window.currentOrderData;
            const mp = new MercadoPago(window.MP_PUBLIC_KEY, { locale: 'pt-BR' });
            const bricksBuilder = mp.bricks();

            // Formata email limpo (sem acentos ou caracteres especiais) para o Mercado Pago aceitar automaticamente
            const cleanPhone = (order.clientPhone || '').replace(/\D/g, '');
            const cleanName = (order.clientName || 'cliente')
                .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            const validEmail = cleanPhone.length >= 10
                ? `cliente_${cleanPhone}@cleanfoodsp.com.br`
                : `${cleanName || 'cliente'}@cleanfoodsp.com.br`;

            const settings = {
                initialization: {
                    amount: parseFloat(order.total),
                    preferenceId: null,
                    payer: {
                        email: validEmail,
                    },
                },
                customization: {
                    paymentMethods: {
                        creditCard: "all",
                        debitCard: "all"
                    },
                    visual: {
                        hidePaymentButton: false,
                        hideFormTitle: true,
                        style: {
                            theme: 'default'
                        }
                    }
                },
                callbacks: {
                    onReady: () => {
                        const brickContainer = document.getElementById('paymentBrick_container');
                        if (brickContainer) {
                            brickContainer.classList.remove('hidden');
                        }
                    },
                    onSubmit: ({ selectedPaymentMethod, formData }) => {
                        formData.description = `Pedido ${order.id} - ${order.clientName}`;
                        formData.external_reference = order.id;

                        return new Promise(async (resolve, reject) => {
                            // Pré-salva o pedido no banco para passar na validação de segurança do backend
                            const pMethod = formData.payment_method_id === 'pix' ? 'Pix' : 'Cartão de Crédito';
                            if (window.supabaseClient) {
                                try {
                                    const dbOrder = {
                                        id: order.id,
                                        client_name: order.clientName,
                                        client_phone: order.clientPhone,
                                        address: order.address,
                                        payment: pMethod,
                                        notes: order.notes,
                                        delivery_date: order.deliveryDate,
                                        delivery_time: order.deliveryTime,
                                        items: order.items,
                                        subtotal: parseFloat(order.subtotal),
                                        discount: parseFloat(order.discount),
                                        total: parseFloat(order.total),
                                        status: 'Pendente'
                                    };
                                    const { error } = await window.supabaseClient.from('orders').insert([dbOrder]);
                                    if (error && error.code !== '23505') {
                                        console.error("Erro ao pré-salvar pedido:", error);
                                    }
                                } catch (err) {
                                    console.error("Erro na tentativa de pré-salvar pedido:", err);
                                }
                            }

                            fetch(`${window.SUPABASE_URL}/functions/v1/create-payment`, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": `Bearer ${window.SUPABASE_ANON_KEY}`
                                },
                                body: JSON.stringify(formData),
                            })
                                .then(async (response) => {
                                    const data = await response.json();
                                    if (!response.ok || data.error || data.status === 'rejected' || data.code) {
                                        reject();
                                        alert("Erro no pagamento: " + (data.error || data.message || "Pagamento recusado"));
                                        return;
                                    }
                                    resolve();

                                    const pMethod = formData.payment_method_id === 'pix' ? 'Pix' : 'Cartão de Crédito';
                                    const isInProcess = data.status === 'in_process' || data.status === 'pending';
                                    finalizeAndSaveOrder(pMethod, data, isInProcess);
                                })
                                .catch((error) => {
                                    reject();
                                    alert("Erro de conexão ao processar pagamento.");
                                });
                        });
                    },
                    onError: (error) => {
                        console.error(error);
                        alert("Ocorreu um erro ao carregar o pagamento.");
                    },
                },
            };

            if (window.paymentBrickController) window.paymentBrickController.unmount();
            window.paymentBrickController = await bricksBuilder.create("payment", "paymentBrick_container", settings);
            isBrickInitialized = true;
        }


        function checkoutOrder() {
            let hasItems = false;
            for (const key in cart) {
                hasItems = true;
                break;
            }

            if (!hasItems) {
                alert("Adicione pelo menos um item ao seu carrinho!");
                return;
            }

            // Close the cart drawer
            toggleCart();

            // Open the checkout details modal
            toggleCheckoutModal();
        }

        // GSAP Animations Registration
        gsap.registerPlugin(ScrollTrigger);

        // Dish Detail Modal Functions
        function openDishDetail(dishId) {
            const dish = dishes.find(d => d.id === dishId);
            if (!dish) return;

            const placeholderImg = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22%23666%22%3E%3Cpath d=%22M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z%22/%3E%3C/svg%3E';
            const imgEl = document.getElementById('dish-detail-img');
            imgEl.src = dish.image || placeholderImg;

            document.getElementById('dish-detail-category').innerText = dish.category === 'Gourmet' ? 'Linha Gourmet' : 'Linha ' + dish.category;
            document.getElementById('dish-detail-name').innerText = dish.name;

            const pContainer = document.getElementById('dish-detail-p');
            if (dish.priceP && dish.priceP !== '—' && dish.priceP !== '') {
                pContainer.innerHTML = `<span class="text-gray-400 font-bold">P (225g)</span>
                    <button onclick="addToCart('${dish.id}', 'P'); closeDishDetail();" class="text-white bg-cf-gray px-4 py-2 rounded-sm cursor-pointer hover:bg-cf-black hover:text-cf-black transition-all font-bold text-sm inline-flex items-center gap-2">R$ ${dish.priceP} <i class="fa-solid fa-cart-plus"></i></button>`;
            } else {
                pContainer.innerHTML = `<span class="text-gray-500 font-bold">P (225g)</span><span class="text-gray-600 font-bold text-sm">—</span>`;
            }

            const gContainer = document.getElementById('dish-detail-g');
            if (dish.priceG && dish.priceG !== '—' && dish.priceG !== '') {
                gContainer.innerHTML = `<span class="text-cf-black font-bold font-bold">G (450g)</span>
                    <button onclick="addToCart('${dish.id}', 'G'); closeDishDetail();" class="bg-cf-black text-cf-black px-4 py-2 rounded-sm cursor-pointer hover:bg-white hover:text-cf-black transition-all font-bold text-sm inline-flex items-center gap-2">R$ ${dish.priceG} <i class="fa-solid fa-cart-plus"></i></button>`;
            } else {
                gContainer.innerHTML = `<span class="text-gray-500 font-bold">G (450g)</span><span class="text-gray-600 font-bold text-sm">—</span>`;
            }

            const defaultNutrition = {
                energy: '202kcal',
                carbs: '24gr',
                proteins: '23gr',
                totalFat: '2gr',
                saturatedFat: '0gr',
                transFat: '0gr',
                fiber: '4gr',
                sodium: '200mg'
            };

            const n = dish.nutrition || { ...defaultNutrition };
            document.getElementById('det-energy').innerText = n.energy || '-';
            document.getElementById('det-carbs').innerText = n.carbs || '-';
            document.getElementById('det-proteins').innerText = n.proteins || '-';
            document.getElementById('det-total-fat').innerText = n.totalFat || '-';
            document.getElementById('det-sat-fat').innerText = n.saturatedFat || '-';
            document.getElementById('det-trans-fat').innerText = n.transFat || '-';
            document.getElementById('det-fiber').innerText = n.fiber || '-';
            document.getElementById('det-sodium').innerText = n.sodium || '-';

            const modal = document.getElementById('dish-detail-modal');
            modal.classList.remove('hidden');
            setTimeout(() => {
                modal.classList.remove('opacity-0');
            }, 10);
        }

        function closeDishDetail() {
            const modal = document.getElementById('dish-detail-modal');
            modal.classList.add('opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);
        }

        document.addEventListener('DOMContentLoaded', async function () {
            // Handle Payment Return
            const urlParams = new URLSearchParams(window.location.search);
            const status = urlParams.get('status');
            const order_id = urlParams.get('order_id');

            if (status === 'success' || status === 'pending') {
                const pendingOrder = JSON.parse(localStorage.getItem('cleanfoods_pending_order'));
                if (pendingOrder && pendingOrder.id === order_id) {
                    const orderIdSpan = document.getElementById('thank-order-id');
                    const orderTotalSpan = document.getElementById('thank-order-total');
                    const orderPaymentSpan = document.getElementById('thank-order-payment');
                    const orderDeliverySpan = document.getElementById('thank-order-delivery');

                    if (orderIdSpan) orderIdSpan.innerText = '#' + pendingOrder.id;
                    if (orderTotalSpan) orderTotalSpan.innerText = 'R$ ' + pendingOrder.total.replace('.', ',');
                    if (orderPaymentSpan) orderPaymentSpan.innerText = pendingOrder.payment;
                    if (orderDeliverySpan) {
                        const parts = pendingOrder.deliveryDate.split('-');
                        const formattedDate = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : pendingOrder.deliveryDate;
                        orderDeliverySpan.innerText = `${formattedDate} às ${pendingOrder.deliveryTime}`;
                    }

                    const thankModal = document.getElementById('thank-you-modal');
                    if (thankModal) {
                        thankModal.classList.remove('hidden');
                        setTimeout(() => {
                            thankModal.classList.remove('opacity-0');
                        }, 10);
                    }

                    // Clear the cart
                    cart = {};
                    localStorage.setItem('cleanfoods_cart', JSON.stringify(cart));
                    localStorage.removeItem('cleanfoods_pending_order');

                    // Remove url params
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } else if (status === 'failure') {
                alert('Ocorreu um erro no pagamento ou ele foi recusado. Por favor, tente novamente.');
                window.history.replaceState({}, document.title, window.location.pathname);
            }

            // Trigger GSAP reveal animations immediately (no preloader)
            const heroTimeline = gsap.timeline();
            heroTimeline.fromTo("#hero .reveal-up",
                { y: 50, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }
            )
                .fromTo("#hero .reveal-right",
                    { x: 100, autoAlpha: 0, rotation: 5 },
                    { x: 0, autoAlpha: 1, rotation: 0, duration: 1, ease: "power3.out" },
                    "-=0.5"
                );

            // Render menu cards immediately
            filterCategory('Todos');

            // Load latest dishes from Supabase in background
            if (typeof loadDishes === 'function') {
                loadDishes().then(() => filterCategory('Todos')).catch(e => console.warn(e));
            }

            try {
                if (typeof loadCoupons === 'function') loadCoupons();
            } catch (err) {
                console.warn("Erro ao carregar cupons:", err);
            }

            // Update badges and render cart state on load
            updateCartBadges();
            renderCart();
            initCheckoutFormStatePersistence();

            // ScrollTrigger Animations for Menu and other sections
            const revealElements = document.querySelectorAll('.reveal-up:not(#hero .reveal-up), .reveal-right:not(#hero .reveal-right)');
            revealElements.forEach((elem) => {
                let startY = elem.classList.contains('reveal-up') ? 60 : 0;
                let startX = elem.classList.contains('reveal-right') ? 100 : 0;
                let startRot = elem.classList.contains('reveal-right') ? 5 : 0;

                gsap.fromTo(elem,
                    { y: startY, x: startX, rotation: startRot, autoAlpha: 0 },
                    {
                        y: 0, x: 0, rotation: 0,
                        autoAlpha: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 85%", // Trigger when top of element hits 85% of viewport
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Parallax effect on background huge text
            gsap.to("#bg-text-1", {
                x: 100,
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });
            gsap.to("#bg-text-2", {
                x: -100,
                scrollTrigger: {
                    trigger: "#hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

        // ===== SMOKE VIDEO SCROLL FADE =====
        (function () {
            const smokeVideo = document.getElementById('smoke-video');
            const heroSection = document.getElementById('hero');
            if (!smokeVideo || !heroSection) return;

            const BASE_OPACITY = 0.6; // matches CSS initial opacity

            function onScroll() {
                const heroRect = heroSection.getBoundingClientRect();
                const heroH = heroRect.height;
                const scrolled = -heroRect.top;

                let opacity;
                if (scrolled <= 0) {
                    opacity = BASE_OPACITY;
                } else if (scrolled >= heroH * 0.6) {
                    opacity = 0;
                } else {
                    opacity = BASE_OPACITY * (1 - (scrolled / (heroH * 0.6)));
                }
                smokeVideo.style.opacity = opacity;
            }

            window.addEventListener('scroll', onScroll, { passive: true });
        })();

        // ===== FLOATING CARDAPIO SCROLL REVEAL =====
        (function () {
            const floatBtn = document.getElementById('floating-cardapio-btn');
            const heroSection = document.getElementById('hero');
            if (!floatBtn || !heroSection) return;

            function checkFloatBtn() {
                const heroRect = heroSection.getBoundingClientRect();
                // Show button when hero section is mostly out of view
                if (heroRect.bottom < window.innerHeight / 2) {
                    floatBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-24', 'scale-75');
                    floatBtn.classList.add('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
                } else {
                    floatBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-24', 'scale-75');
                    floatBtn.classList.remove('opacity-100', 'pointer-events-auto', 'translate-y-0', 'scale-100');
                }
            }

            // Run once on load to check initial scroll position
            checkFloatBtn();

            window.addEventListener('scroll', checkFloatBtn, { passive: true });
        })();

        function selectCombo(goal) {
            localStorage.setItem('cleanfoods_combo_goal', goal);
            window.location.href = 'cardapio-completo.html?promo=active';
        }
    