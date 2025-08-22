// Aira 프로젝트 - 궤적 데이터 로드 API

import { NextResponse } from 'next/server';
import { loadTrajectoryData, getTrajectoryStats } from '@/lib/data-storage';

export async function GET() {
  try {
    const trajectories = loadTrajectoryData();
    const stats = getTrajectoryStats();

    return NextResponse.json({
      success: true,
      trajectories,
      stats
    });
  } catch (error) {
    console.error('궤적 데이터 로드 실패:', error);
    return NextResponse.json(
      { success: false, error: '데이터 로드 실패' },
      { status: 500 }
    );
  }
}
