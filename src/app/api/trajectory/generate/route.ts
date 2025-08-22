// Aira 프로젝트 - 새로운 궤적 데이터 생성 API

import { NextResponse } from 'next/server';
import { generateTrajectoryData } from '@/lib/trajectory-generator';
import { saveTrajectoryData, getTrajectoryStats } from '@/lib/data-storage';

export async function POST() {
  try {
    // 새로운 궤적 데이터 생성
    const newTrajectory = generateTrajectoryData();

    // 데이터 저장
    const saveSuccess = saveTrajectoryData(newTrajectory);

    if (!saveSuccess) {
      throw new Error('데이터 저장 실패');
    }

    // 업데이트된 통계 정보 가져오기
    const stats = getTrajectoryStats();

    return NextResponse.json({
      success: true,
      data: newTrajectory,
      stats,
      message: '새로운 궤적 데이터가 생성되었습니다.'
    });
  } catch (error) {
    console.error('궤적 생성 실패:', error);
    return NextResponse.json(
      { success: false, error: '궤적 생성 실패' },
      { status: 500 }
    );
  }
}
