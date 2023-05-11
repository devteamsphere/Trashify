import React from "react";
import PropTypes from "prop-types";
import { Formik } from "formik";
import { useFormik } from "formik";
import { useEffect } from "react";
import { getAllDriver } from "../../service/user.api";
import { registerDriver } from "../../service/user.api";

// components

import TableDropdown from "components/Dropdowns/TableDropdown.js";

export default function CardDriverDetail({ color }) {
  const [showModal, setShowModal] = React.useState(false);
  const [drivers, setDriver] = React.useState([]);

  const handleSubmit = async (values) => {
    console.log(values);
    const userdata = await registerDriver(values);
    console.log(userdata);
  };

  useEffect( () => {
    const ini = async () => {
    const [err ,driver] = await getAllDriver();
    console.log(driver);
    if (driver.code == 200) {
      const d = driver.data;
      setDriver(d);

      // setfunc(driver.data);
    }
  }
  ini();


  }, [])
  useEffect(() => { 
    console.log(drivers) }, [drivers])


 


  return (
    <>
      {/* {isOpen &&
                <div>


                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-20 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  border-0" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className=" inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>
                            <div className="fixed z-30 inset-0 bg-black/30" aria-hidden="true" />
                            <div className=" flex-auto z-50 px-4 lg:px-10 py-10 pt-0">
                                <div className=" flex flex-wrap items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="  transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                Add Driver
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Your payment has been successfully submitted. We’ve sent
                                                    you an email with all of the details of your order.
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Got it, thanks!
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                    <Transition appear show={isOpen} as={Fragment} className="relative z-50">
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {}}
          static={true}
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl font-bold leading-6 text-gray-900"
                  >
                    Complete Your Details

                  </Dialog.Title>
                  <div className="pt-4">
                  <div className="flex justify-between py-3">
                      <h1>Driver</h1>
                    </div>
                    <div className="w-full bg-gray-200 h-1 mb-6">
                      <div className="bg-blue-400 h-1"></div>
                    </div>
                  </div>
                  <div className="pt-8"></div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
                </div>
            } */}
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mt-48 z-0 shadow-lg rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full flex justify-between px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                Drivers
              </h3>
              <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Register as Driver
              </button>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  email
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Status
                </th>
                {/* <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Users
                </th> */}
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Completion
                </th>

                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                ></th>
              </tr>
            </thead>
            <tbody>
              {drivers.length>0 && drivers.map((user) => {
                return (
                <tr>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                   
                    <span
                      className={
                        "ml-3 font-bold " +
                        +(color === "light" ? "text-blueGray-600" : "text-white")
                      }
                    >
                      {user.firstName}{" "}{user.lastName}
                    </span>
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {user.email}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <i className="fas fa-circle text-orange-500 mr-2"></i> {user.driverStatus}
                  </td>
                 
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {/* <div className="flex items-center">
                      <span className="mr-2">60%</span>
                      <div className="relative w-full">
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                          <div
                            style={{ width: "60%" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                          ></div>
                        </div>
                      </div>
                    </div> */}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                    <TableDropdown />
                  </td>
                </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div class="max-w-2xl mx-auto mt-12 content-between">
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl mt-48 ">
                {/*content*/}
                <div className="border-0 rounded-lg bg-blueGray-100 shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Add Driver Details
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}

                  <Formik
                    initialValues={{
                      firstName: "",
                      lastName: "",
                      userName: "",
                      email: "",
                      address: "",
                      city: "",
                      country: "",
                      postalCode: "",
                      contactNumber: "",
                      aadharNumber: "",
                    }}
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
                                  htmlFor="firstName"
                                >
                                  First Name
                                </label>
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
                                  htmlFor="lastName"
                                >
                                  Last Name
                                </label>
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
                                  htmlFor="userName"
                                >
                                  User Name
                                </label>
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
                                  {errors.email &&
                                    touched.email &&
                                    errors.email}
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
                                  htmlFor="address"
                                >
                                  Address
                                </label>
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
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="city"
                                >
                                  City
                                </label>
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
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="country"
                                >
                                  Country
                                </label>
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
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="postalCode"
                                >
                                  Postal Code
                                </label>
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
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="contactNumber"
                                >
                                  Contact Number
                                </label>
                                <input
                                  id="contactNumber"
                                  name="contactNumber"
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.contactNumber}
                                  className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                              </div>
                            </div>
                            <div className="w-full lg:w-12/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="aadharNumber"
                                >
                                  Aadhar Number
                                </label>
                                <input
                                  id="aadharNumber"
                                  name="aadharNumber"
                                  type="text"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.aadharNumber}
                                  className="border-0 px-3 py-3 mb-5 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => setShowModal(false)}
                            >
                              Close
                            </button>
                            <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                            // onClick={() => setShowModal(false)}
                            >
                              Register
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                  </Formik>
                  {/* footer */}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </div>
    </>
  );
}

CardDriverDetail.defaultProps = {
  color: "light",
};

CardDriverDetail.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
