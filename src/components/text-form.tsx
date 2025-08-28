"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface TextFormProps {
  setId: (id: string) => void;
}

const TextForm: React.FC<TextFormProps> = ({ setId }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const handlePost = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const response = await axios.post(`/api/post`, {
        text,
        isPublic,
        password,
      });

      console.log("response", response.data);
      if (response.data?.id) {
        setId(response.data.id);
      }

      setText("");
    } catch (error) {
      console.error("error while posting...", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-96 h-96 bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-xl">
      <div className="flex flex-col h-full p-4 gap-4">
        <div className="flex-1 relative">
          <textarea
            className="w-full h-full p-4 text-gray-700 bg-gray-50 border border-gray-200 rounded-xl resize-none outline-none focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-gray-400"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts..."
            disabled={loading}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded-md shadow-sm">
            {text.length} chars
          </div>
        </div>

        <div className="flex justify-between items-center gap-2">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-2">
              <Switch
                id="isPublic"
                checked={isPublic}
                onCheckedChange={setIsPublic}
                className="data-[state=unchecked]:bg-gray-500 cursor-pointer"
              />
              <Label htmlFor="isPublic">Public</Label>
            </div>
            {!isPublic && (
              <div className="flex items-center gap-2 py-1">
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            )}
          </div>

          <Button
            onClick={handlePost}
            disabled={loading || !text.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:ring-2 focus:ring-blue-200 min-w-[80px]">
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Sharing...
              </div>
            ) : (
              "Share"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TextForm;
