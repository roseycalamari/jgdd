/**
 * Jeanette Gasseling Deco & Design - Enhanced Interactive Interface
 * 
 * Enhanced Features:
 * - German language support
 * - Sticky header with scroll detection
 * - Back to top button
 * - Advanced scroll animations
 * - Enhanced mobile/tablet optimization
 * - Improved accessibility
 * - Enhanced flip card functionality
 * - Comprehensive footer functionality
 */

class EnhancedInteriorDesignInterface {
  constructor() {
    this.isInitialized = false;
    this.throttleDelay = 16; // 60fps optimization
    this.animationQueue = [];
    this.performanceMetrics = {
      loadTime: performance.now(),
      interactionCount: 0,
      flipInteractionCount: 0
    };
    this.currentLanguage = 'nl'; // Default to Dutch
    this.translations = this.initializeTranslations();
    this.deviceCapabilities = this.analyzeDeviceCapabilities();
    this.flipCardStates = new Map(); // Track flip states
    this.scrollPosition = 0;
    this.isScrolling = false;
    this.animationObserver = null;
    this.initializeInterface();
  }

  /**
   * Throttle function for performance optimization
   */
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  /**
   * Professional device capability analysis for optimal experience delivery
   */
  analyzeDeviceCapabilities() {
    return {
      touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      highDPI: window.devicePixelRatio > 1,
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      connectionSpeed: navigator.connection?.effectiveType || 'unknown',
      isMobile: window.innerWidth <= 768,
      isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
      isDesktop: window.innerWidth > 1024
    };
  }

  /**
   * Enhanced multi-language support with German translation
   */
  initializeTranslations() {
    return {
      nl: {
        hero: {
          tagline: 'Tijdloze elegantie & verfijnde stijl'
        },
        menu: {
          home: 'Home',
          projects: 'Projecten',
          about: 'Over mij',
          contact: 'Contact'
        },
        projects: {
          title: 'Mijn Projecten',
          slogan: 'voor alle budgetten en gelegenheden'
        },
        cta: {
          title: 'Ontdek onze',
          subtitle: 'Unieke Stijl',
          button: 'Meer Info',
          description: 'Laat je inspireren door onze styling en design tips!'
        },
        about: {
          title: 'Over mij',
          content: [
            'Interieur en styling is mijn passie. Wat ooit begon als een leuke hobby – schuiven met meubels, kleuren combineren en speuren naar unieke vondsten – is inmiddels uitgegroeid tot een mooie en veelzijdige onderneming. Onder andere het creëren van sfeervolle en persoonlijke ruimtes.',
            'Door middel van het inrichten van ons eigen huis, vakantiewoningen en het helpen van vrienden en familie met hun interieurs.',
            'Enkele jaren heb ik met veel plezier een gezellige bloemen- en cadeauwinkel gerund. Hier kwam mijn gevoel voor kleur, stijl en harmonie volledig tot bloei. De liefde voor mooie dingen, en het combineren van oud en nieuw, kreeg daar een plek.',
            'Samen met mijn echtgenoot, dochters en schoonzoon hebben wij een goedlopend familiebedrijf in de schilders en bouw branche opgebouwd. Deze samenwerking bracht niet alleen vakmanschap in kleur en afwerking samen, maar ook oog voor detail en sfeer.',
            'Tegenwoordig richt ik mij op het inrichten en decoreren van soms een enkele kamer, gehele woning, afgewisseld met kantoren en vakantiewoningen – altijd met oog voor de wensen van de klant en met een warm hart voor karaktervolle kringloopvondsten. Juist die mix van stijlen, materialen en verhalen maakt een ruimte uniek.',
            'Of je nu op zoek bent naar wat nieuwe sfeer een compleet nieuw interieur of enkel een frisse touch. Door bijvoorbeeld een mooi kunstbloemstuk of een ander kleurtje op de wand, dan help ik je graag om jouw ruimte tot jou sfeervolle eigen woon, werk of vakantie plek te maken.'
          ]
        },
        contact: {
          title: 'Contact',
          subtitle: 'Laten we samen jouw droominterieur creëren',
          phone: 'Telefoon',
          email: 'E-mail',
          location: 'Locatie',
          form: {
            name: 'Naam',
            email: 'E-mail',
            phone: 'Telefoon',
            message: 'Bericht',
            submit: 'Verstuur Bericht'
          }
        },
        footer: {
          tagline: 'Tijdloze elegantie voor uw interieur',
          navigation: 'Navigatie',
          services: 'Diensten',
          service1: 'Interieur Styling',
          service2: 'Kleuradvies',
          service3: 'Ruimte Inrichting',
          service4: 'Decoratie',
          rights: 'Alle rechten voorbehouden.',
          follow: 'Volg ons:'
        },
        interactions: {
          ctaClick: 'Service consultatie aanvraag gestart',
          gridClick: 'Portfolio item geopend',
          flipCard: 'Voor/Na weergave gewisseld',
          logoClick: 'Merk betrokkenheid geregistreerd',
          keyboardNav: 'Professionele toetsenbordnavigatie actief'
        }
      },
      en: {
        hero: {
          tagline: 'Timeless elegance & sophisticated style'
        },
        menu: {
          home: 'Home',
          projects: 'Projects',
          about: 'About Me',
          contact: 'Contact'
        },
        projects: {
          title: 'My Projects',
          slogan: 'for all budgets and occasions'
        },
        cta: {
          title: 'Discover our',
          subtitle: 'Unique Style',
          button: 'Learn More',
          description: 'Get inspired by our styling and design tips!'
        },
        about: {
          title: 'About Me',
          content: [
            'Interior design and styling is my passion. What once began as a fun hobby – moving furniture, combining colors and searching for unique finds – has now grown into a beautiful and versatile business. Including creating atmospheric and personal spaces.',
            'Through furnishing our own home, vacation homes and helping friends and family with their interiors.',
            'For several years I ran a cozy flower and gift shop with great pleasure. Here my feeling for color, style and harmony came into full bloom. The love for beautiful things, and combining old and new, found a place there.',
            'Together with my husband, daughters and son-in-law, we have built a successful family business in the painting and construction industry. This collaboration brought together not only craftsmanship in color and finishing, but also an eye for detail and atmosphere.',
            'Nowadays I focus on furnishing and decorating sometimes a single room, entire home, alternated with offices and vacation homes – always with an eye for the customer\'s wishes and with a warm heart for characterful thrift store finds. It is precisely that mix of styles, materials and stories that makes a space unique.',
            'Whether you are looking for some new atmosphere, a completely new interior or just a fresh touch. For example, through a beautiful artificial flower arrangement or a different color on the wall, I would be happy to help you turn your space into your own atmospheric living, working or vacation place.'
          ]
        },
        contact: {
          title: 'Contact',
          subtitle: 'Let\'s create your dream interior together',
          phone: 'Phone',
          email: 'Email',
          location: 'Location',
          form: {
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            message: 'Message',
            submit: 'Send Message'
          }
        },
        footer: {
          tagline: 'Timeless elegance for your interior',
          navigation: 'Navigation',
          services: 'Services',
          service1: 'Interior Styling',
          service2: 'Color Advice',
          service3: 'Space Design',
          service4: 'Decoration',
          rights: 'All rights reserved.',
          follow: 'Follow us:'
        },
        interactions: {
          ctaClick: 'Service consultation inquiry initiated',
          gridClick: 'Portfolio item accessed',
          flipCard: 'Before/After view toggled',
          logoClick: 'Brand engagement recorded',
          keyboardNav: 'Professional keyboard navigation active'
        }
      },
      de: {
        hero: {
          tagline: 'Zeitlose Eleganz & raffinierter Stil'
        },
        menu: {
          home: 'Startseite',
          projects: 'Projekte',
          about: 'Über mich',
          contact: 'Kontakt'
        },
        projects: {
          title: 'Meine Projekte',
          slogan: 'für alle Budgets und Anlässe'
        },
        cta: {
          title: 'Entdecken Sie unseren',
          subtitle: 'Einzigartigen Stil',
          button: 'Mehr Erfahren',
          description: 'Lassen Sie sich von unseren Styling- und Design-Tipps inspirieren!'
        },
        about: {
          title: 'Über mich',
          content: [
            'Innenarchitektur und Styling ist meine Leidenschaft. Was einst als lustiges Hobby begann – Möbel verschieben, Farben kombinieren und nach einzigartigen Fundstücken suchen – ist inzwischen zu einem schönen und vielseitigen Unternehmen gewachsen. Einschließlich der Schaffung atmosphärischer und persönlicher Räume.',
            'Durch die Einrichtung unseres eigenen Hauses, von Ferienhäusern und die Hilfe für Freunde und Familie bei ihren Innenräumen.',
            'Mehrere Jahre lang führte ich mit großer Freude einen gemütlichen Blumen- und Geschenkeladen. Hier kam mein Gefühl für Farbe, Stil und Harmonie voll zur Geltung. Die Liebe zu schönen Dingen und die Kombination von Alt und Neu fand dort ihren Platz.',
            'Zusammen mit meinem Mann, meinen Töchtern und meinem Schwiegersohn haben wir ein erfolgreiches Familienunternehmen in der Maler- und Baubranche aufgebaut. Diese Zusammenarbeit brachte nicht nur Handwerkskunst in Farbe und Verarbeitung zusammen, sondern auch ein Auge für Detail und Atmosphäre.',
            'Heutzutage konzentriere ich mich auf die Einrichtung und Dekoration manchmal eines einzelnen Raums, ganzer Häuser, abwechselnd mit Büros und Ferienhäusern – immer mit einem Auge für die Wünsche des Kunden und mit einem warmen Herzen für charaktervolle Second-Hand-Funde. Genau diese Mischung aus Stilen, Materialien und Geschichten macht einen Raum einzigartig.',
            'Egal, ob Sie nach etwas neuer Atmosphäre, einem völlig neuen Interieur oder nur einem frischen Touch suchen. Zum Beispiel durch ein schönes Kunstblumenarrangement oder eine andere Farbe an der Wand – ich helfe Ihnen gerne dabei, Ihren Raum zu Ihrem eigenen atmosphärischen Wohn-, Arbeits- oder Urlaubsort zu machen.'
          ]
        },
        contact: {
          title: 'Kontakt',
          subtitle: 'Lassen Sie uns gemeinsam Ihr Trauminterieur schaffen',
          phone: 'Telefon',
          email: 'E-Mail',
          location: 'Standort',
          form: {
            name: 'Name',
            email: 'E-Mail',
            phone: 'Telefon',
            message: 'Nachricht',
            submit: 'Nachricht Senden'
          }
        },
        footer: {
          tagline: 'Zeitlose Eleganz für Ihr Interieur',
          navigation: 'Navigation',
          services: 'Dienstleistungen',
          service1: 'Innenraum Styling',
          service2: 'Farbberatung',
          service3: 'Raumgestaltung',
          service4: 'Dekoration',
          rights: 'Alle Rechte vorbehalten.',
          follow: 'Folgen Sie uns:'
        },
        interactions: {
          ctaClick: 'Service-Beratungsanfrage gestartet',
          gridClick: 'Portfolio-Element aufgerufen',
          flipCard: 'Vorher/Nachher-Ansicht umgeschaltet',
          logoClick: 'Markenengagement registriert',
          keyboardNav: 'Professionelle Tastaturnavigation aktiv'
        }
      },
      pt: {
        hero: {
          tagline: 'Elegância atemporal & estilo sofisticado'
        },
        menu: {
          home: 'Início',
          projects: 'Projetos',
          about: 'Sobre Mim',
          contact: 'Contacto'
        },
        projects: {
          title: 'Meus Projetos',
          slogan: 'para todos os orçamentos e ocasiões'
        },
        cta: {
          title: 'Descubra o nosso',
          subtitle: 'Estilo Único',
          button: 'Saiba Mais',
          description: 'Inspire-se com as nossas dicas de styling e design!'
        },
        about: {
          title: 'Sobre Mim',
          content: [
            'Design de interiores e styling é a minha paixão. O que começou como um hobby divertido – mover móveis, combinar cores e procurar achados únicos – cresceu agora para um negócio bonito e versátil. Incluindo a criação de espaços atmosféricos e pessoais.',
            'Através da decoração da nossa própria casa, casas de férias e ajudando amigos e família com os seus interiores.',
            'Durante vários anos, geri uma acolhedora loja de flores e presentes com grande prazer. Aqui o meu sentido para cor, estilo e harmonia floresceu completamente. O amor por coisas bonitas, e combinando o antigo e o novo, encontrou ali um lugar.',
            'Juntamente com o meu marido, filhas e genro, construímos um negócio familiar de sucesso na indústria de pintura e construção. Esta colaboração reuniu não apenas artesanato em cor e acabamento, mas também um olho para detalhe e atmosfera.',
            'Hoje em dia concentro-me em mobilar e decorar às vezes um único quarto, casa inteira, alternado com escritórios e casas de férias – sempre com um olho para os desejos do cliente e com um coração caloroso para achados característicos de lojas de segunda mão. É precisamente essa mistura de estilos, materiais e histórias que torna um espaço único.',
            'Quer esteja à procura de uma nova atmosfera, um interior completamente novo ou apenas um toque fresco. Por exemplo, através de um belo arranjo de flores artificiais ou uma cor diferente na parede, terei todo o prazer em ajudá-lo a transformar o seu espaço no seu próprio lugar atmosférico para viver, trabalhar ou passar férias.'
          ]
        },
        contact: {
          title: 'Contacto',
          subtitle: 'Vamos criar o seu interior de sonho juntos',
          phone: 'Telefone',
          email: 'E-mail',
          location: 'Localização',
          form: {
            name: 'Nome',
            email: 'E-mail',
            phone: 'Telefone',
            message: 'Mensagem',
            submit: 'Enviar Mensagem'
          }
        },
        footer: {
          tagline: 'Elegância atemporal para o seu interior',
          navigation: 'Navegação',
          services: 'Serviços',
          service1: 'Styling de Interiores',
          service2: 'Consultoria de Cores',
          service3: 'Design de Espaços',
          service4: 'Decoração',
          rights: 'Todos os direitos reservados.',
          follow: 'Siga-nos:'
        },
        interactions: {
          ctaClick: 'Consulta de serviço iniciada',
          gridClick: 'Item do portfólio acedido',
          flipCard: 'Vista Antes/Depois alternada',
          logoClick: 'Envolvimento com a marca registado',
          keyboardNav: 'Navegação profissional por teclado ativa'
        }
      }
    };
  }

