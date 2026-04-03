import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function LinkToFont({
  href = "#",
  text = "Link",
  title = "Ir a la fuente",
}) {
  return (
    <p className="text-neutral-500 dark:text-neutral-400 border-t border-divider/15 pt-1 w-2/3 place-self-center">
      Fuente:{" "}
      <a
        href={href}
        className="break-all hover:underline"
        title={title}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text} <OpenInNewIcon fontSize="small" />
      </a>
    </p>
  );
}
