import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { FaCalendar, FaUser, FaArrowRight, FaClock, FaTag } from 'react-icons/fa';
import { Button } from 'antd';
import { useMobileDetector } from '../../utils/useMobileDetector';

const defaultBlogs = [
    {
        id: 1,
        title: 'Top 10 Heavy Machinery Trends in 2024',
        excerpt: 'Discover the latest trends in heavy machinery technology and what to expect in the construction industry this year.',
        image: '/images/blog/machinery-trends-2024.jpg',
        author: 'John Smith',
        date: '2024-01-15',
        readTime: '5 min read',
        slug: 'top-10-heavy-machinery-trends-2024',
        category: 'Industry News'
    },
    {
        id: 2,
        title: 'Complete Guide: Choosing the Right Excavator',
        excerpt: 'Everything you need to know about selecting the perfect excavator for your construction project needs.',
        image: '/images/blog/excavator-guide.jpg',
        author: 'Sarah Johnson',
        date: '2024-01-12',
        readTime: '8 min read',
        slug: 'complete-guide-choosing-right-excavator',
        category: 'Buying Guide'
    },
    {
        id: 3,
        title: 'Maintenance Tips for Heavy Construction Equipment',
        excerpt: 'Essential maintenance practices to extend the life of your heavy machinery and reduce operational costs.',
        image: '/images/blog/maintenance-tips.jpg',
        author: 'Mike Chen',
        date: '2024-01-08',
        readTime: '6 min read',
        slug: 'maintenance-tips-heavy-construction-equipment',
        category: 'Maintenance'
    }
];

function BlogPreview() {
    const { state, methods } = useContext(HomeContext);
    const { isMobile } = useMobileDetector();
    const [blogs, setBlogs] = useState(defaultBlogs);
    const [loading, setLoading] = useState(false);
    const [showAllBlogs, setShowAllBlogs] = useState(false);

    useEffect(() => {
        loadLatestBlogs();
    }, []);

    const loadLatestBlogs = async () => {
        setLoading(true);
        try {
            const blogsData = await methods.loadBlogs();
            if (blogsData && blogsData.length > 0) {
                setBlogs(blogsData.slice(0, 3)); // Get only latest 3 blogs
            }
        } catch (error) {
            console.error('Error loading blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getExcerpt = (content, maxLength = 120) => {
        if (!content) return "Discover insights about machinery, shipping, and our global trading expertise...";
        const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const getReadTime = (content) => {
        if (!content) return "3 min read";
        const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
        const readTime = Math.ceil(wordCount / 200); // Average reading speed
        return `${readTime} min read`;
    };

    const handleViewAllBlogs = () => {
        window.location.href = '/blogs';
    };

    // For mobile: show only 1 blog initially, or all if "View All" is clicked
    // For desktop: show all blogs (up to 3)
    const displayedBlogs = isMobile && !showAllBlogs 
        ? blogs.slice(0, 1) 
        : blogs;

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
                        Latest from Our Blog
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Stay updated with the latest news, insights, and tips from the heavy machinery industry
                    </p>
                </div>

                {loading ? (
                    // Enhanced Loading Skeleton
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden">
                                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                                <div className="p-6">
                                    <div className="flex items-center mb-4">
                                        <div className="h-6 bg-yellow-200 rounded-full px-3 py-1 animate-pulse"></div>
                                        <div className="ml-auto h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-16 bg-gray-200 rounded animate-pulse mb-4"></div>
                                    <div className="flex items-center justify-between">
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {displayedBlogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="group bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden cursor-pointer rounded-xl"
                                onClick={() => window.location.href = `/blogs/${blog.slug}`}
                            >
                                {/* Fixed Blog Image - Proper sizing */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={blog.image?.includes('public') ? blog.image.replace('public', '/storage') : blog.image}
                                        alt={blog.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        style={{ maxHeight: '192px' }}
                                    />
                                    
                                    {/* Enhanced gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40 group-hover:from-black/30 group-hover:to-black/50 transition-all duration-500"></div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="bg-yellow-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                                            <FaTag className="inline mr-1" />
                                            {blog.category || 'Featured'}
                                        </span>
                                    </div>

                                    {/* Read Time Badge */}
                                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center shadow-lg">
                                        <FaClock className="text-xs mr-1.5" />
                                        <span className="text-xs font-medium">{blog.readTime || getReadTime(blog.content)}</span>
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>

                                {/* Enhanced Blog Content with Larger Fonts */}
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2 leading-tight" style={{ fontSize: '24px', fontWeight: '700', lineHeight: '1.3' }}>
                                        {blog.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-base mb-6 leading-relaxed line-clamp-3" style={{ fontSize: '16px', lineHeight: '1.6' }}>
                                        {blog.excerpt || getExcerpt(blog.content)}
                                    </p>

                                    {/* Enhanced Blog Meta with Larger Fonts */}
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center">
                                            <FaUser className="mr-1.5 text-gray-400" />
                                            <span className="font-medium text-base">{blog.author || 'Autopulse Team'}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaCalendar className="mr-1.5 text-gray-400" />
                                            <span className="font-medium text-base">{formatDate(blog.date || blog.created_at)}</span>
                                        </div>
                                    </div>

                                    {/* Enhanced Read More CTA */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <button className="text-yellow-600 hover:text-yellow-700 font-semibold text-base transition-colors duration-300">
                                            Read More
                                        </button>
                                        <FaArrowRight className="text-yellow-600 group-hover:text-yellow-700 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>

                                {/* Enhanced Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-200 transition-colors duration-300 rounded-xl"></div>
                            </article>
                        ))}
                    </div>
                )}

                {/* Mobile: Show "View All Blogs" button if there are more than 1 blog */}
                {isMobile && blogs.length > 1 && !showAllBlogs && (
                    <div className="text-center mt-8">
                        <Button 
                            type="primary" 
                            size="large"
                            onClick={handleViewAllBlogs}
                            className="px-8 py-2 bg-yellow-600 hover:bg-yellow-700 border-yellow-600 hover:border-yellow-700 mobile-view-all-button"
                            icon={<FaArrowRight />}
                        >
                            View All Blogs
                        </Button>
                    </div>
                )}

                {/* Desktop: Enhanced View All Blogs Button */}
                {!isMobile && (
                    <div className="text-center mt-16">
                        <button 
                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center"
                            onClick={() => window.location.href = '/blogs'}
                        >
                            View All Articles
                            <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                )}

                {/* Enhanced Newsletter Subscription */}
                <div className="mt-20 bg-gradient-to-r from-yellow-50 to-orange-50 p-8 md:p-12 rounded-2xl text-center border border-yellow-200">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Stay Updated</h3>
                    <p className="text-gray-600 mb-8 text-lg">Subscribe to our newsletter for the latest industry insights and updates</p>
                    <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-base"
                        />
                        <button className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 text-base">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogPreview; 