  /**
   * Primary initialization orchestrator
   */
  initializeInterface() {
    // Ensure DOM readiness before execution
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.executeInitialization());
    } else {
      this.executeInitialization();
    }
  }

  /**
   * Core initialization sequence with error handling
   */
  executeInitialization() {
    try {
      this.cacheDOM();
      this.bindEventHandlers();
      this.initializeFlipCards();
      this.initializeLanguageSelector();
      this.initializeOffCanvasMenu();
      this.initializeStickyHeader();
      this.initializeBackToTop();
      this.implementScrollAnimations();
      this.initializeAccessibilityFeatures();
      this.optimizeImageLoading();
      this.initializeTouchInteractions();
      this.initializeContactForm();
      this.initializePageLoadAnimation();
      this.setupFooterFunctionality();
      this.isInitialized = true;
      
      console.log('✅ Enhanced interface initialization completed successfully');
    } catch (error) {
      console.error('❌ Enhanced interface initialization failed:', error);
      this.fallbackInitialization();
    }
  }

  /**
   * Enhanced DOM element caching with comprehensive element coverage
   */
  cacheDOM() {
    this.elements = {
      ctaButton: document.getElementById('discoverBtn'),
      gridItems: document.querySelectorAll('.grid-item'),
      gridImages: document.querySelectorAll('.grid-image'),
      logoImage: document.querySelector('.logo-image'),
      container: document.querySelector('.container'),
      flipCards: document.querySelectorAll('.flip-card'),
      flipArrowButtons: document.querySelectorAll('.flip-arrow-btn'),
      aboutSection: document.querySelector('.about-section'),
      contactSection: document.querySelector('.contact-section'),
      languageSelector: document.getElementById('languageSelector'),
      langToggle: document.querySelector('.lang-toggle'),
      langOptions: document.querySelectorAll('.lang-option'),
      currentLang: document.querySelector('.current-lang'),
      menuToggle: document.getElementById('menuToggle'),
      offCanvasMenu: document.getElementById('offCanvasMenu'),
      menuCloseBtn: document.getElementById('menuCloseBtn'),
      menuLinks: document.querySelectorAll('.menu-list a'),
      contactForm: document.getElementById('contactForm'),
      translatableElements: document.querySelectorAll('[data-translate]'),
      
      // Enhanced elements for sophisticated functionality
      stickyHeader: document.getElementById('stickyHeader'),
      stickyNavLinks: document.querySelectorAll('.sticky-nav-list a'),
      stickyMenuToggle: document.getElementById('stickyMenuToggle'),
      backToTop: document.getElementById('backToTop'),
      footer: document.getElementById('footer'),
      socialLinks: document.querySelectorAll('.social-link'),
      currentYearElement: document.getElementById('currentYear'),
      heroHeader: document.querySelector('.hero-header'),
      projectsHeader: document.querySelector('.projects-header'),
      menuHeader: document.querySelector('.menu-header'),
      menuLogo: document.querySelector('.menu-logo'),
      stickyLogo: document.querySelector('.sticky-logo')
    };

    // Validate critical elements existence with enhanced error handling
    this.validateCriticalElements();
  }

  /**
   * Critical element validation with graceful degradation
   */
  validateCriticalElements() {
    const requiredElements = ['ctaButton', 'gridItems'];
    
    requiredElements.forEach(elementKey => {
      if (!this.elements[elementKey]) {
        console.warn(`⚠️ Critical element missing: ${elementKey}`);
      }
    });
  }

  /**
   * Initialize page load animations
   */
  initializePageLoadAnimation() {
    // Add loading class to body
    document.body.classList.add('loading');
    
    // Remove loading class and add loaded class after a short delay
    setTimeout(() => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 100);
  }

  /**
   * Enhanced sticky header with intelligent directional scroll detection
   */
  initializeStickyHeader() {
    if (!this.elements.stickyHeader) return;

    const stickyHeaderHeight = 80;
    let lastScrollTop = 0;
    let scrollDirection = 'down';
    let ticking = false;

    const handleSmartScroll = () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      // Determine scroll direction
      if (currentScroll > lastScrollTop && currentScroll > stickyHeaderHeight) {
        // Scrolling down
        if (scrollDirection !== 'down') {
          scrollDirection = 'down';
          this.hideHeader();
        }
      } else if (currentScroll < lastScrollTop || currentScroll <= stickyHeaderHeight) {
        // Scrolling up or at top
        if (scrollDirection !== 'up' && currentScroll > stickyHeaderHeight) {
          scrollDirection = 'up';
          this.showHeader();
        } else if (currentScroll <= stickyHeaderHeight) {
          this.hideHeader();
        }
      }

      lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(handleSmartScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);

    // Initialize sticky header menu integration
    this.initializeStickyHeaderMenu();

    // Handle sticky nav clicks
    if (this.elements.stickyNavLinks) {
      this.elements.stickyNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
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
    }
  }

  /**
   * Show sticky header with smooth animation
   */
  showHeader() {
    if (this.elements.stickyHeader) {
      this.elements.stickyHeader.classList.add('visible');
      this.elements.stickyHeader.classList.remove('hidden');
      
      // Hide floating menu button when header appears
      if (this.elements.menuToggle) {
        this.elements.menuToggle.classList.add('hidden');
      }
    }
  }

  /**
   * Hide sticky header with smooth animation
   */
  hideHeader() {
    if (this.elements.stickyHeader) {
      this.elements.stickyHeader.classList.remove('visible');
      this.elements.stickyHeader.classList.add('hidden');
      
      // Show floating menu button when header hides
      if (this.elements.menuToggle) {
        this.elements.menuToggle.classList.remove('hidden');
      }
    }
  }

  /**
   * Initialize sticky header menu integration
   */
  initializeStickyHeaderMenu() {
    const stickyMenuToggle = document.getElementById('stickyMenuToggle');
    
    if (stickyMenuToggle) {
      stickyMenuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = stickyMenuToggle.classList.contains('active');
        
        if (isActive) {
          this.closeOffCanvasMenu();
          stickyMenuToggle.classList.remove('active');
        } else {
          this.openOffCanvasMenu();
          stickyMenuToggle.classList.add('active');
        }
      });

      // Sync sticky menu button state with main menu state
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const isMenuActive = this.elements.offCanvasMenu.classList.contains('active');
            if (isMenuActive) {
              stickyMenuToggle.classList.add('active');
            } else {
              stickyMenuToggle.classList.remove('active');
            }
          }
        });
      });

      observer.observe(this.elements.offCanvasMenu, { attributes: true });
    }
  }

  /**
   * Initialize back to top button
   */
  initializeBackToTop() {
    if (!this.elements.backToTop) return;

    const showBackToTopThreshold = 300;

    const handleScroll = this.throttle(() => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      
      if (currentScroll > showBackToTopThreshold) {
        this.elements.backToTop.classList.add('visible');
      } else {
        this.elements.backToTop.classList.remove('visible');
      }
    }, this.throttleDelay);

    window.addEventListener('scroll', handleScroll);

    // Handle back to top click
    this.elements.backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

      this.trackUserInteraction('back_to_top_clicked', {
        scrollPosition: window.pageYOffset,
        timestamp: Date.now()
      });
    });
  }

  /**
   * Implement advanced scroll animations
   */
  implementScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Special handling for grid items with staggered animation
          if (entry.target.classList.contains('grid-item')) {
            const delay = Array.from(this.elements.gridItems).indexOf(entry.target) * 100;
            entry.target.style.animationDelay = `${delay}ms`;
          }
        }
      });
    }, observerOptions);

    // Observe elements for scroll animations
    const elementsToAnimate = [
      ...this.elements.gridItems,
      this.elements.aboutSection,
      this.elements.contactSection,
      this.elements.projectsHeader
    ].filter(el => el);

    elementsToAnimate.forEach(element => {
      if (element) {
        this.animationObserver.observe(element);
      }
    });
  }

  /**
   * Setup footer functionality
   */
  setupFooterFunctionality() {
    // Set current year
    if (this.elements.currentYearElement) {
      this.elements.currentYearElement.textContent = new Date().getFullYear();
    }

    // Handle social link interactions
    if (this.elements.socialLinks) {
      this.elements.socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const platform = link.getAttribute('aria-label');
          
          this.trackUserInteraction('social_link_clicked', {
            platform: platform,
            timestamp: Date.now()
          });

          console.log(`🔗 Social link clicked: ${platform}`);
        });
      });
    }
  }

  /**
   * Initialize language selector functionality
   */
  initializeLanguageSelector() {
    if (!this.elements.languageSelector || !this.elements.langToggle) return;

    // Toggle language options visibility
    this.elements.langToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.elements.languageSelector.classList.toggle('active');
    });

    // Handle language selection
    this.elements.langOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        const newLang = option.getAttribute('data-lang');
        this.changeLanguage(newLang);
        this.elements.languageSelector.classList.remove('active');
      });
    });

    // Close language selector when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.elements.languageSelector.contains(e.target)) {
        this.elements.languageSelector.classList.remove('active');
      }
    });
  }

  /**
   * Change language with comprehensive content update
   */
  changeLanguage(newLang) {
    this.currentLanguage = newLang;
    
    // Update current language display
    if (this.elements.currentLang) {
      this.elements.currentLang.textContent = newLang.toUpperCase();
    }

    // Update HTML lang attribute
    document.documentElement.lang = newLang;

    // Update all translatable elements
    this.updateTranslations();

    // Track language change
    this.trackUserInteraction('language_change', {
      previousLanguage: this.currentLanguage,
      newLanguage: newLang,
      timestamp: Date.now()
    });

    console.log(`🌍 Language changed to: ${newLang}`);
  }

  /**
   * Update all translatable content based on current language
   */
  updateTranslations() {
    this.elements.translatableElements.forEach(element => {
      const translationKey = element.getAttribute('data-translate');
      const translation = this.getNestedTranslation(translationKey);
      
      if (translation) {
        if (Array.isArray(translation)) {
          // Handle about content paragraphs
          if (element.classList.contains('about-content')) {
            const paragraphs = element.querySelectorAll('p:not(.about-signature *)');
            translation.forEach((text, index) => {
              if (paragraphs[index]) {
                paragraphs[index].textContent = text;
              }
            });
          }
        } else {
          element.textContent = translation;
        }
      }
    });
  }

  /**
   * Get nested translation from key path
   */
  getNestedTranslation(keyPath) {
    const keys = keyPath.split('.');
    let translation = this.translations[this.currentLanguage];
    
    for (const key of keys) {
      if (translation && translation[key]) {
        translation = translation[key];
      } else {
        return null;
      }
    }
    
    return translation;
  }

  /**
   * Enhanced off-canvas menu with sophisticated mobile integration
   */
  initializeOffCanvasMenu() {
    if (!this.elements.menuToggle || !this.elements.offCanvasMenu) return;

    // Main floating menu toggle functionality
    this.elements.menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleOffCanvasMenu();
    });

    // Close button functionality
    if (this.elements.menuCloseBtn) {
      this.elements.menuCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeOffCanvasMenu();
      });
    }

    // Enhanced menu link handling with smooth navigation
    this.elements.menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Close menu with enhanced animation timing
        this.closeOffCanvasMenu();
        
        // Navigate to target with intelligent offset calculation
        if (targetElement) {
          setTimeout(() => {
            const headerOffset = this.calculateDynamicHeaderOffset();
            const offsetTop = targetElement.offsetTop - headerOffset;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }, 300);
        }

        // Track navigation interaction
        this.trackUserInteraction('menu_navigation', {
          target: targetId,
          timestamp: Date.now()
        });
      });
    });

    // Intelligent outside click detection
    document.addEventListener('click', (e) => {
      if (this.isMenuOpen() && 
          !this.elements.offCanvasMenu.contains(e.target) && 
          !this.elements.menuToggle.contains(e.target) &&
          !this.elements.stickyMenuToggle?.contains(e.target)) {
        this.closeOffCanvasMenu();
      }
    });

    // Enhanced keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen()) {
        this.closeOffCanvasMenu();
      }
    });
  }

  /**
   * Toggle off-canvas menu with state management
   */
  toggleOffCanvasMenu() {
    if (this.isMenuOpen()) {
      this.closeOffCanvasMenu();
    } else {
      this.openOffCanvasMenu();
    }
  }

  /**
   * Check if menu is currently open
   */
  isMenuOpen() {
    return this.elements.offCanvasMenu.classList.contains('active');
  }

  /**
   * Calculate dynamic header offset for navigation
   */
  calculateDynamicHeaderOffset() {
    const stickyHeaderVisible = this.elements.stickyHeader?.classList.contains('visible');
    return stickyHeaderVisible ? 100 : 20;
  }

  /**
   * Enhanced menu opening with sophisticated animation sequencing
   */
  openOffCanvasMenu() {
    // Activate menu states
    this.elements.menuToggle.classList.add('active');
    this.elements.offCanvasMenu.classList.add('active');
    
    // Sync sticky menu button if present
    if (this.elements.stickyMenuToggle) {
      this.elements.stickyMenuToggle.classList.add('active');
    }
    
    // Prevent body scroll with enhanced mobile handling
    document.body.style.overflow = 'hidden';
    
    // Add mobile-specific enhancements
    if (this.deviceCapabilities.isMobile) {
      this.elements.offCanvasMenu.style.height = '100vh';
      this.elements.offCanvasMenu.style.overflowY = 'auto';
    }
    
    this.trackUserInteraction('menu_opened', {
      method: 'enhanced_click',
      deviceType: this.detectDeviceType(),
      timestamp: Date.now()
    });
  }

  /**
   * Enhanced menu closing with state cleanup
   */
  closeOffCanvasMenu() {
    // Deactivate menu states
    this.elements.menuToggle.classList.remove('active');
    this.elements.offCanvasMenu.classList.remove('active');
    
    // Sync sticky menu button if present
    if (this.elements.stickyMenuToggle) {
      this.elements.stickyMenuToggle.classList.remove('active');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Reset mobile-specific styles
    if (this.deviceCapabilities.isMobile) {
      this.elements.offCanvasMenu.style.height = '';
      this.elements.offCanvasMenu.style.overflowY = '';
    }
    
    this.trackUserInteraction('menu_closed', {
      timestamp: Date.now()
    });
  }

  /**
   * Initialize flip card functionality
   */
  initializeFlipCards() {
    this.elements.flipCards.forEach((card, index) => {
      // Initialize flip state tracking
      this.flipCardStates.set(index, false);
      
      // Add unique identifier
      card.setAttribute('data-flip-index', index);
    });

    // Bind flip arrow button handlers
    this.elements.flipArrowButtons.forEach(button => {
      button.addEventListener('click', this.handleFlipCardToggle.bind(this));
      
      // Touch optimization for mobile
      if (this.deviceCapabilities.touch) {
        button.addEventListener('touchstart', this.handleFlipCardTouchStart.bind(this), { passive: true });
        button.addEventListener('touchend', this.handleFlipCardTouchEnd.bind(this), { passive: true });
      }
    });
  }

  /**
   * Handle flip card toggle with smooth animation
   */
  handleFlipCardToggle(event) {
    event.preventDefault();
    event.stopPropagation();
    
    const button = event.currentTarget;
    const flipCard = button.closest('.flip-card');
    
    if (!flipCard) return;
    
    const flipIndex = parseInt(flipCard.getAttribute('data-flip-index'));
    const isFlipped = this.flipCardStates.get(flipIndex);
    
    // Toggle flip state
    this.flipCardStates.set(flipIndex, !isFlipped);
    flipCard.classList.toggle('flipped');
    
    // Haptic feedback for mobile
    if (this.deviceCapabilities.touch) {
      this.triggerHapticFeedback();
    }
    
    // Track interaction
    this.trackUserInteraction('flip_card_interaction', {
      cardIndex: flipIndex,
      newState: !isFlipped ? 'before' : 'after',
      interactionMethod: event.type
    });
    
    console.log(`🔄 ${this.translations[this.currentLanguage].interactions.flipCard}: Card ${flipIndex + 1}`);
  }

  /**
   * Touch handlers for flip cards
   */
  handleFlipCardTouchStart(event) {
    this.flipTouchStartTime = performance.now();
    event.currentTarget.style.opacity = '0.8';
  }

  handleFlipCardTouchEnd(event) {
    const touchDuration = performance.now() - this.flipTouchStartTime;
    event.currentTarget.style.opacity = '';
    
    if (touchDuration < 500) {
      this.handleFlipCardToggle(event);
    }
  }

  /**
   * Initialize contact form functionality
   */
  initializeContactForm() {
    if (!this.elements.contactForm) return;

    this.elements.contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleContactFormSubmit();
    });

    // Add floating label effect
    const formInputs = this.elements.contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });

      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });

      // Check if input has value on load
      if (input.value) {
        input.parentElement.classList.add('focused');
      }
    });
  }

  /**
   * Handle contact form submission
   */
  handleContactFormSubmit() {
    const formData = new FormData(this.elements.contactForm);
    const data = Object.fromEntries(formData);
    
    console.log('📧 Contact form submitted:', data);
    
    // Track form submission
    this.trackUserInteraction('contact_form_submitted', {
      timestamp: Date.now(),
      language: this.currentLanguage
    });

    // Show success message
    this.showFormSuccessMessage();
  }

  /**
   * Show form success message
   */
  showFormSuccessMessage() {
    const submitButton = this.elements.contactForm.querySelector('.contact-submit');
    const originalText = submitButton.querySelector('span').textContent;
    
    const successMessages = {
      nl: '✓ Verzonden!',
      en: '✓ Sent!',
      de: '✓ Gesendet!',
      pt: '✓ Enviado!'
    };
    
    submitButton.querySelector('span').textContent = successMessages[this.currentLanguage] || successMessages.nl;
    submitButton.disabled = true;
    
    setTimeout(() => {
      submitButton.querySelector('span').textContent = originalText;
      submitButton.disabled = false;
      this.elements.contactForm.reset();
      
      // Remove focused classes
      const formGroups = this.elements.contactForm.querySelectorAll('.form-group');
      formGroups.forEach(group => group.classList.remove('focused'));
    }, 3000);
  }

  /**
   * Comprehensive event handler binding with performance optimization
   */
  bindEventHandlers() {
    // CTA Button Enhancement
    if (this.elements.ctaButton) {
      this.elements.ctaButton.addEventListener('click', 
        this.throttle(this.handleCTAInteraction.bind(this), 300)
      );
    }

    // Grid Item Interaction Enhancement (excluding flip cards)
    this.elements.gridItems.forEach((item, index) => {
      if (!item.classList.contains('cta-container') && !item.classList.contains('flip-card')) {
        item.addEventListener('click', 
          () => this.handleGridItemInteraction(item, index)
        );
        
        item.addEventListener('mouseenter', 
          () => this.handleGridItemHover(item, true)
        );
        
        item.addEventListener('mouseleave', 
          () => this.handleGridItemHover(item, false)
        );
      }
    });

    // Flip card hover effects
    this.elements.flipCards.forEach((card) => {
      card.addEventListener('mouseenter', () => this.handleFlipCardHover(card, true));
      card.addEventListener('mouseleave', () => this.handleFlipCardHover(card, false));
    });

    // Logo Enhancement
    if (this.elements.logoImage) {
      this.elements.logoImage.addEventListener('click', 
        this.handleLogoInteraction.bind(this)
      );
    }

    // Responsive behavior optimization
    window.addEventListener('resize', 
      this.throttle(this.handleResponsiveAdjustments.bind(this), this.throttleDelay)
    );

    // Keyboard navigation support
    document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this));

    // Smooth scroll for navigation links
    this.implementSmoothScroll();
  }

  /**
   * Handle flip card hover effects
   */
  handleFlipCardHover(card, isHovering) {
    if (this.deviceCapabilities.reducedMotion) return;
    
    const button = card.querySelector('.flip-arrow-btn');
    if (button) {
      if (isHovering) {
        button.style.transform = 'translateY(-2px)';
      } else {
        button.style.transform = '';
      }
    }
  }

  /**
   * Implement smooth scrolling for navigation
   */
  implementSmoothScroll() {
    const sections = ['home', 'projects', 'about', 'contact'].map(id => 
      document.getElementById(id)
    ).filter(el => el);

    // Add scroll observer for section highlighting
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          
          // Update active navigation links
          const sectionId = entry.target.id;
          this.updateActiveNavLinks(sectionId);
        }
      });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
      scrollObserver.observe(section);
    });
  }

  /**
   * Update active navigation links
   */
  updateActiveNavLinks(activeId) {
    // Update sticky header nav links
    if (this.elements.stickyNavLinks) {
      this.elements.stickyNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${activeId}`) {
          link.classList.add('active');
        }
      });
    }

    // Update off-canvas menu links
    this.elements.menuLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Enhanced keyboard navigation with flip card support
   */
  handleKeyboardNavigation(event) {
    const focusedElement = document.activeElement;
    
    // Handle Enter/Space on flip cards
    if ((event.key === 'Enter' || event.key === ' ') && 
        focusedElement.classList.contains('flip-arrow-btn')) {
      event.preventDefault();
      this.handleFlipCardToggle({ 
        currentTarget: focusedElement, 
        type: 'keyboard',
        preventDefault: () => {},
        stopPropagation: () => {}
      });
    }
    
    // Arrow key navigation for flip cards
    if (event.key.startsWith('Arrow') && focusedElement.closest('.flip-card')) {
      this.handleArrowKeyNavigation(event);
    }

    // Escape key to close menu and language selector
    if (event.key === 'Escape') {
      if (this.elements.offCanvasMenu.classList.contains('active')) {
        this.closeOffCanvasMenu();
      }
      if (this.elements.languageSelector.classList.contains('active')) {
        this.elements.languageSelector.classList.remove('active');
      }
    }
  }

  /**
   * Arrow key navigation for flip cards
   */
  handleArrowKeyNavigation(event) {
    const flipCards = Array.from(this.elements.flipCards);
    const currentCard = document.activeElement.closest('.flip-card');
    const currentIndex = flipCards.indexOf(currentCard);
    
    let nextIndex;
    switch (event.key) {
      case 'ArrowRight':
        nextIndex = (currentIndex + 1) % flipCards.length;
        break;
      case 'ArrowLeft':
        nextIndex = (currentIndex - 1 + flipCards.length) % flipCards.length;
        break;
      case 'ArrowDown':
        nextIndex = (currentIndex + 3) % flipCards.length;
        break;
      case 'ArrowUp':
        nextIndex = (currentIndex - 3 + flipCards.length) % flipCards.length;
        break;
      default:
        return;
    }
    
    event.preventDefault();
    const nextButton = flipCards[nextIndex].querySelector('.flip-arrow-btn');
    if (nextButton) {
      nextButton.focus();
    }
  }

  /**
   * Premium CTA interaction with sophisticated micro-animation orchestration
   */
  handleCTAInteraction(event) {
    event.preventDefault();
    
    const button = event.currentTarget;
    const buttonText = button.querySelector('.btn-text');
    const originalText = buttonText.textContent;
    
    // Performance-optimized button interaction sequence
    this.executePremiumButtonAnimation(button, () => {
      // Advanced interaction feedback
      this.triggerHapticFeedback();
      
      // Scroll to about section
      const aboutSection = this.elements.aboutSection;
      if (aboutSection) {
        const offsetTop = aboutSection.offsetTop - 100;
        window.scrollTo({ 
          top: offsetTop,
          behavior: 'smooth' 
        });
      }
      
      console.log('🌟 ' + this.translations[this.currentLanguage].interactions.ctaClick);
      
      this.trackUserInteraction('premium_cta_engagement', {
        buttonText: originalText,
        timestamp: Date.now(),
        deviceCapabilities: this.deviceCapabilities,
        interactionMethod: event.pointerType || 'unknown'
      });
    });
  }

  /**
   * Advanced button animation with hardware-accelerated transforms
   */
  executePremiumButtonAnimation(button, callback) {
    if (this.deviceCapabilities.reducedMotion) {
      callback();
      return;
    }

    const animationSequence = [
      { 
        transform: 'scale(0.95) translateY(-2px)', 
        filter: 'brightness(1.1)',
        duration: 150 
      },
      { 
        transform: 'scale(1.02) translateY(-8px)', 
        filter: 'brightness(1.2)',
        duration: 100 
      },
      { 
        transform: 'scale(1) translateY(-5px)', 
        filter: 'brightness(1)',
        duration: 150 
      }
    ];
    
    this.executeAnimationSequence(button, animationSequence, callback);
  }

  /**
   * Optimized animation sequence processor with RAF optimization
   */
  executeAnimationSequence(element, sequence, callback) {
    let currentStep = 0;
    
    const animate = () => {
      if (currentStep < sequence.length) {
        const step = sequence[currentStep];
        
        requestAnimationFrame(() => {
          element.style.transform = step.transform;
          element.style.filter = step.filter || '';
          
          setTimeout(() => {
            currentStep++;
            animate();
          }, step.duration);
        });
      } else {
        element.style.transform = '';
        element.style.filter = '';
        callback();
      }
    };
    
    animate();
  }

  /**
   * Advanced grid item interaction with contextual intelligence
   */
  handleGridItemInteraction(item, index) {
    // Performance-optimized grid interaction
    this.executePremiumGridAnimation(item, () => {
      console.log(`✨ ${this.translations[this.currentLanguage].interactions.gridClick}: Item ${index + 1}`);
      
      // Advanced interaction tracking with contextual data
      this.trackUserInteraction('premium_portfolio_engagement', {
        index: index,
        gridPosition: { 
          row: Math.floor(index / 3), 
          col: index % 3 
        },
        viewportPosition: this.calculateViewportPosition(item),
        interactionContext: this.analyzeInteractionContext(item)
      });
    });
  }

  /**
   * Sophisticated grid animation with 3D transforms and luxury effects
   */
  executePremiumGridAnimation(item, callback) {
    if (this.deviceCapabilities.reducedMotion) {
      callback();
      return;
    }

    const timeline = [
      { 
        transform: 'translateY(-5px) rotateX(2deg) rotateY(2deg) scale(0.98)', 
        filter: 'brightness(1.1) contrast(1.1)',
        duration: 200 
      },
      { 
        transform: 'translateY(-15px) rotateX(5deg) rotateY(5deg) scale(1.02)', 
        filter: 'brightness(1.2) contrast(1.2)',
        duration: 150 
      },
      { 
        transform: 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)', 
        filter: 'brightness(1) contrast(1)',
        duration: 250 
      }
    ];
    
    this.executeAnimationSequence(item, timeline, callback);
  }

  /**
   * Advanced viewport position calculation for interaction analytics
   */
  calculateViewportPosition(element) {
    const rect = element.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    return {
      centerX: (rect.left + rect.width / 2) / viewport.width,
      centerY: (rect.top + rect.height / 2) / viewport.height,
      visibility: this.calculateElementVisibility(rect, viewport)
    };
  }

  /**
   * Element visibility calculation for advanced analytics
   */
  calculateElementVisibility(rect, viewport) {
    const visibleWidth = Math.max(0, Math.min(rect.right, viewport.width) - Math.max(rect.left, 0));
    const visibleHeight = Math.max(0, Math.min(rect.bottom, viewport.height) - Math.max(rect.top, 0));
    const visibleArea = visibleWidth * visibleHeight;
    const totalArea = rect.width * rect.height;
    
    return totalArea > 0 ? visibleArea / totalArea : 0;
  }

  /**
   * Contextual interaction analysis for advanced user experience optimization
   */
  analyzeInteractionContext(item) {
    const isFirstInteraction = this.performanceMetrics.interactionCount === 0;
    const timeSinceLoad = performance.now() - this.performanceMetrics.loadTime;
    const scrollPosition = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    return {
      isFirstInteraction,
      timeSinceLoad,
      scrollPosition,
      deviceType: this.detectDeviceType(),
      interactionPattern: this.analyzeInteractionPattern()
    };
  }

  /**
   * Intelligent device type detection with enhanced accuracy
   */
  detectDeviceType() {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      ratio: window.innerWidth / window.innerHeight
    };
    
    if (this.deviceCapabilities.touch) {
      if (viewport.width <= 768) return 'mobile';
      if (viewport.width <= 1024) return 'tablet';
      return 'touch-desktop';
    }
    
    if (viewport.width <= 1024) return 'small-desktop';
    if (viewport.width <= 1440) return 'desktop';
    if (viewport.width <= 2560) return 'large-desktop';
    return 'ultrawide';
  }

  /**
   * Advanced interaction pattern analysis for user behavior insights
   */
  analyzeInteractionPattern() {
    this.performanceMetrics.interactionCount++;
    
    return {
      interactionCount: this.performanceMetrics.interactionCount,
      flipInteractionCount: this.performanceMetrics.flipInteractionCount,
      averageInteractionTime: this.calculateAverageInteractionTime(),
      preferredInteractionMethod: this.detectPreferredInteractionMethod(),
      engagementLevel: this.calculateEngagementLevel()
    };
  }

  /**
   * Calculate average interaction time
   */
  calculateAverageInteractionTime() {
    const currentTime = performance.now();
    const totalTime = currentTime - this.performanceMetrics.loadTime;
    return totalTime / Math.max(1, this.performanceMetrics.interactionCount);
  }

  /**
   * Detect preferred interaction method
   */
  detectPreferredInteractionMethod() {
    return this.deviceCapabilities.touch ? 'touch' : 'mouse';
  }

  /**
   * Calculate engagement level
   */
  calculateEngagementLevel() {
    const interactions = this.performanceMetrics.interactionCount;
    const flipInteractions = this.performanceMetrics.flipInteractionCount;
    const totalInteractions = interactions + flipInteractions;
    
    if (totalInteractions < 3) return 'low';
    if (totalInteractions < 10) return 'medium';
    return 'high';
  }

  /**
   * Haptic feedback implementation for premium mobile experience
   */
  triggerHapticFeedback() {
    if ('vibrate' in navigator && this.deviceCapabilities.touch) {
      // Subtle, premium haptic pattern
      navigator.vibrate([10, 20, 5]);
    }
  }

  /**
   * Handle grid item hover
   */
  handleGridItemHover(item, isHovering) {
    if (this.deviceCapabilities.reducedMotion) return;
    
    if (isHovering) {
      item.style.transform = 'translateY(-4px)';
      item.style.transition = 'transform 0.3s ease-out';
    } else {
      item.style.transform = '';
    }
  }

  /**
   * Handle logo interaction
   */
  handleLogoInteraction(event) {
    console.log('🏠 ' + this.translations[this.currentLanguage].interactions.logoClick);
    
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    this.trackUserInteraction('logo_click', {
      timestamp: Date.now()
    });
  }

  /**
   * Accessibility enhancement implementation
   */
  initializeAccessibilityFeatures() {
    // Enhanced keyboard navigation for flip cards
    this.elements.flipCards.forEach((card, index) => {
      const button = card.querySelector('.flip-arrow-btn');
      if (button) {
        button.setAttribute('role', 'button');
        button.setAttribute('aria-label', 
          this.translations[this.currentLanguage].accessibility?.beforeAfterToggle || 
          'Toggle before and after view'
        );
        button.setAttribute('aria-pressed', 'false');
        button.setAttribute('tabindex', '0');
      }
    });

    // Grid items accessibility
    this.elements.gridItems.forEach((item, index) => {
      if (!item.classList.contains('flip-card') && !item.classList.contains('cta-container')) {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View project ${index + 1}`);
      }
    });

    // CTA button accessibility
    if (this.elements.ctaButton) {
      this.elements.ctaButton.setAttribute('aria-describedby', 'cta-description');
    }

    // Back to top accessibility
    if (this.elements.backToTop) {
      this.elements.backToTop.setAttribute('tabindex', '0');
    }

    // Focus management
    this.implementFocusManagement();
  }

  /**
   * Advanced focus management for keyboard users
   */
  implementFocusManagement() {
    let focusableElements = [];
    
    const updateFocusableElements = () => {
      focusableElements = Array.from(
        this.elements.container.querySelectorAll(
          'button, [tabindex="0"], a, input, select, textarea'
        )
      );
    };
    
    updateFocusableElements();
    
    // Update on DOM changes
    const focusObserver = new MutationObserver(updateFocusableElements);
    focusObserver.observe(this.elements.container, {
      childList: true,
      subtree: true
    });
  }

  /**
   * Optimize image loading
   */
  optimizeImageLoading() {
    const images = this.elements.gridImages;
    
    images.forEach(img => {
      // Add mobile-specific loading attributes
      if (this.deviceCapabilities.isMobile) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }
      
      img.addEventListener('load', () => {
        img.classList.add('loaded');
        img.parentElement.classList.remove('loading');
      });
      
      img.addEventListener('error', () => {
        img.parentElement.classList.remove('loading');
        img.parentElement.classList.add('error');
        console.warn('Failed to load image:', img.src);
        
        // Show fallback for mobile
        if (this.deviceCapabilities.isMobile) {
          this.showImageFallback(img);
        }
      });
      
      // Force load for placeholder images
      if (img.complete) {
        img.classList.add('loaded');
      }
      
      // Add loading state
      img.parentElement.classList.add('loading');
    });
    
    // Mobile-specific optimizations
    if (this.deviceCapabilities.isMobile) {
      this.optimizeImagesForMobile();
    }
  }

  /**
   * Mobile-specific image optimizations
   */
  optimizeImagesForMobile() {
    const images = this.elements.gridImages;
    
    images.forEach(img => {
      // Optimize for mobile viewport
      if (img.src && !img.src.includes('data:image/svg+xml')) {
        // Add mobile-specific error handling
        img.addEventListener('error', () => {
          this.showImageFallback(img);
        });
      }
    });
  }

  /**
   * Show fallback for failed images on mobile
   */
  showImageFallback(img) {
    const wrapper = img.closest('.project-image-wrapper');
    if (wrapper) {
      wrapper.innerHTML = `
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
          border-radius: var(--border-radius-medium);
        ">
          <div>
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🖼️</div>
            <div>Afbeelding niet beschikbaar</div>
          </div>
        </div>
      `;
    }
  }

  /**
   * Advanced touch interaction system optimized for premium mobile experience
   */
  initializeTouchInteractions() {
    if (!this.deviceCapabilities.touch) return;

    // Touch interactions for non-flip grid items
    this.elements.gridItems.forEach((item, index) => {
      if (item.classList.contains('cta-container') || item.classList.contains('flip-card')) return;

      // Enhanced touch event handlers with gesture recognition
      item.addEventListener('touchstart', (e) => this.handleTouchStart(e, item, index), { passive: true });
      item.addEventListener('touchmove', (e) => this.handleTouchMove(e, item), { passive: true });
      item.addEventListener('touchend', (e) => this.handleTouchEnd(e, item, index), { passive: true });
    });

    // Premium CTA touch interactions
    if (this.elements.ctaButton) {
      this.elements.ctaButton.addEventListener('touchstart', this.handleCTATouchStart.bind(this), { passive: true });
      this.elements.ctaButton.addEventListener('touchend', this.handleCTATouchEnd.bind(this), { passive: true });
    }
  }

  /**
   * Enhanced touch start handler with premium interaction feedback
   */
  handleTouchStart(event, item, index) {
    this.touchStartTime = performance.now();
    
    // Prevent default to avoid unwanted behaviors on mobile
    event.preventDefault();
    
    // Immediate visual feedback for premium touch experience
    requestAnimationFrame(() => {
      item.style.transform = 'scale(0.98) translateY(-2px)';
      item.style.transition = 'transform 0.1s ease-out';
    });

    // Haptic feedback for mobile devices
    if (this.deviceCapabilities.touch && navigator.vibrate) {
      navigator.vibrate(10);
    }

    this.trackUserInteraction('premium_touch_start', {
      index,
      timestamp: this.touchStartTime
    });
  }

  /**
   * Touch move handler for gesture recognition
   */
  handleTouchMove(event, item) {
    // Implement swipe gesture detection for future enhancement
    const touch = event.touches[0];
    if (touch) {
      this.lastTouchPosition = { x: touch.clientX, y: touch.clientY };
    }
  }

  /**
   * Enhanced touch end handler with interaction completion
   */
  handleTouchEnd(event, item, index) {
    const touchDuration = performance.now() - this.touchStartTime;
    
    // Reset visual state with premium animation
    requestAnimationFrame(() => {
      item.style.transform = '';
      item.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });

    // Trigger interaction if touch duration indicates intent
    if (touchDuration < 500) {
      setTimeout(() => this.handleGridItemInteraction(item, index), 50);
    }

    this.trackUserInteraction('premium_touch_end', {
      duration: touchDuration,
      index,
      wasQuickTap: touchDuration < 200
    });
  }

  /**
   * Premium CTA touch interaction handlers
   */
  handleCTATouchStart(event) {
    this.touchStartTime = performance.now();
    this.triggerHapticFeedback();
  }

  handleCTATouchEnd(event) {
    const touchDuration = performance.now() - this.touchStartTime;
    if (touchDuration < 500) {
      this.handleCTAInteraction(event);
    }
  }

  /**
   * Professional responsive optimization with intelligent device adaptation
   */
  handleResponsiveAdjustments() {
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
      orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
    };

    // Update device capabilities
    this.deviceCapabilities = this.analyzeDeviceCapabilities();

    const deviceType = this.detectDeviceType();
    this.applyResponsiveOptimizations(deviceType, viewport);
    
    console.log(`📱 Professional responsive optimization applied: ${deviceType}`, viewport);
  }

  /**
   * Professional responsive optimization implementation
   */
  applyResponsiveOptimizations(deviceType, viewport) {
    switch (deviceType) {
      case 'mobile':
        this.optimizeForMobile(viewport);
        break;
      case 'tablet':
        this.optimizeForTablet(viewport);
        break;
      case 'desktop':
      case 'large-desktop':
        this.optimizeForDesktop(viewport);
        break;
    }
  }

  /**
   * Mobile-first optimization for professional touch experience
   */
  optimizeForMobile(viewport) {
    // Optimize grid items for mobile
    this.elements.gridItems.forEach(item => {
      item.style.minHeight = '220px';
      item.style.touchAction = 'manipulation';
      item.style.webkitTapHighlightColor = 'transparent';
      item.style.userSelect = 'none';
      item.style.webkitUserSelect = 'none';
    });

    // Optimize flip cards for mobile
    this.elements.flipCards.forEach(card => {
      card.style.touchAction = 'manipulation';
      card.style.webkitTapHighlightColor = 'transparent';
    });

    // Optimize flip buttons for mobile
    this.elements.flipArrowButtons.forEach(button => {
      button.style.touchAction = 'manipulation';
      button.style.webkitTapHighlightColor = 'transparent';
      button.style.minWidth = '44px';
      button.style.minHeight = '44px';
    });

    // Container optimization
    if (this.elements.container) {
      this.elements.container.style.padding = '8px';
    }

    // Optimize images for mobile
    this.elements.gridImages.forEach(img => {
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center';
    });

    // Add mobile-specific classes
    document.body.classList.add('mobile-device');
    
    console.log('📱 Mobile optimizations applied');
  }

  /**
   * Tablet optimization for balanced interaction patterns
   */
  optimizeForTablet(viewport) {
    this.elements.gridItems.forEach(item => {
      item.style.minHeight = '200px';
      item.style.touchAction = 'manipulation';
    });
  }

  /**
   * Desktop optimization for precision interactions
   */
  optimizeForDesktop(viewport) {
    this.elements.gridItems.forEach(item => {
      item.style.minHeight = '';
      item.style.touchAction = '';
    });
  }

  /**
   * Professional analytics integration with comprehensive event tracking
   */
  trackUserInteraction(action, data = {}) {
    const eventData = {
      action,
      timestamp: new Date().toISOString(),
      sessionId: this.generateSessionId(),
      language: this.currentLanguage,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio,
        orientation: window.innerHeight > window.innerWidth ? 'portrait' : 'landscape'
      },
      performance: {
        loadTime: this.performanceMetrics.loadTime,
        currentTime: performance.now(),
        connectionType: navigator.connection?.effectiveType || 'unknown'
      },
      deviceCapabilities: this.deviceCapabilities,
      ...data
    };

    console.log('📊 Professional user interaction analytics:', eventData);
    
    // Update flip interaction counter
    if (action === 'flip_card_interaction') {
      this.performanceMetrics.flipInteractionCount++;
    }
    
    this.performanceMetrics.interactionCount++;
  }

  /**
   * Session ID generation for analytics correlation
   */
  generateSessionId() {
    if (!this.sessionId) {
      this.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    return this.sessionId;
  }

  /**
   * Professional fallback initialization with comprehensive error handling
   */
  fallbackInitialization() {
    console.warn('🔄 Executing professional fallback initialization with error recovery');
    
    try {
      const essentialElements = {
        ctaButton: document.getElementById('discoverBtn'),
        gridItems: document.querySelectorAll('.grid-item'),
        container: document.querySelector('.container'),
        flipCards: document.querySelectorAll('.flip-card'),
        flipArrowButtons: document.querySelectorAll('.flip-arrow-btn'),
        languageSelector: document.getElementById('languageSelector'),
        menuToggle: document.getElementById('menuToggle'),
        offCanvasMenu: document.getElementById('offCanvasMenu'),
        backToTop: document.getElementById('backToTop'),
        stickyHeader: document.getElementById('stickyHeader')
      };
      
      // Professional CTA fallback
      if (essentialElements.ctaButton) {
        essentialElements.ctaButton.addEventListener('click', (e) => {
          e.preventDefault();
          const aboutSection = document.querySelector('.about-section');
          if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
          }
          console.log('Professional CTA interaction - Fallback mode');
        });
      }
      
      // Professional grid interaction fallback
      essentialElements.gridItems.forEach((item, index) => {
        if (!item.classList.contains('cta-container') && !item.classList.contains('flip-card')) {
          item.addEventListener('click', () => {
            console.log(`Professional grid interaction - Item ${index + 1}`);
          });
        }
      });

      // Flip card fallback
      essentialElements.flipArrowButtons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const flipCard = button.closest('.flip-card');
          if (flipCard) {
            flipCard.classList.toggle('flipped');
            console.log(`Flip card interaction - Fallback mode - Card ${index + 1}`);
          }
        });
      });

      // Language selector fallback
      this.initializeLanguageSelectorFallback(essentialElements);

      // Menu toggle fallback
      this.initializeMenuFallback(essentialElements);

      // Back to top fallback
      this.initializeBackToTopFallback(essentialElements);

      // Sticky header fallback
      this.initializeStickyHeaderFallback(essentialElements);

      this.implementBasicAccessibility(essentialElements);
      
    } catch (error) {
      console.error('❌ Critical fallback initialization failure:', error);
      this.implementMinimalFunctionality();
    }
  }

  /**
   * Initialize language selector fallback
   */
  initializeLanguageSelectorFallback(elements) {
    if (elements.languageSelector) {
      const langToggle = elements.languageSelector.querySelector('.lang-toggle');
      const langOptions = elements.languageSelector.querySelectorAll('.lang-option');
      
      if (langToggle) {
        langToggle.addEventListener('click', () => {
          elements.languageSelector.classList.toggle('active');
        });
      }
      
      langOptions.forEach(option => {
        option.addEventListener('click', () => {
          const lang = option.getAttribute('data-lang');
          const currentLang = document.querySelector('.current-lang');
          if (currentLang) {
            currentLang.textContent = lang.toUpperCase();
          }
          document.documentElement.lang = lang;
          elements.languageSelector.classList.remove('active');
          console.log(`Language changed to: ${lang} - Fallback mode`);
        });
      });
    }
  }

  /**
   * Initialize menu fallback with comprehensive sticky header integration
   */
  initializeMenuFallback(elements) {
    if (elements.menuToggle && elements.offCanvasMenu) {
      // Main floating menu toggle
      elements.menuToggle.addEventListener('click', () => {
        this.toggleMenuFallback(elements);
      });

      // Sticky header menu toggle integration
      const stickyMenuToggle = document.getElementById('stickyMenuToggle');
      if (stickyMenuToggle) {
        stickyMenuToggle.addEventListener('click', () => {
          this.toggleMenuFallback(elements);
          // Sync button states
          if (elements.offCanvasMenu.classList.contains('active')) {
            stickyMenuToggle.classList.add('active');
          } else {
            stickyMenuToggle.classList.remove('active');
          }
        });
      }

      // Enhanced menu links with intelligent navigation
      const menuLinks = elements.offCanvasMenu.querySelectorAll('.menu-list a');
      menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          // Close menu with state cleanup
          this.closeMenuFallback(elements);
          
          // Navigate with dynamic offset calculation
          if (targetElement) {
            setTimeout(() => {
              const headerOffset = this.calculateFallbackHeaderOffset();
              const offsetTop = targetElement.offsetTop - headerOffset;
              window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
              });
            }, 300);
          }
        });
      });
    }
  }

  /**
   * Toggle menu with comprehensive state management
   */
  toggleMenuFallback(elements) {
    const isActive = elements.offCanvasMenu.classList.contains('active');
    
    if (isActive) {
      this.closeMenuFallback(elements);
    } else {
      this.openMenuFallback(elements);
    }
  }

  /**
   * Open menu with enhanced mobile experience
   */
  openMenuFallback(elements) {
    elements.menuToggle.classList.add('active');
    elements.offCanvasMenu.classList.add('active');
    
    // Sync sticky menu button
    const stickyMenuToggle = document.getElementById('stickyMenuToggle');
    if (stickyMenuToggle) {
      stickyMenuToggle.classList.add('active');
    }
    
    // Enhanced body scroll prevention
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    
    console.log('Menu opened - Fallback mode with enhanced integration');
  }

  /**
   * Close menu with complete state restoration
   */
  closeMenuFallback(elements) {
    elements.menuToggle.classList.remove('active');
    elements.offCanvasMenu.classList.remove('active');
    
    // Sync sticky menu button
    const stickyMenuToggle = document.getElementById('stickyMenuToggle');
    if (stickyMenuToggle) {
      stickyMenuToggle.classList.remove('active');
    }
    
    // Restore body scroll state
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
  }

  /**
   * Calculate fallback header offset for navigation
   */
  calculateFallbackHeaderOffset() {
    const stickyHeader = document.getElementById('stickyHeader');
    const isHeaderVisible = stickyHeader?.classList.contains('visible');
    return isHeaderVisible ? 100 : 20;
  }

  /**
   * Initialize back to top fallback
   */
  initializeBackToTopFallback(elements) {
    if (elements.backToTop) {
      // Show/hide based on scroll
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          elements.backToTop.classList.add('visible');
        } else {
          elements.backToTop.classList.remove('visible');
        }
      });

      elements.backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  /**
   * Initialize sticky header fallback
   */
  initializeStickyHeaderFallback(elements) {
    if (elements.stickyHeader) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
          elements.stickyHeader.classList.add('visible');
        } else {
          elements.stickyHeader.classList.remove('visible');
        }
      });

      // Handle sticky nav links
      const stickyNavLinks = elements.stickyHeader.querySelectorAll('.sticky-nav-list a');
      stickyNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            const offsetTop = targetElement.offsetTop - 100;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          }
        });
      });
    }
  }

  /**
   * Basic accessibility implementation for fallback mode
   */
  implementBasicAccessibility(elements) {
    elements.gridItems.forEach((item, index) => {
      if (!item.classList.contains('flip-card') && !item.classList.contains('cta-container')) {
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `View portfolio item ${index + 1}`);
      }
    });

    elements.flipArrowButtons.forEach(button => {
      button.setAttribute('role', 'button');
      button.setAttribute('aria-label', 'Toggle before and after view');
      button.setAttribute('tabindex', '0');
    });

    if (elements.ctaButton) {
      elements.ctaButton.setAttribute('aria-describedby', 'cta-description');
    }

    if (elements.menuToggle) {
      elements.menuToggle.setAttribute('aria-label', 'Toggle navigation menu');
      elements.menuToggle.setAttribute('aria-expanded', 'false');
    }

    if (elements.backToTop) {
      elements.backToTop.setAttribute('aria-label', 'Back to top');
      elements.backToTop.setAttribute('tabindex', '0');
    }
  }

  /**
   * Minimal functionality for critical failure scenarios
   */
  implementMinimalFunctionality() {
    document.addEventListener('click', (event) => {
      const target = event.target;
      
      if (target.closest('#discoverBtn')) {
        console.log('Minimal CTA interaction');
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (target.classList.contains('flip-arrow-btn')) {
        const flipCard = target.closest('.flip-card');
        if (flipCard) {
          flipCard.classList.toggle('flipped');
          console.log('Minimal flip card interaction');
        }
      } else if (target.closest('.grid-item')) {
        console.log('Minimal grid interaction');
      } else if (target.closest('#menuToggle')) {
        const menuToggle = document.getElementById('menuToggle');
        const offCanvasMenu = document.getElementById('offCanvasMenu');
        if (menuToggle && offCanvasMenu) {
          menuToggle.classList.toggle('active');
          offCanvasMenu.classList.toggle('active');
          console.log('Minimal menu toggle');
        }
      } else if (target.closest('.lang-toggle')) {
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
          languageSelector.classList.toggle('active');
          console.log('Minimal language selector toggle');
        }
      } else if (target.classList.contains('lang-option')) {
        const lang = target.getAttribute('data-lang');
        console.log(`Minimal language change to: ${lang}`);
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
          languageSelector.classList.remove('active');
        }
      } else if (target.closest('#backToTop')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Minimal back to top');
      }
    });

    // Basic form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Minimal contact form submission');
        alert('Thank you for your message! We will get back to you soon.');
      });
    }

    // Basic scroll handling
    window.addEventListener('scroll', () => {
      const backToTop = document.getElementById('backToTop');
      const stickyHeader = document.getElementById('stickyHeader');
      
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }

      if (stickyHeader) {
        if (window.scrollY > 80) {
          stickyHeader.classList.add('visible');
        } else {
          stickyHeader.classList.remove('visible');
        }
      }
    });
  }
}

