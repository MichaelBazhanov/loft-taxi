/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
  LocationMarkerIcon,
  XIcon,
} from "@heroicons/react/solid";
import { styles } from "./styles";

function CustomSelect({
  addressList,
  placeholder,
  onChange,
  margin,
  roundedTop,
  roundedBottom,
}) {
  const [selected, setSelected] = useState(addressList);

  const changeSelected = (event) => {
    setSelected(event);
    onChange(event);
  };

  return (
    <Listbox value={selected} onChange={changeSelected}>
      {({ open }) => (
        <>
          <div className={styles["listbox-container"]({ margin })}>
            <Listbox.Button
              className={styles["listbox-button"]({
                roundedTop,
                roundedBottom,
              })}
              placeholder={placeholder}
            >
              <span className={styles["listbox-button-container-left"]}>
                <div className={styles["listbox-button-dot"]} />
                <span className={styles["listbox-button-name"]}>
                  {selected && selected.rout ? selected.rout : placeholder}
                </span>
              </span>

              <span className={styles["listbox-button-container-right"]}>
                <XIcon
                  className={styles["listbox-button-close"]}
                  aria-hidden="true"
                />
                <ChevronDownIcon
                  className={styles["listbox-button-arrow"]}
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave={styles["transition-leave"]}
              leaveFrom={styles["transition-leave-form"]}
              leaveTo={styles["transition-leave-to"]}
            >
              <Listbox.Options className={styles["listbox-options"]}>
                {addressList.map((person) => (
                  <Listbox.Option
                    key={person.id}
                    className={({ active }) =>
                      styles["listbox-option"]({ active })
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className={styles["listbox-option-container"]}>
                          <LocationMarkerIcon
                            className={styles["listbox-option-icon"]}
                            aria-hidden="true"
                          />
                          <span
                            className={styles["listbox-option-name"]({
                              selected,
                            })}
                          >
                            {person.rout}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={styles["listbox-option-selected"]({
                              active,
                            })}
                          >
                            <CheckIcon
                              className={styles["listbox-option-selected-icon"]}
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default CustomSelect;
