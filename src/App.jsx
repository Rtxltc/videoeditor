import { useEffect, useMemo, useState } from 'react';
import reviewsData from './reviews.json';
import sample1 from '../sample_1.mp4';
import sample2 from '../sample_2.mp4';

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

  const openVideoOverlay = (src, title) => {
    setVideoOverlay({ src, title });
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
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursor) {
        cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    let rafId = 0;
    function animateRing() {
      rx += (mx - rx - 20) * 0.15;
      ry += (my - ry - 20) * 0.15;
      if (ring) {
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
      }
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverElements = Array.from(document.querySelectorAll('a, button, .work-card, .skill-card'));
    const hoverListeners = hoverElements.map((el) => {
      const handleMouseEnter = () => {
        if (ring) {
          ring.style.width = '60px';
          ring.style.height = '60px';
          ring.style.borderColor = 'rgba(255,107,26,0.6)';
        }
      };
      const handleMouseLeave = () => {
        if (ring) {
          ring.style.width = '40px';
          ring.style.height = '40px';
          ring.style.borderColor = 'rgba(0,212,255,0.5)';
        }
      };
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      return { el, handleMouseEnter, handleMouseLeave };
    });

    const cards = Array.from(document.querySelectorAll('.work-card'));
    const tiltListeners = cards.map((card) => {
      const handleMouseMoveCard = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(1000px) rotateY(${x * 10}deg) rotateX(${-y * 6}deg) translateZ(20px) scale(1.02)`;
      };
      const handleMouseLeaveCard = () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0) scale(1)';
      };
      card.addEventListener('mousemove', handleMouseMoveCard);
      card.addEventListener('mouseleave', handleMouseLeaveCard);
      return { card, handleMouseMoveCard, handleMouseLeaveCard };
    });

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
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      hoverListeners.forEach(({ el, handleMouseEnter, handleMouseLeave }) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      tiltListeners.forEach(({ card, handleMouseMoveCard, handleMouseLeaveCard }) => {
        card.removeEventListener('mousemove', handleMouseMoveCard);
        card.removeEventListener('mouseleave', handleMouseLeaveCard);
      });
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
      <div id="cursor" />
      <div id="cursor-ring" />

      <nav>
        <div className="nav-logo">
          RTX<span>.</span>
        </div>
        <ul className="nav-links">
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
            <span className="count" data-target="5">
              0
            </span>
          </div>
          <div className="stat-label">Years Experience</div>
        </div>
        <div className="stat-item">
          <div className="stat-num">
            <span className="count" data-target="5">
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
          <p className="section-sub">A curated selection of commercial, narrative, and documentary edits from recent years.</p>
        </div>
        <div className="works-grid">
          <div className="work-card big reveal">
            <div className="work-thumb">
              <video
                className="portfolio-video"
                src={sample1}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="thumb-overlay" />
              <div className="play-btn" onClick={() => openVideoOverlay(sample1, 'Nike — Run The City Campaign')}>
                <div className="play-btn-inner" />
              </div>
            </div>
            <div className="work-info">
              <div className="work-cat">Commercial</div>
              <div className="work-title">Nike — "Run The City" Campaign</div>
              <div className="work-meta">
                <span>2024</span>
                <span className="work-meta-sep">·</span>
                <span>3:45 min</span>
                <span className="work-meta-sep">·</span>
                <span>42M Views</span>
              </div>
              <div className="work-tags">
                <span className="tag highlight">Premiere Pro</span>
                <span className="tag highlight">After Effects</span>
                <span className="tag">Color Grade</span>
                <span className="tag">Motion Graphics</span>
              </div>
            </div>
          </div>

          <div className="work-card med reveal reveal-delay-1">
            <div className="work-thumb">
              <video
                className="portfolio-video"
                src={sample2}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="thumb-overlay" />
              <div className="play-btn" onClick={() => openVideoOverlay(sample2, 'Voices of Mumbai — Feature Doc')}>
                <div className="play-btn-inner" />
              </div>
            </div>
            <div className="work-info">
              <div className="work-cat">Documentary</div>
              <div className="work-title">Voices of Mumbai — Feature Doc</div>
              <div className="work-meta">
                <span>2024</span>
                <span className="work-meta-sep">·</span>
                <span>82 min</span>
                <span className="work-meta-sep">·</span>
                <span>Festival Circuit</span>
              </div>
              <div className="work-tags">
                <span className="tag highlight">DaVinci Resolve</span>
                <span className="tag">Sound Design</span>
                <span className="tag">Narrative</span>
              </div>
            </div>
          </div>

          <div className="work-card third reveal">
            <div className="work-thumb">
              <video
                className="portfolio-video"
                src={sample2}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="thumb-overlay" />
              <div className="play-btn" onClick={() => openVideoOverlay(sample2, 'Zomato Reels Series')}>
                <div className="play-btn-inner" />
              </div>
            </div>
            <div className="work-info">
              <div className="work-cat">Social Media</div>
              <div className="work-title">Zomato Reels Series</div>
              <div className="work-meta">
                <span>2023</span>
                <span className="work-meta-sep">·</span>
                <span>80M+ Views</span>
              </div>
              <div className="work-tags">
                <span className="tag highlight">Final Cut</span>
                <span className="tag">Vertical Format</span>
              </div>
            </div>
          </div>

          <div className="work-card third reveal reveal-delay-1">
            <div className="work-thumb">
              <video
                className="portfolio-video"
                src={sample2}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="thumb-overlay" />
              <div className="play-btn" onClick={() => openVideoOverlay(sample2, 'Prateek Kuhad — Cold/Mess')}>
                <div className="play-btn-inner" />
              </div>
            </div>
            <div className="work-info">
              <div className="work-cat">Music Video</div>
              <div className="work-title">Prateek Kuhad — "Cold/Mess"</div>
              <div className="work-meta">
                <span>2023</span>
                <span className="work-meta-sep">·</span>
                <span>18M Views</span>
              </div>
              <div className="work-tags">
                <span className="tag highlight">Premiere Pro</span>
                <span className="tag">VFX</span>
              </div>
            </div>
          </div>

          <div className="work-card third reveal reveal-delay-2">
            <div className="work-thumb">
              <video
                className="portfolio-video"
                src={sample2}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="thumb-overlay" />
              <div className="play-btn" onClick={() => openVideoOverlay(sample2, 'Cult.fit — Launch Film')}>
                <div className="play-btn-inner" />
              </div>
            </div>
            <div className="work-info">
              <div className="work-cat">Brand Film</div>
              <div className="work-title">Cult.fit — Launch Film</div>
              <div className="work-meta">
                <span>2023</span>
                <span className="work-meta-sep">·</span>
                <span>2:20 min</span>
              </div>
              <div className="work-tags">
                <span className="tag highlight">DaVinci</span>
                <span className="tag">Color</span>
              </div>
            </div>
          </div>

          <div className="work-card wide reveal">
            <div className="work-thumb">
              <video
                className="portfolio-video"
                src={sample2}
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="work-thumb-inner" style={{ background: 'linear-gradient(135deg,#0D2A1A,#1B5C3A,#2A1A0D)' }}>
                <div className="film-strip">
                  <div className="film-frame" style={{ background: 'rgba(255,107,26,0.1)' }}>
                    <div className="film-perf-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="film-frame" style={{ background: 'rgba(255,90,20,0.15)' }}>
                    <div className="film-perf-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="film-frame" style={{ background: 'rgba(255,107,26,0.08)' }}>
                    <div className="film-perf-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="film-frame" style={{ background: 'rgba(255,120,40,0.12)' }}>
                    <div className="film-perf-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="film-frame" style={{ background: 'rgba(255,107,26,0.1)' }}>
                    <div className="film-perf-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="film-frame" style={{ background: 'rgba(255,80,10,0.15)' }}>
                    <div className="film-perf-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="film-frame" style={{ background: 'rgba(255,107,26,0.1)' }}>
                    <div className="film-perf-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                  <div className="film-frame" style={{ background: 'rgba(255,100,30,0.12)' }}>
                    <div className="film-perf-row">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                  </div>
                </div>
                <span style={{ position: 'absolute', fontSize: '60px', opacity: 0.25 }}>🌏</span>
              </div>
              <div className="thumb-overlay" />
              <div className="play-btn" onClick={() => openVideoOverlay(sample2, 'Amazon Prime — Edge of the Map Travel Series')}>
                <div className="play-btn-inner" />
              </div>
            </div>
            <div className="work-info">
              <div className="work-cat">Web Series</div>
              <div className="work-title">Amazon Prime — "Edge of the Map" Travel Series (6 Episodes)</div>
              <div className="work-meta">
                <span>2024</span>
                <span className="work-meta-sep">·</span>
                <span>6 × 28 min</span>
                <span className="work-meta-sep">·</span>
                <span>Streaming Worldwide</span>
                <span className="work-meta-sep">·</span>
                <span>4K RAW</span>
              </div>
              <div className="work-tags">
                <span className="tag highlight">DaVinci Resolve</span>
                <span className="tag highlight">Premiere Pro</span>
                <span className="tag">4K HDR</span>
                <span className="tag">Drone Footage</span>
                <span className="tag">Multi-cam</span>
              </div>
            </div>
          </div>
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
                <select
                  value={contactData.budgetRange}
                  onChange={(e) => setContactData((prev) => ({ ...prev, budgetRange: e.target.value }))}
                >
                  <option value="" disabled>
                    Select range...
                  </option>
                  <option value="₹50K – ₹1L">₹50K – ₹1L</option>
                  <option value="₹1L – ₹3L">₹1L – ₹3L</option>
                  <option value="₹3L – ₹10L">₹3L – ₹10L</option>
                  <option value="₹10L+">₹10L+</option>
                </select>
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
          <div className="video-overlay-panel" onClick={(e) => e.stopPropagation()}>
            <button className="video-overlay-close" onClick={closeVideoOverlay} aria-label="Close video overlay">
              ×
            </button>
            <div className="video-overlay-header">
              <h3>{videoOverlay.title}</h3>
            </div>
            <video
              className="video-overlay-player"
              src={videoOverlay.src}
              controls
              autoPlay
              playsInline
            />
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
