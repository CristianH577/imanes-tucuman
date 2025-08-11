import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";

import type { TypeFiltersInput, TypeFiltersValues } from "../../consts/types";

import { FILTERS_INPUTS, FILTERS_VALUES_DEFAULT } from "../../consts/values";

import { getHrefSearch } from "../../libs/functions";

import { Select, SelectItem, SelectSection } from "@heroui/select";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@heroui/drawer";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { SVGBroom } from "../../assets/svgs/svgsIcons";
import { Divider } from "@mui/material";

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

  const handleSelectFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
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

        const items: any =
          input.items &&
          Object.entries(input.items).map(([id, cat]) => (
            <>
              <SelectItem key={id}>{cat.label || id}</SelectItem>

              {cat.subs && (
                <SelectSection
                  key={"section-" + id}
                  showDivider
                  title={cat.label || id}
                >
                  {Object.entries(cat.subs).map(([idSub, sub]) => (
                    <SelectItem key={id + "," + idSub}>
                      {sub.label || idSub}
                    </SelectItem>
                  ))}
                </SelectSection>
              )}
            </>
          ));

        return (
          <Select
            className="max-w-xs text-foreground"
            classNames={{
              listbox: "text-foreground capitalize",
              popoverContent: "border-3 border-custom1-3",
              value: "capitalize",
            }}
            label={input.label}
            name={input.id}
            selectedKeys={[selectedKeys]}
            onChange={handleSelectFilterChange}
          >
            {items}
          </Select>
        );
      case "number":
        return (
          <div>
            <p>{input.label}</p>

            <div className="xs:flex gap-1">
              {["Min", "Max"].map((key) => {
                const value =
                  filtersValuesTemp[
                    (input.id + key) as keyof TypeFiltersValues
                  ];
                return (
                  <Input
                    key={key}
                    type="number"
                    size="sm"
                    className="capitalize"
                    id={`input-${input.id + key}`}
                    label={key}
                    name={`${input.id + key}`}
                    value={value ? String(value) : ""}
                    onChange={handleFilterChange}
                  />
                );
              })}
            </div>
          </div>
        );

      default:
        return (
          <Input
            id={id}
            label={input.label}
            name={input.id}
            value={String(
              filtersValuesTemp[input.id as keyof TypeFiltersValues]
            )}
            onChange={handleFilterChange}
          />
        );
    }
  };

  useEffect(() => {
    const filters_values_ = { ...filtersValuesTemp, ...filtersValues };

    setFiltersValuesTemp(filters_values_);
  }, [filtersValues]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      onOpenChange={() => setIsOpen(true)}
      className="max-w-[250px] text-foreground"
    >
      <DrawerContent>
        <DrawerHeader className="pb-0">Filtros</DrawerHeader>

        <DrawerBody className="px-2 overflow-x-hidden">
          <Divider className="bg-neutral-500/50" />

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

          <Divider className="bg-neutral-500/50" />
        </DrawerBody>

        <DrawerFooter className="px-2 py-4 flex flex-wrap gap-2 justify-center">
          <Button
            isIconOnly
            variant="light"
            onPress={onClose}
            title="Cerrar lista de filtros"
          >
            <ArrowBackIcon className="h-6 w-fit" />
          </Button>

          <Button
            isIconOnly
            title="Limpiar filtros"
            as={"a"}
            href="#buscar?orderBy=price-asc"
            onPress={handleClean}
          >
            <SVGBroom className="h-6 w-fit" />
          </Button>

          <Button
            color="primary"
            onPress={handleApply}
            title="Aplicar filtros"
            className="font-semibold"
          >
            Aplicar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
