import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { useEffect, useState } from 'react';

interface LightweightMarkdownProps {
  content: string;
  className?: string;
}

export default function LightweightMarkdown({ content, className = '' }: LightweightMarkdownProps) {
  const [html, setHtml] = useState('');

  useEffect(() => {
    // Configure marked options for better output
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // Convert line breaks to <br>
      headerIds: true, // Add IDs to headers
      mangle: false, // Don't mangle email addresses
    });

    // Convert markdown to HTML
    const rawHtml = marked(content);
    
    // Sanitize HTML for security
    const sanitizedHtml = sanitizeHtml(rawHtml, {
      allowedTags: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'ul', 'ol', 'li',
        'strong', 'em', 'code', 'pre',
        'blockquote',
        'a', 'img',
        'table', 'thead', 'tbody', 'tr', 'th', 'td',
        'div', 'span'
      ],
      allowedAttributes: {
        'a': ['href', 'title', 'target'],
        'img': ['src', 'alt', 'title'],
        'h1': ['id'], 'h2': ['id'], 'h3': ['id'], 'h4': ['id'], 'h5': ['id'], 'h6': ['id'],
        'code': ['class'],
        'pre': ['class']
      },
      allowedSchemes: ['http', 'https', 'mailto'],
      transformTags: {
        'a': (tagName, attribs) => {
          // Add target="_blank" and rel="noopener noreferrer" to external links
          if (attribs.href && attribs.href.startsWith('http')) {
            return {
              tagName,
              attribs: {
                ...attribs,
                target: '_blank',
                rel: 'noopener noreferrer'
              }
            };
          }
          return { tagName, attribs };
        }
      }
    });

    setHtml(sanitizedHtml);
  }, [content]);

  return (
    <div 
      className={`prose max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
