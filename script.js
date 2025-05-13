// Počkáme, až se celý DOM načte
document.addEventListener('DOMContentLoaded', function() {
    // Získání referencí na elementy
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');
    const header = document.querySelector('header');
    const contactForm = document.getElementById('contactForm');
    const skillLevels = document.querySelectorAll('.skill-level');

    // Toggle menu na mobilních zařízeních
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        // Animace hamburger ikony
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });

    // Zavření menu po kliknutí na odkaz
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });

    // Změna stylu header při scrollování
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.padding = '10px 50px';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 50px';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Plynulé scrollování na kliknutí na odkaz
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - header.offsetHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animace skill barů při scrollování
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Získání všech skill levelů v sekci
                const skills = entry.target.querySelectorAll('.skill-level');
                
                // Animace každého skill baru
                skills.forEach(skill => {
                    const width = skill.style.width;
                    skill.style.width = 0;
                    setTimeout(() => {
                        skill.style.width = width;
                    }, 300);
                });
                
                // Odpojení observer po provedení animace
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Sledování skills sekce
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Validace a odeslání kontaktního formuláře
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Získání hodnot z formuláře
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Jednoduchá validace emailu
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Zadejte prosím platnou emailovou adresu.');
                return;
            }
            
            // Zde by došlo k odeslání formuláře na server
            // Pro účely ukázky pouze vypíšeme potvrzení
            alert(`Děkujeme za zprávu, ${name}! Odpovíme co nejdříve.`);
            contactForm.reset();
        });
    }
    
    // Animace zobrazení projektů při scrollování
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Nastavení výchozího stylu a sledování projektů
    projectCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease';
        projectObserver.observe(card);
    });
});