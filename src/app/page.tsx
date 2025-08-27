"use client";
import TextForm from "../components/text-form";
import ShowId from "../components/show-id";
import { useState } from "react";
function Home() {
  const [id, setId] = useState("");
  return (
    <section className="flex flex-warp items-center justify-center min-h-screen bg-gradient-to-br from-zinc-400 to-zinc-800 gap-4">
      <TextForm setId={setId} />
      {id && <ShowId id={id} />}
    </section>
  );
}

export default Home;
