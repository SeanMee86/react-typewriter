import React, {useEffect} from "react";
import TypeWriter from './typewriter';
import PropTypes from 'prop-types';

const TypeOut = (props) => {
    const typeWriter = new TypeWriter(props.lines, props.delay);

    useEffect(() => {
        typeWriter.createLines();
        return () => clearInterval(typeWriter.intervalRef());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            {typeWriter.typeLines()}
        </div>
    )
};

TypeOut.defaultProps = {
    delay: 70
};

TypeOut.propTypes = {
    delay: PropTypes.number,
    lines: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TypeOut;