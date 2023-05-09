import { type NextPage } from "next";
import React, { type ChangeEvent, type FormEvent, useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import FormGroup from "~/components/FormGroup";
import { api } from "~/utils/api";
import Image from "next/image";

const Generate: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  });
  const [imageUrl, setImageUrl] = useState("");

  const { mutate } = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setImageUrl(data.generatedImage);
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
    mutate({ prompt: form.prompt });
    setForm({ ...form, prompt: "" });
  }
  return (
    <>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <FormGroup>
          <label>Prompt</label>
          <Input
            onChange={updateForm("prompt")}
            value={form.prompt}
            type="text"
          />
        </FormGroup>
        <Button className="">Generate</Button>
      </form>
      {imageUrl && (
        <Image
          src={imageUrl}
          width={500}
          height={500}
          alt={"generated image"}
        />
      )}
    </>
  );
};

export default Generate;
