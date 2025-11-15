export default function Solution() {
  const solutions = [
    {
      emoji: "🎤",
      title: "Vibe Interview",
      subtitle: "말로 생각 꺼내기",
      description: "AI가 인터뷰어가 되어 질문·추궁·정리합니다. 음성 또는 텍스트로 자유롭게 대화하세요.",
      features: [
        "AI 인터뷰어가 질문하며 생각 구조화",
        "음성/텍스트 자유로운 입력",
        "중간 요약으로 확인"
      ],
      color: "primary"
    },
    {
      emoji: "📚",
      title: "Vibe Learning",
      subtitle: "필요한 내용 즉석에서 배우기",
      description: "대화 중 필요한 배경 지식이나 자료를 즉석에서 학습하고 연결합니다. (라이트 버전)",
      features: [
        "관련 자료 자동 검색",
        "내 생각과 연결",
        "배경 지식 보강"
      ],
      color: "secondary"
    },
    {
      emoji: "✍️",
      title: "Vibe Writing",
      subtitle: "대화 → 내 말 중심 초고 생성",
      description: "대화를 기반으로 핵심 포인트를 자동 요약하고, 내 말이 70~80%를 차지하는 초고를 생성합니다.",
      features: [
        "내 말 70~80% 기반 초고",
        "자동 구조화",
        "문단별 출처 태그"
      ],
      color: "accent"
    },
  ];

  return (
    <section id="solution" className="py-24 bg-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success-50 border border-success-200 mb-6">
              <span className="w-2 h-2 bg-success-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-success-700">해결책</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              Vibe Writing의 해결 방식
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              3가지 핵심 기능으로 글쓰기의 고민을 해결합니다
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* 이모지 */}
                <div className="text-6xl mb-4 text-center">{solution.emoji}</div>
                
                {/* 제목 */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                  {solution.title}
                </h3>
                <p className="text-sm text-gray-500 text-center mb-4">
                  {solution.subtitle}
                </p>
                
                {/* 설명 */}
                <p className="text-gray-700 mb-6 leading-relaxed text-center">
                  {solution.description}
                </p>
                
                {/* 기능 리스트 */}
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-success-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* 호버 시 장식 */}
                {solution.color === 'primary' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                )}
                {solution.color === 'secondary' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary-400 to-accent-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                )}
                {solution.color === 'accent' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 to-primary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                )}
              </div>
            ))}
          </div>
          
          {/* 차별점 강조 */}
          <div className="bg-gradient-to-r from-primary-50 via-secondary-50 to-accent-50 rounded-2xl p-8 border-2 border-primary-200">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                내 말이 70~80%를 차지하는 초고
              </h3>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                AI가 생성한 텍스트가 아닌, 당신의 말을 기반으로 한 진정한 나만의 글입니다.
                <br />
                문단별로 출처를 태그하여 어떤 부분이 당신의 말인지 명확히 표시합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
