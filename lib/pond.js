import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

THREE.ColorManagement.enabled = false

export function pond(canvas, opts = {}) {
  const WATER = [0.039, 0.09, 0.098]
  const BGC = `vec3(${WATER.map((v) => v.toFixed(4)).join(', ')})`
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(...WATER)
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 80)
  camera.up.set(0, 0, -1)
  const CAM_Y = 16
  const HALF = CAM_Y * Math.tan(THREE.MathUtils.degToRad(20))
  let strip = !!opts.strip, band = 1
  const time = { value: 0 }

  const NOISE = `
  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y); }
  `

  function sheet(shape) {
    const g = new THREE.PlaneGeometry(1, 1, 5, 2)
    const q = g.attributes.position, n = g.attributes.normal
    for (let i = 0; i < q.count; i++) {
      const [x, z] = shape(q.getX(i) + 0.5, q.getY(i) + 0.5)
      q.setXYZ(i, x, 0, z); n.setXYZ(i, 0, 1, 0)
    }
    return g
  }

  function fishGeometry(wide) {
    const body = new THREE.SphereGeometry(1, 44, 18)
    body.rotateZ(Math.PI / 2)
    const p = body.attributes.position
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), s = (1 - x) / 2
      const w = s < 0.3 ? 0.4 + 0.6 * Math.sin(s / 0.3 * Math.PI / 2) : s < 0.42 ? 1 : 1 - (s - 0.42) / 0.58 * 0.86
      const r = Math.sqrt(Math.max(0, 1 - x * x)) || 1
      p.setXYZ(i, -0.62 + (x + 1) * 0.81, p.getY(i) / r * wide * 0.8 * w, p.getZ(i) / r * wide * w)
    }
    body.computeVertexNormals()
    const parts = [body]
    for (const sgn of [1, -1]) {
      parts.push(sheet((u, v) => [0.5 - u * 0.26 - v * (0.05 + 0.2 * Math.sqrt(u)), sgn * (wide * 0.8 + u * 0.3 - v * u * 0.08)]))
      parts.push(sheet((u, v) => [-0.02 - u * 0.17 - v * 0.1 * u, sgn * (wide * 0.55 + u * 0.12)]))
      parts.push(sheet((u, v) => [-0.58 - u * 0.44, sgn * u * 0.17 + (v - 0.5) * 2 * (0.03 + 0.1 * Math.sin(u * Math.PI) * (1 - 0.35 * u))]))
    }
    parts.forEach((g, k) => g.setAttribute('fin', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count).fill(k ? 1 : 0), 1)))
    const g = mergeGeometries(parts)
    g.translate(-0.5, 0, 0)
    return g
  }

  function fishMaterial(s, ph) {
    return new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: { swim: { value: 0 }, ph: { value: ph }, spine: { value: Array(8).fill(0) }, beat: { value: 0.5 }, wide: { value: s.wide }, cover: { value: s.cover }, ink: { value: s.ink }, crown: { value: s.crown }, base: { value: new THREE.Color(...s.base) }, mark: { value: new THREE.Color(...s.mark) } },
      vertexShader: `attribute float fin; uniform float swim, ph, beat; uniform float spine[8]; varying vec3 vP; varying vec3 vN; varying float vY; varying float vF;
        void main(){ vec3 p = position; vP = vec3(p.x + 0.5, p.y, p.z); vF = fin; float s = (0.5 - p.x) * 0.5; float a = clamp(-p.x / 1.5, 0.0, 1.0) * 7.0; int i = int(floor(a)); int j = i < 7 ? i + 1 : 7;
          p.z += sin(s * 5.0 - swim + ph) * 0.26 * s * s * s * beat + mix(spine[i], spine[j], fract(a));
          vN = normalize(mat3(modelMatrix) * normal); vec4 w = modelMatrix * vec4(p, 1.0); vY = w.y; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: `uniform float wide, ph, cover, ink, crown; uniform vec3 base, mark; varying vec3 vP; varying vec3 vN; varying float vY; varying float vF; ${NOISE}
        void main(){ float s = (1.0 - vP.x) * 0.5; float l = vP.z / wide;
          float b = 0.72 + 0.28 * max(vN.y, 0.0); vec3 c = base;
          if (vF < 0.5) {
            if (noise(vec2(s * 5.5 + ph, l * 1.2 + ph * 0.7)) > 1.0 - cover) c = mark;
            if (crown > 0.5 && length(vec2((s - 0.11) * 10.0, l * 1.5)) < 0.75) c = mark;
            if (noise(vec2(s * 11.0 + ph * 3.1, l * 2.6 - ph)) > 1.0 - ink) c = vec3(0.3, 0.33, 0.4);
            if (length(vec2((s - 0.07) * 16.0, (abs(l) - 0.5) * 3.4)) < 0.5) c = vec3(0.22, 0.25, 0.3);
            c *= b;
          } else { c = mix(mix(base, vec3(0.97), 0.75), ${BGC}, 0.2); }
          gl_FragColor = vec4(mix(c, ${BGC}, clamp(-vY / 7.0, 0.0, 0.7)), 1.0); }`,
    })
  }

  const WHITE = [0.96, 0.95, 0.91], RED = [0.93, 0.3, 0.13]
  const SPEC = [
    { len: 3.9, wide: 0.21, base: WHITE, mark: RED, cover: 0.52, ink: 0, crown: 0 },
    { len: 3.4, wide: 0.22, base: WHITE, mark: RED, cover: 0.44, ink: 0.3, crown: 0 },
    { len: 3.0, wide: 0.20, base: WHITE, mark: RED, cover: 0, ink: 0, crown: 1 },
    { len: 3.2, wide: 0.21, base: [0.96, 0.62, 0.2], mark: [0.98, 0.78, 0.4], cover: 0.4, ink: 0, crown: 0 },
    { len: 2.6, wide: 0.20, base: RED, mark: WHITE, cover: 0.36, ink: 0, crown: 0 },
    { len: 2.3, wide: 0.20, base: WHITE, mark: RED, cover: 0.58, ink: 0.26, crown: 0 },
    { len: 2.0, wide: 0.20, base: WHITE, mark: [0.96, 0.55, 0.15], cover: 0.5, ink: 0, crown: 0 },
  ]

  const fish = SPEC.map((s, i) => {
    const mesh = new THREE.Mesh(fishGeometry(s.wide), fishMaterial(s, 1.3 + i * 2.7))
    mesh.position.set(Math.cos(i * 2.4) * (2 + i * 0.6), -1, Math.sin(i * 2.4) * (1.5 + i * 0.4))
    scene.add(mesh)
    return { s, mesh, lead: i < 3, yaw: i * 2.1, w: 0, v: 0.5, bend: 0, pulse: 0, kick: i * 0.4, rest: 0, beat: 0.5, ph: i * 1.9, depth: -0.5 - i * 0.28, target: new THREE.Vector3(), timer: 0, pause: 0, follow: 0, bored: 0, react: 0.25 + ((i * 7) % 5) * 0.16, speed: 0.6 + (i % 3) * 0.12 }
  })

  const dummy = new THREE.Object3D()
  const PLANE_VERT = `varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShaderMaterial({
    uniforms: { t: time },
    vertexShader: PLANE_VERT,
    fragmentShader: `uniform float t; varying vec3 vW; ${NOISE} void main(){ vec2 p = vW.xz;
      float stones = noise(p * 1.5) * noise(p * 6.0 + 3.0);
      float light = noise(p * 0.7 + vec2(t * 0.12, -t * 0.08)) * noise(p * 1.9 - vec2(t * 0.1, t * 0.14));
      gl_FragColor = vec4(${BGC} * 0.85 + vec3(0.2, 0.5, 0.42) * (0.2 * stones + 0.22 * light * light), 1.0); }`,
  }))
  floor.rotation.x = -Math.PI / 2; floor.position.y = -4.5
  scene.add(floor)

  const RIPPLES = 16
  const rip = Array.from({ length: RIPPLES }, () => new THREE.Vector4(0, 0, -100, 0))
  let ripNext = 0
  const ripple = (x, z, amp) => { rip[ripNext].set(x, z, time.value, amp); ripNext = (ripNext + 1) % RIPPLES }
  const water = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShaderMaterial({
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
    uniforms: { t: time, rip: { value: rip } },
    vertexShader: PLANE_VERT,
    fragmentShader: `uniform float t; uniform vec4 rip[${RIPPLES}]; varying vec3 vW;
      void main(){ float sum = 0.0;
        for (int i = 0; i < ${RIPPLES}; i++) { vec4 r = rip[i]; float age = t - r.z; float life = 1.0 + 1.8 * r.w;
          if (age < 0.0 || age > life) continue;
          float k = 1.0 - age / life; float d = length(vW.xz - r.xy); float rad = 0.15 + age * 2.4; float w = 0.2 + age * 0.1;
          float a = (d - rad) / w; float c = (d - rad * 0.55) / w;
          sum += r.w * k * k * (exp(-a * a) + 0.5 * exp(-c * c)); }
        gl_FragColor = vec4(vec3(0.5, 0.86, 0.9) * min(sum, 1.0) * 0.62, 1.0); }`,
  }))
  water.rotation.x = -Math.PI / 2; water.renderOrder = 10
  scene.add(water)

  const PELLETS = 48
  const pelletMesh = new THREE.InstancedMesh(new THREE.SphereGeometry(0.1, 6, 5), new THREE.MeshBasicMaterial({ color: new THREE.Color(1, 0.88, 0.6) }), PELLETS)
  pelletMesh.frustumCulled = false
  scene.add(pelletMesh)
  const pellets = Array.from({ length: PELLETS }, () => ({ x: 0, z: 0, born: 0, alive: false, ph: 0 }))
  let fedAt = -9
  function feed(x, z) {
    if (time.value - fedAt < 0.5) return
    fedAt = time.value
    let room = 18 - pellets.filter((p) => p.alive).length, n = 0
    ripple(x, z, room > 0 ? 0.85 : 0.35)
    for (const p of pellets) {
      if (room <= 0 || n === 6) break
      if (p.alive) continue
      const a = Math.random() * Math.PI * 2, r = 0.15 + Math.random() * 1.1
      p.x = x + Math.cos(a) * r; p.z = z + Math.sin(a) * r; p.born = time.value + n * 0.07; p.alive = true; p.ph = a
      n++; room--
    }
  }

  const PADS = [[0.78, -0.74, 1.25], [0.93, -0.5, 0.9], [0.6, -0.92, 0.8], [0.95, -0.9, 1.05], [-0.9, -0.82, 1.1], [-0.74, -0.96, 0.75], [0.9, 0.86, 1.15], [0.72, 0.97, 0.8], [0.99, 0.6, 0.7]]
  const padMesh = new THREE.InstancedMesh(new THREE.CircleGeometry(1, 20, 0.35, Math.PI * 2 - 0.7), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }), PADS.length || 1)
  padMesh.visible = PADS.length > 0
  padMesh.frustumCulled = false
  PADS.forEach((q, i) => padMesh.setColorAt(i, new THREE.Color(0.15 + (i % 3) * 0.04, 0.38 + (i % 2) * 0.08, 0.2)))
  scene.add(padMesh)

  const target = new THREE.WebGLRenderTarget(4, 4, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter })
  const post = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial({
    depthTest: false,
    uniforms: { tex: { value: target.texture }, grid: { value: new THREE.Vector2(4, 4) }, cell: { value: 16 }, gap: { value: 2 } },
    vertexShader: `void main(){ gl_Position = vec4(position.xy, 0.0, 1.0); }`,
    fragmentShader: `uniform sampler2D tex; uniform vec2 grid; uniform float cell, gap; ${NOISE}
      void main(){ vec2 c = floor(gl_FragCoord.xy / cell); vec3 col = texture2D(tex, (c + 0.5) / grid).rgb; float h = hash(c);
        vec3 bgc = ${BGC}; float bg = bgc.b; float v = max(col.r, max(col.g, col.b)); vec3 hue = col / max(v, 0.001);
        float lv = floor((v + (h - 0.5) * 0.045) * 9.0 + 0.5) / 9.0; vec3 o = hue * lv;
        if (v < bg + 0.05) o = (v > bg + 0.022 && h > 0.55) ? hue * (bg + 0.075) : bgc;
        vec2 f = mod(gl_FragCoord.xy, cell); float on = step(f.x, cell - gap) * step(gap, f.y);
        gl_FragColor = vec4(mix(bgc, o, on), 1.0); }`,
  }))
  const postScene = new THREE.Scene(); postScene.add(post)
  const postCam = new THREE.Camera()

  let W = 1, H = 1, halfW = HALF, unit = 1, ready = false
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2)
    W = canvas.clientWidth; H = canvas.clientHeight
    renderer.setPixelRatio(dpr); renderer.setSize(W, H, false)
    const cell = opts.cell || (W > 2400 ? 8 : 6), cols = Math.ceil(W / cell), rows = Math.ceil(H / cell)
    target.setSize(cols, rows)
    post.material.uniforms.grid.value.set(cols, rows)
    post.material.uniforms.cell.value = cell * dpr
    post.material.uniforms.gap.value = dpr
    const fullRows = strip ? Math.max(rows, Math.ceil(Math.max(520, window.innerHeight) / cell)) : rows
    band = rows / fullRows
    camera.aspect = cols / fullRows
    if (strip) camera.setViewOffset(cols, fullRows, 0, 0, cols, rows)
    else camera.clearViewOffset()
    camera.updateProjectionMatrix()
    halfW = HALF * camera.aspect
    unit = THREE.MathUtils.clamp(halfW / 8, 0.55, 1)
    for (const f of fish) f.mesh.scale.setScalar(f.s.len / 2 * unit)
    PADS.forEach((q, i) => {
      dummy.position.set(q[0] * halfW, 0.05, q[1] * HALF); dummy.rotation.set(-Math.PI / 2, 0, i * 1.9); dummy.scale.setScalar(q[2] * unit * 0.8)
      dummy.updateMatrix(); padMesh.setMatrixAt(i, dummy.matrix)
    })
    padMesh.instanceMatrix.needsUpdate = true
    dummy.rotation.set(0, 0, 0)
  }
  const observer = new ResizeObserver(() => { resize(); if (ready) draw() })
  observer.observe(canvas)
  resize()

  const pointer = new THREE.Vector2(0, 0), ray = new THREE.Raycaster(), surface = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), hit = new THREE.Vector3(), cursor = new THREE.Vector3()
  let has = false
  const place = (e) => { const b = canvas.getBoundingClientRect(); pointer.set(((e.clientX - b.left) / W) * 2 - 1, -((e.clientY - b.top) / H) * 2 + 1) }
  const toWater = (out) => { ray.setFromCamera(pointer, camera); return ray.ray.intersectPlane(surface, out) }
  const onMove = (e) => { place(e); has = e.pointerType === 'mouse' }
  const onLeave = () => { has = false }
  const onClick = (e) => {
    place(e)
    if (still || !toWater(hit)) return
    feed(hit.x, hit.z)
  }
  canvas.addEventListener('pointermove', onMove)
  canvas.addEventListener('pointerleave', onLeave)
  canvas.addEventListener('click', onClick)

  const wrap = (d) => { while (d > Math.PI) d -= Math.PI * 2; while (d < -Math.PI) d += Math.PI * 2; return d }
  function retarget(f) {
    const m = f.s.len * 0.3 * unit, p = f.mesh.position
    let best = 9
    for (let k = 0; k < 6; k++) {
      const x = (Math.random() * 2 - 1) * Math.max(1, halfW - m)
      const z = f.lead && band < 1 ? -HALF + 0.4 + Math.random() * Math.max(0.2, 2 * HALF * band - 0.8) : (Math.random() * 2 - 1) * Math.max(0.3, HALF - m)
      const off = Math.abs(wrap(Math.atan2(-(z - p.z), x - p.x) - f.yaw)) + (Math.hypot(x - p.x, z - p.z) < 3 ? 2 : 0)
      if (off < best) { best = off; f.target.set(x, 0, z) }
    }
    f.timer = 6 + Math.random() * 8
    f.rest = Math.random() < 0.22 ? 1.5 + Math.random() * 3 : 0
  }
  fish.forEach(retarget)

  let drip = 3, wasFed = false
  function update(dt) {
    time.value += dt
    const t = time.value
    drip -= dt
    if (drip < 0 && dt > 0) { drip = 3 + Math.random() * 5; ripple((Math.random() * 2 - 1) * halfW, (Math.random() * 2 - 1) * HALF, 0.3) }

    let fed = false
    for (const p of pellets) { if (p.alive && t - p.born > 40) p.alive = false; if (p.alive) fed = true }
    if (!fed && wasFed) fish.forEach(retarget)
    wasFed = fed
    const near = has && !still && toWater(cursor)

    const pairs = [], claims = new Map(), spare = new Map(), taken = new Set()
    for (const f of fish) {
      const reach = f.s.len / 4 * unit, hx = f.mesh.position.x + Math.cos(f.yaw) * reach, hz = f.mesh.position.z - Math.sin(f.yaw) * reach
      for (const p of pellets) if (p.alive && t - p.born >= f.react) pairs.push([Math.hypot(p.x - hx, p.z - hz), f, p])
    }
    pairs.sort((a, b) => a[0] - b[0])
    for (const q of pairs) {
      if (!spare.has(q[1])) spare.set(q[1], q)
      if (claims.has(q[1]) || taken.has(q[2])) continue
      claims.set(q[1], q); taken.add(q[2])
    }

    for (const f of fish) {
      const m = f.mesh, u = m.material.uniforms, size = f.s.len / 2 * unit, reach = size * 0.5
      const hx = m.position.x + Math.cos(f.yaw) * reach, hz = m.position.z - Math.sin(f.yaw) * reach
      const mine = claims.get(f), other = spare.get(f)
      let food = mine ? mine[2] : null, best = mine ? mine[0] : 1e9
      f.timer -= dt; f.pause -= dt; f.bored -= dt
      let gx = f.target.x, gz = f.target.z, pace = f.speed, rate = 0.55
      if (band < 1 && f.lead && m.position.z > -HALF + 2 * HALF * band) { pace *= 2.2; f.rest = 0 }
      const away = near ? Math.hypot(cursor.x - hx, cursor.z - hz) : 1e9
      if (food) {
        f.follow = 0
        gx = food.x; gz = food.z; rate = 1.9
        pace = f.speed * 2.2 * THREE.MathUtils.clamp(best / 1.6, 0.3, 1)
        if (best < 0.32 * unit + 0.1) { food.alive = false; f.pause = 0.4; ripple(food.x, food.z, 0.3) }
      } else if (other) {
        f.follow = 0
        gx = other[2].x; gz = other[2].z; best = other[0]; rate = 1.4
        pace = f.speed * 1.6 * THREE.MathUtils.clamp((best - 2) / 1.5, 0, 1)
      } else {
        if (f.follow <= 0 && f.bored <= 0 && away < 2.6) f.follow = 3.5 + Math.random() * 3
        if (f.follow > 0) {
          f.follow -= dt
          if (f.follow <= 0 || away > 6) { f.follow = 0; f.bored = 7 + Math.random() * 5; retarget(f) }
          else { gx = cursor.x; gz = cursor.z; best = away; rate = 1.6; pace = f.speed * 1.8 * THREE.MathUtils.clamp((away - 0.4) / 1.6, 0, 1) }
        }
        if (f.follow <= 0 && (f.timer <= 0 || Math.hypot(gx - m.position.x, gz - m.position.z) < 1.8)) retarget(f)
      }
      const chasing = food || other || f.follow > 0
      let vx = gx - (chasing ? hx : m.position.x), vz = gz - (chasing ? hz : m.position.z)
      const vl = Math.hypot(vx, vz) || 1
      vx /= vl; vz /= vl
      let ax = 0, az = 0
      for (const o of fish) {
        if (o === f) continue
        const ox = m.position.x - o.mesh.position.x, oz = m.position.z - o.mesh.position.z, od = Math.hypot(ox, oz) || 0.01
        const room = (size + o.s.len / 2 * unit) * (food ? 0.6 : 0.85)
        if (od < room) { const k = 1 - od / room; ax += ox / od * k; az += oz / od * k }
      }
      vx += ax * 1.1; vz += az * 1.1
      m.position.x += ax * dt * 0.5; m.position.z += az * dt * 0.5
      let d = wrap(Math.atan2(-vz, vx) - f.yaw)
      if (!chasing) d += 0.14 * Math.sin(t * 0.3 + f.ph)
      const radius = size * (chasing ? 0.7 : 1.5)
      if (chasing && Math.abs(d) > 1.2 && best < radius * 2) d *= 0.15
      pace *= Math.max(chasing ? 0.45 : 0.75, Math.cos(d))
      if (f.pause > 0) pace *= 0.4
      f.rest -= dt; f.kick -= dt
      const resting = !chasing && f.rest > 0
      if (resting) pace *= 0.15
      else if (f.kick <= 0) { f.pulse = 1; f.kick = chasing ? 0.5 + Math.random() * 0.5 : 1.3 + Math.random() * 2.4 }
      f.pulse *= Math.exp(-dt * 1.5)
      f.v += (pace * (0.55 + 0.8 * f.pulse) - f.v) * Math.min(1, dt * (f.pulse > 0.5 ? 3 : 1.1))
      rate = Math.min(rate, f.v / radius)
      f.w += (THREE.MathUtils.clamp(d * 1.4, -rate, rate) - f.w) * Math.min(1, dt * 1.8)
      f.yaw += f.w * dt
      m.position.x += Math.cos(f.yaw) * f.v * dt; m.position.z -= Math.sin(f.yaw) * f.v * dt
      m.position.y += ((chasing ? f.depth * 0.45 - 0.25 : f.depth) - m.position.y) * Math.min(1, dt * 1.5)
      m.rotation.y = f.yaw
      f.beat += ((resting ? 0.25 : 0.4) + 0.9 * f.pulse - f.beat) * Math.min(1, dt * 5)
      u.beat.value = f.beat
      u.swim.value += (1.4 + 5.5 * f.pulse + f.v * 1.4) * dt
      f.bend += (THREE.MathUtils.clamp(f.w / Math.max(f.v, 0.45) * size, -0.5, 0.5) - f.bend) * Math.min(1, dt * 2.5)
      const sp = u.spine.value
      for (let k = 1; k < 8; k++) { const a = Math.max(0, k / 7 * 1.5 - 0.45); sp[k] = -f.bend * 0.5 * a * a }
    }

    pellets.forEach((p, i) => {
      const on = p.alive && t >= p.born
      dummy.position.set(p.x + Math.sin(t * 0.8 + p.ph) * 0.05, 0, p.z + Math.cos(t * 0.7 + p.ph) * 0.05)
      dummy.scale.setScalar(on ? Math.min(1, (t - p.born) * 6) : 0)
      dummy.updateMatrix(); pelletMesh.setMatrixAt(i, dummy.matrix)
    })
    pelletMesh.instanceMatrix.needsUpdate = true

    camera.position.set(0, CAM_Y, 0)
    camera.lookAt(0, 0, 0)
    camera.updateMatrixWorld()
  }

  const STEP = 1 / 60
  let last = 0, owed = 0, raf = 0
  function frame(now) {
    owed += last ? Math.min(2, (now - last) / 1000) : STEP
    last = now
    if (still) { owed = 0; update(0) }
    while (owed >= STEP) { update(STEP); owed -= STEP }
    draw()
    raf = requestAnimationFrame(frame)
  }
  function draw() {
    renderer.setRenderTarget(target); renderer.render(scene, camera)
    renderer.setRenderTarget(null); renderer.render(postScene, postCam)
  }
  const onWindow = () => { resize(); draw() }
  window.addEventListener('resize', onWindow)
  update(0)
  ready = true
  raf = requestAnimationFrame(frame)

  const setStrip = (value) => {
    if (strip === value) return
    strip = value
    resize()
    fish.forEach((f) => { if (f.lead) retarget(f) })
    draw()
  }
  const destroy = () => {
    cancelAnimationFrame(raf)
    observer.disconnect()
    window.removeEventListener('resize', onWindow)
    canvas.removeEventListener('pointermove', onMove)
    canvas.removeEventListener('pointerleave', onLeave)
    canvas.removeEventListener('click', onClick)
    scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose() })
    post.geometry.dispose(); post.material.dispose(); target.dispose(); renderer.dispose()
  }
  return { setStrip, destroy }
}
