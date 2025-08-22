// Aira 프로젝트 - AI 응답 궤적 데이터 타입 정의

export interface TrajectoryData {
  id: string;
  timestamp: string;
  prompt_text: string;
  ai_response_content: string;
  keywords?: string[];
  sentiment?: number; // -1 to 1
}

export interface TrajectoryPoint {
  x: number;
  y: number;
  z: number;
  data: TrajectoryData;
}
