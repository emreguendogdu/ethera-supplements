import React, { useState } from "react";
import Menu from "../menu/Menu";

export default function MenuButton() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <Menu visible={visible} setVisible={setVisible} />
      <button
        className="uppercase tracking-widest cursor-pointer"
        onClick={() => setVisible(true)}
      >
        Menu
      </button>
    </>
  );
}
