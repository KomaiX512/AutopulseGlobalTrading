import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Input, Button, Form, Row, Col } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import Confirm from '@/Components/Popover';
import { GrTrash } from 'react-icons/gr';
import { PageContext } from '../context/PageContext';
import Slider from '@/Homepage/Components/Slider';
import UploadImage from '@/Components/UploadImage';

const { Panel } = Collapse;
const { TextArea } = Input;

const HomeSettings = () => {
    const { state, methods, dispatch } = useContext(PageContext);
    const [slides, setSlides] = useState([]);
    const [saving, setSaving] = useState(false);

    const isObject = (value) => typeof value === 'object' && value !== null;

    async function fetchSlides() {
        setSaving(true);
        let slides = await methods.loadSlides('home_slider');
        if (slides) {
            // Process slides to extract metadata
            const processedSlides = slides.map(slide => {
                let metadata = {};
                try {
                    if (slide.metadata) {
                        metadata = JSON.parse(slide.metadata);
                    }
                } catch (e) {
                    console.error('Error parsing metadata:', e);
                }
                
                return {
                    ...slide,
                    title: metadata.title || slide.title || '',
                    subtitle: metadata.subtitle || slide.subtitle || '',
                    description: metadata.description || slide.description || ''
                };
            });
            setSaving(false);
            setSlides(processedSlides);
        }
    }

    useEffect(() => {
        fetchSlides();
    }, []);

    const addSlide = () => {
        setSlides([
            ...slides,
            { 
                id: null, 
                image: {}, 
                url: '', 
                title: '',
                subtitle: '',
                description: '',
                view_type: 'home_slider' 
            },
        ]);
    };

    const handleInputChange = (index, field, value) => {
        const newSlides = [...slides];
        newSlides[index][field] = value;
        setSlides(newSlides);
    };

    const saveSlides = () => {
        methods?.saveSlides(slides);
    };

    const deleteSlide = (index) => {
        const newSlides = slides.filter((_, i) => i !== index);
        setSlides(newSlides);
    };

    const genExtra = (index, slide) => (
        <div>
            <Confirm
                onConfirm={() => {
                    methods.deleteSlides(slide.id).then(() => {
                        deleteSlide(index);
                    }).catch((error) => {
                        console.error('Error deleting slide:', error);
                    });
                }}
                description="Are you sure you want to delete?"
            >
                <GrTrash className="h-4 w-4" />
            </Confirm>
        </div>
    );

    return (
        <div className="p-3 bg-white">
            <div className="text-center mb-3">
                <h2 className="text-primary text-left text-2xl font-semibold">Homepage Slider</h2>
            </div>
            <Collapse accordion>
                {slides && slides?.map((slide, index) => (
                    <Panel header={`Slide ${index + 1}`} key={index} extra={genExtra(index, slide)}>
                        <Form layout="vertical">
                            <Form.Item className='' label="Slide Image">
                                <UploadImage
                                    defaultValue={slide?.id && !isObject(slide?.image) && typeof slide?.image === 'string' ? slide?.image?.replace('public', '/storage') : ''}
                                    setSelectedFile={(file) => handleInputChange(index, 'image', file?.originFileObj)}
                                />
                            </Form.Item>
                            <Form.Item className='w-1/2' label="Slide URL">
                                <Input
                                    value={slide?.url}
                                    onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                                    placeholder="Enter URL for this slide"
                                />
                            </Form.Item>
                            <Form.Item label="Title">
                                <Input
                                    value={slide?.title}
                                    onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                    placeholder="Enter slide title"
                                />
                            </Form.Item>
                            <Form.Item label="Subtitle">
                                <Input
                                    value={slide?.subtitle}
                                    onChange={(e) => handleInputChange(index, 'subtitle', e.target.value)}
                                    placeholder="Enter slide subtitle"
                                />
                            </Form.Item>
                            <Form.Item label="Description">
                                <TextArea
                                    value={slide?.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    placeholder="Enter slide description"
                                    rows={4}
                                />
                            </Form.Item>
                        </Form>
                    </Panel>
                ))}
            </Collapse>
            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col>
                    <Button type="dashed" icon={<PlusOutlined />} onClick={addSlide}>
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
            </div>
            <Slider slides={slides} />
        </div>
    );
};

export default HomeSettings;
