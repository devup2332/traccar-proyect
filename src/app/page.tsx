"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const App = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/traccar");
  }, [router]);
  return;
};

export default App;
