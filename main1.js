

let O = [];// стек - поиск в глубину
let C = new Set();// set для уникальных значений

let x;


let depth = 1;
let currentDepth = 0;


class Round {
    constructor(color) {
        this.color = color;
    }
}

class Hexagon {
    constructor(size, parent) {
        if (size == 3) {
            this.size = size;
            this.n = 5;
            this.m = 9;
            this.parent = parent;
            this.number = 0;
            this.depth = currentDepth;
        }

        this.arr = Array(this.n).fill(null).map(() => Array(this.m));
    }

    duplicate(old) {
        this.arr = JSON.parse(JSON.stringify(old.arr));
    }
    create() {
        this.fill();
        this.paintRandomRound();
        this.drawField();
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
        this.arr[0][2].color = "red"

    }

    paintCenterRound() {

        //this.arr[2][4].color = "red"
        //this.arr[4][4].color = "red"
        this.arr[4][6].color = "red"

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


                    let notInO = !O.find(i => JSON.stringify(i.arr) === JSON.stringify(newChildren.arr));
                    let notInC = !isInSet(newChildren.arr);

                    if (notInO && notInC) {
                        O.push(newChildren);
                    }

                }
            }

        }
    }


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

                    let notInO = !O.find(i => JSON.stringify(i.arr) === JSON.stringify(newChildren.arr));
                    let notInC = !isInSet(newChildren.arr);

                    if (notInO && notInC) {
                        O.push(newChildren);
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

let play = () => {

    O.push(initial);
    currentDepth = 0;

    while (O.length != 0) {
        x = O.pop();
        iterations++;
        if (isIqualMass(x.arr, aim.arr, x.n, x.m)) {
            time = performance.now() - time;
            console.log('Время выполнения = ', time);
            console.log("Количество итераций = ", iterations);
            success(x);
            return 1;
        }
        if (x.depth != depth) C.add(x);
        currentDepth = x.depth + 1; // увеличиваем грубину для детей
        if (currentDepth <= depth) procedureP();
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

    for (let i = family.length - 1; i >= 0; i--) {
        console.log(family[i])
        console.log("отрисовать")
        ctx.clearRect(0, 0, 600, 300);
        family[i].drawField();
        await sleep(2000);

    }



}


let iterations = 0;
var time = performance.now();
let initial = new Hexagon(3, null);
initial.create();
console.log(initial);

let aim = new Hexagon(3, null);
aim.create_aim();
console.log(aim);

let ok = 0;
do {
    O = [];
    C = new Set();
    if (play()) ok = 1;
    else depth++;
} while (ok == 0);



console.log(depth);





