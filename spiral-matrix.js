export class SpiralMatrix {

  static ofSize(size) {
    
    let matrix = new Array(size);    
    for (let i = 0; i < size; i++ ) {
      matrix[i] = new Array(size);
    }

    let direction = 'right';

    let x = 0, y = 0, sqrd = size * size;
    for (let i = 0; i < sqrd; i++) {
      
      if (direction == 'right') {
        matrix[y][x] = i + 1;
        x++;
        if ( x == size || matrix[y][x] > 0 ) {
          x--; y++; direction = 'down';
        }
      } else if (direction == 'down') {
        matrix[y][x] = i + 1;
        y++;
        if ( y == size || matrix[y][x] > 0 ) {
          y--; x--; direction = 'left';
        }
      } else if (direction == 'left') {
        matrix[y][x] = i + 1;
        x--;
        if ( x == -1 || matrix[y][x] > 0 ) {
          x++; y--; direction = 'up';
        }
      } else if (direction == 'up') {
        matrix[y][x] = i + 1;
        y--;
        if ( y == -1 || matrix[y][x] > 0 ) {
          x++; y++; direction = 'right';
        }
      }
    }
    console.log(matrix);
    return matrix;
  }

}
