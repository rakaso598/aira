// Aira 프로젝트 - AI 에이전트 응답 생성 로직

import { TrajectoryData } from '@/types/trajectory';

// PROMPTS.md에서 가져온 프롬프트 모음
const CREATIVE_PROMPTS = [
  "만약 인류가 멸망한 후, 지구를 지배하는 새로운 종족이 등장한다면, 그들은 어떤 사회를 만들까요?",
  "색깔이 소리를 낼 수 있다면, 빨간색은 어떤 소리를 낼까요? 파란색과 노란색은요?",
  "고대 로마 시대의 로봇을 상상하여 묘사해주세요.",
  "오래된 흑백 사진 속 인물에게 어떤 이야기가 숨겨져 있을지 서술해주세요.",
  "사막 한가운데서 홀로 깨어난 로봇의 감정을 일인칭 시점으로 묘사해주세요."
];

const ANALYTICAL_PROMPTS = [
  "자율주행 자동차가 보행자와 탑승자 중 한 명을 희생해야 하는 상황에 놓인다면, 어떤 윤리적 판단을 내려야 할까요?",
  "인공지능의 발전이 사회 불평등을 심화시킬 수 있는 세 가지 주요 원인을 분석하고, 그에 대한 해결책을 제시해주세요.",
  "지구 온난화가 한반도 기후에 미칠 영향에 대해 과학적 근거를 바탕으로 예측해주세요."
];

// 모의 AI 응답 생성 (실제 API 호출 대신 랜덤 응답 생성)
function generateMockAIResponse(prompt: string): string {
  const responses = [
    `${prompt}에 대한 창의적인 관점에서, 미래의 가능성은 무한합니다. 새로운 문명은 환경과 조화를 이루며 발전할 것입니다.`,
    `이 질문은 매우 흥미롭습니다. ${prompt} 고려해볼 때, 인간의 상상력과 기술의 융합이 새로운 해답을 제시할 수 있습니다.`,
    `${prompt}를 분석해보면, 복잡한 시스템 속에서도 아름다운 패턴과 질서를 발견할 수 있습니다.`,
    `이런 시나리오에서는 윤리적 고려사항과 실용적 접근법의 균형이 중요합니다. ${prompt}`,
    `상상 속에서 펼쳐지는 이야기는 현실보다 더 생생할 수 있습니다. ${prompt}에서 영감을 받은 새로운 세계관을 그려봅시다.`
  ];

  return responses[Math.floor(Math.random() * responses.length)] + ` [생성시간: ${new Date().toLocaleTimeString()}]`;
}

// 키워드 추출 (간단한 구현)
function extractKeywords(text: string): string[] {
  const commonWords = ['은', '는', '이', '가', '을', '를', '에', '에서', '와', '과', '의', '로', '으로', '고', '다', '입니다', '습니다'];
  const words = text.split(/\s+/).map(word => word.replace(/[.,!?;]/g, ''));
  return words
    .filter(word => word.length > 1 && !commonWords.includes(word))
    .slice(0, 5);
}

// 감정 점수 계산 (간단한 구현)
function calculateSentiment(text: string): number {
  const positiveWords = ['아름다운', '창의적', '흥미로운', '놀라운', '훌륭한', '긍정적', '희망적'];
  const negativeWords = ['문제', '위험', '걱정', '불안', '어려운', '복잡한'];

  let score = 0;
  positiveWords.forEach(word => {
    if (text.includes(word)) score += 0.2;
  });
  negativeWords.forEach(word => {
    if (text.includes(word)) score -= 0.2;
  });

  return Math.max(-1, Math.min(1, score));
}

// AI 궤적 데이터 생성
export function generateTrajectoryData(): TrajectoryData {
  const allPrompts = [...CREATIVE_PROMPTS, ...ANALYTICAL_PROMPTS];
  const selectedPrompt = allPrompts[Math.floor(Math.random() * allPrompts.length)];
  const response = generateMockAIResponse(selectedPrompt);

  return {
    id: `traj_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: new Date().toISOString(),
    prompt_text: selectedPrompt,
    ai_response_content: response,
    keywords: extractKeywords(response),
    sentiment: calculateSentiment(response)
  };
}
