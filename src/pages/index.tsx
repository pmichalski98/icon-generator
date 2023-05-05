import { type NextPage } from "next";
import React, { useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";

const Home: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  });

  console.log(form);
  return (
    <div>
      <form className="flex flex-col gap-4">
        <label>Prompt</label>
        <Input
          onChange={(e) => setForm({ ...form, prompt: e.target.value })}
          value={form.prompt}
          type="text"
        />
        <Button className="">Submit</Button>
      </form>
    </div>
  );
};

export default Home;
