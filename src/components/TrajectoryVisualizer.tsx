'use client';

// Aira 프로젝트 - 실시간 AI 궤적 시각화 (미니멀 화이트&블랙 디자인)

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

interface TrajectoryVisualizerProps {
  isRunning: boolean;
}

interface TrajectoryPoint {
  x: number;
  y: number;
  z: number;
  time: number;
  intensity: number;
}

// AI처럼 복잡하고 유기적인 궤적 생성
function generateAITrajectory(time: number, index: number): TrajectoryPoint {
  const t = time * 0.001 + index * 0.1;
  const chaos = Math.sin(t * 2.1) * Math.cos(t * 1.7) * Math.sin(t * 0.8);
  const drift = Math.sin(t * 0.3) * 3;

  return {
    x: Math.sin(t + chaos) * (4 + drift) + Math.cos(t * 1.3) * 2,
    y: Math.cos(t * 1.1 + chaos) * 2 + Math.sin(t * 0.7) * 1.5,
    z: Math.sin(t * 0.9 + chaos) * (3 + drift) + Math.cos(t * 1.8) * 1.5,
    time: t,
    intensity: Math.abs(Math.sin(t * 3)) * 0.8 + 0.2
  };
}

// 실시간 궤적 애니메이션 컴포넌트
function AnimatedTrajectory({ isRunning }: { isRunning: boolean }) {
  const pointsRef = useRef<THREE.Group>(null);
  const [points, setPoints] = useState<TrajectoryPoint[]>([]);
  const pointCountRef = useRef(0);

  useFrame((state) => {
    if (!isRunning) return;

    const time = state.clock.getElapsedTime() * 1000;

    // 0.5초마다 새로운 점 추가
    const expectedPointCount = Math.floor(time / 500);
    if (expectedPointCount > pointCountRef.current) {
      const newPoint = generateAITrajectory(time, pointCountRef.current);
      pointCountRef.current = expectedPointCount;

      console.log(`새로운 궤적 점 생성: ${pointCountRef.current}`, newPoint);

      setPoints(prev => {
        const newPoints = [...prev, newPoint];
        console.log(`총 점 개수: ${newPoints.length}`);
        return newPoints.slice(-50); // 최대 50개 점 유지
      });
    }

    // 기존 점들 애니메이션
    if (pointsRef.current) {
      pointsRef.current.children.forEach((child, index) => {
        if (child instanceof THREE.Mesh) {
          const scale = 0.8 + Math.sin(time * 0.003 + index) * 0.2;
          child.scale.setScalar(scale);
        }
      });
    }
  });

  // 시뮬레이션이 중지되면 점 카운터 리셋
  useEffect(() => {
    if (!isRunning) {
      pointCountRef.current = 0;
      setPoints([]);
    } else {
      // 시뮬레이션 시작 시 초기 테스트 점 추가
      console.log('시뮬레이션 시작 - 초기 점 추가');
      const testPoint = generateAITrajectory(0, 0);
      setPoints([testPoint]);
      pointCountRef.current = 1;
    }
  }, [isRunning]);

  return (
    <group>
      {/* 궤적 점들 - 더 크고 밝게 */}
      <group ref={pointsRef}>
        {points.map((point, index) => (
          <mesh key={index} position={[point.x, point.y, point.z]}>
            <sphereGeometry args={[0.15 * point.intensity, 16, 16]} />
            <meshBasicMaterial
              color={index === points.length - 1 ? '#ff0000' : '#ffffff'}
              transparent
              opacity={index === points.length - 1 ? 1 : 0.7 + point.intensity * 0.3}
            />
          </mesh>
        ))}
      </group>

      {/* 궤적 연결선 - 더 밝게 */}
      {points.length > 1 && (
        <primitive
          object={
            new THREE.Line(
              new THREE.BufferGeometry().setFromPoints(
                points.map(p => new THREE.Vector3(p.x, p.y, p.z))
              ),
              new THREE.LineBasicMaterial({
                color: '#ffffff',
                transparent: true,
                opacity: 0.8
              })
            )
          }
        />
      )}
    </group>
  );
}

// 배경 그리드
function BackgroundGrid() {
  return (
    <group>
      <gridHelper args={[20, 20, '#222222', '#111111']} />
      <axesHelper args={[10]} />
    </group>
  );
}

export default function TrajectoryVisualizer({ isRunning }: TrajectoryVisualizerProps) {
  return (
    <div className="w-full h-[700px] bg-black border border-gray-800 rounded-lg overflow-hidden">
      <Canvas
        camera={{ position: [10, 8, 10], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: 'linear-gradient(to bottom, #000000, #111111)' }}
      >
        {/* 미니멀한 조명 */}
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.1} color="#ffffff" />

        {/* 배경 그리드 */}
        <BackgroundGrid />

        {/* 실시간 AI 궤적 */}
        <AnimatedTrajectory isRunning={isRunning} />

        {/* 중심 로고 */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.8}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.1}
        >
          AIRA
        </Text>

        {/* 상태 텍스트 */}
        <Text
          position={[0, -1, 0]}
          fontSize={0.3}
          color={isRunning ? "#00ff00" : "#666666"}
          anchorX="center"
          anchorY="middle"
        >
          {isRunning ? "궤적 생성 중" : "대기 중"}
        </Text>

        {/* 카메라 컨트롤 */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={30}
          autoRotate={isRunning}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}