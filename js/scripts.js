var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();

var cells = Array.from(document.getElementsByTagName("td"));
var nextCells = [];
const row = Array.from(document.getElementsByTagName("tr")).length;
var generationNum = document.getElementById("generation-num").innerHTML;

function init() {

    for (var i = 0; i < cells.length; i++) {
        cells[i].classList.remove("alive");
        cells[i].classList.remove("dead");

        var ramTest = Math.random();
        if (ramTest > 0.7) cells[i].classList.add("alive");
    }

    generationNum = 0;

    setInterval(function () {

        for (var i = 0; i < cells.length; i++) {
            var cell = new checkStates(i);
            nextCells[i] = whatNext(cell.state, cell.num());
        }

        for (var i = 0; i < cells.length; i++) {
            if (nextCells[i] === 1) {
                cells[i].classList.remove("dead");
                cells[i].classList.add("alive");
            } else {
                if (cells[i].classList.contains("alive")) {
                    cells[i].classList.remove("alive");
                    cells[i].classList.add("dead");
                }
            }
        }

        generationNum++;
        document.getElementById("generation-num").innerHTML = generationNum;

    }, 100);
}

function checkStates(index) {
    this.state = checkAlive(cells[index]);

    if (index > (row - 1)) {
        this.n = checkAlive(cells[index - row]); //north neighbor
    } else this.n = 0;

    if ((index > (row - 1)) && ((index - (row - 1)) % row)) {
        this.ne = checkAlive(cells[index - row + 1]); //north east neighbor
    } else this.ne = 0;

    if ((index - (row - 1)) % row) {
        this.e = checkAlive(cells[index + 1]); //east neighbor
    } else this.e = 0;

    if ((index < (cells.length - row)) && ((index - (row - 1)) % row)) {
        this.se = checkAlive(cells[index + row + 1]); //south east neighbor
    } else this.se = 0;

    if (index < (cells.length - row)) {
        this.s = checkAlive(cells[index + row]); //south neighbor
    } else this.s = 0;

    if ((index < (cells.length - row)) && (index % row)) {
        this.sw = checkAlive(cells[index + row - 1]); //south weast neighbor
    } else this.sw = 0;

    if (index % row) {
        this.w = checkAlive(cells[index - 1]) //weast neighbor
    } else this.w = 0;

    if ((index > (row - 1)) && (index % row)) {
        this.nw = checkAlive(cells[index - row - 1]); //north weast neighbor
    } else this.nw = 0;

    this.num = function () {
        return this.n + this.ne + this.e + this.se + this.s + this.sw + this.w + this.nw;
    }
};

function checkAlive(element) {
    if (element.classList.contains("alive")) {
        return 1;
    } else return 0;
}

function whatNext(state, num) {
    if (state === 1) {
        if (num < 2) {
            return 0;
        } else if (num > 3) {
            return 0;
        } else return 1;
    }
    if (state === 0) {
        if (num === 3) {
            return 1;
        } else return 0;
    }
}
