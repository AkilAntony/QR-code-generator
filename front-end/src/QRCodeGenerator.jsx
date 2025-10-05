import React, { useState } from "react";
import axios from "axios";
import validator from "validator";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";

function QRCodeGenerator() {
  const [reqUrl, setReqUrl] = useState("");
  const [warning, setWarning] = useState("");
  const [qrcode, setQrcode] = useState("");

  const generate_QR = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        "https://generatoqrcode.onrender.com/url",

        { reqUrl },
        { responseType: "blob" }
      );
      return response.data;
    },
    mutationKey: ["genrate-QR", reqUrl],
    onSuccess: (response) => {
      if (response) {
        const fileURL = URL.createObjectURL(response);
        setQrcode(fileURL);
        setReqUrl("");
      }
    },
  });

  const handleClick = async () => {
    if (reqUrl) {
      if (validator.isURL(reqUrl)) {
        setWarning("");
      } else {
        setWarning("Plsease enter a Valid URL");
      }
      try {
        generate_QR.mutateAsync();
      } catch (error) {
        console.log(error);
      }
    } else {
      setWarning("Plsease enter a Valid URL");
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br flex   flex-col justify-center
       from-indigo-50 via-white to-purple-50"
    >
      <div className=" mx-auto px-4  flex md:flex-row flex-col md:gap-8  items-center justify-between">
        <div className="  mx-auto ">
          {/* Header Section */}
          <div className="text-center mb-12 ">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-6">
              <svg
                className="w-8 h-8 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01M12 8h4.01"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              QR Code Generator
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              Transform any URL into a beautiful QR code instantly. Perfect for
              sharing links, websites, and more.
            </p>
          </div>

          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-semibold text-gray-700 mb-3"
                >
                  Enter your URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    id="url"
                    name="url"
                    required
                    value={reqUrl}
                    onChange={(e) => setReqUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full h-14 px-6 bg-gray-50 border-2 border-gray-200 rounded-xl 
                             focus:border-indigo-500 focus:bg-white focus:outline-none 
                             transition-all duration-200 text-gray-900 placeholder-gray-400"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.102m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {warning && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-700 font-medium">{warning}</p>
                </div>
              )}

              <button
                type="button"
                onClick={handleClick}
                disabled={!reqUrl.trim() || generate_QR.isPending}
                className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 
                         text-white font-semibold rounded-xl transition-all duration-200 
                         transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100
                         shadow-lg hover:shadow-xl disabled:shadow-none"
              >
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01M12 8h4.01"
                    />
                  </svg>
                  {generate_QR.isPending ? "Generating..." : "Generate QR Code"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* QR Code Display */}
        {qrcode && !warning && (
          <div className="bg-white rounded-xl min-w-full md:min-w-[400px] shadow-md border border-gray-100 p-10  ">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Your QR Code is Ready!
              </h3>
              <div className="inline-block p-6 bg-white rounded-xl shadow-inner border-2 border-gray-100">
                <img
                  src={qrcode}
                  alt="Generated QR Code"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
              <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                <a href={qrcode} download="qrcode.png">
                  <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-colors">
                    Download PNG
                  </button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    
  );
}

export default QRCodeGenerator;
