# Aira 테스트 가이드 📝

> **핵심 기능을 보호하는 가볍고 효율적인 테스트 전략**

## 🎯 테스트 철학

**"핵심만, 간결하게, 효과적으로"**

- CI/CD 복잡성 없이 핵심 기능만 테스트
- 빠른 피드백으로 개발 속도 향상
- 실제 버그를 잡아내는 실용적인 테스트

---

## 🧪 테스트 구조

### 테스트 커버리지 범위

```
src/
├── utils/              # ✅ 유틸리티 함수 (핵심 로직)
│   └── trajectory-utils.test.ts
├── components/         # ❌ UI 컴포넌트 (시각적 확인)
└── app/               # ❌ 페이지 (E2E 대신 수동 확인)
```

### 테스트 우선순위

1. **🔴 Critical**: 궤적 생성 알고리즘 (데이터 정확성)
2. **🟡 Important**: 포맷팅 함수 (UI 표시 정확성)
3. **🟢 Nice to have**: 컴포넌트 렌더링 (생략)

---

## 🔧 테스트 설정

### 설치된 패키지

```bash
npm install --save-dev \
  jest \
  @testing-library/react \
  @testing-library/jest-dom \
  jest-environment-jsdom \
  @types/jest
```

### Jest 설정 (`jest.config.js`)

```javascript
module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1", // Next.js 경로 별칭
  },
  testMatch: ["<rootDir>/src/**/*.test.{js,jsx,ts,tsx}"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
};
```

### 테스트 셋업 (`jest.setup.js`)

```javascript
import "@testing-library/jest-dom";

// Mock Three.js (3D 라이브러리 모킹)
global.THREE = {};

// Mock canvas (WebGL 모킹)
HTMLCanvasElement.prototype.getContext = jest.fn();
```

---

## 📊 테스트 케이스 상세

### 1. 궤적 생성 알고리즘 테스트

#### ✅ `generateAITrajectory()` 함수

```typescript
describe("궤적 생성 알고리즘 테스트", () => {
  test("궤적 생성 함수가 올바른 형태의 객체를 반환한다", () => {
    const result = generateAITrajectory(1000, 0);

    // 필수 속성 존재 확인
    expect(result).toHaveProperty("x");
    expect(result).toHaveProperty("y");
    expect(result).toHaveProperty("z");
    expect(result).toHaveProperty("time");
    expect(result).toHaveProperty("intensity");

    // 타입 검증
    expect(typeof result.x).toBe("number");
    expect(typeof result.y).toBe("number");
    expect(typeof result.z).toBe("number");
    expect(typeof result.time).toBe("number");
    expect(typeof result.intensity).toBe("number");
  });

  test("같은 시간과 인덱스로 호출하면 같은 결과를 반환한다", () => {
    const result1 = generateAITrajectory(1500, 5);
    const result2 = generateAITrajectory(1500, 5);

    expect(result1).toEqual(result2); // 결정적 함수
  });

  test("다른 시간으로 호출하면 다른 결과를 반환한다", () => {
    const result1 = generateAITrajectory(1000, 0);
    const result2 = generateAITrajectory(2000, 0);

    expect(result1).not.toEqual(result2); // 시간에 따른 변화
  });

  test("강도 값이 유효한 범위 내에 있다", () => {
    for (let i = 0; i < 10; i++) {
      const result = generateAITrajectory(Math.random() * 10000, i);
      expect(result.intensity).toBeGreaterThanOrEqual(0.2);
      expect(result.intensity).toBeLessThanOrEqual(1.0);
    }
  });

  test("좌표값이 합리적인 범위 내에 있다", () => {
    const result = generateAITrajectory(1000, 0);

    // 극값 방지 (화면 밖으로 나가지 않게)
    expect(Math.abs(result.x)).toBeLessThan(20);
    expect(Math.abs(result.y)).toBeLessThan(20);
    expect(Math.abs(result.z)).toBeLessThan(20);
  });
});
```

### 2. 포맷팅 함수 테스트

#### ✅ `formatTime()` 함수

```typescript
describe("formatTime", () => {
  test("초를 MM:SS 형식으로 변환한다", () => {
    expect(formatTime(0)).toBe("00:00");
    expect(formatTime(30)).toBe("00:30");
    expect(formatTime(60)).toBe("01:00");
    expect(formatTime(90)).toBe("01:30");
    expect(formatTime(3661)).toBe("61:01"); // 1시간 1분 1초
  });

  test("한 자리 숫자는 제로패딩된다", () => {
    expect(formatTime(5)).toBe("00:05");
    expect(formatTime(65)).toBe("01:05");
  });
});
```

