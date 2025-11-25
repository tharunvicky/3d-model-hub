import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeViewerProps {
  modelId: string;
  modelCategory: string;
}

export const ThreeViewer = ({ modelId, modelCategory }: ThreeViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Group | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1419);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 3);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xc039ff, 2);
    directionalLight2.position.set(-5, 3, -5);
    scene.add(directionalLight2);

    // Create placeholder geometry group based on category
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.8,
      roughness: 0.2,
    });

    switch (modelCategory) {
      case "cars": {
        // Car body
        const body = new THREE.Mesh(
          new THREE.BoxGeometry(2, 0.6, 1),
          new THREE.MeshStandardMaterial({ color: 0xff3366, metalness: 0.9, roughness: 0.1 })
        );
        body.position.y = 0.3;
        
        // Car roof
        const roof = new THREE.Mesh(
          new THREE.BoxGeometry(1, 0.5, 0.9),
          new THREE.MeshStandardMaterial({ color: 0xff3366, metalness: 0.9, roughness: 0.1 })
        );
        roof.position.y = 0.85;
        
        // Wheels
        const wheelGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.2, 16);
        const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5, roughness: 0.7 });
        
        const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel1.rotation.z = Math.PI / 2;
        wheel1.position.set(-0.7, 0, 0.6);
        
        const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel2.rotation.z = Math.PI / 2;
        wheel2.position.set(-0.7, 0, -0.6);
        
        const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel3.rotation.z = Math.PI / 2;
        wheel3.position.set(0.7, 0, 0.6);
        
        const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel4.rotation.z = Math.PI / 2;
        wheel4.position.set(0.7, 0, -0.6);
        
        group.add(body, roof, wheel1, wheel2, wheel3, wheel4);
        break;
      }
      case "bikes": {
        // Bike frame (main body)
        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(0.1, 1.5, 0.1),
          new THREE.MeshStandardMaterial({ color: 0xc039ff, metalness: 0.8, roughness: 0.2 })
        );
        frame.rotation.z = Math.PI / 4;
        
        // Handlebars
        const handlebars = new THREE.Mesh(
          new THREE.CylinderGeometry(0.05, 0.05, 0.8, 16),
          new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 })
        );
        handlebars.rotation.z = Math.PI / 2;
        handlebars.position.set(0.5, 0.8, 0);
        
        // Wheels
        const wheelGeometry = new THREE.TorusGeometry(0.4, 0.1, 16, 32);
        const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.6, roughness: 0.4 });
        
        const frontWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        frontWheel.rotation.y = Math.PI / 2;
        frontWheel.position.set(0.8, -0.5, 0);
        
        const backWheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        backWheel.rotation.y = Math.PI / 2;
        backWheel.position.set(-0.8, -0.5, 0);
        
        group.add(frame, handlebars, frontWheel, backWheel);
        break;
      }
      case "houses": {
        // House base
        const base = new THREE.Mesh(
          new THREE.BoxGeometry(2, 1.5, 2),
          new THREE.MeshStandardMaterial({ color: 0xccaa88, metalness: 0.2, roughness: 0.8 })
        );
        base.position.y = 0.75;
        
        // Roof
        const roof = new THREE.Mesh(
          new THREE.ConeGeometry(1.6, 1, 4),
          new THREE.MeshStandardMaterial({ color: 0x994422, metalness: 0.3, roughness: 0.7 })
        );
        roof.rotation.y = Math.PI / 4;
        roof.position.y = 2;
        
        // Door
        const door = new THREE.Mesh(
          new THREE.BoxGeometry(0.4, 0.8, 0.1),
          new THREE.MeshStandardMaterial({ color: 0x663311, metalness: 0.1, roughness: 0.9 })
        );
        door.position.set(0, 0.4, 1.05);
        
        // Windows
        const windowGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1);
        const windowMaterial = new THREE.MeshStandardMaterial({ color: 0x88ccff, metalness: 0.9, roughness: 0.1 });
        
        const window1 = new THREE.Mesh(windowGeometry, windowMaterial);
        window1.position.set(-0.6, 0.8, 1.05);
        
        const window2 = new THREE.Mesh(windowGeometry, windowMaterial);
        window2.position.set(0.6, 0.8, 1.05);
        
        group.add(base, roof, door, window1, window2);
        break;
      }
      case "animals": {
        // Body (lion)
        const body = new THREE.Mesh(
          new THREE.SphereGeometry(0.8, 32, 32),
          new THREE.MeshStandardMaterial({ color: 0xffaa44, metalness: 0.2, roughness: 0.8 })
        );
        body.scale.set(1.2, 1, 1);
        
        // Head
        const head = new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 32, 32),
          new THREE.MeshStandardMaterial({ color: 0xffaa44, metalness: 0.2, roughness: 0.8 })
        );
        head.position.set(1.2, 0.3, 0);
        
        // Mane
        const mane = new THREE.Mesh(
          new THREE.SphereGeometry(0.65, 32, 32),
          new THREE.MeshStandardMaterial({ color: 0xcc8833, metalness: 0.1, roughness: 0.9 })
        );
        mane.position.set(1.2, 0.3, 0);
        
        // Legs
        const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 16);
        const legMaterial = new THREE.MeshStandardMaterial({ color: 0xffaa44, metalness: 0.2, roughness: 0.8 });
        
        const leg1 = new THREE.Mesh(legGeometry, legMaterial);
        leg1.position.set(0.4, -0.9, 0.4);
        
        const leg2 = new THREE.Mesh(legGeometry, legMaterial);
        leg2.position.set(0.4, -0.9, -0.4);
        
        const leg3 = new THREE.Mesh(legGeometry, legMaterial);
        leg3.position.set(-0.4, -0.9, 0.4);
        
        const leg4 = new THREE.Mesh(legGeometry, legMaterial);
        leg4.position.set(-0.4, -0.9, -0.4);
        
        group.add(body, head, mane, leg1, leg2, leg3, leg4);
        break;
      }
      default: {
        const defaultMesh = new THREE.Mesh(
          new THREE.TorusKnotGeometry(1, 0.3, 100, 16),
          material
        );
        group.add(defaultMesh);
      }
    }

    scene.add(group);
    meshRef.current = group;

    // Mouse controls
    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current && meshRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        meshRef.current.rotation.y += deltaX * 0.01;
        meshRef.current.rotation.x += deltaY * 0.01;

        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (cameraRef.current) {
        cameraRef.current.position.z += e.deltaY * 0.01;
        cameraRef.current.position.z = Math.max(2, Math.min(10, cameraRef.current.position.z));
      }
    };

    canvasRef.current.addEventListener("mousedown", handleMouseDown);
    canvasRef.current.addEventListener("mousemove", handleMouseMove);
    canvasRef.current.addEventListener("mouseup", handleMouseUp);
    canvasRef.current.addEventListener("wheel", handleWheel);

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (meshRef.current && !isDraggingRef.current) {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.rotation.x += 0.002;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Cleanup
    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
        canvasRef.current.removeEventListener("mouseup", handleMouseUp);
        canvasRef.current.removeEventListener("wheel", handleWheel);
      }
      window.removeEventListener("resize", handleResize);
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      // Dispose of all geometries and materials in the group
      if (meshRef.current) {
        meshRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) {
              child.geometry.dispose();
            }
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((material) => material.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [modelId, modelCategory]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ cursor: "grab" }}
    />
  );
};
