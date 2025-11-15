export default function UserFlow() {
  const steps = [
    {
      number: 1,
      title: "새 인터뷰 세션 생성",
      description: "브라우저에서 세션을 생성하고 주제와 언어를 설정합니다",
      icon: "🚀",
    },
    {
      number: 2,
      title: "음성/텍스트로 대화",
      description: "AI 인터뷰어와 음성 또는 텍스트로 자유롭게 대화합니다",
      icon: "💬",
    },
    {
      number: 3,
      title: "AI가 질문하며 생각 구조화",
      description: "AI가 적절한 질문을 던지며 당신의 생각을 체계적으로 정리합니다",
      icon: "🧠",
    },
    {
      number: 4,
      title: "자료 요약·내 생각 연결",
      description: "(옵션) 필요한 자료를 요약하고 내 생각과 연결합니다",
      icon: "📚",
    },
    {
      number: 5,
      title: "초고 만들기",
      description: "대화가 충분히 진행되면 초고 생성을 요청합니다",
      icon: "✨",
    },
    {
      number: 6,
      title: "내 말 기반 초고 생성",
      description: "대화를 기반으로 내 말이 70~80%를 차지하는 초고가 자동 생성됩니다",
      icon: "📝",
    },
    {
      number: 7,
      title: "초고 블록별 편집 → 전체 복사",
      description: "생성된 초고를 블록별로 수정하고, 완성되면 전체를 복사합니다",
      icon: "✏️",
    },
  ];

  return (
    <section id="flow" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="text-sm font-medium text-primary-700">사용 방법</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              이렇게 사용하세요
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              간단한 7단계로 생각을 글로 변환합니다
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 mx-auto mt-6 rounded-full"></div>
          </div>
          
          {/* 타임라인 */}
          <div className="relative">
            {/* 연결선 */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-300 via-secondary-300 to-accent-300"></div>
            
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  {/* 번호 원 */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* 내용 카드 */}
                  <div className="flex-1 bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-xl">
                    <div className="flex items-start gap-4">
                      <div className="text-4xl">{step.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
