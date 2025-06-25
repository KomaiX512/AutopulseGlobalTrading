import MyEditor from '@/Homepage/Components/DrafEditor'
import { Button } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { GrSave } from 'react-icons/gr';
import { PageContext } from '../context/PageContext';

function AboutUs() {


    const { state, methods, dispatch } = useContext(PageContext)

    const [description, setDescription] = useState('');
    const [loadingState, setLoadingState] = useState(false);


    const saveContactUsText = () => {

        let formValues = new FormData();
        formValues.append('about_us_html', description)
        methods.saveAboutText({ formValues, setLoadingState })
        console.log('methods', methods)

    }


    useEffect(() => {

        methods.loadHomeSettings();

    }, []);

    useEffect(() => {

        setDescription(state?.home_settings?.about_us_html)
    }, [state?.home_settings]);


    return (
        <div className='p-3 bg-white'>


            <div className="text-center mb-3">
                <h2 className="text-primary text-left text-2xl font-semibold">About Us Settings</h2>
            </div>
            <MyEditor
                name={'description'}
                defaultValue={description}
                onChange={(value) => setDescription(value)}
            />

            <Button
                onClick={saveContactUsText}
                className='ml-auto mt-2'
                icon={<GrSave />}
            >
                Save
            </Button>

        </div>
    )
}

export default AboutUs
