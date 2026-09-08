import { useEffect, useState } from "react";

import imgTest from "../../assets/tapa.webp";
import { Button } from "@mui/material";

export default function ComponentTest() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    console.log("ComponentTest");
  }, []);
  return (
    <div>
      <Button variant="contained" onClick={() => setShow(!show)}>
        Mostrar
      </Button>
      {/* {show && <img src={imgTest} />} */}
      <img src={imgTest} style={{ display: show ? "block" : "none" }} />
    </div>
  );
}
