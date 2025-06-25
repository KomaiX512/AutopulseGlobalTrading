import React, { useContext, useEffect, useState } from 'react';
import { Collapse, Input, Button, Rate, DatePicker, Select, Form, Row, Col, Flex } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';
import MyEditor from '@/Homepage/Components/DrafEditor';
import Confirm from '@/Components/Popover';
import { GrTrash } from 'react-icons/gr';
import { PageContext } from '../context/PageContext';

const { Panel } = Collapse;

const FAQForm = () => {

    const { state, methods, dispatch } = useContext(PageContext);
    const [Faqs, setFaqs] = useState([]);
    const [saving, setSaving] = useState(false)


    async function fetchFaqs() {

        setSaving(true);
        let Faqs = await methods.loadFaqs();
        if (Faqs) { setFaqs(Faqs); }
        setSaving(false);


    }

    useEffect(() => {

        fetchFaqs();

    }, [])


    const addReview = () => {

        setFaqs([...Faqs, {
            question: '', answer: '', description: '',
        }]);

    };

    const handleInputChange = (index, field, value) => {
        const newFaqs = [...Faqs];
        newFaqs[index][field] = value;
        setFaqs(newFaqs);
    };

    const saveFaqs = () => {

        methods.saveFaqs(Faqs);
        dispatch({ payload: { loading: false } })
        fetchFaqs()

    };

    const deleteFAQ = (index) => {
        const newFaqs = Faqs.filter((_, i) => i !== index);
        setFaqs(newFaqs);
    };

    const genExtra = (index, faq) => (
        <div>
            <Confirm onConfirm={(e) => {
                methods.deleteFaqs(faq.id)
                    .then(() => {
                        console.log('FAQ deleted from server');
                        deleteFAQ(index);
                    })
                    .catch((error) => {
                        console.error('Error deleting faq:', error);
                    });
            }} description={'Are you sure you want to delete?'}>
                <GrTrash className="h-4 w-4" />
            </Confirm>
        </div>
    );

    return (
        <div className='p-3 bg-white'>
            <div className="text-center mb-3">
                <h2 className="text-primary text-left text-2xl font-semibold">User Faqs</h2>
            </div>
            <Collapse accordion>
                {Faqs?.map((faq, index) => (
                    <Panel header={`FAQ ${index + 1}`} key={index} extra={genExtra(index, faq)}>
                        <Form layout="vertical">
                            <Flex gap={10} align='center w-full'>
                                <Form.Item className='w-1/2' label="Question">
                                    <Input
                                        value={faq.question}
                                        onChange={(e) => handleInputChange(index, 'question', e.target.value)}
                                    />
                                </Form.Item>
                            </Flex>
                            <Flex gap={10} align='center w-full'>
                                <Form.Item className='w-full' label="Answer">
                                    <MyEditor defaultValue={faq?.answer ?? 'Write answer here...'} onChange={(value) => handleInputChange(index, 'answer', value)} />
                                </Form.Item>
                            </Flex>

                        </Form>
                    </Panel>
                ))}
            </Collapse>
            <Row gutter={16} style={{ marginTop: '20px' }}>
                <Col>
                    <Button type="dashed" icon={<PlusOutlined />} onClick={addReview}>
                        Add New
                    </Button>
                </Col>
                <Col>
                    <Button disabled={saving} type="primary" icon={<SaveOutlined />} onClick={saveFaqs}>
                        {saving ? 'Saving Faqs...' : 'Save All Faqs'}
                    </Button>
                </Col>
            </Row>
        </div>
    );
};

export default FAQForm;
