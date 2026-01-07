
// Logic for portofolio interactions
document.addEventListener('DOMContentLoaded', function () {
	// Current year in footer
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Scroll Animations (IntersectionObserver)
	const observerOptions = {
		root: null,
		rootMargin: '0px',
		threshold: 0.1
	};

	const observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	const fadeElements = document.querySelectorAll('.fade-in-up');
	fadeElements.forEach(el => observer.observe(el));


	// Sticky Header on Scroll
	const header = document.querySelector('.site-header');
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});

	// Mobile Menu Toggle
	const navToggle = document.querySelector('.mobile-nav-toggle');
	const mainNav = document.querySelector('.main-nav');

	if (navToggle && mainNav) {
		navToggle.addEventListener('click', () => {
			const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
			navToggle.setAttribute('aria-expanded', !isExpanded);
			mainNav.classList.toggle('active');
		});

		// Close menu when clicking a link
		document.querySelectorAll('.nav-link').forEach(link => {
			link.addEventListener('click', () => {
				navToggle.setAttribute('aria-expanded', 'false');
				mainNav.classList.remove('active');
			});
		});
	}

	// Smooth Scroll to Anchor
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			const href = this.getAttribute('href');
			if (href !== '#' && href !== '#portfolio') { // Allow #portfolio to just scroll
				e.preventDefault();
				const target = document.querySelector(href);
				if (target) {
					const headerOffset = 80;
					const elementPosition = target.getBoundingClientRect().top;
					const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

					window.scrollTo({
						top: offsetPosition,
						behavior: "smooth"
					});
				}
			}
		});
	});

	// Parallax Effect for Hero
	const heroBg = document.querySelector('.hero-bg');
	if (heroBg) {
		window.addEventListener('scroll', () => {
			const scrollValue = window.scrollY;
			// Move background slower than scroll
			heroBg.style.transform = `translateY(${scrollValue * 0.5}px) scale(1.1)`;
		});
	}

	// Project Modal Logic
	const modal = document.getElementById('project-modal');
	const modalImg = document.getElementById('modal-img');
	const modalTitle = document.getElementById('modal-title');
	const modalCat = document.getElementById('modal-cat');
	const modalDesc = document.getElementById('modal-desc');
	const closeBtns = document.querySelectorAll('[data-close]');

	// Data for projects (mock database)
	const projects = {
		'Residencia Moderna': {
			img: 'Apartment.jpg',
			cat: 'Interiorismo',
			desc: 'Una renovación completa de 400m² en el corazón de la ciudad. El objetivo fue maximizar la luz natural y crear un flujo continuo entre las áreas sociales. Utilizamos madera de roble, piedra caliza y una paleta neutra para evocar calma y sofisticación. Incluye sistemas de domótica integrada y mobiliario diseñado a medida.'
		},
		'Casa de Campo': {
			img: 'House.jpg',
			cat: 'Residencial',
			desc: 'Situada en las colinas, esta residencia reinterpreta la arquitectura vernácula con líneas modernas. Grandes ventanales conectan el interior con el paisaje circundante. La estructura de hormigón visto se suaviza con techos de madera y jardines interiores que purifican el aire.'
		},
		'Villa Minimalista': {
			img: 'House2.jpg',
			cat: 'Visualización 3D',
			desc: 'Proyecto conceptual para una villa costera. La forma sigue a la función, con volúmenes puros que se apilan para crear terrazas sombreadas naturales. El diseño prioriza la ventilación cruzada y la sostenibilidad pasiva, utilizando materiales locales para reducir la huella de carbono.'
		}
	};

	document.querySelectorAll('.gallery-item').forEach(item => {
		item.addEventListener('click', () => {
			const title = item.querySelector('.project-title').textContent;
			const data = projects[title];

			if (data) {
				modalImg.src = data.img;
				modalTitle.textContent = title;
				modalCat.textContent = data.cat;
				modalDesc.textContent = data.desc;

				modal.classList.add('active');
				document.body.style.overflow = 'hidden'; // Prevent background scrolling
			}
		});
	});

	function closeModal() {
		modal.classList.remove('active');
		document.body.style.overflow = '';
	}

	closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

	// Close on Escape key
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modal.classList.contains('active')) {
			closeModal();
		}
	});
});
