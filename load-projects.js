document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements
    const projectContainer = document.getElementById('projectContainer');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Function to load project content
    function loadProject(url) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                // Create temporary DOM element to parse the response
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;
                
                // Extract just the project content (assuming each project has a <main> tag)
                const projectContent = tempDiv.querySelector('main') || tempDiv.querySelector('.game-container') || tempDiv;
                
                // Update the project container
                projectContainer.innerHTML = projectContent.innerHTML;
                
                // Re-apply any scripts (needed for interactive projects)
                const scripts = projectContent.querySelectorAll('script');
                scripts.forEach(script => {
                    const newScript = document.createElement('script');
                    if (script.src) {
                        newScript.src = script.src;
                    } else {
                        newScript.textContent = script.textContent;
                    }
                    projectContainer.appendChild(newScript);
                });
                
                // Update active nav link
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.href === url || link.href === window.location.href) {
                        link.classList.add('active');
                    }
                });
            })
            .catch(err => {
                console.error('Failed to load project:', err);
                projectContainer.innerHTML = `<div class="error">Failed to load project. Please try again.</div>`;
            });
    }
    
    // Set up click handlers for navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const projectUrl = this.getAttribute('href');
            
            // Update browser history without reloading
            history.pushState(null, null, projectUrl);
            
            // Load the project content
            loadProject(projectUrl);
        });
    });
    
    // Handle back/forward navigation
    window.addEventListener('popstate', function() {
        loadProject(window.location.pathname);
    });
    
    // Load initial project if URL contains a hash/fragment
    if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
        loadProject(window.location.pathname);
    }
});