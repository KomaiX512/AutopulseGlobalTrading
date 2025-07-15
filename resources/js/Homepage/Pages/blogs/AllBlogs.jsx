import { HomeContext } from '@/Homepage/context/HomeContext';
import AppLoader from '@/dashboards/admin/components/AppLoader';
import React, { useContext, useEffect, useState } from 'react';
import { FaSearch, FaCalendar, FaArrowRight, FaTag, FaClock, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function AllBlogs() {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const { state, methods, dispatch } = useContext(HomeContext);
    const navigate = useNavigate();

    // Enhanced categories for filtering
    const categories = [
        { id: 'all', name: 'All Posts', color: 'bg-gray-100 text-gray-800', icon: '📰' },
        { id: 'shipping', name: 'Shipping Tips', color: 'bg-blue-100 text-blue-800', icon: '🚢' },
        { id: 'machinery', name: 'Machine Knowledge', color: 'bg-yellow-100 text-yellow-800', icon: '⚙️' },
        { id: 'customer', name: 'Customer Stories', color: 'bg-green-100 text-green-800', icon: '👥' },
        { id: 'industry', name: 'Industry News', color: 'bg-purple-100 text-purple-800', icon: '📈' },
        { id: 'trading', name: 'Global Trading', color: 'bg-red-100 text-red-800', icon: '🌍' },
        { id: 'equipment', name: 'Equipment Guide', color: 'bg-indigo-100 text-indigo-800', icon: '🔧' }
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

    // Enhanced filter blogs based on search term and category
    useEffect(() => {
        let filtered = blogs;

        // Filter by search term
        if (searchTerm) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (blog.content && blog.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (blog.description && blog.description.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Filter by category - assign categories based on blog content or title
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(blog => {
                const title = blog.title.toLowerCase();
                const content = (blog.content || '').toLowerCase();
                const description = (blog.description || '').toLowerCase();
                
                switch (selectedCategory) {
                    case 'shipping':
                        return title.includes('shipping') || content.includes('shipping') || description.includes('shipping');
                    case 'machinery':
                        return title.includes('machine') || title.includes('equipment') || content.includes('machine') || content.includes('equipment');
                    case 'customer':
                        return title.includes('customer') || title.includes('story') || content.includes('customer') || content.includes('story');
                    case 'industry':
                        return title.includes('industry') || title.includes('news') || content.includes('industry') || content.includes('news');
                    case 'trading':
                        return title.includes('trading') || title.includes('global') || content.includes('trading') || content.includes('global');
                    case 'equipment':
                        return title.includes('equipment') || title.includes('guide') || content.includes('equipment') || content.includes('guide');
                    default:
                        return true;
                }
            });
        }

        setFilteredBlogs(filtered);
    }, [searchTerm, selectedCategory, blogs]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Enhanced function to get excerpt from blog content
    const getExcerpt = (content, maxLength = 150) => {
        if (!content) return "Discover insights about machinery, shipping, and our global trading expertise...";
        const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    // Enhanced function to format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Enhanced function to get read time
    const getReadTime = (content) => {
        if (!content) return "3 min read";
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200); // Average reading speed
        return `${readTime} min read`;
    };

    // Function to get category for blog
    const getBlogCategory = (blog) => {
        const title = blog.title.toLowerCase();
        const content = (blog.content || '').toLowerCase();
        
        if (title.includes('shipping') || content.includes('shipping')) return 'shipping';
        if (title.includes('machine') || title.includes('equipment') || content.includes('machine')) return 'machinery';
        if (title.includes('customer') || title.includes('story')) return 'customer';
        if (title.includes('industry') || title.includes('news')) return 'industry';
        if (title.includes('trading') || title.includes('global')) return 'trading';
        if (title.includes('equipment') || title.includes('guide')) return 'equipment';
        
        return 'machinery'; // default category
    };

    return (
        <div className="blogs-page">
            {/* Enhanced Banner Section */}
            <div className="banner-section relative">
                <div 
                    className="container-fluid page-header m-0 p-0 relative" 
                    style={{ 
                        height: "500px", 
                        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/images/about-banner.jpg) center center/cover`
                    }}
                >
                    <div className="container-fluid page-header-inner h-full flex flex-col items-center justify-center" style={{paddingTop:'120px'}}>
                        <div className="container text-center">
                            <h1 className="display-2 text-white mb-6 font-bold animated slideInDown leading-tight" style={{ fontSize: '3.5rem', fontWeight: '700' }}>
                                Latest News & Machinery Knowledge
                            </h1>
                            <p className="text-white text-xl mb-6 opacity-90 leading-relaxed" style={{ fontSize: '1.25rem', lineHeight: '1.6' }}>
                                Stay updated with the latest insights, tips, and stories from the world of global machinery trading
                            </p>
                            <nav aria-label="breadcrumb" style={{ background: "transparent" }}>
                                <ol className="breadcrumb justify-content-center text-uppercase" style={{ background: "transparent" }}>
                                    <li className="breadcrumb-item"><a href="/" className='text-light hover:text-yellow-300 transition-colors'>Home</a></li>
                                    <li className="breadcrumb-item text-white active" aria-current="page">Blogs</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Search and Filter Section */}
            <div className="container my-8">
                <div className="search-filter-section bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <div className="search-box relative">
                                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                                <input
                                    type="text"
                                    placeholder="Search articles by title, content, or keywords..."
                                    className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="categories-filter">
                                <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by Category:</label>
                                <div className="flex flex-wrap gap-3">
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            onClick={() => setSelectedCategory(category.id)}
                                            className={`px-4 py-3 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                                                selectedCategory === category.id
                                                    ? 'bg-yellow-600 text-white shadow-lg transform scale-105'
                                                    : category.color + ' hover:shadow-md hover:scale-105'
                                            }`}
                                        >
                                            <span className="text-base">{category.icon}</span>
                                            <span>{category.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Blog Cards Section */}
            <div className="container my-8">
                {loading ? (
                    <div className="text-center py-16">
                        <AppLoader />
                        <p className="text-gray-600 mt-6 text-lg">Loading latest articles...</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-gray-800 mb-3 leading-tight" style={{ fontSize: '2rem', fontWeight: '700' }}>
                                {searchTerm ? `Search results for "${searchTerm}"` : selectedCategory !== 'all' ? `${categories.find(c => c.id === selectedCategory)?.name}` : 'All Articles'}
                            </h2>
                            <p className="text-gray-600 text-lg" style={{ fontSize: '1.125rem' }}>
                                {filteredBlogs.length} article{filteredBlogs.length !== 1 ? 's' : ''} found
                            </p>
                        </div>

                        <div className="row">
                            {filteredBlogs.length > 0 ? (
                                filteredBlogs.map((blog, index) => (
                                    <div key={blog.id || index} className="col-12 col-md-6 col-lg-4 mb-6">
                                        <div
                                            className="blog-card bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 h-full cursor-pointer transform hover:-translate-y-2 overflow-hidden border border-gray-100"
                                            onClick={() => navigate(`/blogs/${blog.slug}`)}
                                        >
                                            {/* Fixed Blog Image - Proper sizing */}
                                            <div className="relative overflow-hidden h-48">
                                                <img 
                                                    src={blog.image?.replace('public', '/storage') || '/images/blog-placeholder.jpg'} 
                                                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                                                    alt={blog.title}
                                                    style={{ maxHeight: '192px' }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                                                <div className="absolute top-4 left-4">
                                                    <span className="bg-yellow-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg flex items-center">
                                                        <FaTag className="mr-2" />
                                                        {categories.find(c => c.id === getBlogCategory(blog))?.name || 'Featured'}
                                                    </span>
                                                </div>
                                                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center shadow-lg">
                                                    <FaClock className="text-xs mr-1.5" />
                                                    <span className="text-xs font-medium">{getReadTime(blog.content)}</span>
                                                </div>
                                            </div>

                                            {/* Enhanced Blog Content with Larger Fonts */}
                                            <div className="p-6 flex flex-col h-full">
                                                <div className="flex items-center text-gray-500 text-sm mb-4">
                                                    <FaCalendar className="mr-2 text-gray-400" />
                                                    <span className="font-medium text-base">{formatDate(blog.created_at)}</span>
                                                    <div className="mx-2">•</div>
                                                    <FaUser className="mr-2 text-gray-400" />
                                                    <span className="font-medium text-base">Autopulse Team</span>
                                                </div>

                                                <h3 className="text-2xl font-bold text-gray-800 mb-4 line-clamp-2 hover:text-yellow-600 transition-colors leading-tight" style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1.3' }}>
                                                    {blog.title}
                                                </h3>

                                                <p className="text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                                                    {getExcerpt(blog.content)}
                                                </p>

                                                <div className="mt-auto">
                                                    <Link 
                                                        to={`/blogs/${blog.slug}`} 
                                                        className="inline-flex items-center bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
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
                                <div className="col-12 text-center py-16">
                                    <div className="text-gray-400 mb-4">
                                        <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-600 mb-2">No articles found</h3>
                                    <p className="text-gray-500 mb-6">Try adjusting your search terms or filters</p>
                                    <button 
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedCategory('all');
                                        }}
                                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default AllBlogs;
