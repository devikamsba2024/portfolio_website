import { createClient } from 'contentful'

console.log('🔧 Loading Contentful configuration...')

const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

console.log('🔧 Environment variables:')
console.log('🔧 CONTENTFUL_SPACE_ID:', spaceId ? 'SET (' + spaceId + ')' : 'NOT SET')
console.log('🔧 CONTENTFUL_ACCESS_TOKEN:', accessToken ? 'SET (length: ' + accessToken.length + ')' : 'NOT SET')

export const contentfulClient = spaceId && accessToken ? createClient({
  space: spaceId,
  accessToken: accessToken,
}) : null

console.log('🔧 Contentful client created:', !!contentfulClient)

export const isContentfulConfigured = () => {
  const configured = !!(spaceId && accessToken)
  console.log('🔧 isContentfulConfigured result:', configured)
  return configured
}

// Blog Post interface - all fields optional except title and content
export interface BlogPost {
  title: string
  slug?: string
  excerpt?: string
  content: string
  publishedDate?: string
  tags?: string[]
  featuredImage?: {
    url: string
    title: string
  } | null
}

// Project interface - all fields optional except title and description
export interface Project {
  title: string
  slug?: string
  description: string
  techStack?: string[]
  githubUrl?: string
  demoUrl?: string
  featuredImage?: {
    url: string
    title: string
  } | null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  console.log('🔧 getBlogPosts called')
  console.log('🔧 Contentful configured?', isContentfulConfigured())
  console.log('🔧 Contentful client exists?', !!contentfulClient)

  if (!isContentfulConfigured() || !contentfulClient) {
    console.log('❌ Contentful not configured, returning empty array')
    return []
  }

  try {
    console.log('🌐 Making Contentful API call for blog posts...')
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishedDate'],
    })

    console.log('✅ Contentful blog response received')
    console.log('📊 Blog items found:', response.items.length)
    console.log('🔍 Raw blog items:', response.items)

    const mappedPosts = response.items.map((item: any) => ({
      title: item.fields.title,
      slug: item.fields.slug || item.fields.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || 'blog-post',
      excerpt: item.fields.excerpt || '',
      content: item.fields.content || item.fields.body || '',
      publishedDate: item.fields.publishedDate || undefined,
      tags: item.fields.tags || [],
      featuredImage: item.fields.featuredImage ? {
        url: `https:${item.fields.featuredImage?.fields?.file?.url}`,
        title: item.fields.featuredImage?.fields?.title || '',
      } : null,
    }))

    console.log('🎯 Mapped blog posts:', mappedPosts)
    return mappedPosts
  } catch (error: any) {
    console.error('❌ Error fetching blog posts:', error)
    console.error('❌ Error details:', error?.message)
    return []
  }
}

export async function getProjects(): Promise<Project[]> {
  console.log('🔧 getProjects called')
  console.log('🔧 Contentful configured?', isContentfulConfigured())
  console.log('🔧 Contentful client exists?', !!contentfulClient)

  if (!isContentfulConfigured() || !contentfulClient) {
    console.log('❌ Contentful not configured, returning empty array')
    return []
  }

  try {
    console.log('🌐 Making Contentful API call for projects...')
    const response = await contentfulClient.getEntries({
      content_type: 'projects',
      order: ['-sys.createdAt'],
    })

    console.log('✅ Contentful projects response received')
    console.log('📊 Project items found:', response.items.length)
    console.log('🔍 Raw project items:', response.items)

    const mappedProjects = response.items.map((item: any) => ({
      title: item.fields.title,
      slug: item.fields.slug || item.fields.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || 'project',
      description: item.fields.description,
      techStack: item.fields.techStack || [],
      githubUrl: item.fields.githubUrl || '',
      demoUrl: item.fields.demoUrl || '',
      featuredImage: item.fields.featuredImage ? {
        url: `https:${item.fields.featuredImage?.fields?.file?.url}`,
        title: item.fields.featuredImage?.fields?.title || '',
      } : null,
    }))

    console.log('🎯 Mapped projects:', mappedProjects)
    return mappedProjects
  } catch (error: any) {
    console.error('❌ Error fetching projects:', error)
    console.error('❌ Error details:', error?.message)
    return []
  }
}