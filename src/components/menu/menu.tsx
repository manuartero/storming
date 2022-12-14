import { logRender } from "utils/console";
import { savegame } from "services/db";
import MenuIcon from "./menu-icon.svg";
import { useGameContext } from "contexts";

import "./menu.scss";

export function Menu(): JSX.Element {
  logRender("Menu");

  const gameContext = useGameContext();

  const saveHandler = () => {
    savegame(gameContext);
  };

  const loadHandler = () => {
    // TODO
  };

  return (
    <div className="menu">
      <img
        src={MenuIcon}
        alt="Menu Icon"
        onClick={() => {
          console.log("clicked");
        }}
      />
    </div>
  );
}
