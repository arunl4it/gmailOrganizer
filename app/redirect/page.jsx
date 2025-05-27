"use client";
import { motion, useAnimation } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Cookies from "js-cookie";
import RedirectComponent from "../_componets/homeLandingPage/redirectComponent/RedirectComponent";

export default function Redirect() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RedirectComponent />
    </Suspense>
  );
}
