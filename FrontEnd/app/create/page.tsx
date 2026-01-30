"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import axios from "axios";

export default function CreateMessagePage() {
  const [content, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!content || !date || !time) return;

    setLoading(true);
    setResult(null);

    const showAt = new Date(`${date}T${time}:00`).toISOString();

    try {
      const res = await axios.post(
        `/messages`,
        {
          content,
          showAt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false, // keep false unless you need cookies
        },
      );

      const data = await res.json();
      setResult(`${window.location.origin}/${data.token}`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-[rgba(116,212,71,0.85)] to-black p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative min-w-125"
      >
        {/* Glow */}
        <div className="absolute -inset-1 rounded-2xl bg-[rgba(116,212,71,0.85)]/20 blur-xl" />

        <Card className="relative max-w-125 border border-[rgba(116,212,71,0.85)]/30 bg-black/70 backdrop-blur-xl shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-semibold tracking-wide text-[rgba(116,212,71,0.85)]">
              Chronovault
            </CardTitle>
            <p className="text-xs uppercase tracking-widest text-[rgba(116,212,71,0.85)]/70">
              Time-Locked Message
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label className="text-[rgba(116,212,71,0.85)]/70">Message</Label>
              <Textarea
                value={content}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write something for the future…"
                className="bg-black/60 border-[rgba(116,212,71,0.85)]/30 text-[rgba(116,212,71,0.85)]/90 placeholder:text-[rgba(116,212,71,0.85)]/40 focus-visible:ring-[rgba(116,212,71,0.85)] min-h-[180px] max-h-[300]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[rgba(116,212,71,0.85)]/70">Date</Label>
                <Input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-black/60 border-[rgba(116,212,71,0.85)]/30 text-[rgba(116,212,71,0.85)]/90 focus-visible:ring-[rgba(116,212,71,0.85)]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[rgba(116,212,71,0.85)]/70">Time</Label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-black/60 border-[rgba(116,212,71,0.85)]/30 text-[rgba(116,212,71,0.85)]/90 focus-visible:ring-[rgba(116,212,71,0.85)]"
                />
              </div>
            </div>

            <Button
              className="w-full bg-[rgba(116,212,71,0.85)]/90 hover:bg-[rgba(116,212,71,0.7)] text-black font-semibold tracking-wide"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Sealing vault…" : "Create Vault Link"}
            </Button>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm break-all rounded-lg border border-[rgba(116,212,71,0.85)]/30 bg-black/60 p-3 text-[rgba(116,212,71,0.85)]/80"
              >
                <span className="text-[rgba(116,212,71,0.85)]">
                  Vault link:
                </span>{" "}
                {result}
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
