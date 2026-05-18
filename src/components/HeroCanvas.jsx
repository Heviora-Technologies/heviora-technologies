import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

export default function HeroCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.85, 5)
    camera.lookAt(0, -0.2, 0)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x050816, 0)
    renderer.shadowMap.enabled = true

    const supportsHover = window.matchMedia('(hover: hover)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let isVisible = true
    let frameId = null

    const resize = () => {
      const width = canvas.parentElement?.clientWidth || window.innerWidth
      const height = canvas.parentElement?.clientHeight || window.innerHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      camera.position.set(0, 0.85, width < 760 ? 6.2 : 5)
      camera.lookAt(0, -0.2, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.18)
    scene.add(ambient)

    const keyLight = new THREE.DirectionalLight(0x66f2ff, 0.9)
    keyLight.position.set(5, 5, 5)
    keyLight.castShadow = true
    scene.add(keyLight)

    const rimLight = new THREE.PointLight(0x7b2eff, 0.8, 12)
    rimLight.position.set(-3, 2.5, 3)
    scene.add(rimLight)

    // Robot group
    const robot = new THREE.Group()
    robot.position.set(0, -0.15, 0)

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x003b6b,
      metalness: 0.9,
      roughness: 0.18,
      emissive: 0x002a3a,
      emissiveIntensity: 0.2,
    })

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x00c2ff,
      metalness: 0.2,
      roughness: 0.1,
      emissive: 0x00c2ff,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.95,
    })

    // Head
    const head = new THREE.Group()
    const headGeo = new THREE.SphereGeometry(0.42, 48, 48)
    const headMesh = new THREE.Mesh(headGeo, metalMat)
    headMesh.castShadow = true
    head.add(headMesh)

    // Eyes
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x66f2ff, transparent: true })
    const leftEye = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), eyeMat)
    const rightEye = leftEye.clone()
    leftEye.position.set(-0.14, 0.06, 0.36)
    rightEye.position.set(0.14, 0.06, 0.36)
    head.add(leftEye, rightEye)

    // Holo plate on head
    const holo = new THREE.Mesh(new THREE.CircleGeometry(0.5, 48), accentMat)
    holo.rotation.x = -Math.PI / 2
    holo.position.set(0, 0.45, 0)
    holo.material.opacity = 0.14
    head.add(holo)

    robot.add(head)

    // Torso
    const torsoGeo = new THREE.CylinderGeometry(0.36, 0.5, 0.8, 36)
    const torso = new THREE.Mesh(torsoGeo, metalMat)
    torso.position.set(0, -0.6, 0)
    torso.castShadow = true
    robot.add(torso)

    // Arms
    const armGeo = new THREE.CylinderGeometry(0.07, 0.08, 0.7, 18)
    const leftArm = new THREE.Mesh(armGeo, metalMat)
    const rightArm = leftArm.clone()
    leftArm.position.set(-0.55, -0.25, 0)
    rightArm.position.set(0.55, -0.25, 0)
    leftArm.rotation.z = Math.PI / 9
    rightArm.rotation.z = -Math.PI / 9
    leftArm.castShadow = rightArm.castShadow = true
    robot.add(leftArm, rightArm)

    // Hands
    const handGeo = new THREE.SphereGeometry(0.08, 12, 12)
    const leftHand = new THREE.Mesh(handGeo, accentMat)
    const rightHand = leftHand.clone()
    leftHand.position.set(-0.55, -0.65, 0)
    rightHand.position.set(0.55, -0.65, 0)
    robot.add(leftHand, rightHand)

    // Add subtle emissive spot for eyes
    const eyeLightL = new THREE.PointLight(0x66f2ff, 0.9, 3)
    eyeLightL.position.copy(leftEye.position).add(new THREE.Vector3(0, 0, 0.2))
    head.add(eyeLightL)
    const eyeLightR = new THREE.PointLight(0x66f2ff, 0.9, 3)
    eyeLightR.position.copy(rightEye.position).add(new THREE.Vector3(0, 0, 0.2))
    head.add(eyeLightR)

    scene.add(robot)

    // Floating holographic rings
    const rings = new THREE.Group()
    for (let i = 0; i < 4; i++) {
      const t = new THREE.TorusGeometry(1.6 - i * 0.22, 0.04 + i * 0.008, 64, 200)
      const m = new THREE.MeshStandardMaterial({
        color: i % 2 ? 0x7b2eff : 0x00c2ff,
        emissive: i % 2 ? 0x7b2eff : 0x00c2ff,
        emissiveIntensity: 0.85 - i * 0.15,
        transparent: true,
        opacity: 0.85 - i * 0.12,
      })
      const ring = new THREE.Mesh(t, m)
      ring.rotation.x = Math.PI * 0.16 + (i * 0.04)
      rings.add(ring)
    }
    rings.position.set(0, -0.95, 0)
    scene.add(rings)

    // Glowing disc under robot
    const discGeo = new THREE.CircleGeometry(1.05, 64)
    const discMat = new THREE.MeshBasicMaterial({ color: 0x00c2ff, transparent: true, opacity: 0.06 })
    const disc = new THREE.Mesh(discGeo, discMat)
    disc.rotation.x = -Math.PI / 2
    disc.position.y = -1.05
    scene.add(disc)

    // Grid floor
    const grid = new THREE.GridHelper(40, 80, 0x00a8ff, 0x071426)
    grid.material.opacity = 0.12
    grid.material.transparent = true
    grid.rotation.x = -Math.PI / 2
    grid.position.y = -1.2
    scene.add(grid)

    // Particles / starfield
    const isMobile = window.innerWidth < 768
    const starCount = isMobile ? 100 : 220
    const positions = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * (isMobile ? 12 : 18)
      positions[i * 3 + 1] = Math.random() * (isMobile ? 4 : 6) - 1
      positions[i * 3 + 2] = (Math.random() - 0.5) * (isMobile ? 12 : 18)
    }
    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute('position', new THREE.BufferAttribute(positions, 3)),
      new THREE.PointsMaterial({ color: 0x66f2ff, size: isMobile ? 0.04 : 0.03, transparent: true, opacity: isMobile ? 0.8 : 0.85 }),
    )
    scene.add(stars)

    // Cursor interaction for head tracking
    let targetRotX = 0
    let targetRotY = 0
    let currentRotX = 0
    let currentRotY = 0

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      targetRotY = (x - 0.5) * 0.35
      targetRotX = -(y - 0.5) * 0.18
    }

    if (supportsHover) {
      canvas.parentElement?.addEventListener('pointermove', onPointerMove)
    }

    // Entrance animation using GSAP
    try {
      gsap.fromTo(
        robot.position,
        { y: -1.8, z: 0.2 },
        { y: -0.2, z: 0, duration: 1.6, ease: 'power4.out' },
      )
      gsap.fromTo(rings.rotation, { y: 0 }, { y: Math.PI * 0.8, duration: 6, repeat: -1, ease: 'linear' })
    } catch (err) {
      // gsap optional: ignore if not available
    }

    const clock = new THREE.Clock()

    const animate = () => {
      const t = clock.getElapsedTime()

      const floatY = Math.sin(t * 0.8) * 0.06
      robot.position.y = -0.2 + floatY

      const breath = 1 + Math.sin(t * 1.6) * 0.008
      torso.scale.y = breath

      rings.children.forEach((r, i) => {
        r.rotation.y = t * (0.08 + i * 0.02) + i * 0.12
      })

      stars.rotation.y = t * 0.02

      currentRotX += (targetRotX - currentRotX) * 0.08
      currentRotY += (targetRotY - currentRotY) * 0.08
      head.rotation.x = currentRotX
      head.rotation.y = currentRotY

      leftEye.position.y = 0.06 + Math.sin(t * 2.2) * 0.004
      rightEye.position.y = 0.06 + Math.cos(t * 2.2) * 0.004

      renderer.render(scene, camera)
      if (!prefersReducedMotion && isVisible) {
        frameId = window.requestAnimationFrame(animate)
      }
    }

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
        if (isVisible && !prefersReducedMotion) {
          animate()
        }
      },
      { rootMargin: '-20% 0px -50% 0px', threshold: 0.15 },
    )

    intersectionObserver.observe(canvas)
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (supportsHover) {
        canvas.parentElement?.removeEventListener('pointermove', onPointerMove)
      }
      intersectionObserver.disconnect()
      if (frameId) window.cancelAnimationFrame(frameId)
      renderer.dispose()
      scene.traverse((child) => {
        if (child.geometry) child.geometry.dispose()
        if (child.material) {
          if (Array.isArray(child.material)) child.material.forEach((m) => m.dispose())
          else child.material.dispose()
        }
      })
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}
