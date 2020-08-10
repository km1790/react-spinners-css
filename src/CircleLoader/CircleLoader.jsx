import React, { useEffect } from 'react';
import uuid from 'uuid/v4';
import './CircleStyle.scss';

const COMP_ID =
    'circle-' +
    uuid()
        .toString()
        .replace(new RegExp('-', 'g'), '_');

const CircleStyle = {
    circleSpinner: 'circleSpinner',
    outerWrapper: 'outerWrapper',
    circle1: 'circle1',
    circle2: 'circle2',
    circle3: 'circle3',
    circle4: 'circle4',
    circle5: 'circle5',
};

const CircleLoader = props => {
    useEffect(() => {
        let size = props.size === undefined ? 100 : props.size;
        let color = props.color === undefined ? '#ffffff' : props.color;
        let outerElement = document.querySelector(`#${COMP_ID}`);
        if (outerElement !== undefined && outerElement !== null) {
            outerElement.style.width = `${size}px`;
            outerElement.style.height = `${size}px`;
        }
        for (let i = 1; i <= 5; i++) {
            let circleEl = document.querySelector(`#${COMP_ID}_circle${i}`);
            if (circleEl !== undefined && circleEl !== null) {
                circleEl.style.borderColor = color;
            }
        }
    });
    return (
        <div className={CircleStyle.circleSpinner}>
            <div id={COMP_ID} className={CircleStyle.outerWrapper}>
                <div id={COMP_ID + '_circle1'} className={CircleStyle.circle1} />
                <div id={COMP_ID + '_circle2'} className={CircleStyle.circle2} />
                <div id={COMP_ID + '_circle3'} className={CircleStyle.circle3} />
                <div id={COMP_ID + '_circle4'} className={CircleStyle.circle4} />
                <div id={COMP_ID + '_circle5'} className={CircleStyle.circle5} />
            </div>
        </div>
    );
};

export default CircleLoader;
