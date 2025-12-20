"use client"

import Image from "next/image"
import { Mail } from "lucide-react"

const projectDetails = {
  "puppy-go": {
    title: "PUPPY GO",
    subtitle: "AI智能规划+情感激励型运动辅助APP",
    description:
      "一款已落地的创新运动健康应用，通过AI技术为用户提供个性化运动方案，并运用情感激励机制帮助用户养成健康的运动习惯。",
    client: "健康科技公司",
    timeline: "2023年9月 - 2024年3月",
    role: "首席UI/UX设计师",
    image: "/puppy-go-cover.png",
    challenge: "现有运动应用缺乏情感连接，用户难以坚持。需要创造一个既智能又充满情感的运动体验，让用户真正爱上运动。",
    solution:
      "设计了可爱的宠物狗陪伴系统，结合AI智能规划，为每位用户打造专属运动计划。通过情感化的交互设计和激励机制，提升用户粘性和运动积极性。",
    results: [
      { value: "85%", label: "用户留存率" },
      { value: "4.9/5", label: "应用评分" },
      { value: "200K+", label: "活跃用户" },
    ],
  },
  xingwuai: {
    title: "行无碍",
    subtitle: "AI赋能的全民无障碍出行平台",
    description:
      "致力于为残障人士和特殊需求群体打造的智能出行平台，通过AI技术提供无障碍路线规划、实时导航和社区互助功能。",
    client: "社会公益项目",
    timeline: "2024年1月 - 6月",
    role: "产品设计负责人",
    image: "/xingwuai-cover.png",
    challenge:
      "残障人士出行面临信息不透明、路线规划困难等诸多障碍。需要设计一个真正理解用户需求、易用且全面的无障碍出行解决方案。",
    solution:
      "深入调研特殊群体的实际需求，设计了直观的语音交互界面、无障碍设施实时查询、AI智能路线规划等功能。确保每个功能都符合无障碍设计标准。",
    results: [
      { value: "50K+", label: "注册用户" },
      { value: "95%", label: "满意度" },
      { value: "100+", label: "覆盖城市" },
    ],
  },
  tmus: {
    title: "Tmus",
    subtitle: "Windows桌面应用时长可视化",
    description: "一款帮助用户了解和管理Windows桌面应用使用时长的可视化工具，通过精美的数据呈现帮助用户提升时间管理效率。",
    client: "效率工具产品",
    timeline: "2025年9月 - 11月",
    role: "UI/UX设计师",
    image: "/time-tracking-visualization-dashboard-interface.jpg",
    challenge:
      "Windows用户难以意识到自己在各个应用上的时间分配，需要一个清晰、美观的可视化界面来呈现时间使用情况，并提供有价值的洞察。",
    solution:
      "设计了多维度的时间数据可视化界面，采用现代简约的设计语言，配合流畅的动画效果。让枯燥的数据变得生动有趣，帮助用户更好地理解时间分配。",
    results: [
      { value: "30K+", label: "下载量" },
      { value: "4.7/5", label: "用户评分" },
      { value: "+40%", label: "效率提升" },
    ],
  },
}

export function ProjectDetail() {
  return (
    <>
      {Object.entries(projectDetails).map(([id, project]) => (
        <section key={id} id={`project-${id}`} className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#10121A] to-[#0A0A0F]" />
          <div className="wireframe-grid opacity-30" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto space-y-16">
              <div className="glass-card-strong rounded-2xl p-12 md:p-20 space-y-12">
                <div className="space-y-6">
                  <p className="text-sm uppercase tracking-[0.3em] font-light" style={{ color: "rgb(100, 180, 255)" }}>
                    项目详情
                  </p>
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white text-balance">
                    {project.title}
                  </h2>
                  <p className="text-xl font-light text-gray-400 leading-loose tracking-wide">{project.description}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <p
                      className="text-xs uppercase tracking-[0.25em] font-light"
                      style={{ color: "rgb(100, 180, 255)" }}
                    >
                      客户
                    </p>
                    <p className="text-lg font-medium text-white">{project.client}</p>
                  </div>
                  <div className="space-y-3">
                    <p
                      className="text-xs uppercase tracking-[0.25em] font-light"
                      style={{ color: "rgb(100, 180, 255)" }}
                    >
                      时间
                    </p>
                    <p className="text-lg font-medium text-white">{project.timeline}</p>
                  </div>
                  <div className="space-y-3">
                    <p
                      className="text-xs uppercase tracking-[0.25em] font-light"
                      style={{ color: "rgb(100, 180, 255)" }}
                    >
                      角色
                    </p>
                    <p className="text-lg font-medium text-white">{project.role}</p>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[rgba(100,180,255,0.2)] hover-scale">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto"
                  />
                </div>

                <div className="space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight">项目挑战</h3>
                    <p className="text-base md:text-lg font-light text-gray-400 leading-loose tracking-wide">
                      {project.challenge}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-white tracking-tight">解决方案</h3>
                    <p className="text-base md:text-lg font-light text-gray-400 leading-loose tracking-wide">
                      {project.solution}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white tracking-tight">项目成果</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      {project.results.map((result, idx) => (
                        <div
                          key={idx}
                          className="glass-card rounded-2xl p-8 text-center space-y-3 hover-scale"
                          style={{
                            border: "1px solid rgba(100, 180, 255, 0.2)",
                          }}
                        >
                          <p className="text-4xl font-black tracking-tight" style={{ color: "rgb(100, 180, 255)" }}>
                            {result.value}
                          </p>
                          <p className="text-sm font-light text-gray-400 tracking-wide">{result.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <div id="contact" className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10121A] via-[#0A0A0F] to-[#10121A]" />
        <div className="wireframe-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                让我们一起创造
                <br />
                精彩的项目
              </h2>
              <p className="text-xl font-light text-gray-400 tracking-wide">
                如果你有任何想法或项目需求，欢迎随时联系我
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 text-lg">
              <Mail className="w-6 h-6" style={{ color: "rgb(100, 180, 255)" }} />
              <a
                href="mailto:u202410465@hust.edu.cn"
                className="text-white hover:text-[rgb(100,180,255)] transition-colors duration-300 font-medium tracking-wide"
              >
                u202410465@hust.edu.cn
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
