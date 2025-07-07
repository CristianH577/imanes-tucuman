import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function LinkToFont({
  href = "#",
  text = "Link",
  title = "Ir a la fuente",
}) {
  return (
    <p className="text-default-500 border-t border-divider pt-1 w-2/3 place-self-center">
      Fuente:{" "}
      <a
        href={href}
        className="text-default-500 break-all hover:underline"
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text} <OpenInNewIcon fontSize="small" />
      </a>
    </p>
  );
}
