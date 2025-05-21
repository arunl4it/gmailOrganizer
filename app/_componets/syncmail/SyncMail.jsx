"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SyncMail() {
  const [selectedProvider, setSelectedProvider] = useState(null);

  const emailServices = [
    {
      icon: "/outlook.png",
      title: "Connect With Outlook",
      description:
        "Sync this mail with application to organize mail in Outlook",
      provider: "outlook",
      link: "https://ai.l4it.net/l4mailapp/connect.php",
    },
    {
      icon: "/gmail.png",
      title: "Connect With Gmail",
      description: "Sync your Gmail account to manage all your emails",
      provider: "gmail",
      link: "https://ai.l4it.net/l4mailapp/connect.php",
    },
    {
      icon: "/mail.png",
      title: "Custom Domain Email",
      description:
        "Connect your business domain email (e.g., yourname@yourcompany.com)",
      provider: "domain",
      link: "https://ai.l4it.net/l4mailapp/connect.php",
    },
    {
      icon: "/office.png",
      title: "Office 365 Email",
      description: "Connect your Office 365 business email account",
      provider: "office365",
      link: "https://ai.l4it.net/l4mailapp/connect.php",
    },
    {
      icon: "/yahoo.png",
      title: "Yahoo Mail",
      description: "Connect your Yahoo Mail account",
      provider: "yahoo",
      link: "https://ai.l4it.net/l4mailapp/connect.php",
    },
  ];

  const handleServiceClick = (provider) => {
    setSelectedProvider(provider);
  };

  const handleConfirmSync = () => {
    console.log("clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <div className="w-28 h-28 rounded-full bg-gray-100 shadow-2xl dark:bg-gray-700 flex items-center justify-center relative overflow-hidden">
              <Image
                src="/Logo.png"
                alt="Sync Icon"
                width={48}
                height={48}
                className="w-full object-contain p-3 h-fit brightness-200"
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Sync data with cloud?
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            You're about to sync local data with <span className="text-red-700 font-bold">L4IT.</span> <br />
            
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {emailServices.map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(service.provider)}
              className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                selectedProvider === service.provider
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={service.icon}
                      alt={service.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
                {selectedProvider === service.provider && (
                  <div className="text-blue-500">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Cancel
          </button>
          <Link href="http://mailsync.l4it.net/l4mailapp/connect.php">
            <button
              onClick={handleConfirmSync}
              className={`px-6 py-2 rounded-md transition-colors ${
                selectedProvider
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
              disabled={!selectedProvider}
            >
              Confirm Sync
            </button>
          </Link>

        </div>
         <p className="text-center mt-10">Powered by <span className="font-bold text-red-700">L4IT</span>  © 2025. All rights reserved.</p>
       </div>
    
    </div>
  );
}
