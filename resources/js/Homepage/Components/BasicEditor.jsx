import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function BasicEditor({ name, defaultValue }) {
    
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue]);


    return <>
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={{
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],

                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],

                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],

                    ['clean']


                ],
                clipboard: {
                    matchVisual: false,
                }
            }}
            formats={[
                "header",
                "font",
                "size",
                "bold",
                "italic",
                "underline",
                "align",
                "strike",
                "script",
                "blockquote",
                "background",
                "list",
                "bullet",
                "indent",
                "link",
                "image",
                "color",
                "code-block"
            ]}

        />
        <textarea hidden name={name} cols="30" value={value} rows="10"></textarea>
    </>
}