
function knightMoves(begin, end) {
  function vertex(r, c, d, p) {
    let row, col, distance, pre;
    if (r >= 0 && r <= 7 && c >= 0 && c <= 7) {
      row = r;
      col = c;
      distance = d;
      pre = p;
    }
    return { row, col, distance, pre };
  }

  const moves = [
    [-2, -1],
    [-2, 1],
    [-1, 2],
    [1, 2],
    [2, 1],
    [2, -1],
    [1, -2],
    [-1, -2],
  ];

  function getMoves(row, col) {
    let movesArr = [];

    for (m of moves) {
      let [r, c] = m;

      let newR = row + r;
      let newC = col + c;

      movesArr.push([newR, newC]);
    }

    return movesArr;
  }

  function pathList(vertex) {
    let list = [];

    function createList(obj) {
      if (obj === null) {
        return;
      }
      list.push([obj.row, obj.col]);
      createList(obj.pre);
    }
    createList(vertex);
    return list.reverse();
  }

  function shortestPath(sourceRow, sourceCol, targetRow, targetCol) {
    const queue = [];

    let start = vertex(sourceRow, sourceCol, 0, null);
    let visited = new Set();

    queue.push(start);

    while (queue.length !== 0) {
      //dequeue vertex

      let vert = queue.shift();

      let { row, col, distance } = vert;

      //process vertex
      if (row === targetRow && col === targetCol) {
        return { distance, vert };
      }
      visited.add(`${row}, ${col}`);

      //add neighbours
      let neighbours = getMoves(row, col);

      for (n of neighbours) {
        let [nRow, nCol] = n;

        let nVert = vertex(nRow, nCol, distance + 1, vert);

        if (visited.has(`${nRow}, ${nCol}`)) continue;

        queue.push(nVert);
      }
    }
  }

  function message(obj) {
    let res = `You made it in ${obj.distance} moves!  Here's your path:`;

    console.log(res);
    console.log(pathList(obj.vert));
  }

  let [startR, startC] = begin;
  let [endR, endC] = end;

  let shortestP = shortestPath(startR, startC, endR, endC);

  message(shortestP);
}

knightMoves([0, 0], [1, 2]);
