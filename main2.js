

let O = [];// стек - поиск в глубину
let C = new Set();// set для уникальных значений

let x;

let maxMemory = 8;


let depth = 1;
let currentDepth = 0;


class Round {
    constructor(color) {
        this.color = color;
    }
}

class Hexagon {
    constructor(size, parent, evr) {
        if (size == 3) {
            this.size = size;
            this.n = 5;
            this.m = 9;
            this.parent = parent;
            this.number = 0;
            this.depth = currentDepth;
            this.f = 0;
            this.worstChildren = null;
        }

        this.arr = Array(this.n).fill(null).map(() => Array(this.m));

        //if (evr == 0) this.f = 0;
        //else this.f = this.getMark(this.n, this.m, this.arr);

    }

    getMark(n, m, arr, depth) {
        let i1, i2, j1, j2;

        //находим координаты начального кружочка
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {

                if (arr[i][j] != null && arr[i][j].color == "red") {
                    i1 = i;
                    j1 = j;
                }
            }
        }
        //находим координаты конечного кружочка
        for (let i = 0; i < aim.n; i++) {
            for (let j = 0; j < aim.m; j++) {
                if (aim.arr[i][j] != null && aim.arr[i][j].color == "red") {
                    i2 = i;
                    j2 = j;
                }
            }
        }

        let evr = 0, f = 0;
        evr = Math.ceil(Math.abs(aim.arr[i2][j2].number - arr[i1][j1].number) / 5.0);//разница между номерками
        f = evr + depth;
        return f;

    }


    getMark1(n, m, arr) {
        let i1, i2, j1, j2;

        //находим координаты начального кружочка
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {

                if (arr[i][j] != null && arr[i][j].color == "red") {
                    i1 = i;
                    j1 = j;
                }
            }
        }
        //находим координаты конечного кружочка
        for (let i = 0; i < aim.n; i++) {
            for (let j = 0; j < aim.m; j++) {
                if (aim.arr[i][j] != null && aim.arr[i][j].color == "red") {
                    i2 = i;
                    j2 = j;
                }
            }
        }

        let f = 0;
        let temp = 0;
        temp = Math.abs(i2 - i1) / 2;
        if (Number.isInteger(temp)) {
            f += temp;
        } else {
            f += Math.ceil(temp);
            j1++;
        }

        temp = Math.abs(j2 - j1);
        f += Math.ceil(temp / 2);

        return f;

    }

    duplicate(old) {
        this.arr = JSON.parse(JSON.stringify(old.arr));
    }
    create() {
        this.fill();
        this.paintRandomRound();
        this.drawField();

        this.f = this.getMark(this.n, this.m, this.arr, this.depth);
    }

    create_aim() {
        this.fill();
        this.paintCenterRound();
    }

    fill() {
        let counter = 0;
        let orderNumber = 1;
        for (let i = 0; i < this.n; i++) {
            for (let j = 0; j < this.m; j++) {
                //первая и последняя строчка
                if (i == 0 || i == this.n - 1) {
                    if (j == 0 || j == 1 || j == this.m - 1 || j == this.m - 2 || counter == 1) {
                        counter = 0;
                    }
                    else {
                        this.arr[i][j] = new Round("green");
                        this.arr[i][j].number = orderNumber;
                        orderNumber++;
                        counter = 1;
                    }
                }
                //вторая и 4 строчка
                else if (i == 1 || i == this.n - 2) {
                    if (j == 0 || j == this.m - 1 || counter == 1) {
                        counter = 0;
                    }
                    else {
                        this.arr[i][j] = new Round("green");
                        this.arr[i][j].number = orderNumber;
                        orderNumber++;
                        counter = 1;
                    }
                }
                //центральная строчка
                else if (i == 2) {
                    if (counter == 1) {
                        counter = 0;
                    }
                    else {
                        this.arr[i][j] = new Round("green");
                        this.arr[i][j].number = orderNumber;
                        orderNumber++;
                        counter = 1;
                    }
                }

            }
        }
    }

    paintRandomRound() {
        // let ok = 0;
        // do {
        //     let i = Math.floor(Math.random() * this.n);
        //     let j = Math.floor(Math.random() * this.m);
        //     if (this.arr[i][j] != null && i != 2 && j != 4) {
        //         this.arr[i][j].color = "red";
        //         ok = 1;
        //     }
        // } while (ok != 1)


        //this.arr[4][4].color = "red"
        this.arr[2][0].color = "red"

    }

    paintCenterRound() {

        //this.arr[2][4].color = "red"
        //this.arr[0][2].color = "red"
        this.arr[2][8].color = "red"

    }

    drawField() {
        // Получение элемента canvas, контекста и свойства Math.PI
        let canvas = document.getElementById('drawRound');
        let ctx = canvas.getContext('2d');
        let pi = Math.PI;
        let y = 30;
        for (let i = 0; i < this.n; i++) {
            let x = 30;

            for (let j = 0; j < this.m; j++) {
                if (this.arr[i][j] == null) {
                    x += 10;
                } else {
                    ctx.beginPath();
                    ctx.lineWidth = 7;
                    ctx.strokeStyle = this.arr[i][j].color;
                    ctx.fillStyle = this.arr[i][j].color;
                    ctx.arc(x, y, 5, 0, 2 * pi, true);
                    ctx.stroke();
                    ctx.fill();

                    x += 10;
                }
            }

            y += 15;
        }

    }
}

