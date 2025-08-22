import { generateAITrajectory, formatTime, formatCounter } from '../utils/trajectory-utils';

describe('궤적 생성 알고리즘 테스트', () => {
  test('궤적 생성 함수가 올바른 형태의 객체를 반환한다', () => {
    const result = generateAITrajectory(1000, 0);

    expect(result).toHaveProperty('x');
    expect(result).toHaveProperty('y');
    expect(result).toHaveProperty('z');
    expect(result).toHaveProperty('time');
    expect(result).toHaveProperty('intensity');

    expect(typeof result.x).toBe('number');
    expect(typeof result.y).toBe('number');
    expect(typeof result.z).toBe('number');
    expect(typeof result.time).toBe('number');
    expect(typeof result.intensity).toBe('number');
  });

  test('같은 시간과 인덱스로 호출하면 같은 결과를 반환한다', () => {
    const result1 = generateAITrajectory(1500, 5);
    const result2 = generateAITrajectory(1500, 5);

    expect(result1).toEqual(result2);
  });

  test('다른 시간으로 호출하면 다른 결과를 반환한다', () => {
    const result1 = generateAITrajectory(1000, 0);
    const result2 = generateAITrajectory(2000, 0);

    expect(result1).not.toEqual(result2);
  });

  test('강도 값이 유효한 범위 내에 있다', () => {
    for (let i = 0; i < 10; i++) {
      const result = generateAITrajectory(Math.random() * 10000, i);
      expect(result.intensity).toBeGreaterThanOrEqual(0.2);
      expect(result.intensity).toBeLessThanOrEqual(1.0);
    }
  });

  test('좌표값이 합리적인 범위 내에 있다', () => {
    const result = generateAITrajectory(1000, 0);

    // 대략적인 범위 체크 (너무 크거나 작지 않은지)
    expect(Math.abs(result.x)).toBeLessThan(20);
    expect(Math.abs(result.y)).toBeLessThan(20);
    expect(Math.abs(result.z)).toBeLessThan(20);
  });
});

describe('유틸리티 함수 테스트', () => {
  describe('formatTime', () => {
    test('초를 MM:SS 형식으로 변환한다', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(30)).toBe('00:30');
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(90)).toBe('01:30');
      expect(formatTime(3661)).toBe('61:01'); // 1시간 1분 1초
    });

    test('한 자리 숫자는 제로패딩된다', () => {
      expect(formatTime(5)).toBe('00:05');
      expect(formatTime(65)).toBe('01:05');
    });
  });

  describe('formatCounter', () => {
    test('숫자를 4자리 제로패딩 문자열로 변환한다', () => {
      expect(formatCounter(0)).toBe('0000');
      expect(formatCounter(1)).toBe('0001');
      expect(formatCounter(42)).toBe('0042');
      expect(formatCounter(999)).toBe('0999');
      expect(formatCounter(1234)).toBe('1234');
    });

    test('4자리보다 큰 숫자도 올바르게 처리한다', () => {
      expect(formatCounter(12345)).toBe('12345');
    });
  });
});
