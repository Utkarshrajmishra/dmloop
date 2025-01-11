import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SelectorProps={
    title: string;
    options: string[]
}

export function Selector({title, options}:SelectorProps) {
  return (
    <Select>
      <SelectTrigger className="w-[180px] bg-neutral-800 outline outline-1 outline-neutral-700 border-none text-neutral-500">
        <SelectValue placeholder={title} />
      </SelectTrigger>
      <SelectContent className=" outline-none bg-neutral-800 border-none text-neutral-200 ">
        <SelectGroup>
          <SelectLabel>{`${title}`}</SelectLabel>
          {options?.map((items, index) => (
            <SelectItem
              value={items}
              key={index}
              className="hover:text-neutral-500 border-none"
            >
              {items}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
