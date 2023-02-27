// Game: Find yoyr hat (from Codecademy)

// require user prompts node module
// ({sigint: true}) or "signal interrupt" to make sure an user can exit the program with Ctrl + C
const prompt = require('prompt-sync')({sigint: true})

// helper constant variables
const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field=[[]]) {
        this.field = field
        // init character location
        this.field[0][0] = pathCharacter
        // init starting locations
        this.locationX = 0
        this.locationY = 0
        this._isGameActive = true
    }

    print() {
        console.clear()
        console.log(this.field.join('\n'))
        // this.field.forEach(x => console.log(x.join('')));
    }

    static generateField(height, width, percent=0.2) {
        this.height = height
        this.width = width
        // 2D field geneartion using `.map` as nested loop for rows
        // for columns `.fill` is empty since we don't need any values here, but for rows we fill it with field sign
        const field = Array(height).fill().map(() => Array(width).fill(fieldCharacter))

        const hatLocation = {
            x: Math.floor(1+Math.random() * (width-1)),
            y: Math.floor(1+Math.random() * (height-1))
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < height; x++) {
                const prob = Math.random()
                field[y][x] =  prob > percent ? fieldCharacter : hole
            }
        }
        // put hat on the field
        field[hatLocation.y][hatLocation.x] = hat

        return field
    }

    move() {
        console.log(`Coordinates Y:${[this.locationY]} X:${[this.locationX]}`)
        console.log('Press W A S D to move your character. Press Q to exit')
        let input = prompt('> ').toUpperCase()
        switch (input) {
            case 'W':
                this.locationY -= 1
                break
            case 'S':
                this.locationY += 1
                break
            case 'A':
                this.locationX -= 1
                break                
            case 'D':
                this.locationX += 1
                break
            case 'Q':
                console.log('Bye!')
                this._isGameActive = false
                break
            default:
                // console.log(input)
                console.log('Only W A S D buttons is allowed')
        }
    }

    checkBorders() {
        if (this.locationY <= 0) {
            this.locationY = 0
        }
        if (this.locationY >= this.field.length) {
            this.locationY = this.field.length-1
        }
        if (this.locationX <= 0) {
            this.locationX = 0
        }
        if (this.locationX >= this.field[0].length) {
            this.locationX = this.field[0].length-1
        }        
    }

    isHole() {
        return this.field[this.locationY][this.locationX] === hole
    }

    isHat() {
        return this.field[this.locationY][this.locationX] === hat
    }

    play() {
        while (this._isGameActive) {
            let tempX = this.locationY, tempY = this.locationX
            this.print()
            // One way to put every moving features to `.move` method, but there would be lots of repetitions
            this.move()
            this.checkBorders()

            if (this.isHole()) {
                console.log('Wow! you fell down into the hole. Try again.')
                this._isGameActive = false
                break
            } else if (this.isHat()) {
                console.log("You've found a hat! Congratz!")
                this._isGameActive = false
                break
            }
            // Else the move is possible. Update player's location with pathCharacter sign
            // Hide previous character path by field sign
            this.field[tempX][tempY] = fieldCharacter
            this.field[this.locationY][this.locationX] = pathCharacter
        }
    }
}

const newField = Field.generateField(6, 6)
const myField = new Field(newField)
myField.play()
 