import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Input, Button, Rate, DatePicker, Select, Form, Row, Col, Flex } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import MyEditor from '@/Homepage/Components/DrafEditor';
import Confirm from '@/Components/Popover';
import { GrTrash } from 'react-icons/gr';
import { PageContext } from '../context/PageContext';
import UploadImage from '@/Components/UploadImage';
import Ck5Editor from '@/Homepage/Components/CK5Editor';

const { Panel } = Collapse;

const BlogForm = () => {

    const { state, methods, dispatch } = useContext(PageContext);
    const [blogs, setBlogs] = useState([]);
    const [selectedImage, setSelectedImage] = useState([]);
    const [saving, setSaving] = useState(false)


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

    }, [])


    const addBlog = () => {

        setBlogs([...blogs, {
            title: '', content: '', image: '',
        }]);

    };

    const handleInputChange = (index, field, value) => {
        const newBlogs = [...blogs];
        newBlogs[index][field] = value;
        setBlogs(newBlogs);

    };

    const saveBlogs = () => {

        methods.saveBlogs(blogs);
        dispatch({ payload: { loading: false } })
        fetchBlogs()

    };

    const deleteBlog = (index) => {
        const newBlogs = blogs.filter((_, i) => i !== index);
        setBlogs(newBlogs);
    };

    const genExtra = (index, blog) => (
        <div onClick={() => {


        }}>

            <Confirm

                title='Are you sure, you want to delte this blog?'

                onConfirm={() => {

                    methods.deleteBlog(blog.id);
                    deleteBlog(index);

                }}>

                <GrTrash className="h-4 w-4" />

            </Confirm>
        </div>
    );

    return (
        <div className='p-3 bg-white'>
            <div className="text-center mb-3">
                <h2 className="text-primary text-left text-2xl font-semibold">All Blogs</h2>
            </div>
            <Collapse accordion>
                {blogs?.map((blog, index) => (
                    <Panel header={`Blog.${index + 1} ${blog.title}`} key={index} extra={genExtra(index, blog)}>
                        <Form layout="vertical">
                            <Flex gap={10} align='center w-full'>
                                <UploadImage
                                    defaultValue={blog?.id && !isObject(blog?.image) && typeof blog?.image === 'string' ? blog?.image?.replace('public', '/storage') : ''}
                                    setSelectedFile={(file) => handleInputChange(index, 'image', file?.originFileObj)}
                                />
                                <Form.Item className='w-1/2' label="Blog Title">

                                    <Input
                                        value={blog.title}
                                        onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                    />
                                </Form.Item>
                            </Flex>
                            <Flex gap={10} align='center w-full my-2'>
                                <Form.Item className='w-full' label="Blog Content">
                                    <Ck5Editor name={'content'} defaultValue={blog?.content} onChange={(data) => { handleInputChange(index, 'content', data) }} />
                                </Form.Item>
                            </Flex>
                        </Form>
                    </Panel>
                ))}
            </Collapse>
            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col>
                    <Button type="dashed" icon={<PlusOutlined />} onClick={addBlog}>
                        Add New
                    </Button>
                </Col>
                <Col>
                    <Button type="primary" icon={<SaveOutlined />} onClick={saveBlogs}>
                        {saving ? 'Saving Blogs...' : 'Save All Blogs'}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default BlogForm;
