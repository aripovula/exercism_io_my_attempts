
export class Triangle {
  constructor(level) {
    this.level = level;
  }

  get lastRow() {
    let tr = new Triangle(this.level);
    let twoDArray = tr.rows;
    return twoDArray[twoDArray.length - 1];
  }

  get rows() {
    let rows = [];
    for (let i = 0; i < this.level; i++) {
      rows.push(new Array(i + 1));
      
      for (let j = 0; j < i + 1; j++) {
        if (j == 0 || j == i) {
          rows[i][j] = 1;
        } else {
          rows[i][j] = (rows[i-1][j-1] + rows[i-1][j]);
        }
      }
    }
    // console.log(rows);
    return rows;
  }
}
