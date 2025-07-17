import { Button, Dialog } from "elements";
import { useGameContext } from "game-context";
import { useState } from "react";
import { listSavegames, loadSavegame, savegame } from "services/db";
import MenuIcon from "./menu-icon.svg";

import styles from "./menu.module.css";

export function Menu() {
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
      <div className={styles.menu}>
        <img src={MenuIcon} alt="Menu Icon" onClick={openMenuDialog} />
      </div>

      {showMenuDialog && (
        <Dialog size="small" title="Menu" onClose={closeMenuDialog}>
          {savegames.length === 0 && (
            <>
              <Button onClick={saveHandler}>SAVE GAME</Button>
              <Button onClick={loadHandler}>LOAD GAME</Button>
            </>
          )}
          {savegames.length > 0 && (
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

function SavegameLoadItem({
  savegame,
  onLoad,
}: {
  savegame: Savegame;
  onLoad: (gameContext: GameContext) => void;
}) {
  const name = () =>
    new Date(parseInt(savegame.createdAt)).toLocaleDateString();

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
