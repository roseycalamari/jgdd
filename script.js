(function () {
    'use strict';

    document.documentElement.classList.add('js');

    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
    const IMG = 'assets/images/';

    /* ---------------- Data ---------------- */

    const wa = (date, list) => list.map((id) => `Imagem WhatsApp ${date} às ${id}.jpg`);

    const PROJECTS = {
        'meeting-room': {
            images: ['meetingroom.jpg', 'meetingroom before.jpg', 'meeting room/IMG_9897.jpg', 'meeting room/IMG_9901.jpg']
        },
        'office': {
            images: wa('2025-08-15', [
                '11.28.30_6a131756', '11.28.30_b16fe8d4', '11.28.30_460ccea2', '11.28.30_9a538675',
                '11.28.30_9465d982', '11.28.30_3243caaa', '11.28.30_508bf942', '11.28.30_673571c1',
                '11.28.30_d475409e', '11.28.30_567460d9', '11.28.29_491fcc8d', '11.28.29_351f887a'
            ]).map((f) => 'office/' + f)
        },
        'holiday-home': {
            images: ['holidayHouse/after_kitchen.jpg'].concat(wa('2025-08-19', [
                '09.23.41_d8e763b0', '09.13.47_a9cad054', '09.13.48_1697f7a8'
            ]).map((f) => 'holidayHouse/' + f), ['holidayHouse/ç.jpg'], wa('2025-08-19', [
                '09.13.48_c6f6271f', '09.13.48_8f129d16', '09.13.48_606ce62f', '09.13.48_fb3bff19',
                '09.13.48_be2ee4a1', '09.13.48_defeb9f5', '09.13.48_ab4b78c2', '09.13.47_4ed80cad',
                '09.13.48_919a0bf9', '09.13.47_8b6166e8', '09.13.48_e5b83a0f', '09.13.48_7c10f78f'
            ]).map((f) => 'holidayHouse/' + f), ['holidayHouse/+.jpg'])
        },
        'holiday-home-2': {
            images: ['IMG_0144.jpg', 'IMG_0140.jpg', 'IMG_0139.jpg', 'IMG_0134.jpg', 'after_livbingroom.jpg',
                'IMG_0127.jpg', 'IMG_0126.jpg', 'IMG_0117.jpg', 'IMG_0110.jpg'].map((f) => 'holidayHome2/' + f)
        },
        'corcovada-home': {
            airbnb: 'https://www.airbnb.nl/rooms/44654231?adults=1&source_impression_id=p3_1608566762_DiNNmnbWWwqCtU1y&guests=1',
            images: [
                'corcovada_after.jpeg',
                '941d823c-7f7e-4ced-83f3-b172e7e4353f.avif', 'b82d2fa1-d785-454c-b558-9dd14f083d28.avif',
                'e3c0d148-32cd-47b0-be63-e3f6fd503ceb.avif', 'e6367cc9-8b34-4bc0-8b6a-4d7bbd5f6eae.avif',
                '25084ef4-319e-4335-9a03-3b07f6e31a9e.avif', 'ffaa7793-8a8d-4372-9c9c-e699c000379c.avif',
                '6c9c911f-704f-43c6-8425-ee349f4fa583.avif', '8432b8d6-0e0d-48ea-baf8-2ff9e637c388.jpeg',
                '01d1c643-f38c-4ae9-a1e9-e9809d558598.avif', '7a60c04f-5958-4222-a1bd-bd3098e869c5.avif',
                '3da98542-56eb-4b78-82d5-19db08dd3c97.avif', 'aea8eea1-d9b2-414e-bbf1-27e09f1ff2a5.avif'
            ].map((f) => 'corcovada_home/' + f)
        },
        'torremolinos-home': {
            images: ['spain/after2.jpg'].concat(wa('2025-07-24', [
                '07.30.34_2a49d176', '07.30.34_ae397f12', '07.30.33_e921d2ee', '07.30.33_fa0a71f7',
                '07.30.33_dc5f1a37', '07.30.33_8f828c5d'
            ]).map((f) => 'spain/' + f), ['spain/after.jpg'], wa('2025-07-24', ['07.30.33_25a2a58c']).map((f) => 'spain/' + f))
        },
        'borboleta-turquesa': {
            airbnb: 'https://airbnb.com/h/borboletaturquesa',
            images: [
                '2341234.jpeg', 'e1a49c74-fd56-4a85-a445-b68005948893.avif', '8ac1a5bf-c13c-4541-88b1-a3fddd763626.avif',
                'b6ecffe4-f147-4ec2-b935-8166db3988b6.jpeg', '4cae95bf-0238-43ba-ae3e-fc9f722990d8.avif',
                'f846ed95-f0ec-4eab-9acd-9568aef468f3.avif', 'ec89894e-c865-456b-b49c-c0824ebc7cf9.avif',
                '549b8cf5-4867-44bd-af17-451868d00f42.avif', 'af566016-8255-4bc5-b5ed-d823f3585c2d.webp',
                '6fd32a74-8db6-4157-b59b-3367c3d444d9.avif', '92654966-0dcf-444f-91dd-e72407e0dcb0.avif',
                'eb4229f7-5626-4d91-b390-2754ad74220a.jpeg', '3994f3c4-9948-42f8-aa53-09cb72bc90b0.avif',
                '8f19b503-15cc-440c-802a-20db7788dcfb.avif', 'after2.jpeg', 'after.jpeg'
            ].map((f) => 'borboleta/' + f)
        },
        'youth-lounge': {
            images: wa('2025-08-16', [
                '16.22.09_51d667f6', '16.22.09_239fbe56', '16.22.09_acec8ef7', '16.22.09_b9873fc3',
                '16.24.07_dcb07e18', '16.29.08_0ae86d67', '16.29.08_15d26a71'
            ]).map((f) => 'correction_school/' + f)
        }
    };

    const VIDEOS = {
        borboleta: {
            src: IMG + 'video/Jeanette Gasseling - Casa Corcovada.mp4',
            title: 'Borboleta Turquesa',
            description: 'Borboleta Turquesa Project'
        },
        torremolinos: {
            src: IMG + 'video/torremolinos video.mp4',
            title: 'Torremolinos Home',
            description: 'Torremolinos Home Project'
        }
    };

    /* ---------------- i18n ---------------- */

    const DICT = window.TRANSLATIONS || {};
    const LANGS = ['nl', 'en', 'de', 'pt'];
    let lang = localStorage.getItem('language');
    if (!LANGS.includes(lang)) lang = 'nl';

    const lookup = (obj, key) => key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
    const t = (key) => {
        const value = lookup(DICT[lang], key);
        return value !== undefined ? value : lookup(DICT.nl, key);
    };

    function translatePage(next) {
        lang = LANGS.includes(next) ? next : 'nl';
        localStorage.setItem('language', lang);
        document.documentElement.lang = lang;

        $$('[data-translate]').forEach((el) => {
            const value = t(el.dataset.translate);
            if (typeof value !== 'string') return;
            if (el.hasAttribute('data-translate-html')) el.innerHTML = value;
            else el.textContent = value;
        });

        $$('[data-translate-aria]').forEach((el) => {
            const value = t(el.dataset.translateAria);
            if (typeof value === 'string') el.setAttribute('aria-label', value);
        });

        $('.lang__current').textContent = lang.toUpperCase();
        $$('.lang__menu [data-lang]').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));

        $$('.project').forEach(updateFlipLabel);
        renderFlower();
        if (modal.project) renderProjectText();
    }

    /* ---------------- Layers (modals, drawer, lightbox) ---------------- */

    const openLayers = [];

    function openLayer(el, onClose) {
        el.classList.add('is-open');
        el.setAttribute('aria-hidden', 'false');
        openLayers.push({ el, onClose });
        document.documentElement.classList.add('no-scroll');
    }

    function closeLayer(el) {
        const i = openLayers.findIndex((l) => l.el === el);
        if (i === -1) return;
        const [layer] = openLayers.splice(i, 1);
        el.classList.remove('is-open');
        el.setAttribute('aria-hidden', 'true');
        if (layer.onClose) layer.onClose();
        if (!openLayers.length) document.documentElement.classList.remove('no-scroll');
    }

    function onSwipe(el, onLeft, onRight) {
        let x0 = null;
        let y0 = null;
        el.addEventListener('touchstart', (e) => {
            x0 = e.touches[0].clientX;
            y0 = e.touches[0].clientY;
        }, { passive: true });
        el.addEventListener('touchend', (e) => {
            if (x0 === null) return;
            const dx = e.changedTouches[0].clientX - x0;
            const dy = e.changedTouches[0].clientY - y0;
            if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? onLeft : onRight)();
            x0 = null;
        });
    }

    /* ---------------- Drawer menu ---------------- */

    const drawer = $('#drawer');
    $$('[data-menu-open]').forEach((b) => b.addEventListener('click', () => openLayer(drawer)));
    $$('[data-menu-close], .drawer__links a').forEach((el) => el.addEventListener('click', () => closeLayer(drawer)));

    /* ---------------- Language ---------------- */

    const langBox = $('#lang');
    const langToggle = $('.lang__toggle');

    function setLangOpen(open) {
        langBox.classList.toggle('is-open', open);
        langToggle.setAttribute('aria-expanded', String(open));
    }

    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        setLangOpen(!langBox.classList.contains('is-open'));
    });

    $$('.lang__menu [data-lang]').forEach((b) => b.addEventListener('click', () => {
        translatePage(b.dataset.lang);
        setLangOpen(false);
    }));

    document.addEventListener('click', (e) => {
        if (!langBox.contains(e.target)) setLangOpen(false);
    });

    /* ---------------- Before / after flip ---------------- */

    function updateFlipLabel(card) {
        const btn = $('.project__flip', card);
        if (!btn) return;
        const key = card.classList.contains('is-before') ? 'ui.flipToAfter' : 'ui.flipToBefore';
        btn.setAttribute('aria-label', t(key));
    }

    $$('.project').forEach((card) => {
        const flip = () => {
            card.classList.toggle('is-before');
            updateFlipLabel(card);
        };
        $('.project__flip', card).addEventListener('click', (e) => {
            e.stopPropagation();
            flip();
        });
        $('.project__media', card).addEventListener('click', flip);
        $('.project__open', card).addEventListener('click', () => openProject(card.dataset.project));
    });

    /* ---------------- Project modal ---------------- */

    const pm = {
        root: $('#projectModal'),
        img: $('#pmImage'),
        count: $('#pmCount'),
        dots: $('#pmDots'),
        title: $('#pmTitle'),
        sub: $('#pmSub'),
        desc: $('#pmDesc'),
        airbnb: $('#pmAirbnb')
    };
    const modal = { project: null, index: 0 };

    function renderProjectText() {
        const data = t('projectData.' + modal.project) || {};
        pm.title.textContent = data.title || t('modal.defaultTitle');
        pm.sub.textContent = data.subtitle || '';
        pm.desc.textContent = data.description || '';
        pm.img.alt = pm.title.textContent;
    }

    function renderProjectImage() {
        const images = PROJECTS[modal.project].images;
        const n = images.length;
        pm.img.src = IMG + images[modal.index];
        pm.count.textContent = `${modal.index + 1} / ${n}`;
        $$('button', pm.dots).forEach((d, i) => d.classList.toggle('is-active', i === modal.index));
        [IMG + images[(modal.index + 1) % n]].forEach((src) => { new Image().src = src; });
    }

    function stepProject(delta) {
        const n = PROJECTS[modal.project].images.length;
        modal.index = (modal.index + delta + n) % n;
        renderProjectImage();
    }

    function openProject(id) {
        const project = PROJECTS[id];
        if (!project) return;
        modal.project = id;
        modal.index = 0;

        pm.dots.innerHTML = '';
        project.images.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.setAttribute('aria-label', String(i + 1));
            dot.addEventListener('click', () => {
                modal.index = i;
                renderProjectImage();
            });
            pm.dots.appendChild(dot);
        });

        const single = project.images.length < 2;
        $('#pmPrev').hidden = single;
        $('#pmNext').hidden = single;

        pm.airbnb.hidden = !project.airbnb;
        if (project.airbnb) pm.airbnb.href = project.airbnb;

        renderProjectText();
        renderProjectImage();
        openLayer(pm.root, () => { modal.project = null; });
        $('.modal__panel', pm.root).scrollTop = 0;
    }

    $('#pmPrev').addEventListener('click', () => stepProject(-1));
    $('#pmNext').addEventListener('click', () => stepProject(1));
    onSwipe($('.pm-gallery'), () => stepProject(1), () => stepProject(-1));
    pm.img.addEventListener('click', () => openLightbox(PROJECTS[modal.project].images, modal.index));
    $('#pmGallery').addEventListener('click', () => openLightbox(PROJECTS[modal.project].images, modal.index));

    /* ---------------- Lightbox ---------------- */

    const lb = { root: $('#lightbox'), img: $('#lbImage'), count: $('#lbCount'), images: [], index: 0 };

    function renderLightbox() {
        lb.img.src = IMG + lb.images[lb.index];
        lb.count.textContent = `${lb.index + 1} / ${lb.images.length}`;
    }

    function stepLightbox(delta) {
        const n = lb.images.length;
        lb.index = (lb.index + delta + n) % n;
        renderLightbox();
    }

    function openLightbox(images, index) {
        lb.images = images;
        lb.index = index;
        renderLightbox();
        openLayer(lb.root, () => {
            if (modal.project) {
                modal.index = lb.index;
                renderProjectImage();
            }
        });
    }

    $('#lbPrev').addEventListener('click', () => stepLightbox(-1));
    $('#lbNext').addEventListener('click', () => stepLightbox(1));
    lb.root.addEventListener('click', (e) => {
        if (e.target === lb.root) closeLayer(lb.root);
    });
    onSwipe(lb.root, () => stepLightbox(1), () => stepLightbox(-1));

    /* ---------------- Video modal ---------------- */

    const vm = { root: $('#videoModal'), player: $('#videoPlayer') };

    $$('[data-video]').forEach((card) => card.addEventListener('click', () => {
        const video = VIDEOS[card.dataset.video];
        if (!video) return;
        vm.player.src = video.src;
        $('#videoTitle').textContent = video.title;
        $('#videoDesc').textContent = video.description;
        openLayer(vm.root, () => {
            vm.player.pause();
            vm.player.removeAttribute('src');
            vm.player.load();
        });
        vm.player.play().catch(() => {});
    }));

    $$('[data-close]').forEach((el) => el.addEventListener('click', () => {
        closeLayer(el.closest('.modal, .lightbox'));
    }));

    /* ---------------- Flower gallery ---------------- */

    const flower = {
        main: $('#flowerMain'),
        title: $('#flowerTitle'),
        desc: $('#flowerDesc'),
        thumbs: $$('#flowerThumbs button'),
        index: 0
    };
    $('#flowerTotal').textContent = flower.thumbs.length;

    function renderFlower() {
        const info = t('flowerGallery.images.' + flower.index) || {};
        flower.title.textContent = info.title || t('flowerGallery.defaultTitle');
        flower.desc.textContent = info.description || t('flowerGallery.defaultDescription');
        flower.main.alt = flower.title.textContent;
        $('#flowerIndex').textContent = flower.index + 1;
        flower.thumbs.forEach((b, i) => b.classList.toggle('is-active', i === flower.index));
    }

    function showFlower(i) {
        const n = flower.thumbs.length;
        flower.index = (i + n) % n;
        const src = $('img', flower.thumbs[flower.index]).getAttribute('src');
        flower.main.classList.add('is-loading');
        flower.main.onload = () => flower.main.classList.remove('is-loading');
        flower.main.src = src;
        renderFlower();
        const thumb = flower.thumbs[flower.index];
        const strip = thumb.parentElement;
        strip.scrollTo({ left: thumb.offsetLeft - (strip.clientWidth - thumb.clientWidth) / 2, behavior: 'smooth' });
    }

    flower.thumbs.forEach((b, i) => b.addEventListener('click', () => showFlower(i)));
    $('#flowerPrev').addEventListener('click', () => showFlower(flower.index - 1));
    $('#flowerNext').addEventListener('click', () => showFlower(flower.index + 1));
    onSwipe(flower.main, () => showFlower(flower.index + 1), () => showFlower(flower.index - 1));
    flower.main.style.cursor = 'zoom-in';
    flower.main.addEventListener('click', () => {
        const images = flower.thumbs.map((b) => $('img', b).getAttribute('src').replace(IMG, ''));
        openLightbox(images, flower.index);
    });

    /* ---------------- Keyboard ---------------- */

    document.addEventListener('keydown', (e) => {
        const top = openLayers[openLayers.length - 1];
        if (e.key === 'Escape') {
            if (top) closeLayer(top.el);
            else setLangOpen(false);
            return;
        }
        if (!top || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return;
        const delta = e.key === 'ArrowLeft' ? -1 : 1;
        if (top.el === lb.root) stepLightbox(delta);
        else if (top.el === pm.root) stepProject(delta);
    });

    /* ---------------- Header, back to top ---------------- */

    const toTop = $('#toTop');
    let lastY = window.scrollY;
    let ticking = false;

    function onScroll() {
        const y = window.scrollY;
        const showHeader = y > 400 && y < lastY;
        document.body.classList.toggle('header-shown', showHeader);
        toTop.classList.toggle('is-visible', y > 600);
        lastY = y;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    /* ---------------- Reveal on scroll ---------------- */

    const reveals = $$('.reveal');
    if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                io.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        reveals.forEach((el) => io.observe(el));
    } else {
        reveals.forEach((el) => el.classList.add('is-visible'));
    }

    /* ---------------- Contact form ---------------- */

    const form = $('#contactForm');
    const submitBtn = $('button[type="submit"]', form);
    const submitLabel = $('span', submitBtn);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitLabel.textContent = t('ui.sending');
        let ok = false;
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });
            ok = res.ok;
        } catch (err) {
            ok = false;
        }
        submitLabel.textContent = t(ok ? 'ui.sent' : 'ui.error');
        if (ok) form.reset();
        setTimeout(() => {
            submitBtn.disabled = false;
            submitLabel.textContent = t('contact.form.submit');
        }, 3000);
    });

    /* ---------------- Init ---------------- */

    $('#year').textContent = new Date().getFullYear();
    translatePage(lang);
})();
