import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import Education from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import Projects from "@/components/sections/projects"
import Blogs from "@/components/sections/blogs"
import { Contact } from "@/components/sections/contact"

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Education />
      <Experience />
      <Projects />
      <Blogs />
      <Contact />
    </main>
  )
}
