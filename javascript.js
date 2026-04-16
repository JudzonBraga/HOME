        // ========== MENÚ HAMBURGUESA ==========
        const menuToggle = document.getElementById('menuToggle');
        const navLinksMobile = document.getElementById('navLinks');
        const menuOverlay = document.getElementById('menuOverlay');

        if (menuToggle && navLinksMobile && menuOverlay) {
            function toggleMenu() {
                menuToggle.classList.toggle('active');
                navLinksMobile.classList.toggle('active');
                menuOverlay.classList.toggle('active');
                document.body.style.overflow = navLinksMobile.classList.contains('active') ? 'hidden' : '';
            }
            menuToggle.addEventListener('click', toggleMenu);
            menuOverlay.addEventListener('click', toggleMenu);
            document.querySelectorAll('.nav-links .nav-a, .nav-links .whatsapp-btn').forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinksMobile.classList.contains('active')) toggleMenu();
                });
            });
        }
        
        (function () {
            document.documentElement.classList.add('no-scroll');
            document.body.classList.add('no-scroll');

            const introContainer = document.getElementById('introContainer');
            const introImg = document.getElementById('introImage');
            const mainContent = document.getElementById('mainContent');

            let canvasInitialized = false;

            function initMoleculesCanvas() {
                if (canvasInitialized) return;
                const canvas = document.getElementById('molecules-bg');
                if (!canvas) return;
                canvas.classList.remove('canvas-hidden');
                let ctx = canvas.getContext('2d');
                let width, height;
                let particles = [];
                let animationId = null;
                const PARTICLE_COUNT = 80;
                const CONNECTION_DISTANCE = 140;
                const PARTICLE_COLOR = '#00ccff';
                const PARTICLE_SIZE_MIN = 2;
                const PARTICLE_SIZE_MAX = 5;
                const PARTICLE_SPEED = 0.5;

                function resizeCanvas() {
                    width = window.innerWidth;
                    height = window.innerHeight;
                    canvas.width = width;
                    canvas.height = height;
                    initParticles();
                }

                function initParticles() {
                    particles = [];
                    for (let i = 0; i < PARTICLE_COUNT; i++) {
                        particles.push({
                            x: Math.random() * width,
                            y: Math.random() * height,
                            vx: (Math.random() - 0.5) * PARTICLE_SPEED,
                            vy: (Math.random() - 0.5) * PARTICLE_SPEED,
                            radius: Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN) + PARTICLE_SIZE_MIN
                        });
                    }
                }

                function drawMolecules() {
                    if (!ctx) return;
                    ctx.clearRect(0, 0, width, height);
                    for (let i = 0; i < particles.length; i++) {
                        for (let j = i + 1; j < particles.length; j++) {
                            const dx = particles[i].x - particles[j].x;
                            const dy = particles[i].y - particles[j].y;
                            const dist = Math.sqrt(dx * dx + dy * dy);
                            if (dist < CONNECTION_DISTANCE) {
                                const opacity = (1 - (dist / CONNECTION_DISTANCE)) * 0.4;
                                ctx.beginPath();
                                ctx.moveTo(particles[i].x, particles[i].y);
                                ctx.lineTo(particles[j].x, particles[j].y);
                                ctx.strokeStyle = `rgba(0, 170, 255, ${opacity})`;
                                ctx.lineWidth = 1.2;
                                ctx.stroke();
                            }
                        }
                    }
                    for (let p of particles) {
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                        ctx.fillStyle = PARTICLE_COLOR;
                        ctx.fill();
                        ctx.shadowBlur = 10;
                        ctx.shadowColor = PARTICLE_COLOR;
                    }
                    ctx.shadowBlur = 0;
                    for (let p of particles) {
                        p.x += p.vx;
                        p.y += p.vy;
                        if (p.x < 0) { p.x = 0; p.vx *= -1; }
                        if (p.x > width) { p.x = width; p.vx *= -1; }
                        if (p.y < 0) { p.y = 0; p.vy *= -1; }
                        if (p.y > height) { p.y = height; p.vy *= -1; }
                    }
                    animationId = requestAnimationFrame(drawMolecules);
                }
                if (animationId) cancelAnimationFrame(animationId);
                window.addEventListener('resize', resizeCanvas);
                resizeCanvas();
                drawMolecules();
                canvasInitialized = true;
            }

            function startChromaticAnimation() {
                introImg.style.transition = 'filter 1.5s ease-out, transform 1.5s ease-out, opacity 1.5s ease-out';
                introImg.style.filter = 'hue-rotate(0deg) blur(0px) brightness(1) saturate(1)';
                introImg.style.opacity = '1';
                introImg.style.transform = 'scale(1)';
                setTimeout(() => {
                    introImg.style.transition = 'opacity 1s ease-out';
                    introImg.style.opacity = '0';
                    setTimeout(() => {
                        introContainer.style.display = 'none';
                        mainContent.classList.add('visible');
                        initMoleculesCanvas();
                        document.documentElement.classList.remove('no-scroll');
                        document.body.classList.remove('no-scroll');
                        document.documentElement.classList.add('scroll-vertical');
                        document.body.classList.add('scroll-vertical');
                        initScrollAnimations();
                    }, 1000);
                }, 1500);
            }

            window.addEventListener('DOMContentLoaded', () => {
                introImg.style.filter = 'hue-rotate(180deg) blur(10px) brightness(0.4) saturate(0.3)';
                introImg.style.opacity = '0.7';
                introImg.style.transform = 'scale(0.92)';
                setTimeout(startChromaticAnimation, 100);
            });

            function initHeaderScrollEffect() {
                const header = document.querySelector('.header');
                if (!header) return;
                window.addEventListener('scroll', () => {
                    if (window.scrollY > 50) header.classList.add('scrolled');
                    else header.classList.remove('scrolled');
                });
            }
            initHeaderScrollEffect();

            function initScrollAnimations() {
                const animatedElements = document.querySelectorAll('.animate-on-scroll');
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animated');
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.2, rootMargin: "0px 0px -30px 0px" });
                animatedElements.forEach(element => observer.observe(element));
            }

            // Carrusel portafolio
            const productsData = [
                { img: "https://www.sportlife.es/uploads/s1/12/38/03/84/los-6-ejercicios-funcionales-para-mejorar-en-tu-deporte.jpeg", name: "Elite Fitness", category: "Deporte", url: "https://judzonbraga.github.io/Web-personal-trainer/" },
                { img: "https://png.pngtree.com/thumb_back/fh260/background/20250415/pngtree-businessmen-shaking-hands-in-office-image_17197770.jpg", name: "Work Online", category: "Negocios", url: "https://judzonbraga.github.io/Empleos-online-limaperu/" },
                { img: "https://images.pexels.com/photos/8574662/pexels-photo-8574662.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", name: "Luxury Homes", category: "Inmobiliario", url: "https://judzonbraga.github.io/LUXURY-HOMES/" },
                { img: "https://lh3.googleusercontent.com/pw/AP1GczOsTgdgpX_IuXQ7aLO3tO9ds3IHicx-u9bqTLPFpR3YW8SerxGOpX_ls-Lt102KwV7Nv1_UJlZ-2Jf8vnPyH8bsiFujvbciKDntv1EU7Zy7mr6LUa9P-hM8xw1Q_B9okNtkx0w1KnXVRhTQ0S2rFdAU=w908-h908-s-no-gm?authuser=0", name: "Dulce Fantasia Bakery", category: "Pastelería Artística", url: "https://dulcefantasiaoficial.github.io/home/" },
                { img: "https://i.pinimg.com/236x/98/b6/60/98b660b8bc7f44c0aa4b1788610d0b86.jpg", name: "DentySalud", category: "Odontología", url: "https://judzonbraga.github.io/ODONTOLOGIA/" },
                { img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format", name: "Educación", category: "Educación", url: "https://wa.me/51999999999?text=Hola,%20quiero%20más%20información%20sobre%20páginas%20web%20para%20EDUCACIÓN" },
                { img: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&auto=format", name: "Tecnología", category: "Tecnología", url: "https://wa.me/51999999999?text=Hola,%20quiero%20más%20información%20sobre%20páginas%20web%20para%20TECNOLOGÍA" },
                { img: "https://images.pexels.com/photos/8700719/pexels-photo-8700719.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", name: "Vali Café", category: "Cafetería", url: "https://judzonbraga.github.io/VALI-CAFE/" }
            ];
            const track = document.getElementById('carouselTrack');
            function createProductCard(product) {
                const cardDiv = document.createElement('div');
                cardDiv.className = 'product-card';
                cardDiv.onclick = () => window.open(product.url, '_blank');
                cardDiv.innerHTML = `<div class="card__img" style="background-image: url('${product.img}')"></div><div class="card__img--hover" style="background-image: url('${product.img}')"></div><div class="card__info"><span class="card__category">${product.category}</span><h3 class="card__title">${product.name}</h3></div>`;
                return cardDiv;
            }
            function buildInfiniteCarousel() {
                track.innerHTML = '';
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < 3; i++) productsData.forEach(product => fragment.appendChild(createProductCard(product)));
                track.appendChild(fragment);
            }
            buildInfiniteCarousel();

            // ========== SLIDER SERVICIOS CORREGIDO ==========
            (function () {
                const sliderTrack = document.getElementById('sliderTrack');
                const sliderContainer = document.getElementById('sliderContainer');
                const prevBtn = document.getElementById('stepPrevBtn');
                const nextBtn = document.getElementById('stepNextBtn');
                const currentStepDisplay = document.getElementById('currentStepDisplay');
                const totalStepsDisplay = document.getElementById('totalStepsDisplay');

                const serviciosData = [
                    { icon: "💻", title: "Instalación de Software", description: "Instalación y configuración de software profesional: Adobe, Office, Antivirus, y más.", features: ["Suite Adobe", "Microsoft Office 365", "Antivirus y seguridad"], btnAction: "https://wa.me/51999999999?text=Hola,%20quiero%20información%20sobre%20instalación%20de%20software" },
                    { icon: "🌐", title: "Creación de Páginas Web", description: "Diseño y desarrollo de sitios web profesionales, tiendas online y landing pages.", features: ["Diseño responsive", "Tiendas online (E-commerce)", "Posicionamiento SEO"], btnAction: "https://wa.me/51999999999?text=Hola,%20quiero%20información%20sobre%20creación%20de%20páginas%20web" },
                    { icon: "📹", title: "Cámaras de Seguridad", description: "Instalación y configuración de sistemas de videovigilancia para hogar y negocio.", features: ["Cámaras IP/inalámbricas", "Visión nocturna con sensores de movimiento", "Monitoreo 24/7 desde tu celular"], btnAction: "https://wa.me/51999999999?text=Hola,%20quiero%20información%20sobre%20cámaras%20de%20seguridad" },
                    { icon: "🔧", title: "Reparación y Mantenimiento", description: "Diagnóstico, reparación y mantenimiento de PC y laptops.", features: ["Diagnóstico gratuito", "Repotenciación y optimización", "Mantenimiento preventivo y correctivo"], btnAction: "https://wa.me/51999999999?text=Hola,%20quiero%20información%20sobre%20reparación%20de%20PC" },
                    { icon: "🖥️", title: "Venta de Equipos TI", description: "Equipos de cómputo de última generación, laptops, tablets y accesorios al mejor precio.", features: ["PC y laptops nuevas", "Accesorios y componentes TI", "Tendencias tecnológicas"], btnAction: "https://wa.me/51999999999?text=Hola,%20quiero%20información%20sobre%20venta%20de%20equipos%20TI" },
                    { icon: "🏠", title: "Tecnología para el Hogar", description: "Domótica y automatización del hogar para mayor confort, seguridad y eficiencia.", features: ["Control de iluminación", "Asistentes de voz", "Cerraduras tecnológicas"], btnAction: "https://wa.me/51999999999?text=Hola,%20quiero%20información%20sobre%20domótica" }
                ];

                let currentRealIndex = 0; // Índice real del servicio (0-5)
                let isTransitioning = false;
                let resizeTimeout;
                let skipCenterUpdate = false;

                function createGhostCard() {
                    const card = document.createElement('div');
                    card.className = 'servicio-card-horizontal ghost-card';
                    card.innerHTML = `<div class="servicio-icon" style="opacity:0;">⬚</div><h3 style="opacity:0;">Placeholder</h3><p style="opacity:0;">.</p><ul class="servicio-features" style="opacity:0;"><li style="opacity:0;">.</li></ul><span class="btn-servicio" style="opacity:0;">---</span>`;
                    return card;
                }

                function createServiceCard(service, index) {
                    const card = document.createElement('div');
                    card.className = 'servicio-card-horizontal real-card';
                    card.setAttribute('data-card', index + 1);
                    card.innerHTML = `<div class="servicio-icon">${service.icon}</div><h3>${service.title}</h3><p>${service.description}</p><ul class="servicio-features">${service.features.map(f => `<li>${f}</li>`).join('')}</ul><span class="btn-servicio" onclick="window.open('${service.btnAction}', '_blank')">Cotizar servicio →</span>`;
                    return card;
                }

                function getGhostCount() { return 1; }
                function getGap() { return window.innerWidth <= 768 ? 16 : 32; }

                function getTotalWidth() {
                    const cards = Array.from(sliderTrack.children);
                    if (cards.length === 0) return 0;
                    const gap = getGap();
                    return cards.reduce((sum, card) => sum + card.offsetWidth + gap, 0) - gap;
                }

                function calculateOffsetForIndex(targetIndex) {
                    const cards = Array.from(sliderTrack.children);
                    if (cards.length === 0) return 0;
                    const containerWidth = sliderContainer.clientWidth;
                    const gap = getGap();
                    const targetCard = cards[targetIndex];
                    if (!targetCard) return 0;
                    let accumulatedWidth = 0;
                    for (let i = 0; i < targetIndex; i++) {
                        accumulatedWidth += cards[i].offsetWidth + gap;
                    }
                    let offset = accumulatedWidth - (containerWidth / 2) + (targetCard.offsetWidth / 2);
                    const totalWidth = getTotalWidth();
                    const maxOffset = Math.max(0, totalWidth - containerWidth);
                    return Math.min(Math.max(0, offset), maxOffset);
                }

                function rebuildSlider() {
                    if (isTransitioning) return;
                    const ghostCount = getGhostCount();
                    const savedRealIndex = currentRealIndex;
                    sliderTrack.innerHTML = '';
                    for (let i = 0; i < ghostCount; i++) sliderTrack.appendChild(createGhostCard());
                    serviciosData.forEach((service, idx) => sliderTrack.appendChild(createServiceCard(service, idx)));
                    for (let i = 0; i < ghostCount; i++) sliderTrack.appendChild(createGhostCard());
                    sliderTrack.style.gap = `${getGap()}px`;
                    
                    const targetGhostIndex = ghostCount + savedRealIndex;
                    const offset = calculateOffsetForIndex(targetGhostIndex);
                    sliderTrack.style.transition = 'none';
                    sliderTrack.style.transform = `translateX(-${offset}px)`;
                    sliderTrack.offsetHeight;
                    sliderTrack.style.transition = '';
                    
                    updateCardStylesForIndex(targetGhostIndex);
                    updateButtonsState(savedRealIndex);
                    updateStepIndicator(savedRealIndex);
                }

                function updateCardStylesForIndex(centerIndex) {
                    const cards = Array.from(sliderTrack.children);
                    if (cards.length === 0) return;
                    cards.forEach(card => card.classList.remove('centered', 'side-card'));
                    cards.forEach((card, idx) => {
                        if (idx === centerIndex && !card.classList.contains('ghost-card')) {
                            card.classList.add('centered');
                        } else if (!card.classList.contains('ghost-card')) {
                            card.classList.add('side-card');
                        }
                    });
                }

                function moveToService(serviceId) {
                    if (isTransitioning) return;
                    if (serviceId < 0 || serviceId >= serviciosData.length) return;
                    if (serviceId === currentRealIndex) return;
                    
                    isTransitioning = true;
                    currentRealIndex = serviceId;
                    const targetIndex = getGhostCount() + currentRealIndex;
                    const offset = calculateOffsetForIndex(targetIndex);
                    
                    sliderTrack.style.transform = `translateX(-${offset}px)`;
                    updateCardStylesForIndex(targetIndex);
                    updateButtonsState(currentRealIndex);
                    updateStepIndicator(currentRealIndex);
                    
                    setTimeout(() => { isTransitioning = false; }, 500);
                }

                function moveLeft() { if (currentRealIndex > 0) moveToService(currentRealIndex - 1); }
                function moveRight() { if (currentRealIndex < serviciosData.length - 1) moveToService(currentRealIndex + 1); }
                
                function updateButtonsState(realIndex) {
                    if (prevBtn) { prevBtn.disabled = realIndex <= 0; prevBtn.style.opacity = realIndex <= 0 ? '0.5' : '1'; }
                    if (nextBtn) { nextBtn.disabled = realIndex >= serviciosData.length - 1; nextBtn.style.opacity = realIndex >= serviciosData.length - 1 ? '0.5' : '1'; }
                }
                
                function updateStepIndicator(realIndex) {
                    if (currentStepDisplay) currentStepDisplay.textContent = realIndex + 1;
                    if (totalStepsDisplay) totalStepsDisplay.textContent = serviciosData.length;
                }
                
                function handleResize() {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => rebuildSlider(), 150);
                }
                
                function initSlider() {
                    rebuildSlider();
                    if (prevBtn) prevBtn.addEventListener('click', moveLeft);
                    if (nextBtn) nextBtn.addEventListener('click', moveRight);
                    window.addEventListener('resize', handleResize);
                }
                
                initSlider();
            })();

            // Rotador de palabras
            (function () {
                const words = [{ text: "EMPRENDEDORES", class: "emprendedores" }, { text: "TU NEGOCIO", class: "negocio" }, { text: "TU EMPRESA", class: "empresa" }];
                let currentIndex = 0;
                const rotatingWordElement = document.getElementById('rotatingWord');
                function changeWord() {
                    currentIndex = (currentIndex + 1) % words.length;
                    const newWord = words[currentIndex];
                    rotatingWordElement.style.transform = 'scaleY(0)';
                    rotatingWordElement.style.opacity = '0';
                    setTimeout(() => {
                        rotatingWordElement.textContent = newWord.text;
                        rotatingWordElement.className = `word-display ${newWord.class}`;
                        rotatingWordElement.style.transform = 'scaleY(1)';
                        rotatingWordElement.style.opacity = '1';
                    }, 150);
                }
                setInterval(changeWord, 2000);
            })();

            // Testimonios
            const testimoniosData = [
                { nombre: "María González", cargo: "Fundadora - EcoModa", texto: "Excelente servicio, mi página web superó todas mis expectativas. El equipo de IUXON entendió perfectamente lo que necesitaba.", rating: 5, inicial: "M" },
                { nombre: "Carlos Rodríguez", cargo: "CEO - TechSolutions", texto: "Profesionales y comprometidos. La página que crearon para mi empresa ha aumentado nuestras ventas en un 40%.", rating: 5, inicial: "C" },
                { nombre: "Laura Martínez", cargo: "Emprendedora Digital", texto: "Increíble atención al cliente y diseño impecable. 100% recomendados para cualquier proyecto digital.", rating: 5, inicial: "L" },
                { nombre: "Javier Perú", cargo: "Dueño - GymFit", texto: "Mi negocio ahora tiene presencia online gracias a ellos. El proceso fue sencillo y el resultado espectacular.", rating: 5, inicial: "J" },
                { nombre: "Ana Lucía", cargo: "Marketing Digital", texto: "La mejor inversión que hice para mi marca. El equipo siempre estuvo disponible para resolver mis dudas.", rating: 5, inicial: "A" },
                { nombre: "Roberto Sánchez", cargo: "Director - Inmobiliaria Real", texto: "Superaron mis expectativas. La página web es moderna, rápida y fácil de administrar. Muy recomendados.", rating: 5, inicial: "R" }
            ];
            const testimoniosGrid = document.getElementById('testimoniosGrid');
            if (testimoniosGrid) {
                testimoniosData.forEach(t => {
                    const card = document.createElement('div');
                    card.className = 'testimonio-card';
                    card.innerHTML = `<div class="testimonio-icon"><i class="fas fa-quote-right"></i></div><div class="testimonio-texto">"${t.texto}"</div><div class="testimonio-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5 - t.rating)}</div><div class="testimonio-autor"><div class="testimonio-avatar">${t.inicial}</div><div class="testimonio-info"><h4>${t.nombre}</h4><p>${t.cargo}</p></div></div>`;
                    testimoniosGrid.appendChild(card);
                });
            }

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                });
            });
        })();
    
