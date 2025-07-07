import { Button } from "@heroui/button";

export default function NotFound() {
  return (
    <Button
      as={"a"}
      href="#"
      variant="ghost"
      color="warning"
      size="lg"
      className="font-bold"
    >
      Ir al inicio
    </Button>
  );
}
