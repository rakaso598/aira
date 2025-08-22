'use client';

// Aira - 실시간 AI 궤적 시뮬레이션 (미니멀 화이트&블랙 디자인)

import { useState, useEffect } from 'react';
import TrajectoryVisualizer from '@/components/TrajectoryVisualizer';
import { formatTime, formatCounter } from '@/utils/trajectory-utils';

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);
  const [trajectoryCount, setTrajectoryCount] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);
  const [avgIntensity, setAvgIntensity] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(35.2); // 고정값으로 초기화

  // 세션 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  // 궤적 카운터 (0.5초마다 증가)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTrajectoryCount(prev => prev + 1);
        setAvgIntensity(Math.random() * 0.8 + 0.2); // 모의 강도 데이터
        setMemoryUsage(Math.random() * 15 + 30); // 동적 메모리 사용량
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleSimulation = () => {
    if (!isRunning) {
      setTrajectoryCount(0);
      setSessionTime(0);
    }
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setTrajectoryCount(0);
    setSessionTime(0);
    setAvgIntensity(0);
  };

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      {/* 미니멀 헤더 */}
      <header className="border-b border-gray-200 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-wider">AIRA</h1>
            <p className="text-sm text-gray-500 mt-1">AI Trajectory Simulation</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-gray-400">STATUS</div>
              <div className={`text-sm font-bold ${isRunning ? 'text-green-600' : 'text-gray-400'}`}>
                {isRunning ? 'ACTIVE' : 'STANDBY'}
              </div>
            </div>
            <div className="w-3 h-3 rounded-full border-2 border-gray-300">
              <div className={`w-full h-full rounded-full transition-colors duration-300 ${isRunning ? 'bg-green-500' : 'bg-gray-200'
                }`} />
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨테이너 */}
      <main className="max-w-7xl mx-auto px-8 py-8">
        {/* 통계 패널 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="border border-gray-200 p-6 bg-gray-50">
            <div className="text-xs text-gray-400 mb-2">TRAJECTORIES</div>
            <div className="text-2xl font-bold font-mono">{formatCounter(trajectoryCount)}</div>
          </div>
          <div className="border border-gray-200 p-6 bg-gray-50">
            <div className="text-xs text-gray-400 mb-2">SESSION TIME</div>
            <div className="text-2xl font-bold font-mono">{formatTime(sessionTime)}</div>
          </div>
          <div className="border border-gray-200 p-6 bg-gray-50">
            <div className="text-xs text-gray-400 mb-2">AVG INTENSITY</div>
            <div className="text-2xl font-bold font-mono">{avgIntensity.toFixed(3)}</div>
          </div>
          <div className="border border-gray-200 p-6 bg-gray-50">
            <div className="text-xs text-gray-400 mb-2">FREQUENCY</div>
            <div className="text-2xl font-bold font-mono">0.500s</div>
          </div>
        </div>

        {/* 컨트롤 패널 */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={toggleSimulation}
            className={`px-8 py-3 border-2 font-mono text-sm tracking-wider transition-all duration-200 ${isRunning
              ? 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100'
              : 'border-green-300 bg-green-50 text-green-700 hover:bg-green-100'
              }`}
          >
            {isRunning ? 'STOP SIMULATION' : 'START SIMULATION'}
          </button>
          <button
            onClick={resetSimulation}
            className="px-8 py-3 border-2 border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 font-mono text-sm tracking-wider transition-all duration-200"
          >
            RESET
          </button>
        </div>

        {/* 3D 시각화 */}
        <div className="border border-gray-200">
          <TrajectoryVisualizer isRunning={isRunning} />
        </div>

        {/* 하단 정보 */}
        <div className="mt-8 text-center">
          <div className="text-xs text-gray-400 mb-2">
            Real-time AI trajectory simulation running at 2Hz frequency
          </div>
          <div className="text-xs text-gray-500">
            {isRunning ? 'Generating new trajectory points every 500ms' : 'Simulation paused'}
          </div>
        </div>
      </main>

      {/* 하단 상태바 */}
      <footer className="border-t border-gray-200 px-8 py-4 bg-gray-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs text-gray-500">
          <div>AIRA v1.0.0 - AI Trajectory Analysis & Visualization</div>
          <div className="flex gap-6">
            <span>FPS: 60</span>
            <span>Memory: ~{memoryUsage.toFixed(1)}MB</span>
            <span>Render: WebGL</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
