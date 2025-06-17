import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import type { TypeFiltersInput, TypeFiltersValues } from "../../consts/types";

import {
  FILTERS_INPUTS,
  FILTERS_VALUES_DEFAULT,
} from "../../consts/siteConfig";

import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
  Link,
  Select,
  SelectItem,
} from "@heroui/react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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

  const handleSelectFilterChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const filters_values_ = structuredClone(filtersValuesTemp);
    const name = event.target.name;
    const value = event.target.value;
    // @ts-ignore
    filters_values_[name] = value;
    setFiltersValuesTemp(filters_values_);
  };

  const handleApply = () => {
    const add = [];
    for (const key in filtersValuesTemp) {
      if (!["apply", "page"].includes(key)) {
        const val = filtersValuesTemp[key as keyof TypeFiltersValues];
        if (val) add.push([key, val]);
      }
    }

    if (add.length > 0) {
      let href = "";
      add.forEach((e, i) => {
        href += i === 0 ? "?" : "&";
        href += e[0] + "=" + e[1];
      });

      navigate(href);
    }

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
        const items: any = (input.items || []).map((item) => (
          <SelectItem key={item.id}>{item.label}</SelectItem>
        ));
        return (
          <Select
            className="max-w-xs text-foreground"
            classNames={{
              listbox: "text-foreground ",
              popoverContent: "border-3 border-custom1-3",
            }}
            label={input.label}
            name={input.id}
            selectedKeys={[
              filtersValuesTemp[input.id as keyof typeof input.items],
            ]}
            onChange={handleSelectFilterChange}
          >
            <SelectItem key="">Seleccione un valor</SelectItem>

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

        <DrawerBody className="px-2">
          <Divider />

          <article className="p-4">
            <ol aria-label="Filtros" className="space-y-4">
              {FILTERS_INPUTS.map((input: TypeFiltersInput) => (
                <li key={input.id}>{makeInput(input)}</li>
              ))}
            </ol>
          </article>

          <Divider />
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
            title="Limpiar filtros"
            isIconOnly
            as={Link}
            href="#search?orderBy=price-asc"
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
