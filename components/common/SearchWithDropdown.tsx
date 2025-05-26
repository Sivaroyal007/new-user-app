"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { IoSearch } from "react-icons/io5";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popoverDropdown";
import { useDebounce } from "@/lib/debounce";
import { useSearchLocation } from "@/lib/hooks/query";

export function SearchWithDropdown({
  jobLocation,
  setJobLocation,
  select,
}: {
  jobLocation: string;
  setJobLocation: (location: string) => void;
  select?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  // const [select, setSelected] = React.useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const {
    data: locations,
    error,
    isPending,
  } = useSearchLocation(debouncedSearchTerm, select);
  // console.log(locations, "LOCATIONS");

  React.useEffect(() => {
    if (searchTerm === "") {
      setSearchTerm("");
    }
  }, [searchTerm]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="mt-1 h-[56px] w-full justify-between rounded-[8px] border border-[#D0D9E9] text-[#434343]"
        >
          {jobLocation ? jobLocation : "Choose location"}
          <ChevronsUpDown className="ml-2 flex h-4 w-4 shrink-0 items-end justify-end opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <div className="relative mt-0 h-fit w-full pt-0">
          <input
            className="h-[56px] w-full items-center rounded-[8px] border border-[#D0D9E9] px-3 py-2 pl-4 text-sm"
            placeholder="Search Place..."
            value={searchTerm}
            // onValueChange={(value) => setSearchTerm(value)}
            onChange={(e) => setSearchTerm(e.target.value)} // Handle input changes manually
          />
          <IoSearch className="absolute right-6 top-6 cursor-pointer" />
        </div>
        <Command>
          <CommandList>
            <ScrollArea className="h-48 overflow-y-auto">
              <CommandEmpty>No place found.</CommandEmpty>
              <CommandGroup>
                {locations?.map((location: string, index: number) => (
                  <CommandItem
                    className="cursor-pointer"
                    key={index}
                    value={location}
                    onSelect={(currentValue) => {
                      setJobLocation(
                        currentValue === jobLocation ? "" : currentValue,
                      );
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        jobLocation === location ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {location}
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
