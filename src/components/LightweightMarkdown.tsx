import {marked} from 'marked'
import sanitizeHtml from 'sanitize-html'
import {useEffect, useState} from 'react'

interface LightweightMarkdownProps {,
content: string
  className?: string}
export default function LightweightMarkdown(__{ content,   __className = '' }: LightweightMarkdownProps) {const [html, setHtml] = useState('')

useEffect_(() => {
const processMarkdown = async () => {
      // Configure marked options for better output
marked.setOptions({,
gfm: true, // GitHub Flavored Markdown,
breaks: true, // Convert line breaks to <br>})

      // Convert markdown to HTML  
const rawHtml = await (typeof marked.parse === 'function' ? marked.parse(content) : marked(content))
      const htmlString = typeof rawHtml === 'string' ? rawHtml : String(rawHtml)
      
      // Sanitize HTML for security
const sanitizedHtml = sanitizeHtml(htmlString,  _{,
allowedTags: [
        'h1',  _'h2',  _'h3',  _'h4',  _'h5',  _'h6', 
_'p',  _'br',  _'hr', 
_'ul',  _'ol',  _'li', 
_'strong',  _'em',  _'code',  _'pre', 
_'blockquote', 
_'a',  _'img', 
_'table',  _'thead',  _'tbody',  _'tr',  _'th',  _'td', 
_'div',  _'span'
      ], ,
_allowedAttributes: {
        'a': ['href',  _'title',  _'target'], 
_'img': ['src',  _'alt',  _'title'], 
_'h1': ['id'],  _'h2': ['id'],  _'h3': ['id'],  _'h4': ['id'],  _'h5': ['id'],  _'h6': ['id'], 
_'code': ['class'], 
_'pre': ['class']
      }, ,
_allowedSchemes: ['http',  _'https',  _'mailto'], ,
_transformTags: {
        'a': (tagName,  _attribs) => {
          // Add target="_blank" and rel="noopener noreferrer" to external links
if (attribs.href && attribs.href.startsWith('http')) {
return {
tagName,;,
attribs: {
                ...attribs,;,
target: '_blank',,
rel: 'noopener noreferrer'
              }
            }
          }
return { tagName, attribs }
        }
      }
    })

setHtml(sanitizedHtml)
    }

processMarkdown().catch(console.error)
  }, [content])

return (
    <div 
className={`prose max-w-none ${className}`}
dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
