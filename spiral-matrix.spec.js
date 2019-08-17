import { SpiralMatrix } from './spiral-matrix';

describe('Spiral Matrix', () => {
  test('empty spiral', () => {
    const expected = [];
    const actual = SpiralMatrix.ofSize(0);

    expect(actual).toEqual(expected);
  });

  test('trivial spiral', () => {
    const expected = [[1]];
    const actual = SpiralMatrix.ofSize(1);

    expect(actual).toEqual(expected);
  });

  test('spiral of size 2', () => {
    const expected = [[1, 2],
      [4, 3]];
    const actual = SpiralMatrix.ofSize(2);

    expect(actual).toEqual(expected);
  });

  test('spiral of size 3', () => {
    const expected = 
      [[1, 2, 3],
      [8, 9, 4],
      [7, 6, 5]];
    const actual = SpiralMatrix.ofSize(3);

    expect(actual).toEqual(expected);
  });

  test('spiral of size 4', () => {
    const expected = 
      [[1, 2, 3, 4],
      [12, 13, 14, 5],
      [11, 16, 15, 6],
      [10, 9, 8, 7]];
    const actual = SpiralMatrix.ofSize(4);

    expect(actual).toEqual(expected);
  });

  test('spiral of size 5', () => {
    const expected = 
      [[1, 2, 3, 4, 5],
      [16, 17, 18, 19, 6],
      [15, 24, 25, 20, 7],
      [14, 23, 22, 21, 8],
      [13, 12, 11, 10, 9]];
    // const actual2 = SpiralMatrix.ofSize(15);       See result below 
    const actual = SpiralMatrix.ofSize(5);

    expect(expected).toEqual(actual);
  });
});

/*

[ 1,   2,    3,   4,   5,  6,   7,   8,   9,   10,  11,  12,  13,  14,  15 ],
[ 56, 57,   58,  59,  60,  61,  62,  63,  64,  65,  66,  67,  68,  69,  16 ],
[ 55, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115,  70,  17 ],
[ 54, 103, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 116,  71,  18 ],
[ 53, 102, 143, 176, 177, 178, 179, 180, 181, 182, 183, 154, 117,  72,  19 ],
[ 52, 101, 142, 175, 200, 201, 202, 203, 204, 205, 184, 155, 118,  73,  20 ],
[ 51, 100, 141, 174, 199, 216, 217, 218, 219, 206, 185, 156, 119,  74,  21 ],
[ 50,  99, 140, 173, 198, 215, 224, 225, 220, 207, 186, 157, 120,  75,  22 ],
[ 49,  98, 139, 172, 197, 214, 223, 222, 221, 208, 187, 158, 121,  76,  23 ],
[ 48,  97, 138, 171, 196, 213, 212, 211, 210, 209, 188, 159, 122,  77,  24 ],
[ 47,  96, 137, 170, 195, 194, 193, 192, 191, 190, 189, 160, 123,  78,  25 ],
[ 46,  95, 136, 169, 168, 167, 166, 165, 164, 163, 162, 161, 124,  79,  26 ],
[ 45,  94, 135, 134, 133, 132, 131, 130, 129, 128, 127, 126, 125,  80,  27 ],
[ 44,  93,  92,  91,  90,  89,  88,  87,  86,  85,  84,  83,  82,  81,  28 ],
[ 43,  42   41,  40,  39,  38,  37,  36,  35,  34,  33,  32,  31,  30,  29 ]
*/