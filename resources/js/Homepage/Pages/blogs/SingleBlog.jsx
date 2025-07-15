import { HomeContext } from '@/Homepage/context/HomeContext';
import { Parser } from 'html-to-react';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { FaCalendar, FaUser, FaClock, FaShare, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

function SingleBlog() {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [readTime, setReadTime] = useState(0);
  const contentRef = useRef(null);

  const { methods } = useContext(HomeContext);

  async function fetchBlog() {
    try {
      setLoading(true);
      const blogId = window.location.pathname.split('/').pop();

      const fetchedBlog = await methods?.loadBlogs(blogId);
      const recent = await methods?.loadBlogs();

      if (fetchedBlog) {
        // API may return an array; handle both cases
        const blogData = Array.isArray(fetchedBlog) ? fetchedBlog[0] : fetchedBlog;
        setBlog(blogData);
        
        // Calculate read time
        if (blogData.content) {
          const wordCount = blogData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
          setReadTime(Math.ceil(wordCount / 200)); // Average reading speed
        }
      }
      if (recent) {
        setRecentBlogs(recent);
      }
    } catch (error) {
      console.error('Failed to load blog:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  useEffect(() => {
    if (blog && contentRef.current) {
      // Apply professional styling to blog content
      const contentElement = contentRef.current;
      
      // Add responsive styles
      const style = document.createElement('style');
      style.textContent = `
        .blog-content {
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          line-height: 1.8;
          color: #374151;
          max-width: 100%;
          overflow-x: hidden;
        }
        
        .blog-content h1 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #111827;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
        }
        
        .blog-content h2 {
          font-size: 2rem;
          font-weight: 600;
          color: #111827;
          margin: 1.8rem 0 1rem 0;
          line-height: 1.3;
        }
        
        .blog-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #111827;
          margin: 1.5rem 0 0.8rem 0;
          line-height: 1.4;
        }
        
        .blog-content h4 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #111827;
          margin: 1.2rem 0 0.6rem 0;
          line-height: 1.4;
        }
        
        .blog-content h5 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #111827;
          margin: 1rem 0 0.5rem 0;
          line-height: 1.4;
        }
        
        .blog-content h6 {
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          margin: 0.8rem 0 0.4rem 0;
          line-height: 1.4;
        }
        
        .blog-content p {
          font-size: 1.125rem;
          margin-bottom: 1.5rem;
          color: #374151;
          line-height: 1.8;
        }
        
        .blog-content img {
          max-width: 100%;
          height: auto;
          display: block;
          margin: 2rem auto;
          border-radius: 8px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: transform 0.3s ease;
          max-height: 500px;
          object-fit: cover;
        }
        
        .blog-content img:hover {
          transform: scale(1.02);
        }
        
        .blog-content blockquote {
          border-left: 4px solid #f59e0b;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background-color: #fef3c7;
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: #92400e;
          font-size: 1.125rem;
        }
        
        .blog-content ul, .blog-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }
        
        .blog-content li {
          margin-bottom: 0.5rem;
          font-size: 1.125rem;
          line-height: 1.6;
        }
        
        .blog-content ul li {
          list-style-type: disc;
        }
        
        .blog-content ol li {
          list-style-type: decimal;
        }
        
        .blog-content a {
          color: #f59e0b;
          text-decoration: underline;
          transition: color 0.3s ease;
        }
        
        .blog-content a:hover {
          color: #d97706;
        }
        
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
        }
        
        .blog-content table th {
          background-color: #f9fafb;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #111827;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .blog-content table td {
          padding: 1rem;
          border-bottom: 1px solid #e5e7eb;
          color: #374151;
        }
        
        .blog-content table tr:hover {
          background-color: #f9fafb;
        }
        
        .blog-content code {
          background-color: #f3f4f6;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          color: #dc2626;
        }
        
        .blog-content pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1.5rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 2rem 0;
          font-family: 'Courier New', monospace;
          font-size: 0.875rem;
          line-height: 1.6;
        }
        
        .blog-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
        
        .blog-content .video-embed {
          position: relative;
          width: 100%;
          height: 0;
          padding-bottom: 56.25%; /* 16:9 aspect ratio */
          margin: 2rem 0;
        }
        
        .blog-content .video-embed iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 8px;
        }
        
        @media (max-width: 768px) {
          .blog-content h1 {
            font-size: 2rem;
          }
          
          .blog-content h2 {
            font-size: 1.75rem;
          }
          
          .blog-content h3 {
            font-size: 1.5rem;
          }
          
          .blog-content p {
            font-size: 1rem;
          }
          
          .blog-content li {
            font-size: 1rem;
          }
        }
      `;
      
      document.head.appendChild(style);
      contentElement.innerHTML = blog.content;
      contentElement.classList.add('blog-content');
    }
  }, [blog]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading blog content...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog not found</h2>
        <a href="/blogs" className="primary-btn px-6 py-3 inline-block rounded-lg text-white">Back to Blogs</a>
      </div>
    );
  }

  return (
    <div>
      {/* Enhanced Hero Section */}
      <div
        className="relative h-96 md:h-[500px] overflow-hidden"
        style={{
          background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${blog?.image ? blog.image.replace('public', '/storage') : '/images/blog-placeholder.jpg'}) center center/cover`
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {blog.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-sm md:text-base">
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span>Autopulse Team</span>
              </div>
              <div className="flex items-center">
                <FaCalendar className="mr-2" />
                <span>{new Date(blog.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-2" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="absolute bottom-4 left-0 right-0">
          <nav className="container mx-auto px-4">
            <ol className="flex items-center space-x-2 text-white text-sm">
              <li><a href="/" className="hover:text-yellow-300 transition-colors">Home</a></li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <a href="/blogs" className="hover:text-yellow-300 transition-colors">Blogs</a>
              </li>
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="truncate">{blog.title}</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-lg p-8">
              {/* Social Share */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">Share:</span>
                  <div className="flex space-x-3">
                    <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                       target="_blank" 
                       className="text-blue-600 hover:text-blue-700 transition-colors">
                      <FaFacebook size={20} />
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`} 
                       target="_blank" 
                       className="text-blue-400 hover:text-blue-500 transition-colors">
                      <FaTwitter size={20} />
                    </a>
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} 
                       target="_blank" 
                       className="text-blue-700 hover:text-blue-800 transition-colors">
                      <FaLinkedin size={20} />
                    </a>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <FaShare className="mr-2" />
                  <span className="text-sm">Share Article</span>
                </div>
              </div>

              {/* Blog Content */}
              <div ref={contentRef} className="prose prose-lg max-w-none">
                {/* Content will be inserted here by useEffect */}
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Articles</h3>
              <div className="space-y-6">
                {recentBlogs?.slice(0, 5).map((recentBlog) => (
                  <div key={recentBlog.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-lg mb-3">
                      <img
                        className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
                        src={recentBlog?.image ? recentBlog.image.replace('public', '/storage') : '/images/blog-placeholder.jpg'}
                        alt={recentBlog.title}
                        style={{ maxHeight: '128px' }}
                      />
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                      {recentBlog.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {new Date(recentBlog.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
