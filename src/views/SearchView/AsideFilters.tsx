import React, { useEffect, useState } from "react";
import { m } from "framer-motion";

import type { TypeFiltersInput, TypeFiltersValues } from "../../consts/types";

import { FILTERS_INPUTS, FILTERS_VALUES_DEFAULT } from "../../consts/values";

import {
  Divider,
  FormControl,
  InputLabel,
  FilledInput,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import ConsoleFilters from "./ConsoleFilters";

type TypeDrawerFilters = {
  filtersValues: TypeFiltersValues;
  onApply?: () => void;
  idFilter?: string;
};

export default function AsideFilters({
  filtersValues,
  onApply,
  idFilter,
}: TypeDrawerFilters) {
  const [filtersValuesTemp, setFiltersValuesTemp] = useState<TypeFiltersValues>(
    FILTERS_VALUES_DEFAULT
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filters_values_ = structuredClone(filtersValuesTemp);
    const name = e.target.name;
    const type = e.target.type;
    const value = e.target.value;

    const value_ = type === "number" ? value : Number(value);

    // @ts-ignore
    filters_values_[name] = value_;

    setFiltersValuesTemp(filters_values_);
  };

  const handleSelectFilterChange = (e: SelectChangeEvent) => {
    const filters_values_ = structuredClone(filtersValuesTemp);
    const name = e.target.name;
    let value: string | string[] = e.target.value;

    const filter = FILTERS_INPUTS.find((fil) => fil.id === name);
    if (filter?.valueArray) {
      if (value) {
        value = value.split(",");
      } else {
        value = [];
      }
    }

    // @ts-ignore
    filters_values_[name] = value;
    setFiltersValuesTemp(filters_values_);
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filters_values_ = structuredClone(filtersValuesTemp);
    const checked = e.target.checked;
    const name = e.target.name;

    // @ts-ignore
    filters_values_[name] = checked;

    setFiltersValuesTemp(filters_values_);
  };

  const makeInput = (input: TypeFiltersInput) => {
    const id = `${idFilter || "filter"}-${input.format}-${input.id}`;
    switch (input.format) {
      case "select":
        const val = filtersValuesTemp[input.id as keyof typeof input.items];
        const selectedKeys = !input.valueArray
          ? val
          : (val as string[]).join(",");

        const menu_items: any[] = [];

        input.items &&
          Object.entries(input.items).forEach(([id, cat]) => {
            menu_items.push({
              val: id,
              label: cat.label || id,
              sub: 0,
            });
            if (cat.subs) {
              Object.entries(cat.subs).forEach(([id1, sub1]) => {
                menu_items.push({
                  val: id + "," + id1,
                  label: sub1.label || id1,
                  sub: 1,
                });

                if (sub1.subs) {
                  Object.entries(sub1.subs).forEach(([id2, sub2]) => {
                    menu_items.push({
                      val: id + "," + id1 + "," + id2,
                      label: sub2.label || id2,
                      sub: 2,
                    });
                  });
                }
              });
            }
          });

        return (
          <FormControl fullWidth className="max-w-xs">
            <InputLabel htmlFor={id}>{input.label}</InputLabel>
            <Select
              label={input.label}
              name={input.id}
              variant="outlined"
              color="warning"
              className="font-[menulis] capitalize font-bold bg-content1 md:max-w-44"
              slotProps={{
                notchedOutline: {
                  className: "rounded-lg",
                },
                input: {
                  className: "line-clamp-1 text-sm",
                },
              }}
              inputProps={{
                id: id,
              }}
              MenuProps={{
                slotProps: {
                  paper: {
                    className: "rounded-lg mt-1 bg-background",
                  },
                },
                PaperProps: {
                  sx: {
                    "& .MuiMenuItem-root": {
                      textTransform: "capitalize",
                      py: 0.3,
                    },
                  },
                },
              }}
              value={selectedKeys}
              onChange={handleSelectFilterChange}
              renderValue={(selected) => {
                if (selected.includes(",")) {
                  return selected.split(",").join(" > ");
                }

                return menu_items.find((f) => f.val === selected)?.label;
              }}
            >
              <MenuItem className="italic font-bold text-neutral-500 dark:text-neutral-300">
                Seleccione
              </MenuItem>

              {menu_items.map((item) => (
                <MenuItem
                  key={item.id}
                  value={item.val}
                  className={
                    item.sub > 0 ? "ps-" + (4 + 2 * item.sub) : "font-semibold"
                  }
                >
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "number":
        return (
          <div>
            <p>{input.label}</p>

            <div className="flex flex-col xs:flex-row gap-1">
              {["Min", "Max"].map((key) => {
                const value =
                  filtersValuesTemp[
                    (input.id + key) as keyof TypeFiltersValues
                  ];
                return (
                  <FormControl
                    key={key}
                    variant="filled"
                    color="warning"
                    size="small"
                  >
                    <InputLabel htmlFor={`${id + key}`}>{key}</InputLabel>

                    <FilledInput
                      id={`${id + key}`}
                      type="number"
                      name={`${input.id + key}`}
                      className="bg-content1"
                      inputProps={{
                        min: 0,
                      }}
                      value={value ? String(value) : ""}
                      onChange={handleFilterChange}
                    />
                  </FormControl>
                );
              })}
            </div>
          </div>
        );

      case "check":
        return (
          <FormControlLabel
            control={
              <Checkbox
                color="warning"
                name={input.id}
                checked={
                  filtersValuesTemp[
                    input.id as keyof TypeFiltersValues
                  ] as boolean
                }
                onChange={handleCheck}
              />
            }
            label={input.label}
          />
        );

      default:
        return (
          <FormControl variant="filled">
            <InputLabel htmlFor={id}>{input.label}</InputLabel>
            <FilledInput
              id={id}
              name={input.id}
              value={String(
                filtersValuesTemp[input.id as keyof TypeFiltersValues]
              )}
              onChange={handleFilterChange}
            />
          </FormControl>
        );
    }
  };

  useEffect(() => {
    const filters_values_ = { ...filtersValuesTemp, ...filtersValues };

    setFiltersValuesTemp(filters_values_);
  }, [filtersValues]);

  return (
    <section>
      <article className="p-3 flex items-center justify-between">
        <h1 className="font-semibold">Filtros</h1>
      </article>

      <Divider variant="middle" />

      <article className="px-2 overflow-x-hidden">
        <m.ol
          variants={{
            hidden: {},
            visible: {
              transition: {
                delayChildren: 0.1,
                staggerChildren: 0.1,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          aria-label="Filtros"
          className="space-y-4 p-4"
        >
          {FILTERS_INPUTS.map((input: TypeFiltersInput) => (
            <m.li
              key={input.id}
              variants={{
                hidden: { opacity: 0, x: 50 },
                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
            >
              {makeInput(input)}
            </m.li>
          ))}
        </m.ol>
      </article>

      <Divider variant="middle" />

      <ConsoleFilters
        onApply={onApply}
        filters={{ val: filtersValuesTemp, set: setFiltersValuesTemp }}
      />
    </section>
  );
}
