import { Link } from "@heroui/react";

export default function LinkToFont({
  href = "#",
  text = "Link",
  title = "Ir a la fuente",
}) {
  return (
    <p className="text-default-500 border-t border-divider pt-1 w-2/3 place-self-center">
      Fuente:{" "}
      <Link
        href={href}
        className="text-default-500 break-all"
        underline="hover"
        isExternal
        showAnchorIcon
        title={title}
      >
        {text}
      </Link>
    </p>
  );
}
