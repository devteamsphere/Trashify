import React from "react";
import { Formik } from "formik";
import { signup } from "../../service/user.api";

export default function Register() {
  const handleSubmit = async (values) => {
    console.log(values);
    const data = await signup(values);
    if (data.data.code === 200) {
      window.location.replace("http://localhost:3000/#/auth/sign-in/default");
    }
    // localStorage.setItem('token', data.data.token);
    // localStorage.setItem('user', JSON.stringify(data.data.user));
    console.log(data);
  };
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  {/* <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/github.svg").default}
                    />
                    Github
                  </button> */}
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                {/* <form>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Name
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="button"
                    >
                      Create Account
                    </button>
                  </div>
                </form> */}
                <Formik
          initialValues={{
            email: "",
            password: "",
            contactNo: "",
            firstName: "",
            lastName: "",
            companyName: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }

            if (!values.contactNo) {
              errors.contactNo = "Required";
            }
            

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
            <form onSubmit={handleSubmit}>
              
                <div>
                  <h1 mt="10px">First Name</h1>
                  <input
                    className="loginInput"
                    type="firstName"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    borderRadius="5px"
                  />
                  {errors.firstName && touched.firstName && errors.firstName}

                  <h1 mt="10px">lastName</h1>
                  <input
                    className="loginInput"
                    type="lastName"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    borderRadius="5px"
                  />
                  {errors.lastName && touched.lastName && errors.lastName}
                </div>
             
              <h1 mt="10px">Email</h1>
              <input
                className="loginInput"
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                borderRadius="5px"
              />
              {errors.email && touched.email && errors.email}
              <h1 mt="10px">Password</h1>
              <input
                className="loginInput"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                border="1px"
                borderColor="gray.200"
                borderRadius="5px"
              />
              {errors.password && touched.password && errors.password}

              <h1 mt="10px">Contact No</h1>
              <input
                className="loginInput"
                type="number"
                name="contactNo"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.contactNo}
                border="1px"
                borderColor="gray.200"
                borderRadius="5px"
              />
              {errors.contactNo && touched.contactNo && errors.contactNo}
              <br />
              <button
                fontSize="sm"
                variant="brand"
                fontWeight="500"
                w="40%"
                h="50"
                ml="0px"
                mb="24px"
                type="submit"
                disabled={!values.email || !values.password}
              >
                Sign Up
              </button>
            </form>
          )}
        </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
