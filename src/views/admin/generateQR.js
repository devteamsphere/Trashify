import React from 'react'
import GenerateQr from 'components/Maps/GenerateQr'
const generateQR = () => {
  return (
    <>
      <div className="flex flex-wrap h-full">
        <div className="w-full px-4 mt-48">
          <div className="relative flex flex-col min-w-0 break-words bg-white max-h-full w-full shadow-lg rounded">
            <GenerateQr/>
          </div>
        </div>
      </div>
    </>
  )
}

export default generateQR