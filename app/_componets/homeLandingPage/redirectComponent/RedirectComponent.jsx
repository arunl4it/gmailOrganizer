"use client";
import { motion, useAnimation } from "framer-motion";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function RedirectComponent(){
    const controls = useAnimation();
    const progressControls = useAnimation();
    const [token, setToken] = useState("");
    const searchParams = useSearchParams();
    const router = useRouter();
  
    useEffect(() => {
      const tokenFromURL = searchParams.get("token");
      if (tokenFromURL) {
        setToken(tokenFromURL);
        Cookies.set("authToken", tokenFromURL, {
            expires: 7,       
            secure: false,   
            sameSite: "Lax",   
            path: "/",         
          });
      } else {
        // Handle case where token is missing
        //   router.push("/error?message=Missing token");
        console.log("token missing ");
      }
    }, [searchParams, router]);
  
    useEffect(() => {
      const sequence = async () => {
        await controls.start({
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0],
          transition: { duration: 1, repeat: 2, repeatType: "loop" },
        });
      };
  
      const progressSequence = async () => {
        await progressControls.start({
          width: "100%",
          transition: { duration: 3, ease: "linear" },
        });
        // Redirect after animation completes
        setInterval(() => {
          router.push("/dashboard");
        }, [2000]);
      };
  
      sequence();
      progressSequence();
  
      return () => {
        controls.stop();
        progressControls.stop();
      };
    }, [controls, progressControls, router]);
  
    if (!token) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <p>Loading...</p>
        </div>
      );
    }
  
    return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            gap: "2rem",
          }}
        >
          <motion.div
            animate={controls}
            style={{
              width: 100,
              height: 80,
              backgroundColor: "#4285F4",
              borderRadius: 15,
              position: "relative",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Envelope flap */}
            <motion.div
              animate={{
                rotateX: [0, 180, 0],
              }}
              transition={{
                duration: 1,
                repeat: 2,
                repeatType: "loop",
              }}
              style={{
                position: "absolute",
                top: -20,
                width: 0,
                height: 0,
                borderLeft: "50px solid transparent",
                borderRight: "50px solid transparent",
                borderBottom: "30px solid #3367D6",
                transformOrigin: "bottom center",
              }}
            />
    
            {/* Letter inside */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 1,
                repeat: 2,
                repeatType: "loop",
              }}
              style={{
                width: 60,
                height: 40,
                backgroundColor: "white",
                borderRadius: 5,
              }}
            />
          </motion.div>
    
          {/* Progress bar container */}
          <div
            style={{
              width: "200px",
              height: "8px",
              backgroundColor: "#e0e0e0",
              borderRadius: "4px",
              overflow: "hidden",
            }}
          >
            <motion.div
              animate={progressControls}
              initial={{ width: "0%" }}
              style={{
                height: "100%",
                backgroundColor: "#4285F4",
                borderRadius: "4px",
              }}
            />
          </div>
    
          {/* Progress text */}
          <motion.p
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{ color: "#555", marginTop: "8px" }}
          >
            Syncing your mail...
          </motion.p>
        </div>
      );
}