import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="w-full h-[50px] p-8 px-30">
        <div className="flex flex-row gap-5">
          <div className="logo">
            <Image src="/logo.png" alt="logo" height={30} width={90} />
          </div>
          <h1 className="Heading text-2xl font-mono leading-loose text-gray-300">Type-Master</h1>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Header;
