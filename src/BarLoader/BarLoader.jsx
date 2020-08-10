import React, { useEffect } from 'react';
import uuid from 'uuid/v4';
import './BarStyle.scss';

const COMP_ID =
    'bar-' +
    uuid()
        .toString()
        .replace(new RegExp('-', 'g'), '_');

const BarStyle = {
    bar: 'bar',
    outerWrapper: 'outerWrapper',
    outerWrapperBaseBar: 'outerWrapperBaseBar',
    barStyle1: 'barStyle1',
    barStyle2: 'barStyle2',
};

const BarLoader = props => {
    useEffect(() => {
        let width = props.width === undefined ? 100 : props.width;
        let height = props.height === undefined ? 4 : props.height;
        let color = props.color === undefined ? '#ffffff' : props.color;
        let el = document.querySelector(`#${COMP_ID}_wrapper`);
        if (el !== undefined && el !== null) {
            el.style.width = width;
            el.style.height = height;
        }
        el = document.querySelector(`#${COMP_ID}_baseBar`);
        if (el !== undefined && el !== null) {
            el.style.width = width;
            el.style.height = height;
            el.style.backgroundColor = color;
        }
        el = document.querySelector(`#${COMP_ID}_barStyle1`);
        if (el !== undefined && el !== null) {
            el.style.height = height;
            el.style.backgroundColor = color;
        }
        el = document.querySelector(`#${COMP_ID}_barStyle2`);
        if (el !== undefined && el !== null) {
            el.style.height = height;
            el.style.backgroundColor = color;
        }
    });
    return (
        <div id={COMP_ID} className={BarStyle.bar}>
            <div id={COMP_ID + '_wrapper'} className={BarStyle.outerWrapper}>
                <div id={COMP_ID + '_baseBar'} className={BarStyle.outerWrapperBaseBar} />
                <div id={COMP_ID + '_barStyle1'} className={BarStyle.barStyle1} />
                <div id={COMP_ID + '_barStyle2'} className={BarStyle.barStyle2} />
            </div>
        </div>
    );
};

export default BarLoader;
