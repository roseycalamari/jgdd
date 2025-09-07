/**
 * Jeanette Gasseling Website Configuration
 * 
 * IMPORTANT: Update these values with your actual information
 */

const CONFIG = {
    // Google Analytics Configuration
    analytics: {
        measurementId: 'GA_MEASUREMENT_ID', // Replace with your actual G-XXXXXXXXXX ID
        enabled: true
    },
    
    // Formspree Configuration
    formspree: {
        formId: 'xjkoyypb', // Replace with your actual Formspree form ID
        enabled: true
    },
    
    // Contact Information
    contact: {
        phone: '+31 6 21525376', // Replace with your actual phone number
        email: 'info@jgdecodesign.com', // Replace with your actual email
        whatsapp: '31621525376' // Replace with your actual WhatsApp number
    },
    
    // Social Media Links
    social: {
        instagram: 'https://www.instagram.com/jeanettegasselingdecoanddesign',
        whatsapp: 'https://wa.me/31621525376'
    },
    
    // Business Information
    business: {
        name: 'Jeanette Gasseling Deco & Design',
        tagline: 'Tijdloze elegantie & verfijnde stijl',
        locations: {
            portugal: {
                country: 'PT',
                address: 'Beco da Águia da cabeça branca 35',
                city: '8200-373 Albufeira'
            },
            netherlands: {
                country: 'NL',
                address: 'Kolenbergstraat 40',
                city: '1695 CD Blokker'
            }
        }
    },

    // Translation Keys
    translations: {
        nl: {
            projects: {
                title: 'Mijn Projecten',
                subtitle: 'Ontdek de transformatie van ruimtes'
            }
        },
        en: {
            projects: {
                title: 'My Projects',
                subtitle: 'Discover the transformation of spaces'
            }
        },
        de: {
            projects: {
                title: 'Meine Projekte',
                subtitle: 'Entdecken Sie die Transformation von Räumen'
            }
        },
        pt: {
            projects: {
                title: 'Meus Projetos',
                subtitle: 'Descubra a transformação dos espaços'
            }
        }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
} else {
    window.CONFIG = CONFIG;
}

