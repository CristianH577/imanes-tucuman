import { Button, Tooltip } from "@heroui/react";

function ButtonCart({ ...props }) {
  return (
    <Tooltip
      content={props?.label}
      className="border-2 border-custom1-2 text-foreground"
      classNames={{
        content: "text-center font-semibold",
      }}
      hidden={!props?.label}
    >
      <Button
        color={props?.color}
        isIconOnly
        className="p-2 max-xs:w-full"
        isDisabled={props?.isDisabled}
        onPress={props?.onPress || null}
        title={props?.label || null}
      >
        {props?.icon ? <props.icon className="h-full w-fit" /> : null}
      </Button>
    </Tooltip>
  );
}

export default ButtonCart;
