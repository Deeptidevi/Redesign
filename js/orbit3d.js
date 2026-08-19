/* ==========================================================================
   YOUTUBE REIMAGINED - 3D REVOLVING ORBIT ENGINE
   Handles revolving video nodes around the central 3D YouTube logo,
   depth rendering, speech synthesis narration, and interactive popups.
   ========================================================================== */

class Orbit3DEngine {
  constructor() {
    this.container = document.getElementById('orbitNodesContainer');
    this.speechCard = document.getElementById('videoSpeechCard');
    
    // Orbit configuration
    this.radiusX = 220; // Horizontal orbit radius
    this.radiusY = 90;  // Vertical tilt radius
    this.tiltAngle = 18; // Orbit plane tilt in degrees
    this.orbitSpeed = 0.008; // Base rotation speed
    this.currentAngle = 0;
    this.isPaused = false;
    this.activeNodeIndex = null;

    // Revolving Video Items Data
    this.videoItems = [
      {
        id: 'orbit-1',
        title: 'Gaming Universe',
        category: 'Gaming',
        channel: 'Ignite Play',
        views: '3.4M watching',
        likes: '124K',
        live: true,
        thumb: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
        speech: "Hey gamer! I'm Gaming Universe, showcasing live competitive esports, 8K ray-tracing gameplays, and upcoming trailer reveals!"
      },
      {
        id: 'orbit-2',
        title: 'Lofi Beats Studio',
        category: 'Music',
        channel: 'Chillhop Music',
        views: '1.8M watching',
        likes: '89K',
        live: true,
        thumb: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1',
        speech: "Welcome to Lofi Beats! I revolve around smooth jazz-hop and ambient study vibes to help you focus and relax 24/7."
      },
      {
        id: 'orbit-3',
        title: 'Global Breaking News',
        category: 'News',
        channel: 'World Media',
        views: '950K watching',
        likes: '45K',
        live: true,
        thumb: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://www.youtube.com/embed/2g811KoJBUo?autoplay=1',
        speech: "Hello! I bring you live real-time coverage on breaking global stories, technology breakthroughs, and live interviews."
      },
      {
        id: 'orbit-4',
        title: 'Quantum Physics 101',
        category: 'Learning',
        channel: 'Kurzgesagt Science',
        views: '2.1M views',
        likes: '210K',
        live: false,
        thumb: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
        speech: "Curious about the universe? I explain mind-bending quantum mysteries, black holes, and the future of science in visual animations."
      },
      {
        id: 'orbit-5',
        title: 'Extreme Sports 4K',
        category: 'Sports',
        channel: 'Red Bull Extreme',
        views: '4.2M views',
        likes: '340K',
        live: false,
        thumb: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
        speech: "Adrenaline lovers assemble! I deliver jaw-dropping mountain biking, wingsuit flying, and cliff diving footage in high definition!"
      },
      {
        id: 'orbit-6',
        title: 'Tech Podcast Weekly',
        category: 'Podcasts',
        channel: 'MKBHD Studio',
        views: '1.5M views',
        likes: '160K',
        live: false,
        thumb: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=400&q=80',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1',
        speech: "What's up tech fans! Join us as we dissect the newest AI gadgets, foldable smartphones, and secret prototype hardware!"
      }
    ];

    this.nodes = [];
    this.init();
  }

  init() {
    if (!this.container) return;
    this.createNodes();
    this.bindEvents();
    this.animate();
  }

