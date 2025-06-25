import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Input, Button, Form, Row, Col, Flex } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import Confirm from '@/Components/Popover';
import { GrTrash } from 'react-icons/gr';
import { PageContext } from '../context/PageContext';
import Slider from '@/Homepage/Components/Slider';
import UploadImage from '@/Components/UploadImage';

const { Panel } = Collapse;

const AboutSettings = () => {

    const { state, methods, dispatch } = useContext(PageContext);
    const [slides, setslides] = useState([]);
    const [saving, setSaving] = useState(false)
    const [selectedImage, setSelectedImage] = useState(false)


    let isObject = (value) => {

        let result = typeof value === 'object'
        return result

    };


    async function fetchslides() {

        setSaving(true);

        let slides = await methods.loadSlides('about_slider');
        if (slides) { setSaving(false); setslides(slides); }

    }

    useEffect(() => {

        fetchslides();

    }, []);


    const addslide = () => {

        setslides([...slides, {
            image: '', url: '', view_type: 'about_slider'
        }]);

    };

    useEffect(() => {

    }, [selectedImage])

    const handleInputChange = (index, field, value) => {
        const newslides = [...slides];
        newslides[index][field] = value;
        setslides(newslides);

        console.log(field, value)
    };

    const saveSlides = () => {
        methods?.saveSlides(slides);
    };

    const deleteSlides = (index) => {
        const newslides = slides.filter((_, i) => i !== index);
        setslides(newslides);
    };

    const genExtra = (index, slide) => (
        <div>
            <Confirm onConfirm={(e) => {
                methods.deleteSlides(slide.id)
                    .then(() => {
                        deleteSlides(index);
                    })
                    .catch((error) => {
                        console.error('Error deleting slide:', error);
                    });
            }} description={'Are you sure you want to delete?'}>
                <GrTrash className="h-4 w-4" />
            </Confirm>
        </div>
    );

    return (
        <div className='p-3 bg-white my-10'>

            <div className="text-center mb-3">
                <h2 className="text-primary text-left text-2xl font-semibold">About Us Settings</h2>
            </div>            <Collapse accordion>
                {slides && slides?.map((slide, index) => (
                    <Panel header={`About Slide ${index + 1}`} key={index} extra={genExtra(index, slide)}>
                        <Form layout="vertical">
                            <Flex gap={10}  >
                                <Form.Item className='' label="Slide Image">
                                    <UploadImage
                                        defaultValue={slide?.id && !isObject(slide?.image) ? slide?.image?.replace('public', '/storage') : ''}
                                        setSelectedFile={(file) => {
                                            handleInputChange(index, 'image', file?.originFileObj)
                                        }} />
                                </Form.Item>
                                <Form.Item className='w-1/2' label="Slide URL">
                                    <Input
                                        value={slide?.url}
                                        onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                                    />
                                </Form.Item>
                            </Flex>
                        </Form>
                    </Panel>
                ))}
            </Collapse>
            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col>
                    <Button type="dashed" icon={<PlusOutlined />} onClick={addslide}>
                        Add New
                    </Button>
                </Col>
                <Col>
                    <Button disabled={saving} type="primary" icon={<SaveOutlined />} onClick={saveSlides}>
                        {saving ? 'Saving Slides...' : 'Save All Slides'}
                    </Button>
                </Col>
            </Row>


            <div className="text-center mb-3">
                <h2 className="text-primary text-left text-2xl font-semibold">Slides Preview</h2>
            </div>            <Slider slides={slides} />

        </div>
    );
};

export default AboutSettings

