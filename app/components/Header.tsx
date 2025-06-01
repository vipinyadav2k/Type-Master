"use client";

import Image from "next/image";
import React from "react";

const Header = () => {
  const gotohome = () => {
    window.location.href = "/"; // forces full page reload
  };

  return (
    <div className="w-full h-[50px] p-8 px-30">
      <div className="flex flex-row gap-5 cursor-pointer" onClick={gotohome}>
        <div className="logo">
          <Image src="/logo.png" alt="logo" height={30} width={90} />
        </div>
        <div className="Heading text-2xl font-mono leading-loose text-gray-500">
          Type-Master
        </div>
      </div>
    </div>
  );
};

export default Header;
