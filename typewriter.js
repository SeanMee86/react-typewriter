import React, {useState} from "react";

const TypeWriter = function(array, timeDelay) {
    this.newLine = '';
    this.counter = 0;
    this.arrayCounter = 1;
    this.linesArray = array.map(el => el.props !== undefined ? el.props.children : el);
    this.charsArray = this.linesArray.map(line => line.split(''));

    this.textObj = {};
    this.charsArray.forEach((line, ind) => this.textObj[`line${ind+1}`] = '');
    const [text, setText] = useState(this.textObj);

    this.createLines = () => {
        this.typingInterval = setInterval(() => {
            this.newLine = this.newLine + this.charsArray[this.arrayCounter - 1][this.counter];

            setText((prevState) => {
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
        }, timeDelay);
    };

    this.printText = () => {
        return text;
    };

    this.typeLines = () => {
        return this.charsArray
            .map((line,ind) => {
                const CustomTag = `${array[ind].type}`;
                return (
                    <CustomTag key={ind}>{this.printText()[`line${ind+1}`]}</CustomTag>
                )
            });
    };

    this.intervalRef = () => {
        return this.typingInterval
    };
};

export default TypeWriter;