export default function UseCases() {
  const useCases = [
    {
      persona: "PM, 전략/기획, BizOps, 컨설턴트",
      title: "지식 노동자",
      description: "회의 후 메모 정리, 전략 문서 작성 등 업무 문서를 빠르게 작성합니다.",
      scenario: [
        "회의에서 논의한 내용을 음성으로 정리",
        "AI 인터뷰어가 핵심 포인트 추출",
        "전략 문서 형식으로 초고 생성",
        "블록별로 수정하여 최종 문서 완성"
      ],
      icon: "💼",
      color: "primary"
    },
    {
      persona: "퍼스널 브랜딩·에세이 작성 크리에이터",
      title: "크리에이터",
      description: "블로그 포스트, 에세이 초고 등을 나만의 톤으로 작성합니다.",
      scenario: [
        "생각을 말로 풀어내며 대화",
        "AI가 질문하며 스토리 구조화",
        "에세이 형식의 초고 생성",
        "나만의 톤으로 다듬어 완성"
      ],
      icon: "✍️",
      color: "secondary"
    },
    {
      persona: "할 말은 많은데 글이 안 써지는 사람",
      title: "글쓰기 어려움을 겪는 모든 사람",
      description: "생각을 말로 정리하고, 그것을 글로 자연스럽게 변환합니다.",
      scenario: [
        "말로 생각을 자유롭게 표현",
        "AI가 정리하며 구조 잡기",
        "읽기 좋은 글 형식으로 변환",
        "간단한 수정으로 완성"
      ],
      icon: "💭",
      color: "accent"
    },
  ];

  return (
    <section id="usecases" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-200 mb-6">
              <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
              <span className="text-sm font-medium text-secondary-700">사용 사례</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              누가 사용하나요?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              다양한 사용자들이 Vibe Writing으로 글쓰기를 더 쉽게
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* 아이콘 */}
                <div className="text-5xl mb-4 text-center">{useCase.icon}</div>
                
                {/* 페르소나 */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {useCase.persona}
                  </p>
                </div>
                
                {/* 설명 */}
                <p className="text-gray-700 mb-6 leading-relaxed text-center">
                  {useCase.description}
                </p>
                
                {/* 시나리오 */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">사용 시나리오:</h4>
                  {useCase.scenario.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-primary-400 font-bold mt-0.5">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
                
                {/* 호버 시 장식 */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
