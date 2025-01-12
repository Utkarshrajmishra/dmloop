import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectorProps = {
  title: string;
  options: string[];
  id?: string;
  name?:string
};

export function Selector({name, title, options, id }: SelectorProps) {

  return (
    <Select defaultValue={options[0]} name={name}>
      <SelectTrigger id={id}  className="w-[198px] bg-neutral-800 outline outline-1 outline-neutral-700 border-none font-mono text-neutral-200">
        <SelectValue className="font-mono" placeholder={title} />
      </SelectTrigger>
      <SelectContent className=" outline-none bg-neutral-800 border-none text-neutral-200 font-mono">
        <SelectGroup>
          <SelectLabel>{`${title}`}</SelectLabel>
          {options?.map((items, index) => (
            <SelectItem
              value={items}
              key={index}
              className="hover:text-neutral-500 font-mono border-none"
            >
              {items}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
