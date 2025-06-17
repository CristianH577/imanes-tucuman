import { Button, Input } from "@heroui/react";

import SearchIcon from "@mui/icons-material/Search";

export default function InputSearch({
  value = "",
  setValue = (val: string) => {
    val;
  },
  handleSearch = () => {},
}) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex">
      <Input
        name="text"
        placeholder="Buscar..."
        title="Buscar..."
        classNames={{
          inputWrapper: "border-3 border-custom1-3 border-e-0 rounded-e-none",
        }}
        value={value}
        onValueChange={(e) => setValue(e)}
        onKeyDown={onKeyDown}
        isClearable
      />
      <Button
        isIconOnly
        variant="light"
        title="Buscar"
        color="warning"
        className="border-3 border-custom1-3 border-s-0 rounded-xl rounded-s-none"
        onPress={handleSearch}
      >
        <SearchIcon className="h-6 w-fit" />
      </Button>
    </div>
  );
}
