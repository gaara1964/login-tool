const revealItems = document.querySelectorAll(".reveal-item");
const tiltCard = document.querySelector(".tilt-card");
const cursorGlow = document.createElement("div");

cursorGlow.className = "cursor-glow";
document.body.appendChild(cursorGlow);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { rootMargin: "0px 0px -10% 0px", threshold: 0.18 }
);

revealItems.forEach((item) => revealObserver.observe(item));

// Feature Slider
const featureSlider = document.querySelector('.feature-slider');
const sliderDotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-nav.prev');
const nextBtn = document.querySelector('.slider-nav.next');

if (featureSlider) {
  const cards = featureSlider.querySelectorAll('.feature-card');
  const cardCount = cards.length;
  let currentIndex = 0;

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.className = 'slider-dot';
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => scrollToCard(index));
    sliderDotsContainer.appendChild(dot);
  });

  const dots = sliderDotsContainer.querySelectorAll('.slider-dot');

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function scrollToCard(index) {
    currentIndex = Math.max(0, Math.min(index, cardCount - 1));
    const card = cards[currentIndex];
    const scrollLeft = card.offsetLeft - (featureSlider.offsetWidth / 2) + (card.offsetWidth / 2);
    featureSlider.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    });
    updateDots();
  }

  prevBtn?.addEventListener('click', () => {
    scrollToCard(currentIndex - 1);
  });

  nextBtn?.addEventListener('click', () => {
    scrollToCard(currentIndex + 1);
  });

  // Update on scroll
  let scrollTimeout;
  featureSlider.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const scrollCenter = featureSlider.scrollLeft + featureSlider.offsetWidth / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(scrollCenter - cardCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      currentIndex = closestIndex;
      updateDots();
    }, 100);
  });

  // Mouse move effect on cards
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // Touch swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  featureSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  featureSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchStartX - touchEndX > swipeThreshold) {
      scrollToCard(currentIndex + 1);
    } else if (touchEndX - touchStartX > swipeThreshold) {
      scrollToCard(currentIndex - 1);
    }
  }
}

// Flow Tabs functionality
const flowTabButtons = document.querySelectorAll('.flow-tab-btn');
const flowTabPanels = document.querySelectorAll('.flow-tab-panel');

flowTabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetStep = button.dataset.step;
    
    // Remove active class from all buttons and panels
    flowTabButtons.forEach(btn => btn.classList.remove('active'));
    flowTabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Add active class to clicked button and corresponding panel
    button.classList.add('active');
    const targetPanel = document.querySelector(`[data-panel="${targetStep}"]`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }
  });
});

// Touch swipe for flow tabs
let flowTouchStartX = 0;
let flowTouchEndX = 0;

const flowTabsContainer = document.querySelector('.flow-tab-buttons');
if (flowTabsContainer) {
  flowTabsContainer.addEventListener('touchstart', (e) => {
    flowTouchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  flowTabsContainer.addEventListener('touchend', (e) => {
    flowTouchEndX = e.changedTouches[0].screenX;
    handleFlowSwipe();
  }, { passive: true });
}

function handleFlowSwipe() {
  const currentActiveBtn = document.querySelector('.flow-tab-btn.active');
  if (!currentActiveBtn) return;
  
  const currentStep = parseInt(currentActiveBtn.dataset.step);
  
  if (flowTouchStartX - flowTouchEndX > 50) {
    // Swiped left - next step
    if (currentStep < 4) {
      const nextBtn = document.querySelector(`[data-step="${currentStep + 1}"]`);
      if (nextBtn) nextBtn.click();
    }
  } else if (flowTouchEndX - flowTouchStartX > 50) {
    // Swiped right - previous step
    if (currentStep > 1) {
      const prevBtn = document.querySelector(`[data-step="${currentStep - 1}"]`);
      if (prevBtn) prevBtn.click();
    }
  }
}

// Enhanced Requirements accordion animations
const reqItems = document.querySelectorAll('.req-item');
reqItems.forEach(item => {
  const summary = item.querySelector('summary');
  
  if (summary) {
    summary.addEventListener('click', () => {
      // Add some extra visual feedback
      setTimeout(() => {
        if (item.hasAttribute('open')) {
          item.style.transform = 'translateX(8px)';
        } else {
          item.style.transform = 'translateX(0)';
        }
      }, 50);
    });
  }
});


const demo = {
  user: document.querySelector("#demoUser"),
  pass: document.querySelector("#demoPass"),
  login: document.querySelector("#demoLogin"),
  alert: document.querySelector("#demoLoginAlert"),
  loginScreen: document.querySelector('[data-screen="login"]'),
  mainScreen: document.querySelector('[data-screen="main"]'),
  token: document.querySelector("#demoToken"),
  saveToken: document.querySelector("#saveToken"),
  connect: document.querySelector("#connectEmulator"),
  disconnect: document.querySelector("#disconnectEmulator"),
  runCert: document.querySelector("#runCert"),
  log: document.querySelector("#demoLog"),
  tabs: document.querySelectorAll(".tab-button"),
  panels: document.querySelectorAll(".demo-tab")
};

function showDemoMessage(message, good = true) {
  if (!demo.alert) {
    return;
  }

  demo.alert.textContent = message;
  demo.alert.style.borderColor = good ? "rgba(64, 255, 170, 0.36)" : "rgba(248, 113, 113, 0.42)";
  demo.alert.style.color = good ? "#a7f3d0" : "#fecaca";
  demo.alert.classList.add("is-visible");
}

function addLog(lines) {
  if (!demo.log) {
    return;
  }

  const nextLines = Array.isArray(lines) ? lines : [lines];
  demo.log.textContent = `${demo.log.textContent}\n${nextLines.join("\n")}`;
  demo.log.scrollTop = demo.log.scrollHeight;
}

function activateMainDemo() {
  demo.loginScreen?.classList.remove("is-active");
  demo.mainScreen?.classList.add("is-active");
  window.setTimeout(() => demo.token?.focus(), 420);
}

// Ensure DOM is loaded before initializing
document.addEventListener('DOMContentLoaded', function() {
  // Re-query elements to ensure they're available
  const loginButton = document.querySelector("#demoLogin");
  const userField = document.querySelector("#demoUser");
  const passField = document.querySelector("#demoPass");
  
  if (loginButton) {
    loginButton.addEventListener("click", handleLogin);
  }
  
  if (userField && passField) {
    [userField, passField].forEach((field) => {
      field.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          const loginBtn = document.querySelector("#demoLogin");
          if (loginBtn && !loginBtn.disabled) {
            handleLogin(event);
          }
        }
      });
    });
  }
});

