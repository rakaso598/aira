import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../app/page';

// 3D 컴포넌트 모킹
jest.mock('@/components/TrajectoryVisualizer', () => {
  return function MockTrajectoryVisualizer({ isRunning }: { isRunning: boolean }) {
    return (
      <div data-testid="trajectory-visualizer">
        <div data-testid="simulation-status">{isRunning ? 'ACTIVE' : 'STANDBY'}</div>
      </div>
    );
  };
});

describe('Home 페이지 컴포넌트 테스트', () => {
  test('페이지가 올바르게 렌더링된다', () => {
    render(<Home />);

    // 메인 제목 확인
    expect(screen.getByText('AIRA')).toBeInTheDocument();
    expect(screen.getByText('AI Trajectory Simulation')).toBeInTheDocument();
  });

  test('초기 상태가 올바르게 설정된다', () => {
    render(<Home />);

    // 초기 통계값 확인
    expect(screen.getByText('0000')).toBeInTheDocument(); // 궤적 카운트
    expect(screen.getByText('00:00')).toBeInTheDocument(); // 세션 시간
    expect(screen.getAllByText('STANDBY')).toHaveLength(2); // 상태 (헤더 + 시각화 영역)

    // 시작 버튼 확인
    expect(screen.getByText('START SIMULATION')).toBeInTheDocument();
  });

  test('시뮬레이션 시작/정지 기능이 작동한다', () => {
    render(<Home />);

    const startButton = screen.getByText('START SIMULATION');

    // 시뮬레이션 시작
    fireEvent.click(startButton);
    expect(screen.getByText('STOP SIMULATION')).toBeInTheDocument();
    expect(screen.getAllByText('ACTIVE')).toHaveLength(2);

    // 시뮬레이션 정지
    const stopButton = screen.getByText('STOP SIMULATION');
    fireEvent.click(stopButton);
    expect(screen.getByText('START SIMULATION')).toBeInTheDocument();
    expect(screen.getAllByText('STANDBY')).toHaveLength(2);
  });

  test('리셋 버튼이 작동한다', () => {
    render(<Home />);

    const startButton = screen.getByText('START SIMULATION');
    const resetButton = screen.getByText('RESET');

    // 시뮬레이션 시작 후 리셋
    fireEvent.click(startButton);
    fireEvent.click(resetButton);

    // 초기 상태로 돌아가는지 확인
    expect(screen.getByText('START SIMULATION')).toBeInTheDocument();
    expect(screen.getAllByText('STANDBY')).toHaveLength(2);
  });

  test('모든 통계 섹션이 렌더링된다', () => {
    render(<Home />);

    // 통계 라벨들 확인
    expect(screen.getByText('TRAJECTORIES')).toBeInTheDocument();
    expect(screen.getByText('SESSION TIME')).toBeInTheDocument();
    expect(screen.getByText('AVG INTENSITY')).toBeInTheDocument();
    expect(screen.getByText('FREQUENCY')).toBeInTheDocument();
  });

  test('푸터 정보가 표시된다', () => {
    render(<Home />);

    expect(screen.getByText('AIRA v1.0.0 - AI Trajectory Analysis & Visualization')).toBeInTheDocument();
    expect(screen.getByText('FPS: 60')).toBeInTheDocument();
    expect(screen.getByText('Render: WebGL')).toBeInTheDocument();
  });

  test('궤적 시각화 컴포넌트가 올바른 props로 렌더링된다', () => {
    render(<Home />);

    const visualizer = screen.getByTestId('trajectory-visualizer');
    expect(visualizer).toBeInTheDocument();

    // 초기 상태 확인
    expect(screen.getByTestId('simulation-status')).toHaveTextContent('STANDBY');

    // 시뮬레이션 시작 후 상태 확인
    fireEvent.click(screen.getByText('START SIMULATION'));
    expect(screen.getByTestId('simulation-status')).toHaveTextContent('ACTIVE');
  });
});
