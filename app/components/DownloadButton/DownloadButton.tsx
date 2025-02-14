"use client";
import React from "react";
import Button from "../Button/Button";

export default function DownloadButton() {
  async function downloadPDF() {
    if (!window.jspdf || !window.html2canvas) {
      return;
    }

    // create image
    const canvas = await window.html2canvas(document.body, {
      scale: window.devicePixelRatio,
    });
    const imgData = canvas.toDataURL("image/png");

    // create pdf
    const pdf = new window.jspdf.jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [canvas.height, canvas.width],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    const title = document.querySelector("h1")?.textContent;
    pdf.save(`${title}.pdf`);
  }

  return <Button onClick={downloadPDF} label="Download Article" />;
}
