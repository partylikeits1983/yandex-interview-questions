function parking(ships) {
    const parkResult = [];
    const width = ships[0].form[0].length;
    const parkingLot = Array(width).fill(null).map(() => Array());
  
    for (const ship of ships) {
      let rotated = false;
  
      for (let position = 0; position <= width - ship.form.length; position++) {
        if (isSpaceAvailable(parkingLot, position, ship.form.length)) {
          parkShip(parkingLot, position, ship.form.length, ship.id);
          parkResult.push({
            shipId: ship.id,
            position: position + 1,
            isRotated: false
          });
          break;
        }
      }
  
      if (parkResult.length < ships.length && !rotated) {
        rotated = true;
        const rotatedForm = rotateShipForm(ship.form);
  
        for (let position = 0; position <= width - rotatedForm.length; position++) {
          if (isSpaceAvailable(parkingLot, position, rotatedForm.length)) {
            parkShip(parkingLot, position, rotatedForm.length, ship.id);
            parkResult.push({
              shipId: ship.id,
              position: position + 1,
              isRotated: true
            });
            break;
          }
        }
      }
    }
  
    return parkResult;
  }
  
  function isSpaceAvailable(parkingLot, position, length) {
    for (let i = 0; i < length; i++) {
      if (parkingLot[position + i].length > 0) {
        return false;
      }
    }
    return true;
  }
  
  function parkShip(parkingLot, position, length, shipId) {
    for (let i = 0; i < length; i++) {
      parkingLot[position + i].push(shipId);
    }
  }
  
  function rotateShipForm(form) {
    const rotatedForm = [];
    const rows = form.length;
    const cols = form[0].length;
  
    for (let j = 0; j < cols; j++) {
      const row = [];
      for (let i = rows - 1; i >= 0; i--) {
        row.push(form[i][j]);
      }
      rotatedForm.push(row);
    }
  
    return rotatedForm;
  }
  
  module.exports = parking;
  