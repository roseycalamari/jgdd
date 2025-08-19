/**
 * Jeanette Gasseling Deco & Design - Simple Working Interface
 */

// Translation function
function translatePage(language) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[language]) {
        console.warn(`Translations for language '${language}' not found`);
        return;
    }
    
    const translations = window.TRANSLATIONS[language];
    
    // Get all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        const keys = key.split('.');
        
        // Navigate through the translation object
        let translation = translations;
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Translation key '${key}' not found for language '${language}'`);
                return;
            }
        }
        
        // Apply translation
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else if (element.hasAttribute('data-translate-html')) {
            element.innerHTML = translation;
        } else {
            element.textContent = translation;
        }
    });
    
    // Update document language
    document.documentElement.lang = language;
    
    // Update current language display
    const currentLang = document.querySelector('.current-lang');
    if (currentLang) {
        currentLang.textContent = language.toUpperCase();
    }
    
    console.log(`Page translated to ${language}`);
}

// Analytics tracking functions
function trackEvent(eventName, eventCategory, eventAction, eventLabel = null) {
    if (typeof gtag !== 'undefined') {
        try {
            gtag('event', eventName, {
                event_category: eventCategory,
                event_action: eventAction,
                event_label: eventLabel
            });
            console.log(`Analytics: ${eventCategory} - ${eventAction}${eventLabel ? ' - ' + eventLabel : ''}`);
        } catch (error) {
            console.warn('Analytics tracking error:', error);
        }
    } else {
        console.log(`Analytics (disabled): ${eventCategory} - ${eventAction}${eventLabel ? ' - ' + eventLabel : ''}`);
    }
}

function trackPageView(pageName) {
    if (typeof gtag !== 'undefined') {
        try {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: pageName,
                page_location: window.location.href
            });
            console.log(`Analytics: Page view - ${pageName}`);
        } catch (error) {
            console.warn('Analytics page view error:', error);
        }
    } else {
        console.log(`Analytics (disabled): Page view - ${pageName}`);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing Jeanette Gasseling interface...');
    
    // Track initial page load
    trackPageView('Home Page');
    
    // Initialize translations with default language (Dutch)
    translatePage('nl');
    
    // Initialize flip cards
    initializeFlipCards();
    
    // Initialize project buttons
    initializeProjectButtons();
    
    // Initialize project modal functionality
    initializeProjectModal();
    
    // Initialize other basic functionality
    initializeBasicFeatures();
    
    // Initialize analytics tracking
    initializeAnalyticsTracking();
    
    // Initialize image error handling
    initializeImageErrorHandling();
    
    // Initialize flower gallery
    initializeFlowerGallery();
    
    console.log('Interface initialized successfully');
    
    // Mobile debugging - add a test button to check if modal works
    if ('ontouchstart' in window) {
        console.log('Mobile device detected, adding debug info');
        // Test if modal can be opened manually
        setTimeout(() => {
            if (window.openProjectModal) {
                console.log('openProjectModal function is available');
                console.log('Modal element exists:', document.getElementById('projectModal'));
            } else {
                console.log('openProjectModal function is NOT available');
            }
        }, 1000);
    }
});

/**
 * Initialize project buttons functionality
 */
function initializeProjectButtons() {
    const projectButtons = document.querySelectorAll('.project-cta-button');
    
    console.log(`Found ${projectButtons.length} project buttons`);
    
    // Project ID mapping based on the order in HTML
    const projectIds = [
        'meeting-room',
        'office',
        'holiday-home',
        'holiday-home-2',
        'corcovada-home',
        'torremolinos-home',
        'borboleta-turquesa',
        'youth-lounge'
    ];
    
    projectButtons.forEach((button, index) => {
        // Function to handle project button click/touch
        const handleProjectAction = function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Get project title from the closest flip card
            const flipCard = this.closest('.flip-card');
            const projectTitle = flipCard ? 
                flipCard.querySelector('.project-overlay-title')?.textContent || `Project ${index + 1}` :
                `Project ${index + 1}`;
            
            const projectId = projectIds[index];
            console.log(`Project button clicked: ${projectTitle} (ID: ${projectId})`);
            
            // Track the button click
            trackEvent('project_button_click', 'Projects', 'View Details', projectTitle);
            
            // Open the project modal
            if (window.openProjectModal && projectId) {
                window.openProjectModal(projectId);
            } else {
                console.warn('Modal function not available or project ID missing');
            }
        };
        
        // Add click event listener
        button.addEventListener('click', handleProjectAction);
        
        // Add touch events for mobile (without preventing default)
        button.addEventListener('touchstart', function(e) {
            // Don't prevent default on touchstart to allow click to fire
            e.stopPropagation();
            console.log('Touch start on project button');
        }, { passive: true });
        
        // Add touchend event for mobile
        button.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Touch end on project button, opening modal...');
            // Small delay to ensure touch events complete
            setTimeout(() => {
                handleProjectAction.call(this, e);
            }, 50);
        }, { passive: false });
        
        // Add mousedown event for better mobile support
        button.addEventListener('mousedown', function(e) {
            e.preventDefault();
            e.stopPropagation();
        });
        
        // Add additional mobile event listeners
        button.addEventListener('touchcancel', function(e) {
            console.log('Touch cancelled on project button');
        });
        
        // Ensure the button is properly configured for mobile
        button.style.touchAction = 'manipulation';
        button.style.webkitTapHighlightColor = 'transparent';
        
        // Add a simple click fallback for mobile
        button.addEventListener('pointerdown', function(e) {
            console.log('Pointer down on project button');
        });
        
        // Add a direct mobile click handler
        if ('ontouchstart' in window) {
            button.addEventListener('click', function(e) {
                console.log('Mobile click detected, forcing modal open...');
                // Force the modal to open even if other events fail
                setTimeout(() => {
                    if (window.openProjectModal && projectIds[index]) {
                        window.openProjectModal(projectIds[index]);
                    }
                }, 100);
            }, { passive: false });
        }
    });
}

/**
 * Initialize project modal functionality
 */
function initializeProjectModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalTitle = document.getElementById('modalTitle');
    const modalSubtitle = document.getElementById('modalSubtitle');
    const modalDescription = document.getElementById('modalDescription');
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselIndicators = document.getElementById('carouselIndicators');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (!modal || !modalClose) {
        console.warn('Modal elements not found');
        return;
    }
    
    // Project data with descriptions and images
    const projectData = {
        'meeting-room': {
            title: 'Meeting Room Transformation',
            subtitle: 'Professional Office Space',
            description: 'A complete transformation of a corporate meeting room, creating a modern and inspiring workspace that promotes creativity and productivity. The design incorporates elegant lighting, comfortable seating, and a sophisticated color palette that reflects the company\'s professional image.',
            images: [
                { src: 'assets/images/meetingroom.jpg', alt: 'Meeting Room After Transformation', caption: 'After Transformation' },
                { src: 'assets/images/meetingroom before.jpg', alt: 'Meeting Room Before Transformation', caption: 'Before Transformation' },
                { src: 'assets/images/meeting room/IMG_9897.jpg', alt: 'Meeting Room Transformation Photo 3', caption: 'Meeting Room Transformation' },
                { src: 'assets/images/meeting room/IMG_9901.jpg', alt: 'Meeting Room Transformation Photo 4', caption: 'Meeting Room Transformation' }
            ]
        },
        'office': {
            title: 'Office Interior Design',
            subtitle: 'Contemporary Workspace',
            description: 'A comprehensive office redesign that transforms a traditional workspace into a modern, collaborative environment. Features include open-plan layouts, ergonomic furniture, and strategic use of natural light to create an inviting and productive atmosphere.',
            images: [
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_6a131756.jpg', alt: 'Office Transformation Photo 1', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_b16fe8d4.jpg', alt: 'Office Transformation Photo 2', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_460ccea2.jpg', alt: 'Office Transformation Photo 3', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_9a538675.jpg', alt: 'Office Transformation Photo 4', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_9465d982.jpg', alt: 'Office Transformation Photo 5', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_3243caaa.jpg', alt: 'Office Transformation Photo 6', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_508bf942.jpg', alt: 'Office Transformation Photo 7', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_673571c1.jpg', alt: 'Office Transformation Photo 8', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_d475409e.jpg', alt: 'Office Transformation Photo 9', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.30_567460d9.jpg', alt: 'Office Transformation Photo 10', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.29_491fcc8d.jpg', alt: 'Office Transformation Photo 11', caption: 'Office Transformation' },
                { src: 'assets/images/office/Imagem WhatsApp 2025-08-15 às 11.28.29_351f887a.jpg', alt: 'Office Transformation Photo 12', caption: 'Office Transformation' }
            ]
        },
        'holiday-home': {
            title: 'Holiday Home Kitchen',
            subtitle: 'Modern Kitchen Renovation',
            description: 'A stunning kitchen transformation that combines functionality with modern aesthetics. The new design features premium materials, smart storage solutions, and a layout that maximizes both space and style for the perfect holiday home experience.',
            images: [
                { src: 'assets/images/holidayHouse/after_kitchen.jpg', alt: 'Kitchen After Renovation', caption: 'After Transformation' },
                { src: 'assets/images/holidayHouse/before_kitchen.jpg', alt: 'Kitchen Before Renovation', caption: 'Before Transformation' }
            ]
        },
        'holiday-home-2': {
            title: 'Holiday Home Living Room',
            subtitle: 'Cozy Living Space',
            description: 'A warm and inviting living room transformation that creates the perfect atmosphere for relaxation and entertainment. The design emphasizes comfort and style, making it an ideal space for memorable holiday experiences.',
            images: [
                { src: 'assets/images/holidayHome2/IMG_0144.jpg', alt: 'Holiday Home 2 Photo 1', caption: 'Holiday Home 2 Transformation' },
                { src: 'assets/images/holidayHome2/IMG_0140.jpg', alt: 'Holiday Home 2 Photo 2', caption: 'Holiday Home 2 Transformation' },
                { src: 'assets/images/holidayHome2/IMG_0139.jpg', alt: 'Holiday Home 2 Photo 3', caption: 'Holiday Home 2 Transformation' },
                { src: 'assets/images/holidayHome2/IMG_0134.jpg', alt: 'Holiday Home 2 Photo 4', caption: 'Holiday Home 2 Transformation' },
                { src: 'assets/images/holidayHome2/after_livbingroom.jpg', alt: 'Holiday Home 2 Photo 5', caption: 'Holiday Home 2 Transformation' },
                { src: 'assets/images/holidayHome2/IMG_0127.jpg', alt: 'Holiday Home 2 Photo 6', caption: 'Holiday Home 2 Transformation' },
                { src: 'assets/images/holidayHome2/IMG_0126.jpg', alt: 'Holiday Home 2 Photo 7', caption: 'Holiday Home 2 Transformation' },
                { src: 'assets/images/holidayHome2/IMG_0117.jpg', alt: 'Holiday Home 2 Photo 8', caption: 'Holiday Home 2 Transformation' },
                { src: 'assets/images/holidayHome2/IMG_0110.jpg', alt: 'Holiday Home 2 Photo 9', caption: 'Holiday Home 2 Transformation' }
            ]
        },
        'corcovada-home': {
            title: 'Corcovada Home',
            subtitle: 'Luxury Living Space',
            description: 'An elegant transformation of a premium residence, showcasing sophisticated design elements and luxurious finishes. This project demonstrates how thoughtful interior design can elevate everyday living to an extraordinary experience.',
            images: [
                { src: 'assets/images/corcovada_home/corcovada_after.jpeg', alt: 'Corcovada Home Photo 1', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/941d823c-7f7e-4ced-83f3-b172e7e4353f.avif', alt: 'Corcovada Home Photo 2', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/b82d2fa1-d785-454c-b558-9dd14f083d28.avif', alt: 'Corcovada Home Photo 3', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/e3c0d148-32cd-47b0-be63-e3f6fd503ceb.avif', alt: 'Corcovada Home Photo 4', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/e6367cc9-8b34-4bc0-8b6a-4d7bbd5f6eae.avif', alt: 'Corcovada Home Photo 5', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/25084ef4-319e-4335-9a03-3b07f6e31a9e.avif', alt: 'Corcovada Home Photo 6', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/ffaa7793-8a8d-4372-9c9c-e699c000379c.avif', alt: 'Corcovada Home Photo 7', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/6c9c911f-704f-43c6-8425-ee349f4fa583.avif', alt: 'Corcovada Home Photo 8', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/8432b8d6-0e0d-48ea-baf8-2ff9e637c388.jpeg', alt: 'Corcovada Home Photo 9', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/01d1c643-f38c-4ae9-a1e9-e9809d558598.avif', alt: 'Corcovada Home Photo 10', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/7a60c04f-5958-4222-a1bd-bd3098e869c5.avif', alt: 'Corcovada Home Photo 11', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/3da98542-56eb-4b78-82d5-19db08dd3c97.avif', alt: 'Corcovada Home Photo 12', caption: 'Corcovada Home Transformation' },
                { src: 'assets/images/corcovada_home/aea8eea1-d9b2-414e-bbf1-27e09f1ff2a5.avif', alt: 'Corcovada Home Photo 13', caption: 'Corcovada Home Transformation' }
            ]
        },
        'torremolinos-home': {
            title: 'Torremolinos Home',
            subtitle: 'Spanish Villa Transformation',
            description: 'A beautiful transformation of a Spanish villa that captures the essence of Mediterranean living. The design incorporates local materials, warm colors, and outdoor-indoor living concepts for the perfect holiday retreat.',
            images: [
                { src: 'assets/images/spain/after2.jpg', alt: 'Torremolinos Home Photo 1', caption: 'Torremolinos Home Transformation' },
                { src: 'assets/images/spain/Imagem WhatsApp 2025-07-24 às 07.30.34_2a49d176.jpg', alt: 'Torremolinos Home Photo 2', caption: 'Torremolinos Home Transformation' },
                { src: 'assets/images/spain/Imagem WhatsApp 2025-07-24 às 07.30.34_ae397f12.jpg', alt: 'Torremolinos Home Photo 3', caption: 'Torremolinos Home Transformation' },
                { src: 'assets/images/spain/Imagem WhatsApp 2025-07-24 às 07.30.33_e921d2ee.jpg', alt: 'Torremolinos Home Photo 4', caption: 'Torremolinos Home Transformation' },
                { src: 'assets/images/spain/Imagem WhatsApp 2025-07-24 às 07.30.33_fa0a71f7.jpg', alt: 'Torremolinos Home Photo 5', caption: 'Torremolinos Home Transformation' },
                { src: 'assets/images/spain/Imagem WhatsApp 2025-07-24 às 07.30.33_dc5f1a37.jpg', alt: 'Torremolinos Home Photo 6', caption: 'Torremolinos Home Transformation' },
                { src: 'assets/images/spain/Imagem WhatsApp 2025-07-24 às 07.30.33_8f828c5d.jpg', alt: 'Torremolinos Home Photo 7', caption: 'Torremolinos Home Transformation' },
                { src: 'assets/images/spain/after.jpg', alt: 'Torremolinos Home Photo 8', caption: 'Torremolinos Home Transformation' },
                { src: 'assets/images/spain/Imagem WhatsApp 2025-07-24 às 07.30.33_25a2a58c.jpg', alt: 'Torremolinos Home Photo 9', caption: 'Torremolinos Home Transformation' }
            ]
        },
        'borboleta-turquesa': {
            title: 'Borboleta Turquesa',
            subtitle: 'Unique Design Project',
            description: 'A distinctive design project that showcases creative thinking and unique aesthetic choices. This transformation demonstrates how bold design decisions can create spaces that are both functional and artistically inspiring.',
            images: [
                { src: 'assets/images/borboleta/2341234.jpeg', alt: 'Borboleta Turquesa Photo 1', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/e1a49c74-fd56-4a85-a445-b68005948893.avif', alt: 'Borboleta Turquesa Photo 2', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/8ac1a5bf-c13c-4541-88b1-a3fddd763626.avif', alt: 'Borboleta Turquesa Photo 3', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/b6ecffe4-f147-4ec2-b935-8166db3988b6.jpeg', alt: 'Borboleta Turquesa Photo 4', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/4cae95bf-0238-43ba-ae3e-fc9f722990d8.avif', alt: 'Borboleta Turquesa Photo 5', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/f846ed95-f0ec-4eab-9acd-9568aef468f3.avif', alt: 'Borboleta Turquesa Photo 6', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/ec89894e-c865-456b-b49c-c0824ebc7cf9.avif', alt: 'Borboleta Turquesa Photo 7', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/549b8cf5-4867-44bd-af17-451868d00f42.avif', alt: 'Borboleta Turquesa Photo 8', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/af566016-8255-4bc5-b5ed-d823f3585c2d.webp', alt: 'Borboleta Turquesa Photo 9', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/6fd32a74-8db6-4157-b59b-3367c3d444d9.avif', alt: 'Borboleta Turquesa Photo 10', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/92654966-0dcf-444f-91dd-e72407e0dcb0.avif', alt: 'Borboleta Turquesa Photo 11', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/eb4229f7-5626-4d91-b390-2754ad74220a.jpeg', alt: 'Borboleta Turquesa Photo 12', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/3994f3c4-9948-42f8-aa53-09cb72bc90b0.avif', alt: 'Borboleta Turquesa Photo 13', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/8f19b503-15cc-440c-802a-20db7788dcfb.avif', alt: 'Borboleta Turquesa Photo 14', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/after2.jpeg', alt: 'Borboleta Turquesa Photo 15', caption: 'Borboleta Turquesa Transformation' },
                { src: 'assets/images/borboleta/after.jpeg', alt: 'Borboleta Turquesa Photo 16', caption: 'Borboleta Turquesa Transformation' }
            ]
        },
        'youth-lounge': {
            title: 'Youth Lounge',
            subtitle: 'Modern Youth Space',
            description: 'A contemporary youth lounge design that creates an engaging and inspiring environment for young people. The space combines modern aesthetics with practical functionality, making it perfect for socializing and creative activities.',
            images: [
                { src: 'assets/images/correction_school/Imagem WhatsApp 2025-08-16 às 16.22.09_51d667f6.jpg', alt: 'Youth Lounge Transformation Photo 1', caption: 'Youth Lounge Transformation' },
                { src: 'assets/images/correction_school/Imagem WhatsApp 2025-08-16 às 16.22.09_239fbe56.jpg', alt: 'Youth Lounge Transformation Photo 2', caption: 'Youth Lounge Transformation' },
                { src: 'assets/images/correction_school/Imagem WhatsApp 2025-08-16 às 16.22.09_acec8ef7.jpg', alt: 'Youth Lounge Transformation Photo 3', caption: 'Youth Lounge Transformation' },
                { src: 'assets/images/correction_school/Imagem WhatsApp 2025-08-16 às 16.22.09_b9873fc3.jpg', alt: 'Youth Lounge Transformation Photo 4', caption: 'Youth Lounge Transformation' },
                { src: 'assets/images/correction_school/Imagem WhatsApp 2025-08-16 às 16.24.07_dcb07e18.jpg', alt: 'Youth Lounge Transformation Photo 5', caption: 'Youth Lounge Transformation' },
                { src: 'assets/images/correction_school/Imagem WhatsApp 2025-08-16 às 16.29.08_0ae86d67.jpg', alt: 'Youth Lounge Transformation Photo 6', caption: 'Youth Lounge Transformation' },
                { src: 'assets/images/correction_school/Imagem WhatsApp 2025-08-16 às 16.29.08_15d26a71.jpg', alt: 'Youth Lounge Transformation Photo 7', caption: 'Youth Lounge Transformation' }
            ]
        }
    };
    
    let currentProjectId = null;
    let currentPhotoIndex = 0;
    
    // Make modal functions globally accessible
    window.openProjectModal = function(projectId) {
        if (!projectData[projectId]) {
            console.warn(`Project data not found for ID: ${projectId}`);
            return;
        }
        
        currentProjectId = projectId;
        currentPhotoIndex = 0;
        
        const project = projectData[projectId];
        
        // Update modal content
        modalTitle.textContent = project.title;
        modalSubtitle.textContent = project.subtitle;
        modalDescription.textContent = project.description;
        
        console.log(`Modal content updated:`, {
            title: project.title,
            subtitle: project.subtitle,
            description: project.description
        });
        
        // Update carousel
        updateCarousel(project.images);
        
            // Show modal with smooth animation
    modal.setAttribute('aria-hidden', 'false');
    
    // Add entrance class for initial animation
    modal.classList.add('entering');
    
    // Small delay to ensure smooth animation
    requestAnimationFrame(() => {
        modal.classList.remove('entering');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Focus management
        modalClose.focus();
    });
    
    console.log(`Modal opened for project: ${project.title}`);
    console.log(`Modal element:`, modal);
    console.log(`Modal classes:`, modal.className);
    console.log(`Modal active class added:`, modal.classList.contains('active'));
    };
    
    window.closeProjectModal = function() {
        // Add closing class for exit animation
        modal.classList.add('closing');
        modal.classList.remove('active');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            modal.classList.remove('closing');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            
            // Reset focus
            document.querySelector('.project-cta-button').focus();
        }, 600); // Match the CSS transition duration
        
        console.log('Modal closed');
    };
    
    // Event listeners
    modalClose.addEventListener('click', closeProjectModal);
    
    // Keyboard navigation
    modal.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeProjectModal();
        }
    });
    
    // Carousel functionality
    function updateCarousel(images) {
        if (!carouselTrack || !carouselIndicators) return;
        
        // Clear existing content
        carouselTrack.innerHTML = '';
        carouselIndicators.innerHTML = '';
        
        // Add images to carousel
        images.forEach((image, index) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item';
            carouselItem.style.display = index === 0 ? 'block' : 'none';
            
            const img = document.createElement('img');
            img.src = image.src;
            img.alt = image.alt;
            img.className = 'carousel-image';
            
            carouselItem.appendChild(img);
            carouselTrack.appendChild(carouselItem);
            
            // Add indicator
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.setAttribute('aria-label', `Go to photo ${index + 1}`);
            indicator.addEventListener('click', () => goToPhoto(index));
            carouselIndicators.appendChild(indicator);
        });
        
        // Update indicators
        updateIndicators();
    }
    
    function goToPhoto(index) {
        const items = carouselTrack.querySelectorAll('.carousel-item');
        const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
        
        if (index < 0 || index >= items.length) return;
        
        // Hide all items
        items.forEach(item => item.style.display = 'none');
        indicators.forEach(ind => ind.classList.remove('active'));
        
        // Show selected item
        items[index].style.display = 'block';
        indicators[index].classList.add('active');
        
        currentPhotoIndex = index;
    }
    
    function nextPhoto() {
        const items = carouselTrack.querySelectorAll('.carousel-item');
        const nextIndex = (currentPhotoIndex + 1) % items.length;
        goToPhoto(nextIndex);
    }
    
    function prevPhoto() {
        const items = carouselTrack.querySelectorAll('.carousel-item');
        const prevIndex = (currentPhotoIndex - 1 + items.length) % items.length;
        goToPhoto(prevIndex);
    }
    
    function updateIndicators() {
        const indicators = carouselIndicators.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentPhotoIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Carousel button event listeners
    if (prevBtn) prevBtn.addEventListener('click', prevPhoto);
    if (nextBtn) nextBtn.addEventListener('click', nextPhoto);
    
    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    if (carouselTrack) {
        carouselTrack.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        carouselTrack.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextPhoto();
            } else {
                prevPhoto();
            }
        }
    }
    
    console.log('Project modal functionality initialized');
}

/**
 * Initialize flip card functionality
 */
function initializeFlipCards() {
    const flipCards = document.querySelectorAll('.flip-card');
    const flipButtons = document.querySelectorAll('.flip-arrow-btn');
    
    console.log(`Found ${flipCards.length} flip cards and ${flipButtons.length} flip buttons`);
    
    // Add click event listeners to all flip buttons
    flipButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
          e.preventDefault();
        e.stopPropagation();
            
            const flipCard = this.closest('.flip-card');
            if (flipCard) {
                flipCard.classList.toggle('flipped');
                console.log(`Flip card ${index + 1} toggled`);
        } else {
                console.log('No flip card found for button');
            }
        });
        
        // Add touch events for mobile
        button.addEventListener('touchstart', function(e) {
      e.preventDefault();
        }, { passive: false });
    });
    
    // Also allow clicking on the entire flip card
    flipCards.forEach((card, index) => {
        card.addEventListener('click', function(e) {
            // Only flip if clicking on the card itself, not on buttons
            if (e.target === this || e.target.classList.contains('flip-card-inner')) {
                this.classList.toggle('flipped');
                console.log(`Flip card ${index + 1} toggled via card click`);
            }
        });
    });
  }

  /**
 * Initialize other basic features
 */
function initializeBasicFeatures() {
    // CTA Button
    const ctaButton = document.getElementById('discoverBtn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
          e.preventDefault();
            const aboutSection = document.querySelector('.about-section');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const offCanvasMenu = document.getElementById('offCanvasMenu');
    const menuCloseBtn = document.getElementById('menuCloseBtn');
    
    if (menuToggle && offCanvasMenu) {
        menuToggle.addEventListener('click', function() {
            offCanvasMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }
    
    if (menuCloseBtn && offCanvasMenu) {
        menuCloseBtn.addEventListener('click', function() {
            offCanvasMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            if (stickyMenuToggle) stickyMenuToggle.classList.remove('active');
            if (headerMobileMenuToggle) headerMobileMenuToggle.classList.remove('active');
        });
    }
    
    // Language Selector
    const languageSelector = document.getElementById('languageSelector');
    const langToggle = document.querySelector('.lang-toggle');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (langToggle && languageSelector) {
        langToggle.addEventListener('click', function(e) {
      e.stopPropagation();
            languageSelector.classList.toggle('active');
        });
    }
    
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.stopPropagation();
            const lang = this.getAttribute('data-lang');
            
            // Translate the page to the selected language
            translatePage(lang);
            
            // Close language selector
            languageSelector.classList.remove('active');
            
            // Track language change
            trackEvent('language_change', 'User Interaction', 'Language Changed', lang);
        });
    });

    // Close language selector when clicking outside
    document.addEventListener('click', function(e) {
        if (languageSelector && !languageSelector.contains(e.target)) {
            languageSelector.classList.remove('active');
        }
        
        // Close off-canvas menu when clicking outside
        if (offCanvasMenu && offCanvasMenu.classList.contains('active') && !offCanvasMenu.contains(e.target) && 
            !menuToggle?.contains(e.target) && !stickyMenuToggle?.contains(e.target) && !headerMobileMenuToggle?.contains(e.target)) {
            offCanvasMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            if (stickyMenuToggle) stickyMenuToggle.classList.remove('active');
            if (headerMobileMenuToggle) headerMobileMenuToggle.classList.remove('active');
        }
    });
    
    // Close off-canvas menu with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && offCanvasMenu && offCanvasMenu.classList.contains('active')) {
            offCanvasMenu.classList.remove('active');
            if (menuToggle) menuToggle.classList.remove('active');
            if (stickyMenuToggle) stickyMenuToggle.classList.remove('active');
            if (headerMobileMenuToggle) headerMobileMenuToggle.classList.remove('active');
        }
    });
    
    // Back to Top Button
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
    } else {
                backToTop.classList.remove('visible');
            }
        });
        
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Sticky Header with smooth hide/show
    const stickyHeader = document.getElementById('stickyHeader');
    if (stickyHeader) {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateHeader() {
            const currentScrollY = window.scrollY;
            const isMobile = window.innerWidth <= 768;
            const scrollThreshold = isMobile ? 40 : 80; // Lower threshold on mobile
            
            if (currentScrollY > scrollThreshold) {
                // Show header when scrolling up, hide when scrolling down
                if (currentScrollY < lastScrollY) {
                    // Scrolling up - show header
                    stickyHeader.classList.remove('hidden');
                    stickyHeader.classList.add('visible');
                    console.log('Header shown - scrolling up');
                } else {
                    // Scrolling down - hide header
                    stickyHeader.classList.remove('visible');
                    stickyHeader.classList.add('hidden');
                    console.log('Header hidden - scrolling down');
                }
            } else {
                // At top - hide header completely
                stickyHeader.classList.remove('visible', 'hidden');
                console.log('Header at top - hidden');
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        }
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.contact-submit');
            const originalText = submitButton.querySelector('span').textContent;
            
            // Show loading state
            submitButton.querySelector('span').textContent = 'Versturen...';
            submitButton.disabled = true;
            
            // Submit form data
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success state
                    submitButton.querySelector('span').textContent = '✓ Verzonden!';
                    this.reset();
                    
                    // Track successful submission
                    trackEvent('form_submit', 'Conversion', 'Contact Form Submit', 'Success');
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Form submission error:', error);
                submitButton.querySelector('span').textContent = 'Fout opgetreden';
                
                // Track failed submission
                trackEvent('form_submit', 'Conversion', 'Contact Form Submit', 'Error');
            })
            .finally(() => {
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitButton.querySelector('span').textContent = originalText;
                    submitButton.disabled = false;
                }, 3000);
            });
        });
    }
    
    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Initialize scroll animations for sections
    const sections = document.querySelectorAll('.about-section, .specialities-section, .contact-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Menu Links
    const menuLinks = document.querySelectorAll('.menu-list a');
      menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
            const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
            // Close menu
            if (offCanvasMenu) {
                offCanvasMenu.classList.remove('active');
                if (menuToggle) menuToggle.classList.remove('active');
                if (stickyMenuToggle) stickyMenuToggle.classList.remove('active');
                if (headerMobileMenuToggle) headerMobileMenuToggle.classList.remove('active');
            }
            
            // Navigate to target
          if (targetElement) {
            setTimeout(() => {
                    const offsetTop = targetElement.offsetTop - 100;
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
            }, 300);
          }
        });
      });
    
    // Sticky Menu Toggle
    const stickyMenuToggle = document.getElementById('stickyMenuToggle');
    if (stickyMenuToggle && offCanvasMenu) {
        stickyMenuToggle.addEventListener('click', function() {
            offCanvasMenu.classList.toggle('active');
            this.classList.toggle('active');
            if (menuToggle) menuToggle.classList.toggle('active');
            
            // Ensure only one menu button is active at a time
            if (this.classList.contains('active')) {
                menuToggle.classList.remove('active');
            }
        });
    }
    
    // Ensure menu buttons don't conflict
    if (menuToggle && stickyMenuToggle) {
        menuToggle.addEventListener('click', function() {
            if (stickyMenuToggle.classList.contains('active')) {
                stickyMenuToggle.classList.remove('active');
            }
        });
    }
    
    // Header Mobile Menu Toggle
    const headerMobileMenuToggle = document.getElementById('headerMobileMenuToggle');
    if (headerMobileMenuToggle && offCanvasMenu) {
        headerMobileMenuToggle.addEventListener('click', function() {
            offCanvasMenu.classList.toggle('active');
            this.classList.toggle('active');
            
            // Ensure other menu buttons are not active
            if (menuToggle) menuToggle.classList.remove('active');
            if (stickyMenuToggle) stickyMenuToggle.classList.remove('active');
        });
    }
    
    // Ensure all menu buttons don't conflict
    if (headerMobileMenuToggle) {
        if (menuToggle) {
            menuToggle.addEventListener('click', function() {
                if (headerMobileMenuToggle.classList.contains('active')) {
                    headerMobileMenuToggle.classList.remove('active');
                }
            });
        }
        if (stickyMenuToggle) {
            stickyMenuToggle.addEventListener('click', function() {
                if (headerMobileMenuToggle.classList.contains('active')) {
                    headerMobileMenuToggle.classList.remove('active');
                }
            });
        }
    }
    
    // Sticky Nav Links
    const stickyNavLinks = document.querySelectorAll('.sticky-nav-list a');
      stickyNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
            const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add page load animation
    document.body.classList.add('loading');
    setTimeout(() => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 100);
}

/**
 * Initialize analytics tracking for user interactions
 */
function initializeAnalyticsTracking() {
    // Track CTA button clicks
    const ctaButton = document.getElementById('discoverBtn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            trackEvent('cta_click', 'Engagement', 'CTA Button Click', 'Discover Button');
        });
    }
    
    // Track contact form submissions
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            trackEvent('form_submit', 'Conversion', 'Contact Form Submit', 'Contact Form');
        });
    }
    
    // Track social media clicks
    const socialLinks = document.querySelectorAll('a[href*="instagram"], a[href*="wa.me"]');
    socialLinks.forEach(link => {
        link.addEventListener('click', function() {
            const platform = this.href.includes('instagram') ? 'Instagram' : 'WhatsApp';
            trackEvent('social_click', 'Engagement', 'Social Media Click', platform);
        });
    });
    
    // Track navigation menu clicks
    const navLinks = document.querySelectorAll('.menu-list a, .sticky-nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const section = this.getAttribute('href').replace('#', '');
            trackEvent('navigation', 'Engagement', 'Menu Navigation', section);
        });
    });
    
    // Track flip card interactions
    const flipButtons = document.querySelectorAll('.flip-arrow-btn');
    flipButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            trackEvent('card_flip', 'Engagement', 'Flip Card Interaction', `Card ${index + 1}`);
        });
    });
    
    // Track scroll depth (when user scrolls to different sections)
    const sections = document.querySelectorAll('.about-section, .specialities-section, .contact-section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.className.split('-')[0];
                trackEvent('scroll_depth', 'Engagement', 'Section View', sectionName);
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    
    console.log('Analytics tracking initialized');
}



/**
 * Initialize image error handling for better user experience
 */
function initializeImageErrorHandling() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            console.warn(`Image failed to load: ${this.src}`);
            
            // Create a fallback placeholder for project images
            if (this.classList.contains('grid-image')) {
                this.style.display = 'none';
                const placeholder = document.createElement('div');
                placeholder.className = 'image-placeholder';
                placeholder.innerHTML = `
                    <div style="
                        width: 100%; 
                        height: 100%; 
                        background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                        display: flex; 
                        align-items: center; 
                        justify-content: center; 
                        color: #8f6027; 
                        font-size: 1rem; 
                        text-align: center; 
                        padding: 1rem;
                        border-radius: 8px;
                    ">
                        <div>
                            <strong>Image Loading...</strong><br>
                            <small>Please check image path</small>
                        </div>
                    </div>
                `;
                this.parentNode.appendChild(placeholder);
            }
        });
        
        // Add loading state
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
    
    console.log('Image error handling initialized');
}

/**
 * Mobile Debug Functions - Test modal functionality
 */
// Add this to global scope for testing
window.testModalOnMobile = function() {
    console.log('Testing modal on mobile...');
    if (window.openProjectModal) {
        console.log('openProjectModal function exists');
        window.openProjectModal('meeting-room');
    } else {
        console.log('openProjectModal function does not exist');
    }
};

// Test if modal elements exist
window.checkModalElements = function() {
    console.log('Checking modal elements...');
    console.log('Modal:', document.getElementById('projectModal'));

    console.log('Modal Close:', document.getElementById('modalClose'));
    console.log('Modal Title:', document.getElementById('modalTitle'));
    console.log('Modal Subtitle:', document.getElementById('modalSubtitle'));
    console.log('Modal Description:', document.getElementById('modalDescription'));
};

/**
 * Initialize flower gallery functionality
 */
function initializeFlowerGallery() {
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || !thumbnails.length) {
        console.log('Gallery elements not found');
        return;
    }
    
    console.log(`Initializing flower gallery with ${thumbnails.length} thumbnails`);
    
    // Function to update main image
    function updateMainImage(imageSrc, title) {
        if (mainImage) {
            mainImage.src = imageSrc;
            mainImage.alt = title;
        }
    }
    
    // Function to update active thumbnail
    function updateActiveThumbnail(clickedThumbnail) {
        // Remove active class from all thumbnails
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
        });
        
        // Add active class to clicked thumbnail
        clickedThumbnail.classList.add('active');
    }
    
    // Event listeners for thumbnails
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            
            if (imageSrc && title) {
                updateMainImage(imageSrc, title);
                updateActiveThumbnail(this);
                
                // Track interaction
                trackEvent('gallery_interaction', 'Engagement', 'Thumbnail Click', `Image ${index + 1}`);
                
                console.log(`Switched to image ${index + 1}: ${title}`);
            }
        });
        
        // Add image load/error tracking
        const img = thumbnail.querySelector('img');
        if (img) {
            img.addEventListener('load', function() {
                console.log(`Thumbnail ${index + 1} loaded successfully:`, this.src);
            });
            
            img.addEventListener('error', function() {
                console.error(`Thumbnail ${index + 1} failed to load:`, this.src);
            });
        }
    });
    
    // Check if main image loads properly
    if (mainImage) {
        mainImage.addEventListener('load', function() {
            console.log('Main image loaded successfully:', this.src);
        });
        
        mainImage.addEventListener('error', function() {
            console.error('Main image failed to load:', this.src);
        });
    }
    
    console.log('Flower gallery initialized successfully');
}