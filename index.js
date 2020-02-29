import React, {useEffect} from "react";
import TypeWriter from './typewriter';
import PropTypes from 'prop-types';

const TypeOut = (props) => {
    const typeWriter = new TypeWriter(props.children, props.delay);

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
};

export default TypeOut;