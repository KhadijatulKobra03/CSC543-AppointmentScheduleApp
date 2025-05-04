const images = [
    'Images/523923.jpg',
    'Images/pexels-chermitove-3049225.jpg',
    'Images/pexels-life-of-pix-7640.jpg',
    'Images/pexels-zsolt-joo-483255-1191804.jpg'
  ];
  
  let current = 0;
  const hero = document.getElementById('hero-section');
  
 
  const fader = document.createElement('div');
  fader.id = 'hero-fader';
  document.body.appendChild(fader);
  
  function rotateBackground() {
    const next = (current + 1) % images.length;
    fader.style.backgroundImage = `url('${images[next]}')`;
    fader.style.opacity = 1;
  
    setTimeout(() => {
      hero.style.backgroundImage = `url('${images[next]}')`;
      fader.style.opacity = 0;
      current = next;
    }, 300); 
  }
  
  // Initial set
  hero.style.backgroundImage = `url('${images[current]}')`;
  setInterval(rotateBackground, 3000);
  

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("fade-in");
    });
  });
  document.querySelectorAll(".card").forEach(card => observer.observe(card));
  
 
 
  function animateCounter(id, target) {
    let count = 0;
    const el = document.getElementById(id);
    if (!el) return;
  
    const step = Math.ceil(target / 100); 
    const interval = setInterval(() => {
      count += step;
      el.textContent = count + '+';
      if (count >= target) {
        el.textContent = target + '+';
        clearInterval(interval);
      }
    }, 40); 
  }
  
  
  const observers = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('style-count', 20);
        animateCounter('program-count', 15);
        animateCounter('challenge-count', 35);
        animateCounter('meditation-count', 20);
        animateCounter('class-min-count', 90);
        obs.disconnect(); 
      }
    });
  }, { threshold: 0.5 });
  
 
  observers.observe(document.getElementById('style-count'));



  const testimonials = [
    {
      quote: "Inner Bliss Yoga has transformed my life. The classes are peaceful, powerful, and healing.",
      author: "Emily R., Madison, CT"
    },
    {
      quote: "A beautiful space with knowledgeable instructors who truly care.",
      author: "David S., Guilford, CT"
    },
    {
      quote: "My stress levels dropped significantly after attending weekly meditation.",
      author: "Maya P., Branford, CT"
    },
    {
      quote: "The yoga challenges helped me regain my strength after injury.",
      author: "Liam K., New Haven, CT"
    }
  ];
  
  const container = document.getElementById("testimonial-container");
  let index = 0;
  
  function showTestimonial() {
    const t = testimonials[index];
    container.innerHTML = `
      <blockquote class="blockquote mb-4">
        <p>"${t.quote}"</p>
        <footer class="blockquote-footer">${t.author}</footer>
      </blockquote>
    `;
    index = (index + 1) % testimonials.length;
  }
  
  
  showTestimonial();
  // Rotate every 2 seconds
  setInterval(showTestimonial, 2500);
  
  
  
  