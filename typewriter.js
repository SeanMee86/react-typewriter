import React, {useState} from "react";

class TypeWriter{
    constructor(array, timeDelay){
        !Array.isArray(array) ? this.array = [array] : this.array = array;
        this.timeDelay = timeDelay;
        this.newLine = '';
        this.counter = 0;
        this.arrayCounter = 1;
        this.linesArray = this.array.map(el => el.props !== undefined ? el.props.children : el);
        this.charsArray = this.linesArray.map(line => line.split(''));

        this.textObj = {};
        this.charsArray.forEach((line, ind) => this.textObj[`line${ind+1}`] = '');
        [this.text, this.setText] = useState(this.textObj);
    }

    createLines = () => {
        this.typingInterval = setInterval(() => {
            this.newLine = this.newLine + this.charsArray[this.arrayCounter - 1][this.counter];
            this.setText((prevState) => {
                return {
                    ...prevState,
                    [`line${this.arrayCounter}`]: this.newLine
                }
            });
            this.counter++;
            if (this.counter >= this.charsArray[this.arrayCounter - 1].length) {
                clearInterval(this.typingInterval);
                if(this.arrayCounter < this.charsArray.length) {
                    this.newLine = '';
                    this.counter = 0;
                    this.arrayCounter++;
                    this.createLines();
                }
            }
        }, this.timeDelay);
    };

    printText = () => this.text;

    typeLines = () => this.charsArray
        .map((line,ind) => {
            const CustomTag = `${this.array[ind].type ? this.array[ind].type : 'p'}`;
            return (
                <CustomTag key={ind}>{this.printText()[`line${ind+1}`]}</CustomTag>
            )
        });

    intervalRef = () => this.typingInterval
}

export default TypeWriter;