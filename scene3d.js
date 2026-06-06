/* ============================================================
   Hero 3D scene  (WebGL · Three.js)
   A glowing geometric "core" (icosahedron + torus-knot) wrapped
   in a drifting particle starfield, sitting behind the hero copy.
     - CURSOR  → parallax: the whole world tilts toward the pointer
                 and the camera eases sideways for depth.
     - SCROLL  → the camera dollies in and the core counter-rotates
                 as you scroll down the page.
   Graceful fallback: if WebGL / Three / reduced-motion, nothing
   mounts and the existing hero gradient + blobs stay as-is.
   ============================================================ */
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  if (window.ThreeLoader) window.ThreeLoader.load(start);
  else if (window.THREE) start(window.THREE);

  function start(THREE) {
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      return; // no WebGL — keep the gradient hero
    }
    renderer.setClearAlpha(0);

    const canvas = renderer.domElement;
    canvas.className = 'hero3d-canvas';
    hero.appendChild(canvas);
    document.body.classList.add('hero3d-on');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 4000);
    camera.position.set(0, 0, 520);

    // Brand palette
    const BLUE = new THREE.Color(0x2a4cf0);
    const VIOLET = new THREE.Color(0x7c5cff);
    const YELLOW = new THREE.Color(0xffd21e);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const l1 = new THREE.PointLight(0x6f8bff, 1.1); l1.position.set(220, 180, 320); scene.add(l1);
    const l2 = new THREE.PointLight(0xffd21e, 0.7); l2.position.set(-260, -120, 220); scene.add(l2);

    // World group — everything parallaxes/rotates together
    const world = new THREE.Group();
    scene.add(world);

    // ---- Central core: glowing icosahedron wireframe + faint solid ----
    const core = new THREE.Group();
    world.add(core);

    const icoGeo = new THREE.IcosahedronGeometry(120, 1);
    core.add(new THREE.Mesh(
      icoGeo,
      new THREE.MeshStandardMaterial({
        color: BLUE, emissive: VIOLET, emissiveIntensity: 0.35,
        metalness: 0.5, roughness: 0.4, transparent: true, opacity: 0.12, flatShading: true,
      })
    ));
    core.add(new THREE.LineSegments(
      new THREE.WireframeGeometry(icoGeo),
      new THREE.LineBasicMaterial({ color: 0x9fb4ff, transparent: true, opacity: 0.55 })
    ));

    // Orbiting torus-knot, additive glow
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(200, 5, 220, 12),
      new THREE.MeshBasicMaterial({ color: YELLOW, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending })
    );
    world.add(knot);

    // A few small drifting crystals
    const crystals = [];
    for (let i = 0; i < 5; i++) {
      const c = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.OctahedronGeometry(18 + i * 6, 0)),
        new THREE.LineBasicMaterial({ color: i % 2 ? 0xffd21e : 0x8fa6ff, transparent: true, opacity: 0.5 })
      );
      const a = (i / 5) * Math.PI * 2;
      c.position.set(Math.cos(a) * 300, Math.sin(a * 1.3) * 180, Math.sin(a) * 160 - 120);
      c.userData.spin = 0.2 + i * 0.05;
      world.add(c);
      crystals.push(c);
    }

    // ---- Particle starfield ----
    const COUNT = 1500;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3]     = (Math.random() * 2 - 1) * 1100;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 700;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 700;
      tmp.copy(Math.random() > 0.7 ? YELLOW : BLUE).lerp(new THREE.Color(0xffffff), Math.random() * 0.5);
      colors[i * 3] = tmp.r; colors[i * 3 + 1] = tmp.g; colors[i * 3 + 2] = tmp.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const stars = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({
        size: 3.2, sizeAttenuation: true, vertexColors: true,
        transparent: true, opacity: 0.9, depthWrite: false, blending: THREE.AdditiveBlending,
      })
    );
    world.add(stars);

    // ---- Theme-aware intensity (additive glow reads differently on light vs dark) ----
    function applyTheme() {
      const dark = document.documentElement.getAttribute('data-theme') === 'dark';
      stars.material.opacity = dark ? 0.95 : 0.6;
      knot.material.opacity = dark ? 0.5 : 0.32;
    }
    applyTheme();
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', () => setTimeout(applyTheme, 0));

    // ---- Input: cursor + scroll ----
    let pointerX = 0, pointerY = 0, scrollP = 0;
    window.addEventListener('mousemove', (e) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    }, { passive: true });
    function onScroll() {
      const h = hero.offsetHeight || window.innerHeight;
      scrollP = Math.min(1, Math.max(0, window.scrollY / h)); // 0 at top → 1 once hero is scrolled past
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Sizing ----
    function resize() {
      const w = hero.clientWidth || window.innerWidth;
      const h = hero.clientHeight || window.innerHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ---- Render loop ----
    let last = performance.now();
    let camX = 0, camY = 0, rotX = 0, rotY = 0;
    function frame(now) {
      requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      // Skip work once the hero has fully scrolled off-screen
      if (hero.getBoundingClientRect().bottom <= 0) return;

      // Cursor parallax (eased)
      camX += ((pointerX * 70) - camX) * 0.05;
      camY += ((-pointerY * 50) - camY) * 0.05;
      camera.position.x = camX;
      camera.position.y = camY;
      // Scroll dolly: glide the camera in as the hero scrolls away
      camera.position.z = 520 - scrollP * 180;
      camera.lookAt(0, 0, 0);

      // Cursor tilts the whole world; ambient auto-rotation underneath
      rotY += ((pointerX * 0.5) - rotY) * 0.04;
      rotX += ((pointerY * 0.35) - rotX) * 0.04;
      world.rotation.y = rotY + now * 0.00004;
      world.rotation.x = rotX;
      world.rotation.z = scrollP * 0.6;

      core.rotation.y -= dt * 0.25;
      core.rotation.x += dt * 0.12;
      knot.rotation.x += dt * 0.18;
      knot.rotation.z -= dt * 0.1;
      crystals.forEach((c) => { c.rotation.x += dt * c.userData.spin; c.rotation.y += dt * c.userData.spin * 0.8; });

      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  }
})();
