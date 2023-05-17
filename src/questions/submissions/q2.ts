interface Ship {
  id: number;
  form: number[][];
}

interface ParkResult {
  shipId: number;
  position: number;
  isRotated: boolean;
}

function canFit(parkingSpace: number[][], form: number[][]): boolean {
  return parkingSpace.length >= form.length;
}

function rotate(form: number[][]): number[][] {
  let newForm = form[0].map((_, i) => form.map(row => row[i])).reverse();
  return newForm;
}

function parking(ships: Ship[]): ParkResult[] {
  let result: ParkResult[] = [];
  let parkingSpace: number[][] = []; 
  let position = 0;

  for (let i = 0; i < ships.length; i++) {
      let ship = ships[i];
      let isRotated = false;

      if (!canFit(parkingSpace, ship.form)) {
          ship.form = rotate(ship.form);
          isRotated = true;
      }

      if (!canFit(parkingSpace, ship.form)) {
          position++;
          parkingSpace = [];
      }

      parkingSpace.push(...ship.form);

      result.push({
          shipId: ship.id,
          position: position,
          isRotated: isRotated
      });
  }

  return result;
}

export default parking;
