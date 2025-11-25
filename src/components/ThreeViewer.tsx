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
  const meshRef = useRef<THREE.Mesh | null>(null);
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

    // Create placeholder geometry based on category
    let geometry: THREE.BufferGeometry;
    let material: THREE.Material;

    switch (modelCategory) {
      case "cars":
        geometry = new THREE.BoxGeometry(3, 1, 1.5);
        material = new THREE.MeshStandardMaterial({
          color: 0x00d4ff,
          metalness: 0.8,
          roughness: 0.2,
        });
        break;
      case "bikes":
        geometry = new THREE.CylinderGeometry(0.3, 0.3, 2, 32);
        material = new THREE.MeshStandardMaterial({
          color: 0xc039ff,
          metalness: 0.7,
          roughness: 0.3,
        });
        break;
      case "houses":
        geometry = new THREE.BoxGeometry(2, 2, 2);
        material = new THREE.MeshStandardMaterial({
          color: 0x00ff88,
          metalness: 0.5,
          roughness: 0.5,
        });
        break;
      case "animals":
        geometry = new THREE.SphereGeometry(1.5, 32, 32);
        material = new THREE.MeshStandardMaterial({
          color: 0xff8800,
          metalness: 0.3,
          roughness: 0.7,
        });
        break;
      default:
        geometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
        material = new THREE.MeshStandardMaterial({
          color: 0x00d4ff,
          metalness: 0.8,
          roughness: 0.2,
        });
    }

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

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
      if (geometry) {
        geometry.dispose();
      }
      if (material) {
        material.dispose();
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
