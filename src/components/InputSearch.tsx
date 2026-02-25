import { Button, OutlinedInput } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function InputSearch({
  value = "",
  className = "",
  setValue = (val: string) => {
    val;
  },
  handleSearch = () => {},
}) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <OutlinedInput
      name="text"
      placeholder="Buscar..."
      title="Buscar..."
      size="small"
      className={
        "p-0 rounded-lg bg-content1" + (className ? " " + className : "")
      }
      classes={{
        notchedOutline:
          "border-2 border-custom1--9 dark:border-custom1-2 rounded-lg",
      }}
      endAdornment={
        <Button
          variant="contained"
          color="warning"
          title="Buscar"
          className="rounded-s-none rounded-lg shadow-none"
          onClick={handleSearch}
          sx={{
            height: "-webkit-fill-available",
            minWidth: 0,
          }}
        >
          <SearchIcon className="h-6 w-fit" />
        </Button>
      }
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={onKeyDown}
    />
  );
}
