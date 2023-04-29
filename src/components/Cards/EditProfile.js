import React from "react";
import { Formik } from "formik";
import { useFormik } from 'formik';

import { signIn } from "../../service/user.api";


export default function EditProfile(props) {
    const handleSubmit = async (values) => {
        console.log(values);
        const userdata = await signIn(values);
        console.log(userdata);
        if (userdata.data.code === 200) {
          localStorage.setItem("token", userdata.data.data.token);
          localStorage.setItem("user", JSON.stringify(userdata.data.data));
    
          window.location.replace("http://localhost:3000/admin/dashboard");
        }
      };
    return (
      <>
        
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0 mt-48">
        <div className="rounded-t bg-white mb-0 px-6 py-6 ">
        <div className="text-center flex justify-between ">
        <h6 className="text-blueGray-700 text-xl font-bold">Edit Your Details</h6>
        </div>
        </div>
        </div>
        <Formik
                  initialValues={{ firstName: '',
                  lastName: '', userName:'',email: "",address:"",city:"",country:"",
                  postalCode:"", password: "" }}
                  validate={(values) => {
                    const errors = {};
                    if (!values.email) {
                      errors.email = "*Required";
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.email
                      )
                    ) {
                      errors.email = "Invalid email address";
                    }
                    // if (!values.password) {
                    //   errors.password = "*Required";
                    // }
                    // } else if (
                    //  values.password.length()<8
                    // ) {
                    //   errors.password = 'password must be 8 characters';
                    // }
                    return errors;
                  }}
                  onSubmit={async (values) => {
                    handleSubmit(values);
                    // setTimeout(() => {
                    //   alert(JSON.stringify(values, null, 2));
                    //   setSubmitting(false);
                    // }, 400);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                  }) => (
                    <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                        <form onSubmit={handleSubmit}>
                        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                         User Information
                        </h6>
                        <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                        <label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="firstName">First Name</label>
                        <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                        className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                    </div>
                    </div>
                        <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                        <label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="lastName">Last Name</label>
                       <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                        className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                       /> 
                    </div> 
                    </div>
                    <div className="w-full lg:w-6/12 px-4">
                        <div className="relative w-full mb-3">
                        <label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="userName">User Name</label>
                        <input
                        id="userName"
                        name="userName"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.userName}
                        className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                    </div>
                    </div>
                      <div className="w-full lg:w-6/12 px-4">
                      <div className="relative w-full mb-3">
                      <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      <label className="text">
                        {errors.email && touched.email && errors.email}
                      </label>
                    </div>
                    </div>
                    </div>

                      {/* <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2">
                        Password
                      </label>
                      <input
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        border="1px"
                        borderColor="gray.200"
                        borderRadius="5px"
                      />
                      <label className="text">
                        {errors.password && touched.password && errors.password}
                      </label> */}
                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Contact Information
                    </h6>

                    <div className="flex flex-wrap">
                    <div className="w-full lg:w-12/12 px-4">
                        <div className="relative w-full mb-3">
                        <label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="address">Address</label>
                        <input
                        id="address"
                        name="address"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.address}
                        className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />

                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                        <label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="city">City</label>
                        <input
                        id="city"
                        name="city"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.city}
                        className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />

                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                        <label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="country">Country</label>
                        <input
                        id="country"
                        name="country"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.country}
                        className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />

                        </div>
                    </div>
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative w-full mb-3">
                        <label 
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="postalCode">Postal Code</label>
                        <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.postalCode}
                        className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />

                        </div>
                    </div>
                    </div>

                    <hr className="mt-6 border-b-1 border-blueGray-300" />

                    <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    About Me
                    </h6>
                    <div className="flex flex-wrap">
              <div className="w-full lg:w-12/12 px-4">
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                  >
                    About me
                  </label>
                  <textarea
                    type="text"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue=""
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </div>

                      <br />
                      <button
                        type="submit"
                        disabled={!values.email || !values.password}
                        className="bg-blueGray-800 mt-5 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"

                      >
                        Save Information
                      </button>
                    </form>
                    </div>
                  )}
                </Formik>
       
      </>
    );
  }