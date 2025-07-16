import castleEnemy1 from "./castle--enemy1.svg";
import castleEnemy2 from "./castle--enemy2.svg";
import castleEnemy3 from "./castle--enemy3.svg";
import castlePlayer from "./castle--player.svg";
import towerEnemy1 from "./tower--enemy1.svg";
import towerEnemy2 from "./tower--enemy2.svg";
import towerEnemy3 from "./tower--enemy3.svg";
import towerPlayer from "./tower--player.svg";

import forest from "./forest.svg";
import lake from "./lake.svg";
import mountain from "./mountain.svg";

export const tileAssets = {
  terrain: {
    forest,
    lake,
    mountain,
  },
  buildings: {
    tower: {
      player: towerPlayer,
      enemy1: towerEnemy1,
      enemy2: towerEnemy2,
      enemy3: towerEnemy3,
    },
    castle: {
      player: castlePlayer,
      enemy1: castleEnemy1,
      enemy2: castleEnemy2,
      enemy3: castleEnemy3,
    },
    citadel: {
      player: castlePlayer,
      enemy1: castleEnemy1,
      enemy2: castleEnemy2,
      enemy3: castleEnemy3,
    },
  },
};
