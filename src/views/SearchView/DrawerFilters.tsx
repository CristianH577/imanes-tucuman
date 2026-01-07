import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import type { TypeFiltersInput, TypeFiltersValues } from "../../consts/types";

import { FILTERS_INPUTS, FILTERS_VALUES_DEFAULT } from "../../consts/values";

import { getHrefSearch } from "../../libs/functions";

import {
  Divider,
  Button,
  IconButton,
  ButtonGroup,
  Drawer,
  FormControl,
  InputLabel,
  FilledInput,
  Select,
  MenuItem,
  type SelectChangeEvent,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";

import { SVGBroom } from "../../assets/svgs/svgsIcons";

type TypeDrawerFilters = {
  isOpen: boolean;
  setIsOpen: (bool: React.SetStateAction<boolean>) => void;
  filtersValues: TypeFiltersValues;
};

export default function DrawerFilters({
  isOpen = false,
  setIsOpen,
  filtersValues,
}: TypeDrawerFilters) {
  const navigate = useNavigate();

  const [filtersValuesTemp, setFiltersValuesTemp] = useState<TypeFiltersValues>(
    FILTERS_VALUES_DEFAULT
  );

  const onClose = () => setIsOpen(false);

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

  const handleApply = () => {
    let href = getHrefSearch(filtersValuesTemp);
    if (href) navigate(href);
    onClose();
  };

  const handleClean = () => {
    setFiltersValuesTemp(structuredClone(FILTERS_VALUES_DEFAULT));
    onClose();
  };

  const makeInput = (input: TypeFiltersInput) => {
    const id = `${input.format}-${input.id}`;
    switch (input.format) {
      case "select":
        const val = filtersValuesTemp[input.id as keyof typeof input.items];
        const selectedKeys = !input.valueArray
          ? val
          : (val as string[]).join(",");

        const items: any[] = [];

        input.items &&
          Object.entries(input.items).forEach(([id, cat]) => {
            items.push(
              <MenuItem
                key={id}
                value={id}
                className="font-[menulis] font-semibold capitalize"
              >
                {cat.label || id}
              </MenuItem>
            );
            if (cat.subs) {
              Object.entries(cat.subs).forEach(([idSub, sub]) => {
                items.push(
                  <MenuItem
                    key={id + "," + idSub}
                    value={id + "," + idSub}
                    className="font-[menulis] capitalize ps-6"
                  >
                    {sub.label || idSub}
                  </MenuItem>
                );
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
              className="font-[menulis] capitalize"
              slotProps={{
                notchedOutline: {
                  className: "rounded-lg",
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
              }}
              value={selectedKeys}
              onChange={handleSelectFilterChange}
            >
              <MenuItem className="italic font-[menulis] text-neutral-500 dark:text-neutral-300">
                Seleccione
              </MenuItem>

              {items}
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
                    <InputLabel htmlFor={`input-${input.id + key}`}>
                      {key}
                    </InputLabel>

                    <FilledInput
                      id={`input-${input.id + key}`}
                      type="number"
                      name={`${input.id + key}`}
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
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      disableScrollLock
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "250px",
        },
      }}
    >
      <section>
        <article className="p-2 flex items-center justify-between">
          <h1 className="font-semibold">Filtros</h1>

          <IconButton
            size="small"
            className="text-neutral-500 dark:text-neutral-400"
            title="Cerrar"
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </article>

        <Divider className="bg-neutral-500/50" variant="middle" />

        <article className="px-2 overflow-x-hidden">
          <motion.ol
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
              <motion.li
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
              </motion.li>
            ))}
          </motion.ol>
        </article>

        <Divider className="bg-neutral-500/50" variant="middle" />

        <article className="px-2 py-4 flex flex-wrap gap-2 justify-center">
          <IconButton onClick={onClose} title="Cerrar lista de filtros">
            <ArrowBackIcon className="h-6 w-fit" />
          </IconButton>

          <ButtonGroup variant="contained">
            <Button
              color="inherit"
              title="Limpiar filtros"
              component={"a"}
              href="#buscar?orderBy=price-asc"
              onClick={handleClean}
              sx={{ minWidth: 0, px: 1 }}
            >
              <SVGBroom className="h-6 w-fit" />
            </Button>

            <Button
              color="secondary"
              onClick={handleApply}
              title="Aplicar filtros"
              sx={{
                textTransform: "none",
                fontFamily: "unset",
                fontWeight: "bold",
              }}
            >
              Aplicar
            </Button>
          </ButtonGroup>
        </article>
      </section>
    </Drawer>
  );
}
