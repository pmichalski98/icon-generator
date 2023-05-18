import { type NextPage } from "next";
import React, { type ChangeEvent, type FormEvent, useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import FormGroup from "~/components/FormGroup";
import { api } from "~/utils/api";
import { ClipLoader } from "react-spinners";
import IconList from "~/components/IconList";
import { Icon } from ".prisma/client";

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
    quantity: "",
  });
  const [imagesUrl, setImagesUrl] = useState<Icon[]>([]);

  const { mutate, isLoading, error } = api.generate.generateIcon.useMutation({
    onSuccess(data) {
      setImagesUrl(data);
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
    mutate({ ...form, quantity: parseInt(form.quantity) });
  }

  return (
    <section className="container mx-auto ">
      <h1 className="text-6xl ">Wygeneruj własne ikonki</h1>
      <form onSubmit={handleSubmit} className=" my-14 flex flex-col gap-4">
        <FormGroup>
          <label>Opisz jak ma wyglądać Twoja ikonka</label>
          <Input
            onChange={updateForm("prompt")}
            value={form.prompt}
            type="text"
            className="w-full p-2 focus:outline-1 focus:outline-rose-400 "
            placeholder="wściekły kurczak"
          />
          <p>{error && "You must provide a description"}</p>
        </FormGroup>
        <FormGroup>
          <label>Wybierz główny kolor</label>
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
        <FormGroup>
          <label>Ile ikon chcesz wygenerować ( 1 szt = 1 zł )</label>
          <Input
            onChange={updateForm("quantity")}
            value={form.quantity}
            type="number"
            min={1}
            max={10}
            className="w-full p-2 focus:outline-1 focus:outline-rose-400 "
          />
        </FormGroup>
        <Button disabled={isLoading} className="flex items-center gap-2">
          {isLoading && <ClipLoader size={20} color={"white"} />}Generate
        </Button>
      </form>
      {imagesUrl.length > 0 && (
        <div className="mb-36 flex flex-wrap gap-6">
          <h2 className="w-full text-3xl">Wygenerowane ikony</h2>
          {imagesUrl.map((icon) => {
            return <IconList icon={icon} key={icon.id} />;
          })}
        </div>
      )}
    </section>
  );
};

export default Generate;
