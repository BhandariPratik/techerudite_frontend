'use client'
import Joi from "joi";
import axios from "axios";
import React, { useState } from "react";
import Link from "next/link";

const User = (() => {

    const [userData, setUserData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({});


    const handleOnChange = ((event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    })

    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email({ tlds: { allow: false } }).required().messages({
            'string.email': 'Enter a valid email'
        }),
        password: Joi.string().min(6).required()
    });

    const validate = () => {
        const { error } = schema.validate(userData, { abortEarly: false });
        if (!error) return null;
        const newErrors = {};
        error.details.forEach(item => {
            newErrors[item.path[0]] = item.message;
        });
        return newErrors;
    };

    const handleOnClick = (async () => {
        const validationErrors = validate();
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            let payload = { ...userData, user_type: 'user' }
            const response = await axios.post(`http://localhost:4000/api/v1/register`, payload);
            console.log('response', response)
            alert(response.data.message)
            setUserData({...userData,first_name:'',last_name:"",email:"",password:""})
        } catch (error) {
            console.error('There was an error registering the user:', error);
        }
    })

    return (
        <>
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <div className="flex justify-center px-5">
                    <p className="text-center text-2xl text-gray-700 font-extrabold px-5">User Registration</p>
                </div>
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
                    <form className="space-y-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="first_name">
                                First Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="first_name"
                                type="text"
                                placeholder="First Name"
                                onChange={(event) => { handleOnChange(event) }}
                                value={userData.first_name}
                            />
                             {errors.first_name && <p className="text-red-500 text-xs italic">{errors.first_name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="last_name">
                                Last Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="last_name"
                                type="text"
                                placeholder="Last Name"
                                onChange={(event) => { handleOnChange(event) }}
                                value={userData.last_name}

                            />
                             {errors.last_name && <p className="text-red-500 text-xs italic">{errors.last_name}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                name="email"
                                type="email"
                                placeholder="Email"
                                onChange={(event) => { handleOnChange(event) }}
                                value={userData.email}
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
                                onChange={(event) => { handleOnChange(event) }}
                                value={userData.password}
                            />
                             {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button" onClick={() => { handleOnClick() }}
                            >
                                Register
                            </button>

                            <u><Link href={'/'} className="text-blue-700 float-end mt-5">Main screen</Link></u> 

                        </div>
                    </form>
                </div>
            </div>

        </>
    )
})

export default User;
