import { Input } from "@heroui/input";
import { Button } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

export default function InputSearch({
  value = "",
  className = "",
  setValue = (val: string) => {
    val;
  },
  handleSearch = () => {},
  onClear = () => {},
}) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className={"flex" + (className ? " " + className : "")}>
      <Input
        name="text"
        placeholder="Buscar..."
        title="Buscar..."
        classNames={{
          inputWrapper:
            "border-2 border-custom1-3 border-e-0 rounded-e-none bg-transparent",
        }}
        value={value}
        onValueChange={(e) => setValue(e)}
        onKeyDown={onKeyDown}
        isClearable
        onClear={onClear}
      />
      <Button
        variant="outlined"
        color="warning"
        title="Buscar"
        className="border-2 border-custom1-3 border-s-0 rounded-xl rounded-s-none min-w-0"
        onClick={handleSearch}
      >
        <SearchIcon className="h-6 w-fit" />
      </Button>
    </div>
  );
}
