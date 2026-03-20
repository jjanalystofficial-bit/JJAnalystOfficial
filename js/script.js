// ===== ROADMAP TRACKER =====
document.addEventListener('DOMContentLoaded', function() {
    // Only run on roadmap page
    if (!document.querySelector('.milestone-check')) return;
    
    const checkboxes = document.querySelectorAll('.milestone-check');
    const completedCountSpan = document.getElementById('completedCount');
    const totalMilestonesSpan = document.getElementById('totalMilestones');
    const progressPercentSpan = document.getElementById('progressPercent');
    const progressBarFill = document.getElementById('progressBarFill');
    
    const totalMilestones = checkboxes.length;
    if (totalMilestonesSpan) {
        totalMilestonesSpan.textContent = totalMilestones;
    }
    
    // Load saved states
    checkboxes.forEach(checkbox => {
        const id = checkbox.id;
        const savedState = localStorage.getItem('roadmap_' + id);
        if (savedState === 'true') {
            checkbox.checked = true;
        }
        
        checkbox.addEventListener('change', function() {
            localStorage.setItem('roadmap_' + this.id, this.checked);
            updateProgress();
        });
    });
    
    function updateProgress() {
        const checkedCount = document.querySelectorAll('.milestone-check:checked').length;
        
        if (completedCountSpan) {
            completedCountSpan.textContent = checkedCount;
        }
        
        const percentage = Math.round((checkedCount / totalMilestones) * 100) || 0;
        
        if (progressPercentSpan) {
            progressPercentSpan.textContent = percentage + '%';
        }
        
        if (progressBarFill) {
            progressBarFill.style.width = percentage + '%';
        }
    }
    
    updateProgress();
});

// ===== MOBILE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
