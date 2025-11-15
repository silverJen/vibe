export default function Roadmap() {
  const phases = [
    {
      phase: "Phase 1",
      title: "Core MVP",
      status: "현재",
      description: "핵심 기능을 갖춘 최소 기능 제품",
      features: [
        "세션 관리 (브라우저 로컬)",
        "인터뷰 대화 (음성/텍스트)",
        "초고 생성",
        "초고 편집"
      ],
      color: "primary"
    },
    {
      phase: "Phase 2",
      title: "강화 MVP",
      status: "향후",
      description: "사용자 경험을 개선하고 기능을 확장",
      features: [
        "클라우드 동기화",
        "더 많은 템플릿",
        "협업 기능",
        "고급 편집 도구"
      ],
      color: "secondary"
    },
    {
      phase: "Phase 3",
      title: "Differentiation",
      status: "향후",
      description: "차별화된 기능과 확장성 제공",
      features: [
        "고급 편집 기능",
        "팀 기능",
        "API 제공",
        "플러그인 시스템"
      ],
      color: "accent"
    },
  ];

  return (
    <section id="roadmap" className="py-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-200 mb-6">
              <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
              <span className="text-sm font-medium text-secondary-700">로드맵</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              개발 로드맵
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              단계별로 발전하는 Vibe Writing
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {phases.map((phase, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 border-2 ${
                  phase.status === "현재" 
                    ? "border-primary-300 shadow-lg" 
                    : "border-gray-100"
                } hover:border-primary-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                {/* 상태 배지 */}
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                  phase.status === "현재"
                    ? "bg-primary-100 text-primary-700"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {phase.status}
                </div>
                
                {/* Phase 번호 */}
                <div className="text-sm font-bold text-gray-500 mb-2">
                  {phase.phase}
                </div>
                
                {/* 제목 */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {phase.title}
                </h3>
                
                {/* 설명 */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {phase.description}
                </p>
                
                {/* 기능 리스트 */}
                <ul className="space-y-2">
                  {phase.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className={`mt-1 ${
                        phase.status === "현재" ? "text-primary-400" : "text-gray-400"
                      }`}>•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* 현재 단계 강조 */}
                {phase.status === "현재" && (
                  <div className="absolute top-4 right-4 w-3 h-3 bg-primary-400 rounded-full animate-pulse"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
