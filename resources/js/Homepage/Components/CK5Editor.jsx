import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Ck5Editor = ({ name, defaultValue = '', onChange }) => {
    const [editorData, setEditorData] = useState();

    useEffect(() => {
        setEditorData(defaultValue);
    }, [defaultValue]);

    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader);
        };
    }

    class MyUploadAdapter {
        constructor(loader) {
            this.loader = loader;
        }

        async upload() {
            const file = await this.loader.file;

            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);

                const tokenEl = document?.querySelector('meta[name="csrf-token"]');
                const csrfToken = tokenEl?.getAttribute('content');

                fetch('/api/upload/file', {
                    method: 'POST',
                    headers: {
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        resolve({ default: data.url });
                    })
                    .catch(reject);
            });
        }
    }

    return (
        <div className="ck-editor-container">
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                    toolbar: {
                        items: [
                            'heading',
                            '|',
                            'fontSize',
                            'fontFamily',
                            'fontColor',
                            'fontBackgroundColor',
                            '|',
                            'bold',
                            'italic',
                            'underline',
                            'strikethrough',
                            '|',
                            'alignment',
                            '|',
                            'numberedList',
                            'bulletedList',
                            '|',
                            'indent',
                            'outdent',
                            '|',
                            'link',
                            'blockQuote',
                            'insertTable',
                            'mediaEmbed',
                            '|',
                            'undo',
                            'redo'
                        ]
                    },
                    fontSize: {
                        options: [
                            8,
                            10,
                            12,
                            14,
                            'default',
                            18,
                            20,
                            22,
                            24,
                            26,
                            28,
                            30,
                            32,
                            34,
                            36,
                            40,
                            44,
                            48,
                            52,
                            56,
                            60,
                            64,
                            68,
                            72,
                            76,
                            80
                        ]
                    },
                    fontFamily: {
                        options: [
                            'default',
                            'Arial, Helvetica, sans-serif',
                            'Courier New, Courier, monospace',
                            'Georgia, serif',
                            'Lucida Sans Unicode, Lucida Grande, sans-serif',
                            'Tahoma, Geneva, sans-serif',
                            'Times New Roman, Times, serif',
                            'Trebuchet MS, Helvetica, sans-serif',
                            'Verdana, Geneva, sans-serif',
                            'Poppins, sans-serif',
                            'Roboto, sans-serif',
                            'Open Sans, sans-serif',
                            'Lato, sans-serif',
                            'Montserrat, sans-serif'
                        ]
                    },
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                        ]
                    },
                    table: {
                        contentToolbar: [
                            'tableColumn',
                            'tableRow',
                            'mergeTableCells',
                            'tableProperties',
                            'tableCellProperties'
                        ]
                    },
                    image: {
                        resizeOptions: [
                            {
                                name: 'imageResize:original',
                                value: null,
                                label: 'Original'
                            },
                            {
                                name: 'imageResize:25',
                                value: '25',
                                label: '25%'
                            },
                            {
                                name: 'imageResize:50',
                                value: '50',
                                label: '50%'
                            },
                            {
                                name: 'imageResize:75',
                                value: '75',
                                label: '75%'
                            },
                            {
                                name: 'imageResize:100',
                                value: '100',
                                label: '100%'
                            }
                        ],
                        resizeUnit: '%',
                        styles: [
                            'alignLeft',
                            'alignCenter',
                            'alignRight'
                        ],
                        toolbar: [
                            'imageStyle:alignLeft',
                            'imageStyle:alignCenter',
                            'imageStyle:alignRight',
                            '|',
                            'imageResize',
                            '|',
                            'linkImage'
                        ]
                    },
                    mediaEmbed: {
                        previewsInData: true,
                        providers: [
                            {
                                name: 'youtube',
                                url: [
                                    /^(?:m\.)?youtube\.com\/watch\?v=([\w-]+)/,
                                    /^(?:m\.)?youtube\.com\/v\/([\w-]+)/,
                                    /^youtube\.com\/embed\/([\w-]+)/,
                                    /^youtu\.be\/([\w-]+)/
                                ],
                                html: match => {
                                    const id = match[1];
                                    return (
                                        '<div class="video-embed">' +
                                        '<iframe src="https://www.youtube.com/embed/' + id + '" ' +
                                        'width="560" height="315" frameborder="0" allowfullscreen="true">' +
                                        '</iframe>' +
                                        '</div>'
                                    );
                                }
                            },
                            {
                                name: 'vimeo',
                                url: [
                                    /^vimeo\.com\/(\d+)/,
                                    /^vimeo\.com\/video\/(\d+)/,
                                    /^vimeo\.com\/groups\/[\w-]+\/videos\/(\d+)/,
                                    /^vimeo\.com\/channels\/[\w-]+\/(\d+)/
                                ],
                                html: match => {
                                    const id = match[1];
                                    return (
                                        '<div class="video-embed">' +
                                        '<iframe src="https://player.vimeo.com/video/' + id + '" ' +
                                        'width="560" height="315" frameborder="0" allowfullscreen="true">' +
                                        '</iframe>' +
                                        '</div>'
                                    );
                                }
                            }
                        ]
                    }
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                    onChange(data);
                }}
            />
            <textarea hidden name={name} value={editorData} />
            <style jsx>{`
                .ck-editor-container .ck-editor__editable {
                    min-height: 300px;
                    max-height: 600px;
                    overflow-y: auto;
                }
                .ck-editor-container .ck-editor__editable img {
                    max-width: 100%;
                    height: auto;
                    display: block;
                    margin: 10px auto;
                }
                .ck-editor-container .ck-editor__editable h1,
                .ck-editor-container .ck-editor__editable h2,
                .ck-editor-container .ck-editor__editable h3,
                .ck-editor-container .ck-editor__editable h4,
                .ck-editor-container .ck-editor__editable h5,
                .ck-editor-container .ck-editor__editable h6 {
                    margin-top: 1.5em;
                    margin-bottom: 0.5em;
                    font-weight: 600;
                    line-height: 1.2;
                }
                .ck-editor-container .ck-editor__editable p {
                    margin-bottom: 1em;
                    line-height: 1.6;
                }
                .ck-editor-container .ck-editor__editable blockquote {
                    border-left: 4px solid #e5e7eb;
                    padding-left: 1em;
                    margin: 1em 0;
                    font-style: italic;
                    color: #6b7280;
                }
                .ck-editor-container .ck-editor__editable table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1em 0;
                }
                .ck-editor-container .ck-editor__editable table td,
                .ck-editor-container .ck-editor__editable table th {
                    border: 1px solid #d1d5db;
                    padding: 8px 12px;
                }
                .ck-editor-container .ck-editor__editable table th {
                    background-color: #f9fafb;
                    font-weight: 600;
                }
            `}</style>
        </div>
    );
};

export default Ck5Editor;
