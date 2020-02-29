import React, {useState} from "react";

const TypeWriter = function(array, timeDelay) {
    this.newLine = '';
    this.counter = 0;
    this.arrayCounter = 1;
    this.linesArray = array.map(line => line.split(''));

    this.textObj = {};
    this.linesArray.forEach((line, ind) => this.textObj[`line${ind+1}`] = '');
    const [text, setText] = useState(this.textObj);

    this.createLines = () => {
        this.typingInterval = setInterval(() => {
            this.newLine = this.newLine + this.linesArray[this.arrayCounter - 1][this.counter];

            setText((prevState) => {
                return {
                    ...prevState,
                    [`line${this.arrayCounter}`]: this.newLine
                }
            });

            this.counter++;

            if (this.counter >= this.linesArray[this.arrayCounter - 1].length) {
                clearInterval(this.typingInterval);
                if(this.arrayCounter < this.linesArray.length) {
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
        return this.linesArray
            .map((line,ind) => (
                <p key={ind}>{this.printText()[`line${ind+1}`]}</p>
            ));
    };

    this.intervalRef = () => {
        return this.typingInterval
    };
};

export default TypeWriter;