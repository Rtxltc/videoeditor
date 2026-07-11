import { useEffect, useMemo, useState } from 'react';
import reviewsData from './reviews.json';
import zomatoCover from './zomato_cover.png';
import realEstateCover1 from './real_estate_cover1.png';
import realEstateCover2 from './real_estate_cover2.png';
import cafeCover from './cafe_cover.png';

const WORKS_DATA = [
  {
    id: 'sunit-long',
    title: 'Dr. Sunit — Kegel Exercise Guide (Long Form)',
    category: 'Healthcare',
    videoUrl: 'https://youtu.be/PDxm6HxDTfU?si=CDV5oxun-uDeW9bT',
    youtubeId: 'PDxm6HxDTfU',
    isVertical: false,
    gridClass: 'span-8',
    meta: 'Long Form · 2024',
    tags: ['Premiere Pro', 'Educational', 'Color Grading'],
    description: 'A complete clinical and practical walkthrough on Kegel exercises.'
  },
  {
    id: 'sunit-short',
    title: 'Dr. Sunit — Kegel Exercise (Short)',
    category: 'Healthcare',
    videoUrl: 'https://youtube.com/shorts/LR2OjeREIQo?si=A2VoStY6qNDZ1qod',
    youtubeId: 'LR2OjeREIQo',
    isVertical: true,
    gridClass: 'span-4',
    meta: 'Short · 2024',
    tags: ['After Effects', 'Sound Design', 'Vertical Format'],
    description: 'A high-impact medical short capturing key exercises in under 60 seconds.'
  },
  {
    id: 'shobhika-long',
    title: 'Dr. Shobhika — Women\'s Wellness',
    category: 'Healthcare',
    videoUrl: 'https://youtu.be/c9mmN8zpLUA?si=IYnFQR-wPuZE1mbD',
    youtubeId: 'c9mmN8zpLUA',
    isVertical: false,
    gridClass: 'span-8',
    meta: 'Long Form · 2024',
    tags: ['Premiere Pro', 'Healthcare', 'Educational'],
    description: 'Educational narrative on women\'s healthcare and diagnostic guidelines.'
  },
  {
    id: 'shobhika-short',
    title: 'Dr. Shobhika — Women\'s Health (Short)',
    category: 'Healthcare',
    videoUrl: 'https://youtube.com/shorts/nEUelIPy9EQ?si=oqfouxICAwBr04TY',
    youtubeId: 'nEUelIPy9EQ',
    isVertical: true,
    gridClass: 'span-4',
    meta: 'Short · 2024',
    tags: ['After Effects', 'Motion Graphics', 'Short'],
    description: 'Bite-sized healthcare insights focusing on common wellness questions.'
  },
  {
    id: 'govind-short',
    title: 'Dr. Govind — Healthcare Tip (Short)',
    category: 'Healthcare',
    videoUrl: 'https://youtube.com/shorts/ld1J6_4zrFg?si=Gm0egekFtN7SFEgF',
    youtubeId: 'ld1J6_4zrFg',
    isVertical: true,
    gridClass: 'span-4',
    meta: 'Short · 2024',
    tags: ['After Effects', 'Kinetic Text', 'Short'],
    description: 'Professional medical tips paired with high-retention typographic animation.'
  },
  {
    id: 'shamita-short',
    title: 'Dr. Shamita — Dental Care Guide (Short)',
    category: 'Healthcare',
    videoUrl: 'https://youtube.com/shorts/Xi2zD12nD0k?si=kOOrnOcikupbFkZ5',
    youtubeId: 'Xi2zD12nD0k',
    isVertical: true,
    gridClass: 'span-4',
    meta: 'Short · 2024',
    tags: ['After Effects', 'Medical Tip', 'Vertical Format'],
    description: 'Informative short highlighting basic dental hygiene tips and practices.'
  },
  {
    id: 'honey-bhaskar-short',
    title: 'Dr. Honey Bhaskar — Skincare Tip (Short)',
    category: 'Healthcare',
    videoUrl: 'https://youtube.com/shorts/pW84Q9SkUTg?si=7z_lE0FFdIQhvnLu',
    youtubeId: 'pW84Q9SkUTg',
    isVertical: true,
    gridClass: 'span-4',
    meta: 'Short · 2024',
    tags: ['Premiere Pro', 'Visual Edits', 'Short'],
    description: 'Expert advice on skincare routines, designed for social media feeds.'
  },
  {
    id: 'zomato',
    title: 'Zomato — Food Delivery Story',
    category: 'Reels & Socials',
    videoUrl: 'https://www.instagram.com/reel/DYPEI0ZTBOD/?igsh=bHFrNDR4MjAyNDYx',
    isInstagram: true,
    thumbnailUrl: zomatoCover,
    isVertical: true,
    gridClass: 'span-3',
    meta: 'Instagram Reel · 2025',
    tags: ['Premiere Pro', 'Color Grading', 'Food Promo'],
    description: 'High-energy pacing and storytelling highlighting Zomato\'s courier system.'
  },
  {
    id: 'real-estate-1',
    title: 'Luxury Villa Showcase (Reel 1)',
    category: 'Reels & Socials',
    videoUrl: 'https://www.instagram.com/reel/DG95bIuyUP9/?igsh=MTJ4Y3Mza25qNDBlcg==',
    isInstagram: true,
    thumbnailUrl: realEstateCover1,
    isVertical: true,
    gridClass: 'span-3',
    meta: 'Instagram Reel · 2025',
    tags: ['Cinematic', 'Sound Design', 'Property Tour'],
    description: 'A smooth walkthrough of an elite luxury villa with stylized lighting.'
  },
  {
    id: 'real-estate-2',
    title: 'Modern Penthouse Tour (Reel 2)',
    category: 'Reels & Socials',
    videoUrl: 'https://www.instagram.com/reel/DTEL7NbkrH_/?igsh=MWw0djI4aTNqdjhnbQ==',
    isInstagram: true,
    thumbnailUrl: realEstateCover2,
    isVertical: true,
    gridClass: 'span-3',
    meta: 'Instagram Reel · 2025',
    tags: ['Premiere Pro', 'Interior Design', 'Motion Graphics'],
    description: 'Sweeping drone footage and interior pans tracking property features.'
  },
  {
    id: 'cafe',
    title: 'Aesthetic Cafe Vibe & Brew',
    category: 'Reels & Socials',
    videoUrl: 'https://www.instagram.com/reel/DG95bIuyUP9/?igsh=MTJ4Y3Mza25qNDBlcg==',
    isInstagram: true,
    thumbnailUrl: cafeCover,
    isVertical: true,
    gridClass: 'span-3',
    meta: 'Instagram Reel · 2025',
    tags: ['Sound Design', 'Color Correction', 'Aesthetic Vibe'],
    description: 'Capturing cozy sensory details and latte art in a warm ambient cafe setting.'
  }
];

