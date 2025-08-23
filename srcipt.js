const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileNavToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile nav if open
                    if (navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        const icon = mobileNavToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Sticky header
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.style.padding = '15px 0';
                header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '20px 0';
                header.style.boxShadow = 'none';
            }
        });
        
        // Go to top button
        const goTopBtn = document.querySelector('.go-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                goTopBtn.classList.add('active');
            } else {
                goTopBtn.classList.remove('active');
            }
        });
        
        goTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Tab functionality for experience section
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panels
                tabBtns.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button and corresponding panel
                btn.classList.add('active');
                tabPanels[index].classList.add('active');
            });
        });

        // Add animation on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all sections for animation
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = 0;
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            observer.observe(section);
        });
        
        // Typing animation for the title
        function typeWriter(element, text, speed) {
            let i = 0;
            element.innerHTML = "";
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    // Keep the cursor blinking after finishing
                    element.style.borderRight = "2px solid " + getComputedStyle(document.documentElement).getPropertyValue('--primary');
                }
            }
            
            type();
        }
        
        // Start typing animation when page loads
        window.addEventListener('DOMContentLoaded', (event) => {
            const typingElement = document.querySelector('.typing-text');
            const text = "Computer Engineer & Developer";
            typeWriter(typingElement, text, 100);
        });

        // Navigation indicator animation
        const navIndicator = document.querySelector('.nav-indicator');
        const navItems = document.querySelectorAll('.nav-links a');
        
        function updateIndicator(el) {
            navIndicator.style.width = `${el.offsetWidth}px`;
            navIndicator.style.left = `${el.offsetLeft}px`;
        }
        
        // Set initial active item
        const activeNavItem = document.querySelector('.nav-links a.active');
        if (activeNavItem) {
            updateIndicator(activeNavItem);
        }
        
        // Update indicator on hover
        navItems.forEach(item => {
            item.addEventListener('mouseenter', (e) => {
                updateIndicator(e.target);
            });
            
            item.addEventListener('click', (e) => {
                navItems.forEach(item => item.classList.remove('active'));
                e.target.classList.add('active');
                updateIndicator(e.target);
            });
        });
        
        // Update indicator when scrolling to section
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === current) {
                    item.classList.add('active');
                    updateIndicator(item);
                }
            });
        });

        // Button functionality
        document.getElementById('contact-btn').addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });

        document.getElementById('projects-btn').addEventListener('click', () => {
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        });

        const resumeButtons = document.querySelectorAll('#header-resume-btn, #profile-resume-btn');
        resumeButtons.forEach(button => {
            button.addEventListener('click', () => {
                // In a real scenario, this would link to your actual resume
                alert('Resume download would start here. In a real implementation, this would link to your resume file.');
                // window.open('path-to-your-resume.pdf', '_blank');
            });
        });