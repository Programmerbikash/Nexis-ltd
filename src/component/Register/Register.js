import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import banner from '../../assets/banner.png'
import useToken from "../../hooks/useToken";

const Register = () => {
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
    
    const handleSignUp = data => {
        const { firstName, lastName, number, email, password } = data;
        console.log(firstName, lastName, number, email, password);
        setSignUpError('');
        const user = {
            "first_name": firstName,
            "last_Name": lastName,
            "phone_number": number,
            "email": email,
            "password": password
        };
        fetch(`https://test.nexisltd.com/signup`, {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(result => {
                console.log('save user', result);
                toast.success('User Created Successfully!')
                setCreatedUserEmail(email);
        }) 
    }

  return (
      <div className="hero w-full">
        <div className="hero-content flex-col lg:flex-row">
          <img alt="" src={banner} className="w-full md:w-1/2 h-[678px] rounded-lg shadow-2xl" />
          <form onSubmit={handleSubmit(handleSignUp)} className="card flex-shrink-0 w-full md:w-1/2 shadow-2xl bg-base-100">
            <div className="card-body">
            <h2 className="text-3xl">SignUp Form</h2>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">First Name: </span>
                </label>
                <input
                {...register("firstName", { required: "first is required" })}
                aria-invalid={errors.firstName ? "true" : "false"}
                  type="text"
                  placeholder="Write First Name"
                  className="input input-bordered"
                />
                {errors.firstName && <p role="alert" className="text-red-500 font-bold">{errors.firstName?.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Last Name: </span>
                </label>
                <input
                {...register("lastName", { required: "Last is required" })}
                aria-invalid={errors.lastName ? "true" : "false"}
                  type="text"
                  placeholder="Write Last Name"
                  className="input input-bordered"
                />
                {errors.lastName && <p role="alert" className="text-red-500 font-bold">{errors.lastName?.message}</p>}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number: </span>
                </label>
                <input
                {...register("number", { required: "Number is required" })}
                aria-invalid={errors.number ? "true" : "false"}
                  type="text"
                  placeholder="+880-XXXXXXXXXX"
                  className="input input-bordered"
                />
                {errors.number && <p role="alert" className="text-red-500 font-bold">{errors.number?.message}</p>}
              </div>
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
              Already have an account? 
                    <Link to="/login" className="label-text-alt link link-hover text-green-500 font-bold pl-2">
                              LOGIN HERE!
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

export default Register;