function handleLogin(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  const loginButton = document.querySelector("#demoLogin");
  const userField = document.querySelector("#demoUser");
  const passField = document.querySelector("#demoPass");
  
  // Disable button temporarily to prevent multiple clicks
  if (!loginButton || loginButton.disabled) return;
  loginButton.disabled = true;
  
  const user = userField?.value.trim() || "";
  const pass = passField?.value.trim() || "";

  if (user === "1964" && pass === "1964") {
    showDemoMessage("Login successful. Opening main panel...");
    window.setTimeout(() => {
      activateMainDemo();
      if (loginButton) loginButton.disabled = false;
    }, 650);
    return;
  }

  showDemoMessage("Use demo user 1964 and pass 1964.", false);
  // Re-enable button after showing error
  window.setTimeout(() => {
    if (loginButton) loginButton.disabled = false;
  }, 300);
}

// Keep the old event listener as fallback
demo.login?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  
  // Disable button temporarily to prevent multiple clicks
  if (demo.login.disabled) return;
  demo.login.disabled = true;
  
  const user = demo.user?.value.trim();
  const pass = demo.pass?.value.trim();

  if (user === "1964" && pass === "1964") {
    showDemoMessage("Login successful. Opening main panel...");
    window.setTimeout(() => {
      activateMainDemo();
      demo.login.disabled = false;
    }, 650);
    return;
  }

  showDemoMessage("Use demo user 1964 and pass 1964.", false);
  // Re-enable button after showing error
  window.setTimeout(() => {
    demo.login.disabled = false;
  }, 300);
});

[demo.user, demo.pass].forEach((field) => {
  field?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const loginBtn = document.querySelector("#demoLogin");
      if (loginBtn && !loginBtn.disabled) {
        handleLogin(event);
      }
    }
  });
});

demo.saveToken?.addEventListener("click", () => {
  const token = demo.token?.value.trim();

  if (token.toLowerCase() !== "access token") {
    addLog("🔹 Demo token required: access token");
    return;
  }

  addLog([
    "🔹 Token saved to demo memory.",
    "🔹 Access token is ready for emulator connection."
  ]);
});

demo.connect?.addEventListener("click", () => {
  addLog([
    "🔹 Checking for API updates...",
    "🔹 Connected: emulator-5554", 
    "🔹 Connecting To Proxy 0.0.0.0:2761...",
    "🔹 Proxy active. Waiting for game traffic."
  ]);
});

demo.disconnect?.addEventListener("click", () => {
  addLog([
    "🔹 Disconnecting emulator-5554...",
    "🔹 Proxy removed from emulator.",
    "🔹 LOGIN TOOL returned to standby."
  ]);
});

demo.runCert?.addEventListener("click", () => {
  addLog([
    "🔹 Certificate installer launched in demo mode.",
    "🔹 Install the certificate in the emulator for the real EXE setup."
  ]);
});

demo.tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;
    demo.tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    demo.panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === target));
  });
});

window.addEventListener("mousemove", (event) => {
  // Only enable cursor glow on devices with mouse
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = "1";
  }
});

window.addEventListener("mouseleave", () => {
  cursorGlow.style.opacity = "0";
});

window.addEventListener("mouseenter", () => {
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    cursorGlow.style.opacity = "1";
  }
});

if (tiltCard) {
  const maxTilt = 12;

  window.addEventListener("mousemove", (event) => {
    // Only apply tilt effect on desktop with mouse
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && window.matchMedia("(min-width: 761px)").matches) {
      const x = (event.clientX / window.innerWidth - 0.5) * maxTilt;
      const y = (event.clientY / window.innerHeight - 0.5) * -maxTilt;
      tiltCard.style.transform = `rotateX(${8 + y}deg) rotateY(${-13 + x}deg) translateZ(0)`;
    }
  });

  window.addEventListener("mouseleave", () => {
    tiltCard.style.transform = "rotateX(8deg) rotateY(-13deg) translateZ(0)";
  });
}
