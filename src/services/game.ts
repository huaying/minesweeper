import { MINE } from "../config";
import { CellEvent, CellState, GameState } from "../constants";

class CellStateMap extends Map<string, CellState> {
  get(key: string): CellState {
    return super.get(key) || CellState.OFF;
  }
}

export class GameService {
  private numRows: number;
  private numCols: number;
  private numMines: number;
  private mineMap: Map<string, number> | null;
  private cellStateMap: CellStateMap;
  private flagRemaining: number;
  private gameState: GameState;

  constructor(numRows: number, numCols: number, numMines: number) {
    this.numRows = numRows;
    this.numCols = numCols;
    this.numMines = numMines;
    this.mineMap = null;
    this.cellStateMap = new CellStateMap();
    this.flagRemaining = numMines;
    this.gameState = GameState.ON_GOING;
  }

  public getBoard() {
    return new Array(this.numRows).fill(null).map((_, x) =>
      new Array(this.numCols).fill(null).map((_, y) => {
        return {
          state: this.cellStateMap.get(`${x},${y}`),
          value: this.mineMap?.get(`${x},${y}`) || 0,
        };
      })
    );
  }

  public getGameState() {
    return this.gameState;
  }

  public dispatchEvent(event: CellEvent, x: number, y: number) {
    if (event === CellEvent.CLICK) {
      if (this.mineMap === null) {
        this.generateMines(x, y);
      }

      this.uncoverCell(x, y);
    } else if (event === CellEvent.RIGHT_CLICK) {
      this.flagCell(x, y);
    } else if (event === CellEvent.DB_CLICK) {
      this.expandCell(x, y);
    }

    this.updateGameState();
  }

  public startOver() {
    this.mineMap = null;
    this.cellStateMap = new CellStateMap();
    this.flagRemaining = this.numMines;
    this.gameState = GameState.ON_GOING;
  }

  private updateGameState() {
    if (
      Array.from(this.cellStateMap).some(
        ([key, cellState]) =>
          cellState === CellState.ON && this.mineMap?.get(key) === MINE
      )
    ) {
      this.gameState = GameState.LOST;
    } else if (
      this.cellStateMap.size === this.numRows * this.numCols &&
      Array.from(this.cellStateMap.values()).every(
        (cellState) => cellState !== CellState.OFF
      )
    ) {
      this.gameState = GameState.WIN;
    }
  }

  private getNeighbors(x: number, y: number) {
    const neighbors: [number, number][] = [];
    [-1, 0, 1].forEach((i) => {
      [-1, 0, 1].forEach((j) => {
        if (i == 0 && j == 0) {
          return;
        }
        const nx = x + i;
        const ny = y + j;

        if (nx >= 0 && nx < this.numRows && ny >= 0 && ny < this.numCols) {
          neighbors.push([nx, ny]);
        }
      });
    });
    return neighbors;
  }

  private generateMines(initX: number, initY: number) {
    const coordinates: [number, number][] = [];
    for (let i = 0; i < this.numRows; i++) {
      for (let j = 0; j < this.numRows; j++) {
        if (initX !== i || initY !== j) {
          coordinates.push([i, j]);
        }
      }
    }

    const mines: [number, number][] = [];
    for (let i = 0; i < this.numMines; i++) {
      const remaining = coordinates.length - i;
      const randomIdx = Math.floor(Math.random() * remaining);

      mines.push(coordinates[randomIdx]);

      [coordinates[remaining - 1], coordinates[randomIdx]] = [
        coordinates[randomIdx],
        coordinates[remaining - 1],
      ];
    }

    const mineMap = new Map(mines.map(([x, y]) => [`${x},${y}`, MINE]));

    mines.forEach(([x, y]) => {
      this.getNeighbors(x, y).forEach(([nx, ny]) => {
        if (mineMap.get(`${nx},${ny}`) !== MINE) {
          mineMap.set(`${nx},${ny}`, (mineMap.get(`${nx},${ny}`) ?? 0) + 1);
        }
      });
    });

    this.mineMap = mineMap;
  }

  private uncoverCell(x: number, y: number) {
    if (
      this.cellStateMap.get(`${x},${y}`) === CellState.ON ||
      this.mineMap === null
    ) {
      return;
    }

    this.cellStateMap.set(`${x},${y}`, CellState.ON);

    if (this.mineMap.get(`${x},${y}`) === undefined) {
      this.getNeighbors(x, y).forEach(([nx, ny]) => this.uncoverCell(nx, ny));
    }
  }

  private expandCell(x: number, y: number) {
    if (this.mineMap === null) {
      return;
    }
    const neighbors = this.getNeighbors(x, y);

    const flagCount = neighbors.filter(
      ([nx, ny]) => this.cellStateMap.get(`${nx},${ny}`) === CellState.FLAG
    ).length;

    if (flagCount === this.mineMap.get(`${x},${y}`)) {
      neighbors.forEach(([nx, ny]) => this.uncoverCell(nx, ny));
    }
  }

  private flagCell(x: number, y: number) {
    if (
      this.cellStateMap.get(`${x},${y}`) === CellState.OFF &&
      this.flagRemaining > 0
    ) {
      this.cellStateMap.set(`${x},${y}`, CellState.FLAG);
      this.flagRemaining--;
    } else if (this.cellStateMap.get(`${x},${y}`) === CellState.FLAG) {
      this.cellStateMap.set(`${x},${y}`, CellState.OFF);
      this.flagRemaining++;
    }
  }
}
