'use client'
import axios from "axios";
import React, { useState } from "react";
import Joi from 'joi';
import Link from "next/link";

const admin = (() => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});

    const handleOnChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.email': 'Enter a valid email'
        }),
        password: Joi.string().min(6).required()
    });

    const validate = () => {
        const { error } = schema.validate(data, { abortEarly: false });
        if (!error) return null;
        const newErrors = {};
        error.details.forEach(item => {
            newErrors[item.path[0]] = item.message;
        });
        return newErrors;
    };

    const handleOnClick = async () => {
        const validationErrors = validate();
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            const response = await axios.post(`http://localhost:4000/api/v1/login`, {...data,'user_type':'admin'});
            alert(response.data.message);
            setUserData({...data,email:"",password:""})
        } catch (error) {
            console.error('There was an error registering the user:', error);
        }
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="flex justify-center px-5">
                    <p className="text-center text-2xl text-gray-700 font-extrabold px-5">Admin Login</p>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                    <form className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={handleOnChange}
                                value={data.email}
                            />
                            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="password"
                                type="password"
                                placeholder="Password"
                                onChange={handleOnChange}
                                value={data.password}
                            />
                            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        </div>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={handleOnClick}
                        >
                            Login
                        </button>

                       <u><Link href={'/'} className="text-blue-700 float-end mt-5">Main screen</Link></u> 
                    </form>
                </div>
            </div>
        </>
    );
});

export default admin;
