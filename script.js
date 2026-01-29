document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------- */
    /*                         Advanced Scroll Observer                           */
    /* -------------------------------------------------------------------------- */
    // Trigger when 20% of the element is visible
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add 'visible' class to trigger CSS animations
                entry.target.classList.add('visible');

                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe standard fade-in elements
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // Observe special blur-in elements (Hero Title)
    const blurElements = document.querySelectorAll('.blur-in-up');
    blurElements.forEach(el => observer.observe(el));

    // Observe Hero Visual for 3D Lift
    const heroVisual = document.querySelector('.visual-container');
    if (heroVisual) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('lifting-active');
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        heroObserver.observe(heroVisual);
    }

    /* -------------------------------------------------------------------------- */
    /*                             Sticky Navbar Logic                            */
    /* -------------------------------------------------------------------------- */
    const navbar = document.querySelector('.navbar');

    // Check loop for smoother scroll handling or just use event listener
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 50;

        // Only toggle class if state changes to avoid simple thrashing
        if (scrolled && !navbar.classList.contains('scrolled')) {
            navbar.classList.add('scrolled');
        } else if (!scrolled && navbar.classList.contains('scrolled')) {
            navbar.classList.remove('scrolled');
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                             Smooth Anchor Scroll                           */
    /* -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* -------------------------------------------------------------------------- */
    /*                              FAQ Accordion                                 */
    /* -------------------------------------------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other open items (optional: remove this block for multi-open)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

});
