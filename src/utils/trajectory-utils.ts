// 궤적 생성 알고리즘 테스트

/**
 * AI처럼 복잡하고 유기적인 궤적 생성
 */
export function generateAITrajectory(time: number, index: number) {
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

/**
 * 시간 포맷팅 함수
 */
export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * 카운터 포맷팅 함수 (4자리 제로패딩)
 */
export function formatCounter(count: number): string {
  return count.toString().padStart(4, '0');
}
