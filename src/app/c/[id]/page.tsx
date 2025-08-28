"use client";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const ShowTextPage = () => {
  const params = useParams<{ id: string | string[] }>();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [needsPassword, setNeedsPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const submittingRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    async function fetchText() {
      if (!id) return;
      setLoading(true);
      setError(null);
      const controller = new AbortController();
      try {
        const response = await axios.get(`/api/post/${id}`, {
          signal: controller.signal,
        });
        const { success, data } = response?.data ?? {};
        if (success === false && data?.isPublic === false) {
          setNeedsPassword(true);
        } else {
          setText(data?.text ?? "");
        }
      } catch (error: any) {
        if (axios.isCancel?.(error)) return;
        const status = error?.response?.status;
        if (status === 404) {
          setError("The given id doesn't exist or it is expired.");
        } else if (status === 401) {
          setPasswordError("Invalid password");
        } else {
          setError(
            "Failed to load post. It might not exist or there was a network error."
          );
        }
      } finally {
        setLoading(false);
      }
      return () => controller.abort();
    }
    fetchText();
  }, [id]);

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  const handleTextWithPassword = async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      const response = await axios.post(`/api/post/${id}`, { password });
      const data = response?.data?.data;
      setText(data?.text ?? "");
      setNeedsPassword(false);
      setPasswordError(null);
    } catch (error: any) {
      const message = error?.response?.data?.message || "Invalid password";
      setPasswordError(message);
      setNeedsPassword(true);
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  const handlePasswordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && password.trim()) {
      handleTextWithPassword();
    }
  };

  if (needsPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-400 to-zinc-800 flex items-center justify-center p-4">
        <Dialog open={needsPassword} onOpenChange={setNeedsPassword}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Enter Password</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              {passwordError && (
                <p className="text-red-500 text-sm">{passwordError}</p>
              )}
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handlePasswordKeyDown}
              />
            </DialogDescription>
            <DialogFooter>
              <Button
                onClick={handleTextWithPassword}
                disabled={!password.trim() || submitting}>
                {submitting ? "Submitting..." : "Enter"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-400 to-zinc-800 flex items-center justify-center">
        <div className="w-96 h-96 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-400 to-zinc-800 flex items-center justify-center">
        <div className="w-96 h-96 bg-white rounded-2xl shadow-lg border border-gray-200 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Text Not Found
              </h2>
              <p className="text-gray-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-400 to-zinc-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-xl">
        <div className="bg-gray-50 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-800">
                Post Viewer
              </h1>
              <p className="text-sm text-gray-500">
                ID: <span className="font-mono">{id}</span>
              </p>
            </div>
            <Button
              onClick={handleCopyText}
              disabled={!text.trim()}
              className="flex items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-200 cursor-pointer">
              {copied ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  Copy Text
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col h-96 p-4 gap-4">
          <div className="flex-1 relative">
            <textarea
              className="w-full h-full p-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl resize-none outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
              value={text}
              placeholder="No content available..."
              readOnly
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded-md shadow-sm">
              {text.length} chars
            </div>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <div className="text-xs">
              Last loaded: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowTextPage;