function App() {
  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolioReviews');
      return stored ? JSON.parse(stored) : reviewsData;
    } catch (err) {
      return reviewsData;
    }
  });

  const [feedback, setFeedback] = useState({ name: '', role: '', rating: 5, message: '' });
  const [submissionStatus, setSubmissionStatus] = useState('');
  const [videoOverlay, setVideoOverlay] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    projectType: '',
    budgetRange: '',
    timeline: '',
    brief: ''
  });
  const [contactStatus, setContactStatus] = useState({ type: '', message: '' });

  const reviewCount = reviews.length;

  const averageRating = useMemo(() => {
    if (reviewCount === 0) return 0;
    return reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount;
  }, [reviews, reviewCount]);

  const openVideoOverlay = (item) => {
    setVideoOverlay(item);
  };

  const closeVideoOverlay = () => {
    setVideoOverlay(null);
  };

  useEffect(() => {
    try {
      localStorage.setItem('portfolioReviews', JSON.stringify(reviews));
    } catch (err) {
      // ignore storage errors
    }
  }, [reviews]);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.querySelectorAll('.skill-fill').forEach((bar) => {
              bar.style.width = bar.dataset.width;
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

    function animateCount(el) {
      const target = parseInt(el.dataset.target, 10);
      const start = performance.now();
      const duration = 1800;
      function update(now) {
        const ease = 1 - Math.pow(1 - Math.min((now - start) / duration, 1), 3);
        el.textContent = Math.floor(ease * target);
        if (ease < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(update);
    }

    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) {
          document.querySelectorAll('.count').forEach(animateCount);
          statsObserver.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) {
      statsObserver.observe(statsBar);
    }

    const handleScroll = () => {
      const sy = window.scrollY;
      const grid = document.querySelector('.grid-lines');
      if (grid) {
        grid.style.transform = `perspective(800px) rotateX(20deg) scale(1.2) translateY(${sy * 0.3}px)`;
      }
      const reel = document.querySelector('.reel-container');
      if (reel) {
        reel.style.transform = `translateY(calc(-50% + ${sy * 0.2}px))`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const handleNavActive = () => {
      let current = '';
      sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 200) {
          current = section.id;
        }
      });
      navLinks.forEach((a) => {
        if (a.getAttribute('href') === `#${current}`) {
          a.style.color = 'var(--cyan)';
        } else {
          a.style.color = '';
        }
      });
    };

    window.addEventListener('scroll', handleNavActive);

    return () => {
      revealObserver.disconnect();
      statsObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleNavActive);
    };
  }, []);

  const spokes = Array.from({ length: 6 }, (_, i) => (
    <div
      className="spoke"
      style={{ transform: `translateX(-50%) rotate(${i * 60}deg) translateY(-130px)` }}
      key={`spoke-${i}`}
    />
  ));

  const perfs = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * 360;
    const rad = (angle * Math.PI) / 180;
    const r = 130;
    return (
      <div
        className="perf"
        style={{
          transform: `translate(calc(${Math.cos(rad) * r}px - 50%), calc(${Math.sin(rad) * r}px - 50%)) rotate(${angle}deg)`,
        }}
        key={`perf-${i}`}
      />
    );
  });

  const handleSubmit = async () => {
    // 1. Validation
    if (!contactData.firstName.trim() || !contactData.email.trim() || !contactData.brief.trim()) {
      setContactStatus({
        type: 'error',
        message: 'Please fill in all required fields (First Name, Email, and Project Brief).'
      });
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      setContactStatus({
        type: 'error',
        message: 'Please enter a valid email address.'
      });
      return;
    }

    const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

    // Check if webhook is configured
    if (!webhookUrl || webhookUrl.includes('YOUR_WEBHOOK_URL_HERE')) {
      setContactStatus({
        type: 'error',
        message: 'Error: Discord Webhook URL is not configured. Please set VITE_DISCORD_WEBHOOK_URL in your .env file.'
      });
      return;
    }

    setContactStatus({ type: 'loading', message: 'Sending message...' });

    // 2. Build Discord embed payload
    const embedPayload = {
      username: "RTX Portfolio Bot",
      avatar_url: "https://i.imgur.com/E857d4j.png",
      embeds: [
        {
          title: "🎬 New Project Inquiry!",
          description: "A client has submitted a message via your portfolio's contact form.",
          color: 16739098, // RTX Orange (#FF6B1A)
          fields: [
            {
              name: "👤 Client Name",
              value: `${contactData.firstName} ${contactData.lastName}`.trim() || "Not specified",
              inline: true
            },
            {
              name: "✉️ Email Address",
              value: contactData.email,
              inline: true
            },
            {
              name: "🎥 Project Type",
              value: contactData.projectType || "Not selected",
              inline: true
            },
            {
              name: "💰 Budget Range",
              value: contactData.budgetRange || "Not selected",
              inline: true
            },
            {
              name: "📅 Timeline",
              value: contactData.timeline || "Not selected",
              inline: true
            },
            {
              name: "📝 Project Brief",
              value: contactData.brief
            }
          ],
          timestamp: new Date().toISOString(),
          footer: {
            text: "RTX Portfolio Contact System",
            icon_url: "https://i.imgur.com/E857d4j.png"
          }
        }
      ]
    };

    // 3. Post to Webhook
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(embedPayload)
      });

      if (response.ok) {
        setContactStatus({ type: 'success', message: 'Message sent successfully!' });

        // Reset form fields
        setContactData({
          firstName: '',
          lastName: '',
          email: '',
          projectType: '',
          budgetRange: '',
          timeline: '',
          brief: ''
        });

        // Trigger button animation
        const btn = document.getElementById('submitBtn');
        if (btn) {
          btn.textContent = '✓ Message Sent!';
          btn.classList.add('sent');
          setTimeout(() => {
            btn.textContent = 'Send Message →';
            btn.classList.remove('sent');
          }, 3000);
        }

        setTimeout(() => setContactStatus({ type: '', message: '' }), 5000);
      } else {
        throw new Error(`Discord returned status ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending to Discord webhook:", error);
      setContactStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email directly at contact@help.soulmatrix.in.'
      });
    }
  };

  const handleReviewSubmit = () => {
    if (!feedback.name.trim() || !feedback.message.trim()) {
      setSubmissionStatus('Please enter your name and review message.');
      return;
    }

    const avatar = feedback.name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

    const newReview = {
      id: Date.now(),
      author: feedback.name,
      role: feedback.role || 'Client',
      avatar,
      rating: Number(feedback.rating),
      message: feedback.message,
    };

    setReviews((current) => [newReview, ...current]);
    setFeedback({ name: '', role: '', rating: 5, message: '' });
    setSubmissionStatus('Review submitted successfully.');
    setTimeout(() => setSubmissionStatus(''), 3000);
  };

  return (
    <>
      <nav className="header-nav">
        <div className="nav-logo">
          RTX<span>.</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#works">Works</a>
          </li>
          <li>
            <a href="#process">Process</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#timeline">Journey</a>
          </li>
          <li>
            <a href="#testimonials">Reviews</a>
          </li>
        </ul>
        <a href="#contact" className="nav-cta">
          Hire Me
        </a>
      </nav>

      <section id="hero">
        <div className="hero-bg" />
        <div className="grid-lines" />
        <div className="hero-content">
          <p className="hero-eyebrow">// Video Editor & Motion Designer</p>
          <h1 className="hero-title">
            <span className="line1">CRAFTING</span>
            <span className="line2" data-text="STORIES">
              STORIES
            </span>
          </h1>
          <p className="hero-sub">
            Turning raw footage into cinematic experiences. 4+ years cutting narratives for global brands, indie films, and viral content — with 5M+ combined views.
          </p>
          <div className="hero-buttons">
            <a href="#works" className="btn-primary">
              View My Work
            </a>
            <a href="#contact" className="btn-secondary">
              Start a Project
            </a>
          </div>
        </div>
        <div className="reel-container">
          <div className="reel-scene">
            <div className="reel-face" />
            <div className="reel-spokes" id="spokes">
              {spokes}
            </div>
            <div className="reel-perfs" id="perfs">
              {perfs}
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-num">
            <span className="count" data-target="5">
              0
            </span>
            M<span>+</span>
          </div>
          <div className="stat-label">Total Views</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">
            <span className="count" data-target="100">
              0
            </span>
            <span>+</span>
          </div>
          <div className="stat-label">Projects Completed</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">
            <span className="count" data-target="3">
              0
            </span>
            <span>+</span>
          </div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">
            <span className="count" data-target="20">
              0
            </span>
            <span>+</span>
          </div>
          <div className="stat-label">Clients</div>
        </div>
        {/* <div className="stat-item">
          <div className="stat-num">
            <span className="count" data-target="12">
              0
            </span>
          </div>
          <div className="stat-label">Awards Won</div>
        </div> */}
      </div>

      <section id="works">
        <div className="works-header">
          <div>
            <p className="section-eyebrow">// Selected Works</p>
            <h2 className="section-title">Past Projects</h2>
          </div>
          <p className="section-sub">
            A dynamic display of clinical healthcare videos and engaging social media reels. Click any card to play.
          </p>
        </div>

        <div className="works-filters">
          {['All', 'Healthcare', 'Reels & Socials'].map((cat) => (
            <button
              key={cat}
              className={`filter-tab ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="works-grid">
          {WORKS_DATA.filter(item => selectedCategory === 'All' || item.category === selectedCategory).map((item) => {
            const isYoutube = !!item.youtubeId;
            const thumbUrl = isYoutube
              ? `https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`
              : item.thumbnailUrl;

            return (
              <div
                key={item.id}
                className={`work-card reveal ${item.gridClass}`}
              >
                <div className="work-thumb">
                  <img
                    className="portfolio-thumb-img"
                    src={thumbUrl}
                    alt={item.title}
                    loading="lazy"
                  />
                  <div className="thumb-overlay" />
                  <div className="play-btn" onClick={() => openVideoOverlay(item)}>
                    <div className="play-btn-inner" />
                  </div>
                  {item.isVertical && (
                    <span className="vertical-badge" style={{ position: 'absolute', top: '16px', left: '16px', background: 'rgba(255,107,26,0.9)', color: '#fff', fontSize: '9px', fontFamily: 'Space Mono, monospace', padding: '3px 8px', borderRadius: '4px', letterSpacing: '0.05em' }}>
                      SHORTS / REEL
                    </span>
                  )}
                </div>
                <div className="work-info">
                  <div className="work-cat">{item.category}</div>
                  <div className="work-title" style={{ fontSize: '18px', lineHeight: '1.3', marginBottom: '8px' }}>{item.title}</div>
                  <p style={{ fontSize: '13px', color: 'var(--silver)', margin: '0 0 16px', fontWeight: 300, lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                  <div className="work-meta" style={{ marginBottom: '12px' }}>
                    <span>{item.meta}</span>
                  </div>
                  <div className="work-tags">
                    {item.tags.map((tag, idx) => (
                      <span key={idx} className="tag highlight">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="process">
        <div className="process-bg-text">WORKFLOW</div>
        <div className="process-inner">
          <p className="section-eyebrow">// How I Work</p>
          <h2 className="section-title">The Process</h2>
          <div className="process-steps">
            <div className="process-step reveal">
              <div className="step-num">01</div>
              <div className="step-title">Brief & Discovery</div>
              <p className="step-desc">
                Deep-dive into your vision, audience, tone, and platform. I study references and define the emotional arc before touching the timeline.
              </p>
            </div>
            <div className="process-step reveal reveal-delay-1">
              <div className="step-num">02</div>
              <div className="step-title">Rough Assembly</div>
              <p className="step-desc">
                Build the structural story first. Pacing, narrative flow, and rhythm — getting the bones right before any polish.
              </p>
            </div>
            <div className="process-step reveal reveal-delay-2">
              <div className="step-num">03</div>
              <div className="step-title">Refine & Grade</div>
              <p className="step-desc">
                Sound design, motion graphics, color grading. Each layer is intentional — every frame serves the story, nothing decorative.
              </p>
            </div>
            <div className="process-step reveal reveal-delay-3">
              <div className="step-num">04</div>
              <div className="step-title">Deliver & Review</div>
              <p className="step-desc">
                Export to spec, unlimited revisions until you're completely satisfied. All formats, all platforms, all resolutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="skills">
        <div className="skills-inner">
          <div className="skills-left">
            <p className="section-eyebrow">// Technical Mastery</p>
            <h2 className="section-title">Skills &<br />Software</h2>
            <p className="section-sub">
              A decade of professional editing across every major platform and workflow, from indie shorts to streaming series.
            </p>
            <div className="skill-bars">
              <div className="skill-bar-item reveal">
                <div className="skill-bar-header">
                  <span className="skill-bar-name">Adobe Premiere Pro</span>
                  <span className="skill-bar-pct">98%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: '0%' }} data-width="98%" />
                </div>
              </div>
              <div className="skill-bar-item reveal reveal-delay-1">
                <div className="skill-bar-header">
                  <span className="skill-bar-name">DaVinci Resolve</span>
                  <span className="skill-bar-pct">95%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: '0%' }} data-width="95%" />
                </div>
              </div>
              <div className="skill-bar-item reveal reveal-delay-2">
                <div className="skill-bar-header">
                  <span className="skill-bar-name">After Effects</span>
                  <span className="skill-bar-pct">90%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: '0%' }} data-width="90%" />
                </div>
              </div>
              <div className="skill-bar-item reveal reveal-delay-3">
                <div className="skill-bar-header">
                  <span className="skill-bar-name">Filmora </span>
                  <span className="skill-bar-pct">88%</span>
                </div>
                <div className="skill-track">
                  <div className="skill-fill" style={{ width: '0%' }} data-width="88%" />
                </div>
              </div>
            </div>
          </div>
          <div className="skills-right reveal">
            <div className="skill-card">
              <span className="skill-card-icon">🎞️</span>
              <div className="skill-card-title">Film Editing</div>
              <div className="skill-card-desc">
                Narrative structure, J-cuts, L-cuts, parallel editing. Story-first approach to every cut.
              </div>
            </div>
            <div className="skill-card">
              <span className="skill-card-icon">🎨</span>
              <div className="skill-card-title">Color Grading</div>
              <div className="skill-card-desc">
                LUT design, node-based grading, skin tone correction, HDR delivery pipeline.
              </div>
            </div>
            <div className="skill-card">
              <span className="skill-card-icon">🔊</span>
              <div className="skill-card-title">Sound Design</div>
              <div className="skill-card-desc">
                Foley, ambient layers, music sync, dialogue cleanup with RX 10 and Logic Pro.
              </div>
            </div>
            <div className="skill-card">
              <span className="skill-card-icon">✨</span>
              <div className="skill-card-title">Motion Graphics</div>
              <div className="skill-card-desc">
                Kinetic typography, animated logos, title sequences, and UI animation for video.
              </div>
            </div>
            <div className="skill-card">
              <span className="skill-card-icon">🚁</span>
              <div className="skill-card-title">Drone Footage</div>
              <div className="skill-card-desc">
                DJI certified operator. Aerial cinematography integration and color matching.
              </div>
            </div>
            <div className="skill-card">
              <span className="skill-card-icon">📦</span>
              <div className="skill-card-title">Delivery & Export</div>
              <div className="skill-card-desc">
                H.264/H.265, ProRes, BRAW, Netflix specs, YouTube HDR, social vertical formats.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="timeline">
        <div className="timeline-inner">
          <p className="section-eyebrow">// Career Journey</p>
          <h2 className="section-title">Experience</h2>
          <div className="timeline">
            <div className="timeline-item reveal">
              <div className="timeline-dot" />
              <div className="timeline-year">2022 — Present</div>
              <div className="timeline-company">Freelance / Independent</div>
              <div className="timeline-role">Senior Video Editor & Director</div>
              <p className="timeline-desc">
                Working directly with global brands, streaming platforms, and indie filmmakers. Built a roster of 10+ recurring clients across India. Specializing in commercial storytelling and documentary work.
              </p>
            </div>
            <div className="timeline-item reveal reveal-delay-2">
              <div className="timeline-dot" />
              <div className="timeline-year">2022 — 2023</div>
              <div className="timeline-company">Training at ZEE Institute</div>
              <div className="timeline-role">Student Editor</div>
              <p className="timeline-desc">
                Completed intensive training in video editing, storytelling, and post-production techniques.
              </p>
            </div>
            <div className="timeline-item reveal reveal-delay-1">
              <div className="timeline-dot" />
              <div className="timeline-year">2024-2026</div>
              <div className="timeline-company">Senior Video Editor</div>
              <div className="timeline-role">Lead Editor — Of veron labs</div>
              <p className="timeline-desc">
                Led editing on 4+ junior editors, providing mentorship and guidance in post-production workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div className="testimonials-inner">
          <p className="section-eyebrow">// Client Words</p>
          <h2 className="section-title">Testimonials</h2>
          {reviewCount === 0 ? (
            <div className="testimonial-empty">
              <p>No reviews yet — be the first to leave feedback.</p>
            </div>
          ) : (
            <div className="review-summary reveal">
              <div>{reviewCount} review{reviewCount > 1 ? 's' : ''}</div>
              <div>{averageRating.toFixed(1)} ★ average rating</div>
            </div>
          )}
          <div className="testimonials-grid">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div className="testimonial-card reveal" key={review.id}>
                  <span className="quote-mark">"</span>
                  <p className="testimonial-text">{review.message}</p>
                  <div className="testimonial-author">
                    <div className="author-avatar">{review.avatar}</div>
                    <div>
                      <div className="author-name">{review.author}</div>
                      <div className="author-role">{review.role}</div>
                    </div>
                    <div className="star-row">
                      {Array.from({ length: review.rating }).map((_, idx) => (
                        <span className="star" key={idx}>★</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="testimonial-empty-card reveal">
                <p>No testimonials available right now. Submit your feedback below and your review will appear here.</p>
              </div>
            )}
          </div>
          <div className="review-form reveal reveal-delay-1">
            <div className="form-title">Leave a Review</div>
            <div className="form-sub">Share your experience and your feedback will appear immediately.</div>
            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  placeholder="Arjun Sharma"
                  value={feedback.name}
                  onChange={(e) => setFeedback((prev) => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Your Role</label>
                <input
                  type="text"
                  placeholder="Marketing Director"
                  value={feedback.role}
                  onChange={(e) => setFeedback((prev) => ({ ...prev, role: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Rating</label>
              <select
                value={feedback.rating}
                onChange={(e) => setFeedback((prev) => ({ ...prev, rating: e.target.value }))}
              >
                <option value={5}>5 Stars</option>
                <option value={4}>4 Stars</option>
                <option value={3}>3 Stars</option>
                <option value={2}>2 Stars</option>
                <option value={1}>1 Star</option>
              </select>
            </div>
            <div className="form-group">
              <label>Review</label>
              <textarea
                placeholder="Tell me why working together was great..."
                value={feedback.message}
                onChange={(e) => setFeedback((prev) => ({ ...prev, message: e.target.value }))}
              />
            </div>
            {submissionStatus && <p className="form-feedback">{submissionStatus}</p>}
            <button className="btn-submit" type="button" onClick={handleReviewSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="contact-inner">
          <div className="contact-left reveal">
            <p className="section-eyebrow">// Let's Collaborate</p>
            <h2 className="section-title">Start a<br />Project</h2>
            <p className="section-sub">
              Available for commercial projects, documentaries, music videos, and long-form content. Currently booking for Q3 2025.
            </p>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <div>
                  <div className="contact-label">Email</div>
                  <div className="contact-value">
                    <a href="mailto:contact@help.soulmatrix.in">contact@help.soulmatrix.in</a>
                  </div>
                </div>
              </div>
              {/* <div className="contact-item">
                <span className="contact-icon">📱</span>
                {/* <div>
                  <div className="contact-label">Phone / WhatsApp</div>
                  <div className="contact-value">+91 98765 43210</div>
                </div> 
              </div> */}
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <div>
                  <div className="contact-label">Based In</div>
                  <div className="contact-value">Lucknow, India — Available Worldwide</div>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">⏰</span>
                <div>
                  <div className="contact-label">Response Time</div>
                  <div className="contact-value">Within 24 hours</div>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href="#" className="social-link">📺</a>
              <a href="#" className="social-link">📸</a>
              <a href="#" className="social-link">💼</a>
              <a href="#" className="social-link">🐦</a>
              <a href="#" className="social-link">🎬</a>
            </div>
          </div>
          <div className="contact-form reveal reveal-delay-1">
            <div className="form-title">Send a Message</div>
            <div className="form-sub">Tell me about your project and I'll get back to you within a day.</div>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  placeholder="Arjun"
                  value={contactData.firstName}
                  onChange={(e) => setContactData((prev) => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Sharma"
                  value={contactData.lastName}
                  onChange={(e) => setContactData((prev) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="arjun@company.com"
                value={contactData.email}
                onChange={(e) => setContactData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Project Type</label>
              <select
                value={contactData.projectType}
                onChange={(e) => setContactData((prev) => ({ ...prev, projectType: e.target.value }))}
              >
                <option value="" disabled>
                  Select a category...
                </option>
                <option value="Commercial / Brand Film">Commercial / Brand Film</option>
                <option value="Documentary">Documentary</option>
                <option value="Music Video">Music Video</option>
                <option value="Web Series / OTT">Web Series / OTT</option>
                <option value="Social Media Content">Social Media Content</option>
                <option value="Feature Film">Feature Film</option>
                <option value="Corporate Video">Corporate Video</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Budget Range</label>
                <input
                  type="text"
                  placeholder="e.g. ₹3L or $5,000"
                  value={contactData.budgetRange}
                  onChange={(e) => setContactData((prev) => ({ ...prev, budgetRange: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Your Contact</label>
                <input
                  type="text"
                  placeholder="e.g. Mail or Phone or Any Social Media "
                  value={contactData.budgetRange}
                  onChange={(e) => setContactData((prev) => ({ ...prev, budgetRange: e.target.value }))}
                />
              </div>
              <div className="form-group">
                <label>Timeline</label>
                <select
                  value={contactData.timeline}
                  onChange={(e) => setContactData((prev) => ({ ...prev, timeline: e.target.value }))}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="Urgent (< 1 week)">Urgent (&lt; 1 week)</option>
                  <option value="1 – 2 weeks">1 – 2 weeks</option>
                  <option value="2 – 4 weeks">2 – 4 weeks</option>
                  <option value="1 – 2 months">1 – 2 months</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Project Brief *</label>
              <textarea
                placeholder="Tell me about your vision, the footage you have, the story you want to tell..."
                value={contactData.brief}
                onChange={(e) => setContactData((prev) => ({ ...prev, brief: e.target.value }))}
              />
            </div>
            {contactStatus.message && (
              <p className={`form-feedback ${contactStatus.type}`}>
                {contactStatus.message}
              </p>
            )}
            <button className="btn-submit" id="submitBtn" type="button" onClick={handleSubmit}>
              Send Message →
            </button>
          </div>
        </div>
      </section>

      {videoOverlay && (
        <div className="video-overlay" onClick={closeVideoOverlay}>
          <div
            className="video-overlay-panel"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: videoOverlay.youtubeId && videoOverlay.isVertical ? '420px' : '900px',
              width: '100%'
            }}
          >
            <button className="video-overlay-close" onClick={closeVideoOverlay} aria-label="Close video overlay">
              ×
            </button>
            <div className="video-overlay-header">
              <h3>{videoOverlay.title}</h3>
              <p style={{ color: 'var(--silver)', fontSize: '13px', marginTop: '4px', fontFamily: 'Space Mono, monospace' }}>
                // Category: {videoOverlay.category}
              </p>
            </div>

            {videoOverlay.youtubeId ? (
              <div
                className="video-iframe-container"
                style={{
                  height: videoOverlay.isVertical ? 'min(70vh, 640px)' : 'auto',
                  width: videoOverlay.isVertical ? 'auto' : '100%',
                  aspectRatio: videoOverlay.isVertical ? '9/16' : '16/9',
                  maxWidth: '100%',
                  margin: '0 auto',
                  borderRadius: '12px',
                  background: '#000',
                  overflow: 'hidden'
                }}
              >
                <iframe
                  style={{ width: '100%', height: '100%', border: 0 }}
                  src={`https://www.youtube.com/embed/${videoOverlay.youtubeId}?autoplay=1&rel=0`}
                  title={videoOverlay.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="instagram-overlay-container" style={{ background: 'var(--card)', border: '1px solid var(--glass-border)', padding: '60px 40px', borderRadius: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '24px' }}>
                <div style={{ fontSize: '64px', filter: 'drop-shadow(0 0 15px rgba(255, 107, 26, 0.4))' }}>📸</div>
                <div>
                  <h4 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '12px', fontFamily: 'Space Grotesk, sans-serif' }}>Instagram Reel Content</h4>
                  <p style={{ color: 'var(--silver)', maxWidth: '450px', margin: '0 auto', fontSize: '14px', lineHeight: '1.6', fontWeight: 300 }}>
                    Instagram reels are optimized for native viewing inside the Instagram platform to ensure high-fidelity audio and motion playback. Click below to view the reel directly.
                  </p>
                </div>
                <a
                  href={videoOverlay.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{ textDecoration: 'none', display: 'inline-block', fontSize: '13px', padding: '16px 40px' }}
                >
                  View Reel on Instagram →
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      <footer>
        <div className="footer-inner">
          <div className="footer-logo">
            RTX<span>.</span>
          </div>
          <div className="footer-copy">
            © 2024 RTX — Crafting stories, <span>frame by frame</span>
          </div>
          <nav className="footer-nav">
            <a href="#works">Works</a>
            <a href="#process">Process</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>
    </>
  );
}

export default App;
