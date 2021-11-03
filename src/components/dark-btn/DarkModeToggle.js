import React from "react";

import useDarkMode from "use-dark-mode";
import Toggle from "../toggle/Toggle";

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);
    console.log(darkMode);

  return (
    <div className="dark-mode-toggle">
      <button type="button" onClick={darkMode.disable}>
        ☀
      </button>
      <Toggle checked={darkMode.value} onChange={darkMode.toggle} />
      <button type="button" onClick={darkMode.enable}>
        ☾
      </button>
    </div>
  );
};

export default DarkModeToggle;
