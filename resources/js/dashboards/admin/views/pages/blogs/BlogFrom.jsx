import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Input, Button, Rate, DatePicker, Select, Form, Row, Col, Flex, Card, Typography, Space, Divider } from 'antd';
import { PlusOutlined, SaveOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import MyEditor from '@/Homepage/Components/DrafEditor';
import Confirm from '@/Components/Popover';
import { GrTrash } from 'react-icons/gr';
import { PageContext } from '../context/PageContext';
import UploadImage from '@/Components/UploadImage';
import Ck5Editor from '@/Homepage/Components/CK5Editor';

const { Panel } = Collapse;
const { Title, Text } = Typography;

const BlogForm = () => {

    const { state, methods, dispatch } = useContext(PageContext);
    const [blogs, setBlogs] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [saving, setSaving] = useState(false);
    const [previewMode, setPreviewMode] = useState({});

    async function fetchBlogs() {
        setSaving(true);
        let blogs = await methods.loadBlogs();

        if (blogs) {
            setBlogs(blogs);
            setSaving(false);
        }
    }

    const isObject = (value) => typeof value === 'object' && value !== null;

    useEffect(() => {
        fetchBlogs();
    }, []);

    const addBlog = () => {
        setBlogs([...blogs, {
            title: '', 
            content: '', 
            image: '',
            excerpt: '',
            category: 'machinery',
            author: 'Autopulse Team',
            readTime: '3 min read'
        }]);
    };

    const handleInputChange = (index, field, value) => {
        const newBlogs = [...blogs];
        newBlogs[index][field] = value;
        setBlogs(newBlogs);
    };

    const saveBlogs = async () => {
        try {
            setSaving(true);
            const result = await methods.saveBlogs(blogs);
            if (result) {
                // Only fetch blogs if save was successful
                await fetchBlogs();
            }
        } catch (error) {
            console.error('Error saving blogs:', error);
        } finally {
            setSaving(false);
        }
    };

    const deleteBlog = (index) => {
        const newBlogs = blogs.filter((_, i) => i !== index);
        setBlogs(newBlogs);
    };

    const handleDeleteBlog = async (index, blog) => {
        try {
            const result = await methods.deleteBlog(blog.id);
            if (result) {
                deleteBlog(index);
            } else {
                // If server delete failed, revert the local state
                await fetchBlogs();
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            // Revert local state on error
            await fetchBlogs();
        }
    };

    const togglePreview = (index) => {
        setPreviewMode(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const getExcerpt = (content, maxLength = 150) => {
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

    const genExtra = (index, blog) => (
        <Space>
            <Button 
                type="text" 
                icon={<EyeOutlined />} 
                onClick={(e) => {
                    e.stopPropagation();
                    togglePreview(index);
                }}
                title="Preview"
            />
            <Confirm
                title='Are you sure, you want to delete this blog?'
                onConfirm={() => handleDeleteBlog(index, blog)}>
                <Button 
                    type="text" 
                    danger 
                    icon={<DeleteOutlined />} 
                    title="Delete"
                />
            </Confirm>
        </Space>
    );

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <Card className="shadow-lg">
                <div className="mb-6">
                    <Title level={2} className="text-gray-800 mb-2">
                        <EditOutlined className="mr-3 text-yellow-600" />
                        Blog Management
                    </Title>
                    <Text type="secondary" className="text-base">
                        Create and manage professional blog articles with rich content and images
                    </Text>
                </div>

                <Collapse accordion className="mb-6">
                    {blogs?.map((blog, index) => (
                        <Panel 
                            header={
                                <div className="flex items-center justify-between w-full">
                                    <div>
                                        <Text strong className="text-lg">
                                            Blog {index + 1}: {blog.title || 'Untitled Blog'}
                                        </Text>
                                        {blog.id && (
                                            <Text type="secondary" className="ml-2">
                                                (ID: {blog.id})
                                            </Text>
                                        )}
                                    </div>
                                </div>
                            } 
                            key={index} 
                            extra={genExtra(index, blog)}
                        >
                            <Form layout="vertical" className="space-y-6">
                                {/* Image and Title Section */}
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Blog Image" className="mb-4">
                                            <UploadImage
                                                defaultValue={blog?.id && !isObject(blog?.image) && typeof blog?.image === 'string' ? blog?.image?.replace('public', '/storage') : ''}
                                                setSelectedFile={(file) => handleInputChange(index, 'image', file?.originFileObj)}
                                                onClear={() => handleInputChange(index, 'image', null)}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Blog Title" className="mb-4">
                                            <Input
                                                value={blog.title}
                                                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                                placeholder="Enter blog title..."
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Category and Author Section */}
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item label="Category">
                                            <Select
                                                value={blog.category || 'machinery'}
                                                onChange={(value) => handleInputChange(index, 'category', value)}
                                                size="large"
                                            >
                                                <Select.Option value="machinery">Machine Knowledge</Select.Option>
                                                <Select.Option value="shipping">Shipping Tips</Select.Option>
                                                <Select.Option value="customer">Customer Stories</Select.Option>
                                                <Select.Option value="industry">Industry News</Select.Option>
                                                <Select.Option value="trading">Global Trading</Select.Option>
                                                <Select.Option value="equipment">Equipment Guide</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Author">
                                            <Input
                                                value={blog.author || 'Autopulse Team'}
                                                onChange={(e) => handleInputChange(index, 'author', e.target.value)}
                                                placeholder="Author name..."
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Read Time">
                                            <Input
                                                value={blog.readTime || getReadTime(blog.content)}
                                                onChange={(e) => handleInputChange(index, 'readTime', e.target.value)}
                                                placeholder="e.g., 5 min read"
                                                size="large"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                {/* Excerpt Section */}
                                <Form.Item label="Blog Excerpt">
                                    <Input.TextArea
                                        value={blog.excerpt || getExcerpt(blog.content)}
                                        onChange={(e) => handleInputChange(index, 'excerpt', e.target.value)}
                                        placeholder="Enter a brief excerpt for the blog..."
                                        rows={3}
                                        showCount
                                        maxLength={200}
                                    />
                                </Form.Item>

                                {/* Content Editor */}
                                <Form.Item label="Blog Content">
                                    <Ck5Editor 
                                        name={'content'} 
                                        defaultValue={blog?.content} 
                                        onChange={(data) => { 
                                            handleInputChange(index, 'content', data);
                                            // Auto-update read time and excerpt
                                            const newReadTime = getReadTime(data);
                                            const newExcerpt = getExcerpt(data);
                                            handleInputChange(index, 'readTime', newReadTime);
                                            if (!blog.excerpt) {
                                                handleInputChange(index, 'excerpt', newExcerpt);
                                            }
                                        }} 
                                    />
                                </Form.Item>

                                {/* Preview Section */}
                                {previewMode[index] && (
                                    <div className="mt-6">
                                        <Divider>Preview</Divider>
                                        <Card className="bg-white">
                                            <div className="max-w-2xl mx-auto">
                                                <div className="mb-6">
                                                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                                                        {blog.title || 'Untitled Blog'}
                                                    </h1>
                                                    <div className="flex items-center text-gray-600 mb-4">
                                                        <span className="mr-4">By {blog.author || 'Autopulse Team'}</span>
                                                        <span>{blog.readTime || getReadTime(blog.content)}</span>
                                                    </div>
                                                    {blog.image && (
                                                        <img 
                                                            src={blog.image?.includes('public') ? blog.image.replace('public', '/storage') : blog.image}
                                                            alt={blog.title}
                                                            className="w-full h-64 object-cover rounded-lg mb-6"
                                                        />
                                                    )}
                                                </div>
                                                <div 
                                                    className="prose prose-lg max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: blog.content }}
                                                />
                                            </div>
                                        </Card>
                                    </div>
                                )}
                            </Form>
                        </Panel>
                    ))}
                </Collapse>

                {/* Action Buttons */}
                <Row gutter={16} className="mt-8">
                    <Col>
                        <Button 
                            type="dashed" 
                            icon={<PlusOutlined />} 
                            onClick={addBlog}
                            size="large"
                            className="border-2 border-dashed border-yellow-400 hover:border-yellow-500"
                        >
                            Add New Blog
                        </Button>
                    </Col>
                    <Col>
                        <Button 
                            type="primary" 
                            icon={<SaveOutlined />} 
                            onClick={saveBlogs}
                            loading={saving}
                            size="large"
                            className="bg-yellow-600 hover:bg-yellow-700 border-yellow-600"
                        >
                            {saving ? 'Saving Blogs...' : 'Save All Blogs'}
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default BlogForm;
