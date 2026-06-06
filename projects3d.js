/* ============================================================
   Projects 3D engine  (WebGL · Three.js)
   - one shared renderer drawing into the Projects sticky scene
   - each project gets a distinct 3D solid that floats inside the
     badge ring, tracks the CSS-perspective slide as it moves,
     spins continuously and reacts to the pointer
   - graceful fallback: if WebGL / Three fails or the user prefers
     reduced motion, the original emoji badge stays untouched
   - loads Three's global build dynamically so it works both from
     a local web server AND straight off the file:// system
   ============================================================ */
(function () {
  'use strict';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const section = document.querySelector('#projects');
  const sticky = section && section.querySelector('.z-sticky');
  if (!section || !sticky) return;

  const slides = Array.from(section.querySelectorAll('.z-proj-slide'));
  if (!slides.length) return;

  // Boot once Three.js is available (shared loader downloads it a single time).
  if (window.ThreeLoader) {
    window.ThreeLoader.load(start);
  } else if (window.THREE) {
    start(window.THREE);
  }

  function start(THREE) {
    // Per-project look: geometry factory + accent colour (matches each visual's gradient)
    const SOLIDS = [
      { color: 0x9b6bff, faceted: false, geo: () => new THREE.TorusKnotGeometry(0.62, 0.2, 160, 24) }, // 01 QMentis (AI)
      { color: 0xffb020, faceted: true,  geo: () => new THREE.BoxGeometry(1, 1, 1) },                  // 02 Dashboard
      { color: 0x36c6ff, faceted: true,  geo: () => new THREE.OctahedronGeometry(0.92, 0) },           // 03 Offline desktop
      { color: 0x2ee07f, faceted: true,  geo: () => new THREE.IcosahedronGeometry(0.92, 0) },          // 04 StarRocks
      { color: 0x6f8bff, faceted: true,  geo: () => new THREE.DodecahedronGeometry(0.92, 0) },         // 05 Shopping cart
      { color: 0xff8a3d, faceted: false, geo: () => new THREE.TorusGeometry(0.66, 0.26, 28, 90) },     // 06 Taxonomy KPI
      { color: 0xff5ac0, faceted: true,  geo: () => new THREE.ConeGeometry(0.82, 1.4, 7) },            // 07 Blog API
      { color: 0xff5a4d, faceted: true,  geo: () => new THREE.TetrahedronGeometry(1.05, 0) },          // 08 Car garage
    ];

    // ---- Renderer ----
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch (e) {
      return; // no WebGL — keep the emoji fallback
    }
    renderer.setClearAlpha(0);

    const canvas = renderer.domElement;
    canvas.className = 'proj3d-canvas';
    sticky.appendChild(canvas);

    // ---- Scene / camera / lights ----
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -2000, 2000);
    camera.position.z = 600;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 0.95);
    key.position.set(0.4, 0.9, 1);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x88aaff, 0.55);
    rim.position.set(-0.8, -0.4, 0.6);
    scene.add(rim);

    // ---- One unit-sized object per project, parented under a single moving group ----
    const group = new THREE.Group();
    scene.add(group);

    const objects = slides.map((_, i) => {
      const cfg = SOLIDS[i % SOLIDS.length];
      const geo = cfg.geo();
      geo.computeBoundingSphere();
      const r = (geo.boundingSphere && geo.boundingSphere.radius) || 1;

      const wrap = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.3,
        metalness: 0.4,
        roughness: 0.35,
        flatShading: cfg.faceted,
        transparent: true,
      });
      wrap.add(new THREE.Mesh(geo, mat));

      // Crisp wireframe overlay for a premium, hi-tech read
      const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(geo),
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.18 })
      );
      wire.scale.setScalar(1.012);
      wrap.add(wire);

      wrap.scale.setScalar(1 / r); // normalise every solid to ~unit radius
      wrap.visible = false;
      group.add(wrap);
      return wrap;
    });

    // ---- Pointer parallax ----
    let pointerX = 0, pointerY = 0;
    if (window.matchMedia('(pointer: fine)').matches) {
      window.addEventListener('mousemove', (e) => {
        pointerX = (e.clientX / window.innerWidth) * 2 - 1;
        pointerY = (e.clientY / window.innerHeight) * 2 - 1;
      }, { passive: true });
    }

    // ---- Sizing: ortho camera spans the sticky in CSS pixels ----
    let W = 1, H = 1;
    function resize() {
      const r = sticky.getBoundingClientRect();
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(W, H, false);
      camera.left = -W / 2; camera.right = W / 2;
      camera.top = H / 2; camera.bottom = -H / 2;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(resize).observe(sticky);

    // Reveal the engine + hide the static emoji only once we're live
    document.body.classList.add('proj3d-on');

    // ---- Render loop ----
    let last = performance.now();
    function frame(now) {
      requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      const sRect = sticky.getBoundingClientRect();
      const onScreen = sRect.bottom > 0 && sRect.top < window.innerHeight;
      canvas.style.opacity = onScreen ? '1' : '0';
      if (!onScreen) return;

      // Active slide = the one the z-tunnel marks current (fallback: nearest to centre)
      let active = slides.findIndex((s) => s.classList.contains('z-current'));
      if (active < 0) {
        let best = Infinity;
        slides.forEach((s, i) => {
          const r = s.getBoundingClientRect();
          const d = Math.abs(r.top + r.height / 2 - window.innerHeight / 2);
          if (d < best) { best = d; active = i; }
        });
      }

      objects.forEach((o, i) => (o.visible = i === active));
      const slide = slides[active];
      const target = slide.querySelector('.zpj-badge') || slide.querySelector('.zpj-visual');
      if (!target) return;

      // Track the badge's on-screen rect (already projected through the CSS perspective)
      const b = target.getBoundingClientRect();
      const cx = b.left + b.width / 2 - sRect.left;
      const cy = b.top + b.height / 2 - sRect.top;
      group.position.x = cx - W / 2;
      group.position.y = -(cy - H / 2);
      group.scale.setScalar(Math.max(8, b.width * 0.62));

      // Follow the slide's fade so the object dissolves with its card
      const slideOpacity = parseFloat(slide.style.opacity || '1');
      const o = objects[active];
      o.children.forEach((child) => {
        if (!child.material) return;
        child.material.opacity = child.isLineSegments ? 0.18 * slideOpacity : slideOpacity;
      });

      // Spin + pointer tilt
      o.rotation.y += dt * 0.55;
      o.rotation.x += dt * 0.22;
      group.rotation.y += (pointerX * 0.4 - group.rotation.y) * 0.06;
      group.rotation.x += (pointerY * 0.3 - group.rotation.x) * 0.06;

      renderer.render(scene, camera);
    }
    requestAnimationFrame(frame);
  }
})();
