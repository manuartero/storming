import { Button, Dialog } from "components/common";
import { useGameContext } from "contexts";
import { useState } from "react";
import { listSavegames, loadSavegame, savegame } from "services/db";
import { logRender } from "utils/console";
import MenuIcon from "./menu-icon.svg";

import "./menu.scss";

function SavegameLoadItem({
  savegame,
  onLoad,
}: {
  savegame: Savegame;
  onLoad: (gameContext: GameContext) => void;
}): JSX.Element {
  const name = () => {
    return new Date(parseInt(savegame.createdAt)).toLocaleDateString();
  };

  return (
    <Button
      onClick={() => {
        onLoad(savegame.gameContext);
      }}
    >
      {name()} ({savegame.playerEmpireSize})
    </Button>
  );
}

export function Menu(): JSX.Element {
  logRender("Menu");

  const gameContext = useGameContext();
  const [showMenuDialog, setShowMenuDialog] = useState(false);
  const [savegames, setSavegames] = useState<Savegame[]>([]);

  const openMenuDialog = () => setShowMenuDialog(true);
  const closeMenuDialog = () => setShowMenuDialog(false);

  const saveHandler = () => {
    savegame(gameContext);
  };

  const loadHandler = () => {
    const savegames = listSavegames()
      .map((key) => loadSavegame(key))
      .filter((savegame) => savegame) as Savegame[];
    setSavegames(savegames);
  };

  return (
    <>
      <div className="menu">
        <img src={MenuIcon} alt="Menu Icon" onClick={openMenuDialog} />
      </div>
      {showMenuDialog && (
        <Dialog onClose={closeMenuDialog}>
          {savegames.length === 0 ? (
            <>
              <Button onClick={saveHandler}>SAVE GAME</Button>
              <Button onClick={loadHandler}>LOAD GAME</Button>
            </>
          ) : (
            <>
              {savegames.map((savegame) => (
                <SavegameLoadItem
                  key={savegame.createdAt}
                  savegame={savegame}
                  onLoad={gameContext.loadSavegame}
                />
              ))}
            </>
          )}
        </Dialog>
      )}
    </>
  );
}
