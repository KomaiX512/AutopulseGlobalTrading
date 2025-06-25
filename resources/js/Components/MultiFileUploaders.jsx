import React, { useState, useCallback } from 'react';
import { Upload, Button, Modal, message, Flex, Tag, Image } from 'antd';
import { PlusOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useDropzone } from 'react-dropzone';
import Confirm from './Popover';
const MultiFileUploaders = ({ defaultImages = [], onSave, onDelete }) => {


    const [fileList, setFileList] = useState(defaultImages);

    const handleRemove = file => {
        setFileList(fileList.filter(item => item.uid !== file.uid));
        if (file.id) {
            onDelete(file.id);
        }
    };

    const onDrop = useCallback(acceptedFiles => {
        const newFiles = acceptedFiles?.map(file => ({
            uid: file.uid || URL.createObjectURL(file),
            name: file.name,
            status: 'done',
            url: URL.createObjectURL(file),
            file: file
        }));

        setFileList([...fileList, ...newFiles]);

    }, [fileList]);

    const saveFiles = () => {
        onSave(fileList);
        message.success('Images saved successfully!');
    };
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
    });

    return (
        <div>
            <Flex align='center' justify='center'
                {...getRootProps()}
                style={{
                    border: '2px dashed #d9d9d9',
                    padding: '20px',
                    textAlign: 'center',
                    backgroundColor: isDragActive ? '#f0f0f0' : '#fff',
                    height: "300px"
                }}
            >
                <input {...getInputProps()} />
                <Flex className='flex-col' style={{ flexDirection: "column" }} gap={3} align='center'>
                    <p className="ant-upload-drag-icon">
                        <Button className=''>
                            Select
                        </Button>
                    </p>
                    <p className="ant-upload-text">Drag and drop images here or click to select</p>
                </Flex>
            </Flex>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
                {fileList?.map((file, index) => (
                    <div className='border' key={index} style={{ position: 'relative', display: 'inline-block', maxWidth: '300px' }}>
                        <Image loading='lazy' src={file.url} alt={file.name} style={{ width: '100%', height: 'auto' }} />
                        <div className='px-3 ' style={{ position: 'absolute', top: '5px', right: '5px', display: 'flex', justifyContent: 'space-between', width: "100%", gap: '5px' }}>
                            {file.id ?
                                <Tag color='green'>
                                    Saved
                                </Tag>
                                :
                                <Tag color='red'>
                                    Unsaved
                                </Tag>}
                            <Flex gap={3} align='center'>
                                <Confirm onConfirm={() => handleRemove(file)} description={'Are you sure you want to delete ?'}>
                                    <Button icon={<DeleteOutlined />} />
                                </Confirm>
                            </Flex>
                        </div>
                    </div>
                ))}
            </div>

            <Button className='' onClick={saveFiles} style={{ marginTop: '20px' }}>
                Save Images
            </Button>
        </div>
    );
};

export default MultiFileUploaders;
