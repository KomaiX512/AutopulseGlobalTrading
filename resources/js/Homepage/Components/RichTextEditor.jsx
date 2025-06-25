import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './RichTextEditor.css'; // You will need to create this CSS file

export default function RichTextEditor({ field_name, initialValue = '' }) {
    const [content, setContent] = useState(initialValue);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image', 'video'],
                ['clean'],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['fullscreen']
            ],
            handlers: {
                fullscreen: handleFullScreen
            }
        }
    };

    return (
        <div className={`editor-container ${isFullScreen ? 'fullscreen' : ''}`}>
            <ReactQuill
                value={content}
                onChange={setContent}
                modules={modules}
                theme="snow"
            />
            <input hidden name={field_name} value={content} />
        </div>
    );
}

