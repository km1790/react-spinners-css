import React, { useEffect } from 'react';
import uuid from 'uuid/v4';
import './PacmanStyle.scss';

const COMP_ID =
    'pacman-' +
    uuid()
        .toString()
        .replace(new RegExp('-', 'g'), '_');
const PacmanStyle = {
    namespace: 'pacman_spinner',
    pacman_medium: 'pacman_medium',
    pacman_small: 'pacman_small',
    pacman_large: 'pacman_large',
    outerWrapper: 'outerWrapper',
    pac: 'pac',
    man: 'man',
    ballStyle1: 'ballStyle1',
    ballStyle2: 'ballStyle2',
    ballStyle3: 'ballStyle3',
    ballStyle4: 'ballStyle4',
};
const PacmanLoader = props => {
    useEffect(() => {
        let color = props.color;
        if (color === undefined) {
            color = '#ffffff';
        }
        let pac = document.querySelector(`#${COMP_ID}_pac`);
        if (pac !== undefined && pac !== null) {
            pac.style.borderLeftColor = color;
            pac.style.borderBottomColor = color;
        }
        let man = document.querySelector(`#${COMP_ID}_man`);
        if (man !== undefined && man !== null) {
            man.style.borderTopColor = color;
            man.style.borderLeftColor = color;
        }
        for (let i = 1; i <= 4; i++) {
            let ball = document.querySelector(`#${COMP_ID}_ball${i}`);
            if (ball !== undefined && ball !== null) {
                ball.style.backgroundColor = color;
            }
        }
    });
    let pacmanSizeClass = PacmanStyle.pacman_medium;
    switch (props.size) {
        case 'small':
            pacmanSizeClass = PacmanStyle.pacman_small;
            break;
        default:
        case 'medium':
            pacmanSizeClass = PacmanStyle.pacman_medium;
            break;
        case 'large':
            pacmanSizeClass = PacmanStyle.pacman_large;
            break;
    }
    return (
        <div className={`${PacmanStyle.namespace} ${pacmanSizeClass}`}>
            <div id={COMP_ID} className={PacmanStyle.outerWrapper}>
                <div id={COMP_ID + '_pac'} className={PacmanStyle.pac} />
                <div id={COMP_ID + '_man'} className={PacmanStyle.man} />
                <div id={COMP_ID + '_ball1'} className={PacmanStyle.ballStyle1} />
                <div id={COMP_ID + '_ball2'} className={PacmanStyle.ballStyle2} />
                <div id={COMP_ID + '_ball3'} className={PacmanStyle.ballStyle3} />
                <div id={COMP_ID + '_ball4'} className={PacmanStyle.ballStyle4} />
            </div>
        </div>
    );
};

export default PacmanLoader;
