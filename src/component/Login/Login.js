import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import useToken from '../../hooks/useToken';
import banner from '../../assets/banner.png'
import toast from 'react-hot-toast';

const Login = () => {
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [signUpError, setSignUpError] = useState('')
    const navigate = useNavigate();
    const [token] = useToken(createdUserEmail);
  const {
    register,
    handleSubmit,
    formState: { errors },
    } = useForm();
    
    if (token) {
        navigate('/')
    }

    // const onSubmit = (data) => console.log(data);
    
    const handleLogIn = data => {
        const { email, password } = data;
        console.log(email, password);
        setSignUpError('');
        const user = {
            "email": email,
            "password": password

            // "email":"abc@example.com",
            // "password": "SuperSecretPassword"
        };
        fetch(`https://test.nexisltd.com/login`, {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                console.log('save user', result);
                setCreatedUserEmail(email);
            })
            toast.success('Login Successfully!')
    }

    return (
        <div className="hero w-full">
        <div className="hero-content flex-col lg:flex-row">
          <img alt="" src={banner} className="w-full md:w-1/2 rounded-lg shadow-2xl h-[400px]" />
          <form onSubmit={handleSubmit(handleLogIn)} className="card flex-shrink-0 w-full md:w-1/2 shadow-2xl bg-base-100">
            <div className="card-body">
            <h2 className="text-3xl">Log in Form</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email Address: </span>
                </label>
                <input
                {...register("email", { required: "Email is required" })}
                aria-invalid={errors.email ? "true" : "false"}
                  type="email"
                  placeholder="Write Email Address"
                  className="input input-bordered"
                />
                {errors.email && <p role="alert" className="text-red-500 font-bold">{errors.email?.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter your password: </span>
                </label>
                <input
                {...register("password", 
                    {
                        required: "password is required",
                        minLength: { value: 8, message: 'Password must be 8 characters or longer' }
                    })}
                aria-invalid={errors.email ? "true" : "false"}
                  type="password"
                  placeholder="Write Password"
                  className="input input-bordered"
                />
                {errors.password && <p role="alert" className="text-red-500 font-bold">{errors.password?.message}</p>}
                {signUpError && <p className='text-red-500'>{signUpError}</p>}
              </div>
              <div className="">
              Don’t have an account? 
                    <Link to="/register" className="label-text-alt link link-hover text-green-500 font-bold pl-2">
                    SIGNUP HERE!
                  </Link>
              </div>
              <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit"/>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
};

export default Login;