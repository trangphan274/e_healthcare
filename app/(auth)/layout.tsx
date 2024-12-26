import React from "react";
import Image from "next/image"; // Đảm bảo bạn import Image đúng nếu dùng Next.js

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-1/2 h-full flex items-center justify-center">
          {children}
        </div>
        <div className="absolute right-0 w-1/3 h-full z-0">
          
          <Image
            src="/Resource/1.png" // Đảm bảo đường dẫn là đúng từ thư mục public (Next.js sử dụng thư mục public)
            width={1000}
            height={1000}
            alt="Doctors"
            className=" w-full h-full object-cover mask mask-clip"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
