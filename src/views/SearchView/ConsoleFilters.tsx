import { useNavigate } from "react-router";

import { getHrefSearch } from "../../libs/functions";

import { FILTERS_VALUES_DEFAULT } from "../../consts/values";
import type { TypeFiltersValues } from "../../consts/types";

import { Button, ButtonGroup } from "@mui/material";

import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface IntfProps {
  onApply?: () => void;
  filters: {
    val: TypeFiltersValues;
    set: (e: TypeFiltersValues) => void;
  };
}

export default function ConsoleFilters({ onApply, filters }: IntfProps) {
  const navigate = useNavigate();

  const handleApply = () => {
    const href = getHrefSearch(filters.val);
    if (href) navigate(href);
    if (onApply) onApply();
  };

  const handleClean = () => {
    filters.set(structuredClone(FILTERS_VALUES_DEFAULT));
    if (onApply) onApply();
  };

  return (
    <article className="px-2 py-4 flex flex-wrap gap-2 justify-center">
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
          color="inherit"
          title="Quitar filtros"
          component={"a"}
          href="#buscar?orderBy=price-asc"
          startIcon={<FilterAltOffIcon />}
          onClick={handleClean}
        >
          Quitar
        </Button>

        <Button
          color="warning"
          title="Aplicar filtros"
          startIcon={<FilterAltIcon />}
          onClick={handleApply}
        >
          Aplicar
        </Button>
      </ButtonGroup>
    </article>
  );
}
