import { HomeContext } from '@/Homepage/context/HomeContext';
import { Parser } from 'html-to-react';
import React, { useContext, useEffect, useState, useRef } from 'react';

function SingleBlog() {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const shadowContainerRef = useRef(null);

  const { methods } = useContext(HomeContext);

  async function fetchBlog() {
    try {
      setLoading(true);
      const blogId = window.location.pathname.split('/').pop();

      const fetchedBlog = await methods?.loadBlogs(blogId);
      const recent = await methods?.loadBlogs();

      if (fetchedBlog) {
        // API may return an array; handle both cases
        setBlog(Array.isArray(fetchedBlog) ? fetchedBlog[0] : fetchedBlog);
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
    if (blog && shadowContainerRef.current) {
      // Create Shadow DOM
      const shadowRoot = shadowContainerRef.current.attachShadow({ mode: 'open' });

      // Parse Blog Content
      const contentWrapper = document.createElement('div');
      contentWrapper.innerHTML = blog.content;

      // Add Styles Inside Shadow DOM
      const styleElement = document.createElement('style');
      styleElement.textContent = `
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                body, div {
                    font-family: 'Poppins', sans-serif;
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    box-sizing: border-box;
                }
                img {
                    max-width: 100%;
                    height: auto;
                }
            `;

      shadowRoot.appendChild(styleElement);
      shadowRoot.appendChild(contentWrapper);
    }
  }, [blog]);

  if (loading) {
    return <div className="py-10 text-center font-semibold">Loading...</div>;
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
      <div
        className="container-fluid page-header m-0 p-0"
        style={{
          height: "100%",
          background: `url(${blog?.image ? blog.image.replace('public', '/storage') : '/images/blog-placeholder.jpg'}) center center/cover`
        }}
      >
        <div className="container-fluid page-header-inner !h-auto py-5">
          <div className="container text-center">
            <h1 className="display-3 text-white mb-3 animated slideInDown">{blog.title}</h1>
            <p className="text-white font-semibold">By Autopulse | {new Date(blog.created_at).toLocaleDateString()}</p>
            <nav aria-label="breadcrumb" style={{ background: "transparent" }}>
              <ol className="breadcrumb justify-content-center text-uppercase" style={{ background: "transparent" }}>
                <li className="breadcrumb-item"><a href="/" className='text-light'>Home</a></li>
                <li className="breadcrumb-item text-white active" aria-current="page">{blog.title}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="products my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-heading">
                <h2>{blog.title}</h2>
              </div>
            </div>

            <div className="col-md-10">
              <div ref={shadowContainerRef} />
            </div>

            <div className="col-md-2">
              <h3 className="text-xl font-semibold mb-4">Recent Blogs</h3>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {recentBlogs?.map((recentBlog) => (
                  <div key={recentBlog.id} className="rounded overflow-hidden shadow-lg">
                    <img
                      className="w-full h-48 object-cover"
                      src={recentBlog?.image ? recentBlog.image.replace('public', '/storage') : '/images/blog-placeholder.jpg'}
                      alt={recentBlog.title}
                    />
                    <div className="px-6 py-4">
                      <div className="font-semibold text-xl mb-2">{recentBlog.title}</div>
                      <p className="text-gray-700 text-base">
                        {new Date(recentBlog.created_at).toLocaleDateString()}
                      </p>
                    </div>
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
