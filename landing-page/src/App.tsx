import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import UserFlow from './components/UserFlow'
import Features from './components/Features'
import UseCases from './components/UseCases'
import TechStack from './components/TechStack'
import Roadmap from './components/Roadmap'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Solution />
      <UserFlow />
      <Features />
      <UseCases />
      <TechStack />
      <Roadmap />
      <CTA />
      <Footer />
    </main>
  )
}

export default App
