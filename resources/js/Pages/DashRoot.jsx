
import React from 'react';
import { Provider } from 'react-redux';
import './dashboard.scss';
import App from '@/dashboards/admin/App';
import store from '@/dashboards/admin/store';

export default function Dashboard({ auth, laravelVersion, phpVersion }) {

    if (auth?.user?.email === "admin@autopulse.com")
        return (
            <>
                <Provider store={store}>

                    <App />

                </Provider>
            </>
        );

    return <h4>

        You are unauthorized to access this route.

    </h4>

}
