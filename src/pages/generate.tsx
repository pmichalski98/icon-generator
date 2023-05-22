import { type NextPage } from "next";
import React, { type ChangeEvent, type FormEvent, useState } from "react";
import Button from "~/components/Button";
import Input from "~/components/Input";
import FormGroup from "~/components/FormGroup";
import { api } from "~/utils/api";
import { ClipLoader } from "react-spinners";
import IconList from "~/components/IconList";
import { type Icon } from ".prisma/client";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { RxThickArrowUp } from "react-icons/rx";
import FormLabel from "~/components/FormLabel";

const Generate: NextPage = () => {
  const { data } = useSession();
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

  const colors = ["yellow", "blue", "red", "green", "pink", "orange", "white"];

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

  let isChecked = false;
  return (
    <section className="container mx-auto lg:w-8/12">
      <h1 className="text-6xl ">Wygeneruj własne ikonki</h1>
      <h2 className="mt-10 text-xl">
        Szybki i prosty generator ikon za pomocą sztucznej inteligencji
      </h2>
      <form onSubmit={handleSubmit} className=" my-14 flex flex-col gap-4">
        <FormGroup>
          <FormLabel>Opisz jak ma wyglądać Twoja ikonka</FormLabel>
          <Input
            onChange={updateForm("prompt")}
            value={form.prompt}
            type="text"
            className="w-full p-2 focus:outline-1 focus:outline-rose-400 "
            placeholder="np. groźna panda"
          />

          {error && (
            <p
              className={
                "py- flex w-fit items-center gap-2 rounded bg-red-600  px-4 py-2 text-xl font-medium"
              }
            >
              <RxThickArrowUp size={30} />
              Uzupełnij opis ikonki
            </p>
          )}
        </FormGroup>
        <FormGroup>
          <FormLabel>Wybierz główny kolor ikonki</FormLabel>
          <div className="grid grid-cols-4 gap-4">
            {colors.map((color) => {
              isChecked = color === form.color;
              const checkedStyle = !isChecked
                ? "w-20 h-20 opacity-60"
                : "h-24 w-24 border-2 border-white";
              const styles = classNames(
                `color-radio${color} appearance-none rounded-lg bg-white cursor-pointer`,
                checkedStyle
              );
              return (
                <div key={color}>
                  <input
                    id={color}
                    className={styles}
                    checked={isChecked}
                    onChange={() => setForm((prev) => ({ ...prev, color }))}
                    type="radio"
                    name={color}
                    value={form.color}
                  />
                </div>
              );
            })}
            <div>
              <input
                className={` absolute h-20 w-20 cursor-pointer appearance-none `}
                onChange={() => {
                  setForm((prev) => ({ ...prev, color: "random" }));
                }}
                checked={"random" === form.color}
                type="radio"
                name={"random"}
                value={"random"}
              />
              <GiPerspectiveDiceSixFacesRandom size={80} />
            </div>
          </div>
        </FormGroup>
        <FormGroup>
          <FormLabel>Liczba ikon ( 1 szt = 1 zł )</FormLabel>
          <Input
            onChange={updateForm("quantity")}
            value={form.quantity}
            type="number"
            min={1}
            max={10}
            placeholder={"1"}
            required
            className="w-full p-2 focus:outline-1 focus:outline-rose-400 "
          />
        </FormGroup>
        <Button
          disabled={isLoading || !data?.user?.name}
          className="flex w-full items-center justify-center gap-2 text-2xl"
        >
          {isLoading && <ClipLoader size={20} color={"white"} />}{" "}
          {data?.user
            ? !isLoading
              ? "Wygeneruj"
              : "Generowanie"
            : "Musisz się zalogować"}
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
