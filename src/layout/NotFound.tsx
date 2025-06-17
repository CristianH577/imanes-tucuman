import { Button, Link } from "@heroui/react";

export default function NotFound() {
  return (
    <Button
      as={Link}
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
