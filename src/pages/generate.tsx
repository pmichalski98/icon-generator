import { type NextPage } from "next";
import React, { type ChangeEvent, type FormEvent, useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import FormGroup from "~/components/FormGroup";
import { api } from "~/utils/api";
import Image from "next/image";
import { ClipLoader } from "react-spinners";
import { useSession } from "next-auth/react";

const colors = [
  "yellow",
  "blue",
  "red",
  "green",
  "pink",
  "orange",
  "white",
  "other",
];
const Generate: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
  });
  const [imageUrl, setImageUrl] = useState("");
  const { data } = useSession();
  console.log(data?.user);

  const { mutate, isLoading, error } = api.generate.generateIcon.useMutation({
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
    mutate(form);
  }

  return (
    <section className="container mx-auto ">
      <h1 className="text-6xl ">Generate your icon</h1>
      <form onSubmit={handleSubmit} className=" my-14 flex flex-col gap-4">
        <FormGroup>
          <label>Describe what icon you want</label>
          <Input
            onChange={updateForm("prompt")}
            value={form.prompt}
            type="text"
            className="w-full"
          />
          <p>{error && "You must provide a description"}</p>
        </FormGroup>
        <FormGroup>
          <label>Pick your icon colour.</label>
          <div className="grid grid-cols-4 gap-4">
            {colors.map((color) => {
              return (
                <label
                  key={color}
                  className="flex basis-1/4 items-center gap-2 capitalize"
                >
                  <input
                    checked={color === form.color}
                    onChange={() => setForm((prev) => ({ ...prev, color }))}
                    type="radio"
                    name={color}
                    value={form.color}
                  />
                  {color}
                </label>
              );
            })}
          </div>
        </FormGroup>
        <Button disabled={isLoading} className="flex items-center gap-2">
          {isLoading && <ClipLoader size={20} color={"white"} />}Generate
        </Button>
      </form>
      {imageUrl && (
        <Image
          className="mb-14"
          src={imageUrl}
          width={512}
          height={512}
          alt={"generated image"}
        />
      )}
    </section>
  );
};

export default Generate;
