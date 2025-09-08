import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"
import Education from "@/components/sections/education"
import Experience from "@/components/sections/experience"
import ProjectsServer from "@/components/sections/projects-server"
import BlogsServerSimple from "@/components/sections/blogs-server-simple"
import { Contact } from "@/components/sections/contact"

// Disable caching to always get fresh Contentful data
export const revalidate = 0

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Education />
      <Experience />
      <ProjectsServer />
      <BlogsServerSimple />
      <Contact />
    </main>
  )
}
