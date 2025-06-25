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
        <div>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    setEditorData(data);
                    onChange(data);
                }}
            />
            <textarea hidden name={name} value={editorData} />
        </div>
    );
};

export default Ck5Editor;
