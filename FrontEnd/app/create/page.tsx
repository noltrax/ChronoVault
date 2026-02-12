"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { DateTimePicker } from "@/components/ui/date-time-picker";

export default function CreateMessagePage() {
  const [content, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const handleSubmit = async () => {
    setError(null);

    if (!content.trim() || !selectedDate) {
      setError("Message, date, and time are required.");
      return;
    }

    const showAt = new Date();
    const now = new Date();
    if (showAt <= now) {
      setError("The time must be in the future.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/messages`,
        { showAt, content },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        },
      );
      setResult(`${window.location.origin}/l/${res.data.data.token}`);
    } catch (err: any) {
      console.error(err);
      // Backend error handling
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Dark green theme palette
  const pageBg = "#021f1a"; // darker background
  const cardBg = "#065f46"; // card background
  const accent = "#22c55e"; // bright green for glow, button, highlights
  const textMain = "#a5f3ac"; // main readable text
  const textSecondary = "#86efac"; // label and secondary text
  const border = "rgba(34,197,94,0.3)";
  const buttonHover = "#16a34a";

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: pageBg }}
    >
      <AnimatePresence>
        {pageLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="fixed inset-0 z-50"
          >
            <video
              src="/logo.mp4"
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={() => setPageLoading(false)}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: pageLoading ? 0 : 1, y: pageLoading ? 30 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative min-w-125"
      >
        {/* Glow */}
        <div
          className="absolute -inset-1 rounded-2xl blur-xl"
          style={{ backgroundColor: `${accent}/20` }}
        />

        <Card
          className="relative max-w-125 border backdrop-blur-xl shadow-2xl"
          style={{ borderColor: border, backgroundColor: `${cardBg}/70` }}
        >
          <CardHeader className="text-center">
            <CardTitle
              style={{ color: textMain }}
              className="text-2xl font-semibold tracking-wide"
            >
              Chronovault
            </CardTitle>
            <p
              style={{ color: textSecondary }}
              className="text-xs uppercase tracking-widest"
            >
              Time-Locked Message
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Error message */}
            {error && (
              <div
                className="text-sm rounded-lg p-2 text-center"
                style={{ color: "#f87171", backgroundColor: `${cardBg}/50` }}
              >
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label style={{ color: textSecondary }}>Message</Label>
              <Textarea
                value={content}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something for the future…"
                className="min-h-[180px] max-h-[300] bg-emerald-950"
                style={{
                  backgroundColor: `${cardBg}/60`,
                  borderColor: border,
                  color: textMain,
                }}
              />
            </div>

            <div className="flex  gap-4">
              <div className="space-y-2 w-2xl">
                <Label style={{ color: textSecondary }}>Date & Time</Label>
                <DateTimePicker
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                />
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                color: "white",
              }}
              className="w-full font-semibold tracking-wide hover:bg-emerald-800 bg-emerald-600 cursor-pointer"
            >
              {loading ? "Sealing vault…" : "Create Vault Link"}
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm break-all rounded-lg border p-3"
                style={{
                  borderColor: border,
                  backgroundColor: `${cardBg}/60`,
                  color: textMain,
                }}
              >
                <span style={{ color: textMain }}>Vault link: </span>
                <a
                  href={result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white"
                  style={{ color: accent }}
                >
                  {result}
                </a>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