let generateChildrenClockwise = () => {
    let indexes = [5, 6, 9, 10, 11, 14, 15];

    for (let i = 0; i < x.n; i++) {
        for (let j = 0; j < x.m; j++) {
            if (x.arr[i][j] != null) {
                if (indexes.indexOf(x.arr[i][j].number) != -1) {
                    let newChildren = new Hexagon(3, x);
                    newChildren.duplicate(x);

                    let mass = [];
                    mass.push(x.arr[i][j - 2].color,
                        x.arr[i - 1][j - 1].color,
                        x.arr[i - 1][j + 1].color,
                        x.arr[i][j + 2].color,
                        x.arr[i + 1][j + 1].color,
                        x.arr[i + 1][j - 1].color
                    );

                    let counter = 0;
                    newChildren.arr[i - 1][j - 1].color = mass[counter]; counter++;
                    newChildren.arr[i - 1][j + 1].color = mass[counter]; counter++;
                    newChildren.arr[i][j + 2].color = mass[counter]; counter++;
                    newChildren.arr[i + 1][j + 1].color = mass[counter]; counter++;
                    newChildren.arr[i + 1][j - 1].color = mass[counter]; counter++;
                    newChildren.arr[i][j - 2].color = mass[counter];

                    newChildren.f = newChildren.getMark(newChildren.n, newChildren.m, newChildren.arr, newChildren.depth);

                    console.log("новый ребенок");
                    console.log(newChildren);

                    let notInO = !O.find(i => JSON.stringify(i.arr) === JSON.stringify(newChildren.arr));
                    let notInC = !isInSet(newChildren.arr);

                    if (notInO && notInC && O.length < maxMemory) {

                        O.push(newChildren);//если память ещё свободна и узла нет ни в O, ни в C

                    }
                    else if (O.length == maxMemory && notInC) {

                        let index = -1;
                        index = findTheSameInOpen(newChildren);//индекс найденного элемент с такой же f, но с большей глубиной

                        if (index != -1) {
                            O[index].parent.worstChildren = O[index];
                            O.splice(index, 1);
                            O.push(newChildren);//если такой нашли
                        }
                        else {
                            //ищем элемент с самой большой эвристикой
                            index = findWorstInOpen();
                            if (O[index].f > newChildren.f) { //если новый элемент лучше чем самый худший в O
                                O[index].parent.worstChildren = O[index];
                                O.splice(index, 1);
                                O.push(newChildren);//если такой нашли
                            }
                        }

                    }


                }
            }

        }
    }


}

let findWorstInOpen = () => {

    //находим элемент с худшей эвристикой
    let maxEvr = 0;
    let elemIndex = -1;

    O.forEach(function (item, i, arr) {
        if (item.f > maxEvr) {
            maxEvr = item.f;
            elemIndex = i;
        }
    });

    return elemIndex;
}

findTheSameInOpen = (newChildren) => {

    //находим элемент с такой же эвристикой и самый старый (с min глубиной)
    let minDepth = 99999;
    let needElemIndex = -1;

    O.forEach(function (item, i, arr) {
        if (isIqualMass(newChildren.arr, item.arr, newChildren.n, newChildren.m) && item.f === newChildren.f && item.depth > newChildren.depth && item.depth < minDepth) {
            minDepth = item.depth;
            needElemIndex = i;
        }
    });

    return needElemIndex;
}

