"use client";

import { Label } from "./ui/label";
import { Check, ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";

import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Select({
  options,
  groupKey = "group", 
  valueKey = "value",
  labelKey = "label", 
  placeholder = "Select an item",
  onChange = () => {}, 
  label = "Options", 
}) {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onChange(value);
    setOpen(false);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="select-44">{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="select-44"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-background px-3 py-5 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          >
            {selectedValue ? (
              <span className="flex min-w-0 items-center gap-1">
                <span className="truncate">
                  {options
                    .flatMap((group) => group.items)
                    .find((item) => item[valueKey] === selectedValue)[labelKey]}
                </span>
              </span>
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search Item..." />
            <CommandList>
              <CommandEmpty>No item found.</CommandEmpty>
              {options.map((group) => (
                <Fragment key={group[groupKey]}>
                  <CommandGroup heading={group[groupKey]}>
                    {group.items.map((item) => (
                      <CommandItem
                        key={item[valueKey]}
                        value={item[valueKey]}
                        onSelect={() => handleSelect(item[valueKey])}
                      >
                        {item[labelKey]}
                        {selectedValue === item[valueKey] && (
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="ml-auto"
                          />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Fragment>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
