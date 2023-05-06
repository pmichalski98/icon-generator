import { type NextPage } from "next";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import FormGroup from "~/components/FormGroup";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  });

  const { mutate } = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      console.log("halo", data);
    },
  });

  function updateForm(key: string) {
    return (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({
        ...prev,
        [key]: e.target.value,
      }));
    };
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = mutate({ prompt: form.prompt });
    setForm({ ...form, prompt: "" });
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <FormGroup>
          <label>Prompt</label>
          <Input
            onChange={updateForm("prompt")}
            value={form.prompt}
            type="text"
          />
        </FormGroup>
        <Button className="">Submit</Button>
      </form>
    </div>
  );
};

export default Home;
