import { NextResponse } from 'next/server'
import { getBlogPosts, getProjects, isContentfulConfigured } from '@/lib/contentful'

export async function GET() {
  try {
    const isConfigured = isContentfulConfigured()
    const blogs = await getBlogPosts()
    const projects = await getProjects()

    return NextResponse.json({
      status: 'success',
      contentfulConfigured: isConfigured,
      environment: {
        spaceId: process.env.CONTENTFUL_SPACE_ID ? 'SET' : 'NOT SET',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ? 'SET' : 'NOT SET',
      },
      data: {
        blogsCount: blogs.length,
        projectsCount: projects.length,
        blogs: blogs.map(b => ({ title: b.title, slug: b.slug })),
        projects: projects.map(p => ({ title: p.title, slug: p.slug })),
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      status: 'error',
      error: error.message,
      contentfulConfigured: isContentfulConfigured(),
      environment: {
        spaceId: process.env.CONTENTFUL_SPACE_ID ? 'SET' : 'NOT SET',
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ? 'SET' : 'NOT SET',
      }
    }, { status: 500 })
  }
}
