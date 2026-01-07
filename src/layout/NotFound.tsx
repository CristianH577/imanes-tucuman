import { Button } from "@mui/material";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <p className="text-tert font-bold">Página no encontrada.</p>

      <Button
        component={"a"}
        href="#"
        variant="outlined"
        color="warning"
        size="large"
        className="font-bold hover:bg-[--variant-containedBg] hover:text-white"
        title="Ir al inicio"
        sx={{
          borderRadius: 2,
        }}
      >
        Ir al inicio
      </Button>
    </div>
  );
}
