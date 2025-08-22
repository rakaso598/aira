// Aira 프로젝트 - 로컬 데이터 저장소 (JSON 기반)

import { TrajectoryData } from '@/types/trajectory';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'trajectories.json');

// 데이터 디렉토리 생성
function ensureDataDirectory() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// 모든 궤적 데이터 로드
export function loadTrajectoryData(): TrajectoryData[] {
  try {
    ensureDataDirectory();
    if (!fs.existsSync(DATA_FILE)) {
      return [];
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('궤적 데이터 로드 실패:', error);
    return [];
  }
}

// 새로운 궤적 데이터 저장
export function saveTrajectoryData(newData: TrajectoryData): boolean {
  try {
    ensureDataDirectory();
    const existingData = loadTrajectoryData();
    existingData.push(newData);

    fs.writeFileSync(DATA_FILE, JSON.stringify(existingData, null, 2), 'utf-8');
    console.log(`새로운 궤적 데이터 저장됨: ${newData.id}`);
    return true;
  } catch (error) {
    console.error('궤적 데이터 저장 실패:', error);
    return false;
  }
}

// 통계 정보 반환
export function getTrajectoryStats() {
  const data = loadTrajectoryData();
  return {
    total: data.length,
    latestTimestamp: data.length > 0 ? data[data.length - 1].timestamp : null,
    averageSentiment: data.length > 0
      ? data.reduce((sum, item) => sum + (item.sentiment || 0), 0) / data.length
      : 0
  };
}
