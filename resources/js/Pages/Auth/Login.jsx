import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

import '../../Homepage/style.scss'
import { Button } from 'antd';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        // < >

        <div className="login-section container b-white p-3 flex  lg:flex-flexh-screen" style={{ background: "rgb(254, 248, 245)" }}>
            <Head title="Log in" />

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <div className=" col-left lg:flex-1  lg:flex  items-center justify-center bg-white text-black">

                <img  loading='lazy' className="login-img w-full h-full" src="/images/login.svg" alt="Login" />

            </div>

            <div className=" col-right w-full bg-gray-100 flex  items-center justify-center">
                <div className="max-w-md w-full p-6">
                    <h1 className="text-3xl font-semibold mb-6 text-black text-center">Sign In</h1>
       
                    <form onSubmit={submit}>
                        <div>
                            <InputLabel htmlFor="email" value="Email" />

                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="mt-1 block w-full"
                                autoComplete="username"
                                isFocused={true}
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        <div className="mt-4">
                            <InputLabel htmlFor="password" value="Password" />

                            <TextInput
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="mt-1 block w-full"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />

                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        <div className="block mt-4">
                            <label className="flex  items-center">
                                <Checkbox
                                    className='m-0'
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Remember me</span>
                            </label>
                        </div>

                        <div className="flex  flex-col items-center justify-end">
                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="my-3"
                                >
                                    Forgot your password?
                                </Link>
                            )}

                            <button type='submit' className="btn btn-primary btn-home-primary text-center" disabled={processing}>
                                Log in
                            </button>

                        </div>
                    </form>
                    <div className="mt-4 text-sm text-gray-600 text-center">
                        <p>Don't have an account? <a href="/register" className="text-black hover:underline">Sign Up</a></p>
                    </div>
                </div>
            </div>
        </div>

    );
}
