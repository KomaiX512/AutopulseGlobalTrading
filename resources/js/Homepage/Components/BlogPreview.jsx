import React, { useContext, useEffect, useState } from 'react';
import { HomeContext } from '../context/HomeContext';
import { FaCalendar, FaUser, FaArrowRight, FaClock } from 'react-icons/fa';

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
    const [blogs, setBlogs] = useState(defaultBlogs);
    const [loading, setLoading] = useState(false);

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

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Latest from Our Blog
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Stay updated with the latest news, insights, and tips from the heavy machinery industry
                    </p>
                </div>

                {loading ? (
                    // Loading Skeleton
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="bg-white border border-gray-200 shadow-lg overflow-hidden">
                                <div className="h-48 bg-gray-200 animate-pulse"></div>
                                <div className="p-6">
                                    <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
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
                        {blogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="group bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden cursor-pointer"
                                onClick={() => window.location.href = `/blogs/${blog.slug}`}
                            >
                                {/* Blog Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url(${blog.image?.includes('public') ? blog.image.replace('public', '/storage') : blog.image})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center'
                                        }}
                                    >
                                        {/* Fallback gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-600 opacity-80"></div>
                                    </div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1">
                                        <span className="text-xs font-semibold text-gray-700">
                                            {blog.category}
                                        </span>
                                    </div>

                                    {/* Read Time Badge */}
                                    <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 flex items-center">
                                        <FaClock className="text-xs mr-1" />
                                        <span className="text-xs">{blog.readTime}</span>
                                    </div>
                                </div>

                                {/* Blog Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-yellow-600 transition-colors duration-300 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                    
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    {/* Blog Meta */}
                                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                                        <div className="flex items-center">
                                            <FaUser className="mr-1" />
                                            <span>{blog.author}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <FaCalendar className="mr-1" />
                                            <span>{formatDate(blog.date)}</span>
                                        </div>
                                    </div>

                                    {/* Read More CTA */}
                                    <div className="flex items-center justify-between">
                                        <button className="text-yellow-600 hover:text-yellow-700 font-medium text-sm transition-colors duration-300">
                                            Read More
                                        </button>
                                        <FaArrowRight className="text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all duration-300" />
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-yellow-200 transition-colors duration-300"></div>
                            </article>
                        ))}
                    </div>
                )}

                {/* View All Blogs Button */}
                <div className="text-center mt-12">
                    <button 
                        className="primary-btn py-4 px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => window.location.href = '/blogs'}
                    >
                        View All Articles
                    </button>
                </div>

                {/* Newsletter Subscription */}
                <div className="mt-16 bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 text-center">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h3>
                    <p className="text-gray-600 mb-6">Subscribe to our newsletter for the latest industry insights and updates</p>
                    <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        />
                        <button className="primary-btn font-semibold px-6 py-3 transition-colors duration-300">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BlogPreview; 