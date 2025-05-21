"use client";
import { Suspense } from "react";
import DashboardContent from "../_componets/homeLandingPage/dashboard/DashboarContents";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
