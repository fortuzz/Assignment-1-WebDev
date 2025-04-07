// Enhanced navigation animation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', (e) => {
        // Create dancing effect
        gsap.to(e.target, {
            y: -5,
            scale: 1.05,
            color: '#6B8E23',
            duration: 0.3,
            ease: 'back.out'
        });
        
        // Pulse animation
        const pulse = () => {
            gsap.to(e.target, {
                scale: 1.1,
                duration: 0.8,
                yoyo: true,
                repeat: 1,
                ease: 'sine.inOut'
            });
        };
        
        // Start pulse after initial animation
        setTimeout(pulse, 300);
    });
    
    link.addEventListener('mouseleave', (e) => {
        gsap.to(e.target, {
            y: 0,
            scale: 1,
            color: '#0D1B2A',
            duration: 0.5,
            ease: 'elastic.out'
        });
    });
});

// Profile picture parallax effect
const profilePic = document.querySelector('.profile-pic');
window.addEventListener('mousemove', (e) => {
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    profilePic.style.transform = `perspective(1000px) rotateY(${-xAxis}deg) rotateX(${yAxis}deg)`;
});