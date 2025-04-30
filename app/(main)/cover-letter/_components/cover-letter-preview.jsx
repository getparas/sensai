"use client";

import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Edit, Copy, Check, Printer } from "lucide-react";
import { toast } from "sonner";
import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

const CoverLetterPreview = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      toast.success("Cover letter copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const element = document.getElementById("cover-letter-pdf");
      const opt = {
        margin: [15, 15],
        filename: `cover_letter_${new Date().toLocaleDateString().replace(/\//g, "-")}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF generated successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Cover Letter</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              padding: 40px;
              max-width: 800px;
              margin: 0 auto;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          ${document.getElementById("cover-letter-pdf").innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden border shadow-md">
        <CardContent className="p-6">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold">Cover Letter Preview</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-1"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Copied" : "Copy Text"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="gap-1"
              >
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button
                size="sm"
                onClick={generatePDF}
                disabled={isGenerating}
                className="gap-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white"
              >
                <Download className="h-4 w-4" />
                {isGenerating ? "Generating..." : "Download PDF"}
              </Button>
            </div>
          </div>
          <div className="rounded-lg border">
            <MDEditor value={content} preview="preview" height={700} />
          </div>
          <div className="hidden">
            <div id="cover-letter-pdf">
              <MDEditor.Markdown
                source={content}
                style={{
                  background: "white",
                  color: "black",
                  padding: "20px",
                  fontFamily: "Arial, sans-serif",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoverLetterPreview;
