import { logRender } from "utils/console";
import { listSavegames, loadSavegame, savegame } from "services/db";
import MenuIcon from "./menu-icon.svg";
import { useGameContext } from "contexts";
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import { useState } from "react";

import "./menu.scss";
import "@reach/dialog/styles.css";

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
    <button
      onClick={() => {
        onLoad(savegame.gameContext);
        
      }}
    >
      {name()} ({savegame.playerEmpireSize})
    </button>
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

      <DialogOverlay
        isOpen={showMenuDialog}
        onDismiss={closeMenuDialog}
        style={{ background: "hsla(0, 100%, 100%, 0.9)" }}
      >
        <DialogContent
          className="menu-dialog"
          style={{ boxShadow: "0px 10px 50px hsla(0, 0%, 0%, 0.33)" }}
        >
          {savegames.length === 0 ? (
            <>
              <button onClick={saveHandler}>SAVE GAME</button>
              <button onClick={loadHandler}>LOAD GAME</button>
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
        </DialogContent>
      </DialogOverlay>
    </>
  );
}
