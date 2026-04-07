"use client";
import { useEffect, useState } from "react";

function Width() {
  const [w, setW] = useState(0);
  const handleResize = () => {
    setW(window.innerWidth);
  };

  useEffect(() => {
    setW(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return <div className="w-screen h-screen">当前宽度: {w}</div>;
}

export default Width;