// Initialize the enhanced professional interface system with comprehensive error handling
try {
  const enhancedDesignInterface = new EnhancedInteriorDesignInterface();
  
  // Global accessibility for development and integration
  window.JeanetteGasselingInterface = enhancedDesignInterface;
  
} catch (error) {
  console.error('❌ Enhanced professional interface initialization failed:', error);
  
  // Minimal fallback implementation
  document.addEventListener('DOMContentLoaded', () => {
    console.log('🔄 Minimal fallback mode activated');
    
    // Basic click handling
    document.addEventListener('click', (event) => {
      if (event.target.closest('#discoverBtn')) {
        console.log('Basic CTA interaction');
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (event.target.classList.contains('flip-arrow-btn')) {
        const flipCard = event.target.closest('.flip-card');
        if (flipCard) {
          flipCard.classList.toggle('flipped');
        }
      } else if (event.target.closest('.grid-item')) {
        console.log('Basic grid interaction');
      } else if (event.target.closest('#menuToggle')) {
        const menuToggle = document.getElementById('menuToggle');
        const offCanvasMenu = document.getElementById('offCanvasMenu');
        if (menuToggle && offCanvasMenu) {
          menuToggle.classList.toggle('active');
          offCanvasMenu.classList.toggle('active');
        }
      } else if (event.target.closest('.lang-toggle')) {
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
          languageSelector.classList.toggle('active');
        }
      } else if (event.target.classList.contains('lang-option')) {
        const lang = event.target.getAttribute('data-lang');
        document.documentElement.lang = lang;
        const currentLang = document.querySelector('.current-lang');
        if (currentLang) {
          currentLang.textContent = lang.toUpperCase();
        }
        const languageSelector = document.getElementById('languageSelector');
        if (languageSelector) {
          languageSelector.classList.remove('active');
        }
      } else if (event.target.closest('#backToTop')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });

    // Basic form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('.contact-submit');
        const originalText = submitButton.querySelector('span').textContent;
        submitButton.querySelector('span').textContent = '✓ Sent!';
        submitButton.disabled = true;
        
        setTimeout(() => {
          submitButton.querySelector('span').textContent = originalText;
          submitButton.disabled = false;
          contactForm.reset();
        }, 3000);
      });
    }

    // Basic scroll handling
    window.addEventListener('scroll', () => {
      const backToTop = document.getElementById('backToTop');
      const stickyHeader = document.getElementById('stickyHeader');
      
      if (backToTop) {
        if (window.scrollY > 300) {
          backToTop.classList.add('visible');
        } else {
          backToTop.classList.remove('visible');
        }
      }

      if (stickyHeader) {
        if (window.scrollY > 80) {
          stickyHeader.classList.add('visible');
        } else {
          stickyHeader.classList.remove('visible');
        }
      }
    });

    // Set current year in footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear();
    }

    // Add page load animation
    document.body.classList.add('loading');
    setTimeout(() => {
      document.body.classList.remove('loading');
      document.body.classList.add('loaded');
    }, 100);
  });
}

// Professional module export for integration flexibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = EnhancedInteriorDesignInterface;
}