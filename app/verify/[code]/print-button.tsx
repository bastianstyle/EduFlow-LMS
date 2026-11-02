"use client";

import React from "react";
import { Printer } from "lucide-react";
import { Button } from "@/ui/button";

export function CertificatePrintButton() {
  return (
    <Button
      size="sm"
      onClick={() => window.print()}
      className="rounded-xl bg-primary-600 text-white font-semibold text-xs shadow-sm hover:bg-primary-700"
    >
      <Printer className="mr-1.5 h-4 w-4" />
      Print / Export PDF
    </Button>
  );
}
