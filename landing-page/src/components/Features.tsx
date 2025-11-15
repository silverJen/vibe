export default function Features() {
  const features = [
    {
      icon: "📁",
      title: "세션 관리",
      description: "브라우저 로컬 기반으로 세션을 관리합니다. 각 세션은 제목, 주제 태그, 언어를 설정할 수 있습니다.",
      details: [
        "브라우저 로컬 스토리지 기반",
        "세션 속성: title, topic_tag, language",
        "간편한 세션 생성 및 관리"
      ],
    },
    {
      icon: "🎙️",
      title: "인터뷰 대화",
      description: "음성 녹음 또는 텍스트 입력으로 AI와 대화합니다. AI가 인터뷰어 역할을 하며 질문하고 정리합니다.",
      details: [
        "음성 녹음 → Whisper 전사",
        "텍스트 입력 지원",
        "AI 인터뷰 질문 생성",
        "중간 요약 기능"
      ],
    },
    {
      icon: "✨",
      title: "초고 생성",
      description: "대화 히스토리를 기반으로 구조화된 초고를 자동 생성합니다. 제목, 도입, 본론, 마무리로 구성됩니다.",
      details: [
        "대화 히스토리 기반 구조화",
        "제목 제안, 도입, 본론(2~4 섹션), 마무리",
        "문단별 source: user | ai 태그"
      ],
    },
    {
      icon: "✏️",
      title: "초고 편집",
      description: "생성된 초고를 블록별로 수정하고, AI로 다듬을 수 있습니다. 완성되면 전체를 복사할 수 있습니다.",
      details: [
        "블록별 수정",
        "AI로 다듬기 기능",
        "전체 복사 기능"
      ],
    },
  ];

  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 mb-6">
              <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
              <span className="text-sm font-medium text-primary-700">주요 기능</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
              MVP 기능
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              핵심 기능으로 시작하는 인터뷰 기반 글쓰기
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 via-secondary-400 to-accent-400 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-primary-200 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* 아이콘 */}
                <div className="text-5xl mb-4">{feature.icon}</div>
                
                {/* 제목 */}
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                
                {/* 설명 */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* 상세 기능 */}
                <ul className="space-y-2">
                  {feature.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-primary-400 mt-1">•</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                
                {/* 호버 시 장식 */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-secondary-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
