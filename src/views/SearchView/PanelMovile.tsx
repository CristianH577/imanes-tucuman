import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import type { TypeFiltersValues } from "../../consts/types";

import { Button, ButtonGroup } from "@mui/material";

import InputSearch from "../../components/InputSearch";
import ErrorBoundary from "../../components/ErrorBoundary";
import DrawerFilters from "./DrawerFilters";
import AsideFilters from "./AsideFilters";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";

interface IntfProps {
  filtersValues: TypeFiltersValues;
}

export default function PanelMovile({ filtersValues }: IntfProps) {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState("");
  const [isOpenFiltersDrawer, setIsOpenFiltersDrawer] = useState(false);

  const handleClean = () => setInputText("");

  const handleSearch = () => {
    let href = "?orderBy=price-asc";
    if (inputText) href += "&text=" + inputText;
    navigate(href);
  };

  useEffect(() => {
    setInputText(filtersValues?.text);
  }, [filtersValues]);

  return (
    <article className="flex flex-col gap-2 items-center md:hidden">
      <InputSearch
        value={inputText}
        setValue={setInputText}
        handleSearch={handleSearch}
      />

      <ButtonGroup
        variant="contained"
        sx={{
          "& .MuiButton-root": {
            textTransform: "none",
            fontFamily: "unset",
            fontWeight: "bold",
          },
        }}
      >
        <Button
          component={"a"}
          title="Quitar filtros"
          color="inherit"
          href="#buscar?orderBy=price-asc"
          startIcon={<FilterAltOffIcon />}
          onClick={handleClean}
        >
          Quitar
        </Button>

        <Button
          color={filtersValues?.apply ? "warning" : "inherit"}
          title="Abrir lista de filtros"
          startIcon={<FilterAltIcon className="h-6 w-fit" />}
          onClick={() => setIsOpenFiltersDrawer(true)}
        >
          Filtros
        </Button>
      </ButtonGroup>

      <ErrorBoundary>
        <DrawerFilters
          isOpen={isOpenFiltersDrawer}
          setIsOpen={setIsOpenFiltersDrawer}
        >
          <AsideFilters
            filtersValues={filtersValues}
            onApply={() => setIsOpenFiltersDrawer(false)}
            idFilter="movil"
          />
        </DrawerFilters>
      </ErrorBoundary>
    </article>
  );
}
