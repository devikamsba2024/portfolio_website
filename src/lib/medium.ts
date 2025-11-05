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
    
    console.log('🔍 Fetching Medium posts from:', rssUrl)
    
    // Try multiple RSS2JSON services for better reliability
    const apiUrls = [
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10`,
      `https://rss2json.com/api.json?rss_url=${encodeURIComponent(rssUrl)}&count=10`,
      `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`
    ]
    
    for (const apiUrl of apiUrls) {
      try {
        console.log('🔄 Trying API:', apiUrl.split('?')[0])
        
        const response = await fetch(apiUrl, {
          next: { revalidate: 300 }, // Cache for 5 minutes (shorter for fresh posts)
          headers: {
            'Accept': 'application/json',
          }
        })
        
        if (!response.ok) {
          console.log(`❌ API failed with status: ${response.status}`)
          continue
        }
        
        const data = await response.json()
        
        // Handle different API response formats
        let posts: MediumPost[] = []
        
        if (apiUrl.includes('allorigins')) {
          // AllOrigins returns raw XML in contents
          posts = parseRSSXML(data.contents || '')
        } else {
          // RSS2JSON format
          if (data.status !== 'ok') {
            console.log(`❌ RSS2JSON error: ${data.message}`)
            continue
          }
          
          posts = data.items?.map((item: any) => ({
            title: item.title,
            link: item.link,
            pubDate: item.pubDate,
            description: stripHtml(item.description || item.content || '').substring(0, 200) + '...',
            content: item.content || '',
            guid: item.guid,
            categories: item.categories || [],
            thumbnail: extractThumbnail(item.content || item.description || '')
          })) || []
        }
        
        if (posts.length > 0) {
          console.log('✅ Medium posts fetched:', posts.length)
          console.log('📝 Latest post:', posts[0]?.title)
          return posts
        }
        
      } catch (apiError) {
        console.log('❌ API error:', apiError)
        continue
      }
    }
    
    // If all APIs fail, return empty array
    console.log('❌ All RSS APIs failed')
    return []
    
  } catch (error) {
    console.error('❌ Error fetching Medium posts:', error)
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
    console.log('🔍 Parsing RSS XML, length:', xml.length)
    
    // Extract items using regex (simple approach)
    const itemMatches = xml.match(/<item>([\s\S]*?)<\/item>/g)
    
    if (!itemMatches) {
      console.log('❌ No RSS items found in XML')
      return posts
    }
    
    console.log('📝 Found RSS items:', itemMatches.length)
    
    itemMatches.forEach((item, index) => {
      const title = extractXMLContent(item, 'title')
      const link = extractXMLContent(item, 'link')
      const pubDate = extractXMLContent(item, 'pubDate')
      const description = extractXMLContent(item, 'description')
      const content = extractXMLContent(item, 'content:encoded') || description
      const guid = extractXMLContent(item, 'guid')
      
      // Extract categories (Medium uses CDATA)
      const categoryMatches = item.match(/<category><!\[CDATA\[(.*?)\]\]><\/category>/g) || 
                             item.match(/<category>(.*?)<\/category>/g) || []
      const categories = categoryMatches.map(cat => 
        cat.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/<\/?category>/g, '').trim()
      )
      
      if (title && link) {
        const cleanTitle = stripHtml(title)
        const cleanDescription = stripHtml(description || content || '').substring(0, 200)
        
        console.log(`📄 Post ${index + 1}: ${cleanTitle}`)
        
        posts.push({
          title: cleanTitle,
          link,
          pubDate,
          description: cleanDescription + (cleanDescription.length >= 200 ? '...' : ''),
          content,
          guid,
          categories,
          thumbnail: extractThumbnail(content || description || '')
        })
      }
    })
  } catch (error) {
    console.error('❌ Error parsing RSS XML:', error)
  }
  
  console.log('✅ Parsed posts:', posts.length)
  return posts
}

// Extract content from XML tags
function extractXMLContent(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const match = xml.match(regex)
  if (!match) return ''
  
  let content = match[1].trim()
  
  // Handle CDATA sections
  if (content.includes('<![CDATA[')) {
    content = content.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
  }
  
  return content
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
