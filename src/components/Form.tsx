import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction } from "react";
import { Spinner } from "./ui/loader";


type Props = {
  inputText: string;
  setInputText: Dispatch<SetStateAction<string>>;
  handleSubmit: (event: any) => void;
  isLoading : boolean
};

export default function Form(props: Props) {
  function inputChange(e: any) {
    props.setInputText(e.target.value);
  }


  return (
  !props.isLoading ? 
    <form
      className="flex bg-secondary rounded-xl gap-6 w-160"
      onSubmit={props.handleSubmit}
    >
      <Input
        placeholder="Enter topic"
        className="m-2 bg-secondary p-2 outline-none "
        onChange={inputChange}
        value={props.inputText}
      />
      <Button
        variant={"link"}
        onClick={props.handleSubmit}
        className="p-4 m-2 rounded-xl bg-secondary"
      >
        Enter
      </Button>
    </form>
   : <Spinner className="text-ring" size={'large'}> 
      <span className="text-primary text-md"> Loading Your Quiz </span>
    </Spinner>
  )
}