#### ✅ `formatCounter()` 함수

```typescript
describe("formatCounter", () => {
  test("숫자를 4자리 제로패딩 문자열로 변환한다", () => {
    expect(formatCounter(0)).toBe("0000");
    expect(formatCounter(1)).toBe("0001");
    expect(formatCounter(42)).toBe("0042");
    expect(formatCounter(999)).toBe("0999");
    expect(formatCounter(1234)).toBe("1234");
  });

  test("4자리보다 큰 숫자도 올바르게 처리한다", () => {
    expect(formatCounter(12345)).toBe("12345");
  });
});
```

---

## 🚀 실행 방법

### 모든 테스트 실행

```bash
npm test
```

### 특정 파일 테스트

```bash
npm test src/utils/trajectory-utils.test.ts
```

### 와치 모드 (개발 중)

```bash
npm run test:watch
```

### 커버리지 확인

```bash
npm test -- --coverage
```

---

## 📈 테스트 결과 분석

### 통과한 테스트 (2024.08.23 기준)

```
✅ 궤적 생성 알고리즘 테스트
  ✅ 궤적 생성 함수가 올바른 형태의 객체를 반환한다 (5ms)
  ✅ 같은 시간과 인덱스로 호출하면 같은 결과를 반환한다 (1ms)
  ✅ 다른 시간으로 호출하면 다른 결과를 반환한다 (1ms)
  ✅ 강도 값이 유효한 범위 내에 있다 (2ms)
  ✅ 좌표값이 합리적인 범위 내에 있다 (1ms)

✅ 유틸리티 함수 테스트
  ✅ formatTime - 초를 MM:SS 형식으로 변환한다
  ✅ formatTime - 한 자리 숫자는 제로패딩된다 (1ms)
  ✅ formatCounter - 숫자를 4자리 제로패딩 문자열로 변환한다 (1ms)
  ✅ formatCounter - 4자리보다 큰 숫자도 올바르게 처리한다

Test Suites: 1 passed, 1 total
Tests: 9 passed, 9 total
Snapshots: 0 total
Time: 0.908s
```

---

## 🎯 테스트 전략

### 무엇을 테스트하는가?

- ✅ **데이터 변환 로직**: 궤적 생성, 시간 포맷팅, 카운터 포맷팅
- ✅ **핵심 비즈니스 로직**: AI 궤적 알고리즘의 정확성
- ✅ **에지 케이스**: 경계값, 극값, 특수 입력

### 무엇을 테스트하지 않는가?

- ❌ **3D 렌더링**: Three.js 라이브러리 자체 테스트 불필요
- ❌ **UI 인터랙션**: 시각적 확인이 더 효과적
- ❌ **브라우저 호환성**: 실제 브라우저 테스트 대신 수동 확인
- ❌ **네트워크 요청**: 현재 클라이언트 사이드만 사용

### 테스트 유지보수 원칙

1. **간단하게**: 복잡한 설정이나 모킹 최소화
2. **빠르게**: 전체 테스트 2초 이내 완료
3. **명확하게**: 테스트 이름에서 목적이 바로 드러남
4. **실용적으로**: 실제 버그를 잡을 수 있는 테스트 위주

---

## 🔄 개발 워크플로우

### 새 기능 개발 시

1. 함수 작성 (`src/utils/`)
2. 테스트 작성 (`*.test.ts`)
3. 테스트 실행 (`npm test`)
4. 통과 확인 후 UI에 적용

### 버그 수정 시

1. 버그 재현 테스트 작성
2. 테스트가 실패하는지 확인
3. 코드 수정
4. 테스트 통과 확인

### 배포 전 확인

```bash
# 1. 모든 테스트 통과 확인
npm test

# 2. 빌드 확인
npm run build

# 3. 수동 확인
npm run dev
```

---

## 📋 체크리스트

### 새로운 유틸리티 함수 추가 시

- [ ] 함수의 입출력이 명확한가?
- [ ] 에지 케이스를 고려했는가?
- [ ] 테스트 케이스가 3개 이상인가?
- [ ] 테스트 실행 시간이 적절한가? (< 100ms)
- [ ] 테스트 이름이 명확한가?

### 테스트 품질 확인

- [ ] 테스트가 실제 버그를 잡을 수 있는가?
- [ ] False positive/negative가 없는가?
- [ ] 테스트 코드가 프로덕션 코드보다 복잡하지 않은가?
- [ ] 테스트 간 의존성이 없는가?

---

**🧪 이 테스트 전략으로 Aira의 핵심 기능이 안정적으로 유지됩니다!**

_"테스트는 많을수록 좋은 게 아니라, 꼭 필요한 것만 정확하게!"_
