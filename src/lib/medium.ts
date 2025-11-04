// Medium blog integration
// Medium provides RSS feeds at: https://medium.com/@username/feed

export interface MediumPost {
  title: string
  link: string
  pubDate: string
  description: string
  content: string
  guid: string
  categories: string[]
  thumbnail?: string
}

// Parse Medium RSS feed
export async function getMediumPosts(username: string): Promise<MediumPost[]> {
  if (!username) {
    console.log('No Medium username provided')
    return []
  }

  try {
    // Medium RSS feed URL
    const rssUrl = `https://medium.com/@${username}/feed`
    
    // Use RSS2JSON service to convert RSS to JSON (CORS-friendly)
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=YOUR_API_KEY&count=10`
    
    console.log('🔍 Fetching Medium posts from:', rssUrl)
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Medium posts: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.status !== 'ok') {
      throw new Error(`RSS2JSON error: ${data.message}`)
    }
    
    console.log('📝 Medium posts fetched:', data.items?.length || 0)
    
    // Transform the data to our format
    const posts: MediumPost[] = data.items?.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: stripHtml(item.description || item.content || ''),
      content: item.content || '',
      guid: item.guid,
      categories: item.categories || [],
      thumbnail: extractThumbnail(item.content || item.description || '')
    })) || []
    
    return posts
  } catch (error) {
    console.error('Error fetching Medium posts:', error)
    return []
  }
}

// Alternative method using direct RSS parsing (for server-side only)
export async function getMediumPostsDirect(username: string): Promise<MediumPost[]> {
  if (!username) return []

  try {
    const rssUrl = `https://medium.com/@${username}/feed`
    
    console.log('🔍 Fetching Medium RSS directly from:', rssUrl)
    
    const response = await fetch(rssUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Blog Reader/1.0)'
      }
    })
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS: ${response.status}`)
    }
    
    const xmlText = await response.text()
    
    // Simple XML parsing for RSS items
    const posts = parseRSSXML(xmlText)
    
    console.log('📝 Medium posts parsed:', posts.length)
    
    return posts
  } catch (error) {
    console.error('Error fetching Medium RSS:', error)
    return []
  }
}

// Helper function to strip HTML tags
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim()
}

// Extract thumbnail from content
function extractThumbnail(content: string): string | undefined {
  const imgMatch = content.match(/<img[^>]+src="([^"]+)"[^>]*>/i)
  return imgMatch ? imgMatch[1] : undefined
}

// Simple RSS XML parser
function parseRSSXML(xml: string): MediumPost[] {
  const posts: MediumPost[] = []
  
  try {
    // Extract items using regex (simple approach)
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g)
    
    if (!itemMatches) return posts
    
    itemMatches.forEach(item => {
      const title = extractXMLContent(item, 'title')
      const link = extractXMLContent(item, 'link')
      const pubDate = extractXMLContent(item, 'pubDate')
      const description = extractXMLContent(item, 'description')
      const content = extractXMLContent(item, 'content:encoded') || description
      const guid = extractXMLContent(item, 'guid')
      
      // Extract categories
      const categoryMatches = item.match(/<category>(.*?)<\/category>/g) || []
      const categories = categoryMatches.map(cat => 
        cat.replace(/<\/?category>/g, '').trim()
      )
      
      if (title && link) {
        posts.push({
          title: stripHtml(title),
          link,
          pubDate,
          description: stripHtml(description).substring(0, 200) + '...',
          content,
          guid,
          categories,
          thumbnail: extractThumbnail(content)
        })
      }
    })
  } catch (error) {
    console.error('Error parsing RSS XML:', error)
  }
  
  return posts
}

// Extract content from XML tags
function extractXMLContent(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const match = xml.match(regex)
  return match ? match[1].trim() : ''
}

// Format date for display
export function formatMediumDate(dateString: string): string {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  } catch {
    return dateString
  }
}
