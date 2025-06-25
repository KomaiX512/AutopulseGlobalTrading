import 'react-quill/dist/quill.snow.css';
import 'quill-table-ui/dist/index.css'; // Import Table UI styles
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import Quill from 'quill';
import QuillTable from 'quill-table-ui';

// Register the table module with Quill
Quill.register('modules/table', QuillTable);

const MyEditor = ({ name, placeholder, defaultValue, onChange = () => { } }) => {
    const [editorHtml, setEditorHtml] = useState(defaultValue || '');
    const [theme, setTheme] = useState('snow');

    const handleChange = (html) => {
        setEditorHtml(html);
        onChange(html);
    };

    const handleThemeChange = (newTheme) => {
        setTheme(newTheme === 'core' ? null : newTheme);
    };

    useEffect(() => {
        setEditorHtml(defaultValue);
    }, [defaultValue]);

    return (
        <div>
            <ReactQuill
                theme={theme}
                onChange={handleChange}
                value={editorHtml}
                modules={MyEditor.modules}
                formats={MyEditor.formats}
                bounds={'.app'}
                placeholder={placeholder}
            />

            <textarea hidden name={name} value={editorHtml} id="" cols="30" rows="10"></textarea>
        </div>
    );
};

MyEditor.modules = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['table'] // Add the table button to the toolbar
    ],
    clipboard: {
        matchVisual: false,
    },
    table: true // Enable the table module
};

MyEditor.formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'code-block',
    'table' // Add table format support
];

MyEditor.propTypes = {
    placeholder: PropTypes.string,
    defaultValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func
};

export default MyEditor;
