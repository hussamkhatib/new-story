import { FC, Fragment, useEffect, useState } from "react";
import { Combobox as HeadlessuiCombobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import Props, { Item } from "./Combobox.types";

const Combobox: FC<Props> = ({
  getFilteredList,
  selected,
  setSelected,
  Label,
  customEmptyComponent,
}) => {
  const [query, setQuery] = useState("");
  const [filteredList, setFilteredList] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const list = await getFilteredList(query);
      setFilteredList(list);
    };
    fetchData();
  }, [getFilteredList, query]);

  return (
    <HeadlessuiCombobox value={selected} onChange={setSelected} name={Label}>
      <HeadlessuiCombobox.Label>{Label}</HeadlessuiCombobox.Label>
      <div className="relative mt-1">
        <div className="relative w-full overflow-hidden text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 sm:text-sm">
          <HeadlessuiCombobox.Input
            className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 border-none focus:ring-0"
            displayValue={(item: Item) => item?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <HeadlessuiCombobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </HeadlessuiCombobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <HeadlessuiCombobox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredList.length === 0 && query !== "" ? (
              <>
                {customEmptyComponent || (
                  <div className="relative px-4 py-2 text-gray-700 cursor-default select-none">
                    Nothing found.
                  </div>
                )}
              </>
            ) : (
              filteredList.map((item: Item) => (
                <HeadlessuiCombobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-gray-500 text-white" : "text-gray-900"
                    }`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {item?.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-gray-500"
                          }`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </HeadlessuiCombobox.Option>
              ))
            )}
          </HeadlessuiCombobox.Options>
        </Transition>
      </div>
    </HeadlessuiCombobox>
  );
};

export default Combobox;
