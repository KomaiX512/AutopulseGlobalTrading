import { HomeContext } from '@/Homepage/context/HomeContext';
import AppLoader from '@/dashboards/admin/components/AppLoader';
import React, { useContext, useEffect, useState } from 'react';
import { FaSearch, FaCalendar, FaArrowRight, FaTag } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function AllBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const { state, methods, dispatch } = useContext(HomeContext);
    const navigate = useNavigate();

    // Categories for filtering
    const categories = [
        { id: 'all', name: 'All Posts', color: 'bg-gray-100 text-gray-800' },
        { id: 'shipping', name: 'Shipping Tips', color: 'bg-blue-100 text-blue-800' },
        { id: 'machinery', name: 'Machine Knowledge', color: 'bg-yellow-100 text-yellow-800' },
        { id: 'customer', name: 'Customer Stories', color: 'bg-green-100 text-green-800' },
        { id: 'industry', name: 'Industry News', color: 'bg-purple-100 text-purple-800' }
    ];

    async function fetchBlogs() {
        setLoading(true);
        let blogs = await methods.loadBlogs();

        if (blogs) {
            setBlogs(blogs);
            setFilteredBlogs(blogs);
            setLoading(false);
        }
    }

    // Filter blogs based on search term and category
    useEffect(() => {
        let filtered = blogs;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by category (for demo purposes, we'll randomly assign categories)
        if (selectedCategory !== 'all') {
            // In a real implementation, blogs would have category field
            // For now, we'll show all for demonstration
            filtered = filtered;
        }

        setFilteredBlogs(filtered);
    }, [searchTerm, selectedCategory, blogs]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Function to get excerpt from blog content
    const getExcerpt = (content, maxLength = 150) => {
        if (!content) return "Discover insights about machinery, shipping, and our global trading expertise...";
        return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
    };

    // Function to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="blogs-page">
            {/* Banner Section */}
            <div className="banner-section relative">
                <div 
                    className="container-fluid page-header m-0 p-0 relative" 
                    style={{ 
                        height: "400px", 
                        background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(/images/about-banner.jpg) center center/cover`
                    }}
                >
                    <div className="container-fluid page-header-inner h-full flex flex-col items-center justify-center" style={{paddingTop:'120px'}}>
                    <div className="container text-center">
                            <h1 className="display-2 text-white mb-4 font-bold animated slideInDown">
                                Latest News & Machinery Knowledge
                            </h1>
                            <p className="text-white text-xl mb-4 opacity-90">
                                Stay updated with the latest insights, tips, and stories from the world of global machinery trading
                            </p>
                        <nav aria-label="breadcrumb" style={{ background: "transparent" }}>
                            <ol className="breadcrumb justify-content-center text-uppercase" style={{ background: "transparent" }}>
                                    <li className="breadcrumb-item"><a href="/" className='text-light hover:text-yellow-300'>Home</a></li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Blogs</li>
                            </ol>
                        </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter Section */}
            <div className="container my-5">
                <div className="search-filter-section bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <div className="search-box relative">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="categories-filter">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Category:</label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                                selectedCategory === category.id
                                                    ? 'bg-yellow-600 text-white shadow-md'
                                                    : category.color + ' hover:shadow-md'
                                            }`}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Cards Section */}
            <div className="container my-5">
                {loading ? (
                    <div className="text-center py-12">
                        <AppLoader />
                        <p className="text-gray-600 mt-4">Loading latest articles...</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {searchTerm ? `Search results for "${searchTerm}"` : 'All Articles'}
                            </h2>
                            <p className="text-gray-600">
                                {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
                            </p>
                        </div>

                        <div className="row">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog, index) => (
                                    <div key={blog.id || index} className="col-12 col-md-6 col-lg-4 mb-4">
                                        <div
                                            className="blog-card bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer"
                                            onClick={() => navigate(`/blogs/${blog.slug}`)}
                                        >
                                            {/* Blog Image */}
                                            <div className="relative overflow-hidden h-48">
                                                <img 
                                                    src={blog.image?.replace('public', '/storage') || '/images/blog-placeholder.jpg'} 
                                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                                                    alt={blog.title}
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                                                        <FaTag className="inline mr-1" />
                                                        Featured
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Blog Content */}
                                            <div className="p-6 flex flex-col h-full">
                                                <div className="flex items-center text-gray-500 text-sm mb-3">
                                                    <FaCalendar className="mr-2" />
                                                    {formatDate(blog.created_at)}
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-yellow-600 transition-colors">
                                                    {blog.title}
                                                </h3>

                                                <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
                                                    {getExcerpt(blog.content)}
                                                </p>

                                                <div className="mt-auto">
                                                    <Link 
                                                        to={`/blogs/${blog.slug}`} 
                                                        className="inline-flex items-center primary-btn hover:shadow-lg transition-all duration-300 text-white px-6 py-2 rounded-lg font-medium"
                                                        onClick={(e)=>e.stopPropagation()}
                                                    >
                                                        Read More
                                                        <FaArrowRight className="ml-2" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12">
                                    <div className="text-center py-12">
                                        <div className="text-gray-400 mb-4">
                                            <FaSearch size={48} />
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-600 mb-2">No articles found</h3>
                                        <p className="text-gray-500">
                                            {searchTerm 
                                                ? `No articles match your search "${searchTerm}". Try different keywords.`
                                                : 'No articles available at the moment. Check back later for updates!'
                                            }
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="newsletter-section bg-gradient-to-r from-yellow-50 to-blue-50 rounded-lg p-8 mt-12">
                            <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-800 mb-3">Stay Updated</h3>
                                <p className="text-gray-600 mb-6">
                                    Get the latest machinery insights and trading tips delivered to your inbox
                                </p>
                                <div className="max-w-md mx-auto flex gap-3">
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    />
                                    <button className="primary-btn px-6 py-3 rounded-lg font-medium">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AllBlogs;