  createNodes() {
    this.container.innerHTML = '';
    this.nodes = [];

    const total = this.videoItems.length;
    this.videoItems.forEach((item, index) => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'revolving-node';
      nodeEl.setAttribute('data-index', index);
      nodeEl.innerHTML = `
        <div class="node-icon">
          <img src="${item.thumb}" alt="${item.title}">
        </div>
        <div class="node-label">
          <span class="node-title">${item.category}</span>
          <span class="node-sub">${item.live ? 'LIVE' : 'FEATURED'}</span>
        </div>
      `;

      this.container.appendChild(nodeEl);
      this.nodes.push({
        element: nodeEl,
        data: item,
        baseAngle: (index / total) * Math.PI * 2
      });
    });
  }

  bindEvents() {
    // Hover interactions to pause & highlight
    this.nodes.forEach((nodeObj, index) => {
      nodeObj.element.addEventListener('mouseenter', () => {
        this.isPaused = true;
        this.selectNode(index);
      });

      nodeObj.element.addEventListener('mouseleave', () => {
        // Keep speech card open unless explicitly closed or moving away
      });

      nodeObj.element.addEventListener('click', () => {
        this.selectNode(index);
        this.speakNarration(nodeObj.data.speech);
      });
    });

    // Close Speech Card button
    const closeBtn = document.getElementById('closeSpeechBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.speechCard.classList.remove('active');
        this.isPaused = false;
        this.stopSpeech();
      });
    }

    // Voice Read Aloud Button
    const voiceBtn = document.getElementById('voiceNarrateBtn');
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        if (this.activeNodeIndex !== null) {
          const item = this.videoItems[this.activeNodeIndex];
          this.speakNarration(item.speech);
        }
      });
    }

    // Watch Video button in speech card
    const watchBtn = document.getElementById('watchFullVideoBtn');
    const playThumbBtn = document.getElementById('playSpeechVideoBtn');
    const triggerWatch = () => {
      if (this.activeNodeIndex !== null) {
        const item = this.videoItems[this.activeNodeIndex];
        if (window.videoPlayerModal) {
          window.videoPlayerModal.open(item.videoUrl, item.title, item.channel, item.views);
        }
      }
    };

    if (watchBtn) watchBtn.addEventListener('click', triggerWatch);
    if (playThumbBtn) playThumbBtn.addEventListener('click', triggerWatch);

    // Mouse drag to manual rotate
    let isDragging = false;
    let startX = 0;
    const stage = document.getElementById('orbitStage');

    if (stage) {
      stage.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - startX;
        this.currentAngle += deltaX * 0.005;
        startX = e.clientX;
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });
    }
  }

  selectNode(index) {
    this.activeNodeIndex = index;
    const item = this.videoItems[index];

    // Populate Speech Card
    document.getElementById('speechThumb').src = item.thumb;
    document.getElementById('speechTitle').textContent = item.title;
    document.getElementById('speechChannel').textContent = item.channel;
    document.getElementById('speechViews').textContent = item.views;
    document.getElementById('speechBubbleText').textContent = `"${item.speech}"`;
    document.getElementById('likeCount').textContent = item.likes;

    const liveTag = document.getElementById('speechLiveTag');
    if (liveTag) {
      liveTag.style.display = item.live ? 'block' : 'none';
    }

    this.speechCard.classList.add('active');
  }

  speakNarration(text) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop ongoing speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }

  stopSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (!this.isPaused) {
      this.currentAngle += this.orbitSpeed;
    }

    const centerX = this.container.clientWidth / 2;
    const centerY = this.container.clientHeight / 2;

    this.nodes.forEach((nodeObj) => {
      const angle = nodeObj.baseAngle + this.currentAngle;
      
      // Calculate 3D position on tilted ellipse
      const x = Math.cos(angle) * this.radiusX;
      const z = Math.sin(angle) * this.radiusX; // Depth coordinate (-radiusX to +radiusX)
      const y = Math.sin(angle) * this.radiusY;

      // Z-scale for 3D perspective depth effect
      // Front elements (z > 0) are larger and brighter; back elements (z < 0) are smaller and faded
      const normalizedZ = (z + this.radiusX) / (2 * this.radiusX); // 0 to 1
      const scale = 0.75 + normalizedZ * 0.45; // Scale between 0.75 and 1.2
      const opacity = 0.5 + normalizedZ * 0.5; // Opacity between 0.5 and 1.0
      const zIndex = Math.round(normalizedZ * 100);

      const posX = centerX + x - 65; // Adjust offset for element width
      const posY = centerY + y - 22;

      nodeObj.element.style.transform = `translate3d(${posX}px, ${posY}px, 0px) scale(${scale})`;
      nodeObj.element.style.opacity = opacity;
      nodeObj.element.style.zIndex = zIndex;
    });
  }
}

// Instantiate Engine when DOM loads
document.addEventListener('DOMContentLoaded', () => {
  window.orbitEngine = new Orbit3DEngine();
});
