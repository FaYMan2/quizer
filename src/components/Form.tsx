import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";

type Props = {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: any) => void;
};

export default function Form(props: Props) {
  function inputChange(e: any) {
    props.setInputText(e.target.value);
  }
  return (
    <form
      className="flex bg-secondary rounded-xl gap-6 "
      onSubmit={props.handleSubmit}
    >
      <Input
        placeholder="Enter topic"
        className="m-2 bg-secondary p-2 outline-none "
        onChange={inputChange}
        value={props.inputText}
      />
      <Button
        variant={"destructive"}
        onClick={props.handleSubmit}
        className="p-4 m-2 rounded-xl"
      >
        Enter
      </Button>
    </form>
  );
}
