import React from 'react'
import GenerateQr from 'components/Maps/GenerateQr'
const generateQR = () => {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <GenerateQr/>
          </div>
        </div>
      </div>
    </>
  )
}

export default generateQR