let generateChildrenCounterClockwise = () => {

    let indexes = [5, 6, 9, 10, 11, 14, 15];

    for (let i = 0; i < x.n; i++) {
        for (let j = 0; j < x.m; j++) {
            if (x.arr[i][j] != null) {
                if (indexes.indexOf(x.arr[i][j].number) != -1) {
                    let newChildren = new Hexagon(3, x);
                    newChildren.duplicate(x);

                    let mass = [];
                    mass.push(x.arr[i][j - 2].color,
                        x.arr[i - 1][j - 1].color,
                        x.arr[i - 1][j + 1].color,
                        x.arr[i][j + 2].color,
                        x.arr[i + 1][j + 1].color,
                        x.arr[i + 1][j - 1].color
                    );

                    let counter = 0;
                    newChildren.arr[i + 1][j - 1].color = mass[counter]; counter++;
                    newChildren.arr[i][j - 2].color = mass[counter]; counter++;
                    newChildren.arr[i - 1][j - 1].color = mass[counter]; counter++;
                    newChildren.arr[i - 1][j + 1].color = mass[counter]; counter++;
                    newChildren.arr[i][j + 2].color = mass[counter]; counter++;
                    newChildren.arr[i + 1][j + 1].color = mass[counter]; counter++;


                    newChildren.f = newChildren.getMark(newChildren.n, newChildren.m, newChildren.arr, newChildren.depth);

                    console.log("новый ребенок");
                    console.log(newChildren);

                    let notInO = !O.find(i => JSON.stringify(i.arr) === JSON.stringify(newChildren.arr));
                    let notInC = !isInSet(newChildren.arr);

                    if (notInO && notInC && O.length < maxMemory) {

                        O.push(newChildren);//если память ещё свободна и узла нет ни в O, ни в C

                    }
                    else if (O.length == maxMemory && notInC) {

                        let index = -1;
                        index = findTheSameInOpen(newChildren);//индекс найденного элемент с такой же f, но с большей глубиной

                        if (index != -1) {
                            O[index].parent.worstChildren = O[index];
                            O.splice(index, 1);
                            O.push(newChildren);//если такой нашли
                        }
                        else {
                            //ищем элемент с самой большой эвристикой
                            index = findWorstInOpen();
                            if (index != -1 && O[index].f > newChildren.f) { //если новый элемент лучше чем самый худший в O
                                O[index].parent.worstChildren = O[index];
                                O.splice(index, 1);
                                O.push(newChildren);//если такой нашли
                            }
                        }

                    }



                }
            }

        }
    }
}

let procedureP = () => {
    //генерируем детей против часовой стрелки
    generateChildrenCounterClockwise();

    //генерируем детей по часовой стрелке
    generateChildrenClockwise();
}

let isIqualMass = (init, aim, n, m) => {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (init[i][j] != null) {
                if (init[i][j].color != aim[i][j].color) return false;
            }

        }
    }

    return true;
}

let isInSet = (array2) => {
    let is = 0;
    C.forEach(function (value, valueAgain, set) {
        //console.log("ну что" + !isIqualMass(value.arr, array2, value.n, value.m));
        if (isIqualMass(value.arr, array2, value.n, value.m)) {
            is = 1;
            return;
        }
    })
    //console.log(is);
    return is;
}

let sortAsc = () => {
    O.sort(function (elem, elem2) {
        return elem.f - elem2.f;
    })
}

let maybeIsEnd = (f) => {

    O.forEach(function (item, i, arr) {
        if (item.f < f) return item;
    });

    C.forEach(function (item, i, arr) {
        if (item.f < f) return item;
    });

    return null;
}

let play = () => {

    O.push(initial);
    currentDepth = 0;

    while (O.length != 0) {
        x = O.shift();
        iterations++;
        console.log("раскрываем элемент" + x);
        console.log(x);

        if (isIqualMass(x.arr, aim.arr, x.n, x.m)) {
            if (maybeIsEnd(x.f) == null) {
                time = performance.now() - time;
                console.log('Время выполнения = ', time);
                console.log("Количество итераций = ", iterations);
                success(x);
                return 1;
            } else {
                O.push(maybeIsEnd(x.f));
                continue;
            }

        }
        C.add(x);
        currentDepth = x.depth + 1; // увеличиваем грубину для детей

        procedureP();
        sortAsc();

    }
    return 0;

}

let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let success = async (end) => {

    let first = end;
    let family = [];
    let ok = 0;
    while (ok == 0) {
        family.push(first);
        first = first.parent;

        if (first == null) {
            ok = 1;
        }
    }

    let canvas = document.getElementById('drawRound');
    let ctx = canvas.getContext('2d');

    console.log("результат")
    for (let i = family.length - 1; i >= 0; i--) {

        console.log(family[i])
        //console.log("отрисовать")
        ctx.clearRect(0, 0, 600, 300);
        family[i].drawField();
        await sleep(2000);

    }



}

let iterations = 0;

var time = performance.now();
let aim = new Hexagon(3, null, 0);
aim.create_aim();
//console.log(aim);

let initial = new Hexagon(3, null, 1);
initial.create();
//console.log(initial);

play();





//console.log(depth);




