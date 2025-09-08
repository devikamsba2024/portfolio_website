import { createClient } from 'contentful'

const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

export const contentfulClient = spaceId && accessToken ? createClient({
  space: spaceId,
  accessToken: accessToken,
}) : null

export const isContentfulConfigured = () => {
  return !!(spaceId && accessToken)
}

// Blog Post interface - all fields optional except title and content
export interface BlogPost {
  title: string
  slug?: string
  excerpt?: string
  content: any // Rich text document from Contentful
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
  featuredImage?: {
    url: string
    title: string
  } | null
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!isContentfulConfigured() || !contentfulClient) {
    return []
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: ['-fields.publishedDate'],
    })

    const mappedPosts = response.items.map((item: any) => ({
      title: item.fields.title,
      slug: item.fields.slug || item.fields.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || 'blog-post',
      excerpt: item.fields.excerpt || '',
      content: item.fields.content || item.fields.body || null,
      publishedDate: item.fields.publishedDate || undefined,
      tags: item.fields.tags || [],
      featuredImage: item.fields.featuredImage ? {
        url: `https:${item.fields.featuredImage?.fields?.file?.url}`,
        title: item.fields.featuredImage?.fields?.title || '',
      } : null,
    }))

    return mappedPosts
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    return []
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!isContentfulConfigured() || !contentfulClient) {
    return []
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'projects',
      order: ['-sys.createdAt'],
      include: 10, // Include linked assets
    })

    const mappedProjects = response.items.map((item: any) => {
      // Handle featuredImage - it might be an array or single object
      let featuredImage = null
      if (item.fields.featuredImage) {
        let imageAsset = null
        
        // If it's an array, take the first item
        if (Array.isArray(item.fields.featuredImage) && item.fields.featuredImage.length > 0) {
          const imageId = item.fields.featuredImage[0].sys.id
          imageAsset = response.includes?.Asset?.find((asset: any) => asset.sys.id === imageId)
        } 
        // If it's a single object
        else if (item.fields.featuredImage.sys) {
          const imageId = item.fields.featuredImage.sys.id
          imageAsset = response.includes?.Asset?.find((asset: any) => asset.sys.id === imageId)
        }
        // If it's already resolved (has fields property)
        else if (item.fields.featuredImage.fields) {
          imageAsset = item.fields.featuredImage
        }

        if (imageAsset?.fields?.file?.url) {
          featuredImage = {
            url: `https:${imageAsset.fields.file.url}`,
            title: imageAsset.fields.title || '',
          }
        }
      }

      return {
        title: item.fields.title,
        slug: item.fields.slug || item.fields.title?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || 'project',
        description: item.fields.description,
        techStack: item.fields.techStack || [],
        githubUrl: item.fields.githubUrl || '',
        featuredImage,
      }
    })

    return mappedProjects
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return []
  }
}