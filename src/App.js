import { useEffect, useState } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const colors = [{
    label: 'Fast Food',
    color: '#FFFFFF',
    search: 'fast+food'
}, {
    label: 'Burgers',
    color: '#FFFFFF',
    search: 'burger'
}, {
    label: 'Pizza',
    color: '#FFFFFF',
    search: 'pizzeria'
}, {
    label: 'Asiatique',
    color: '#FFFFFF',
    search: 'asian+restaurant'
}, {
    label: 'Sushis',
    color: '#FFFFFF',
    search: 'sushi'
}, {
    label: 'Halal',
    color: '#FFFFFF',
    search: 'halal+restaurant'
}, {
    label: 'Healthy',
    color: '#FFFFFF',
    search: 'healthy+food'
}, {
    label: 'Poke',
    color: '#FFFFFF',
    search: 'pokeball'
}, {
    label: 'Italienne',
    color: '#FFFFFF',
    search: 'italian+restaurant'
}, {
    label: 'Francaise',
    color: '#FFFFFF',
    search: 'french-restaurant'
}, {
    label: 'Boulangerie',
    color: '#FFFFFF',
    search: 'bakery'
}, {
    label: 'Americaine',
    color: '#FFFFFF',
    search: 'american+restaurant'
}, {
    label: 'Street Food',
    color: '#FFFFFF',
    search: 'street+food'
}];

const App = () => {
    const drawPart = function(context, color, nbrPart, idx, centerX, centerY, radius) {
        var part = 2 * Math.PI / nbrPart;
        context.fillStyle = color;
        context.fillStyle = "#FFFFFF";
        context.strokeStyle = "#000000";
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.arc(centerX, centerY, radius, idx * part, (idx + 1) * part);
        context.fill();
        context.closePath();
        context.stroke();
    }

    const drawImages= function(context, image, nbrPart, idx, centerX, centerY, radius) {
        var part = 2 * Math.PI / nbrPart;
        context.save();
        context.translate(centerX,centerY);
        console.log(part * idx + part/2);
        context.rotate(part * idx + part / 2);
        context.drawImage(image, 0, parseInt(idx) * 96, 56, 96, 90, -48, 56, 96);
        context.restore();
    }

    const go = () => {
        var canvas = document.getElementById("wheelCanvas");
        canvas.style.transitionDuration = "0s";
        canvas.style.transform = "rotate(0deg)";
        canvas.style.webkitTransitionDuration = "0s";
        canvas.style.webkitTransform = "rotate(0deg)";
        if(processGoing) {
            clearTimeout(processGoing);
        }
        const slideAngle = 360 / colors.length;
        const random = parseInt(Math.random() * 360);
        setProcessGoing(setTimeout(function(){
            canvas.style.transitionDuration = "4s";
            canvas.style.transform = "rotate("+(3600 - 90 + random) + "deg)";
        },0));
        setTimeout(() => {
            const slide = colors.length - 1 - Math.floor(random / slideAngle);
            setResult(colors[slide].label);
            setResultSearch(colors[slide].search);
        }, 4000);
    }

    const draw = (image) => {
        var canvas = document.getElementById("wheelCanvas");
        var centerX = canvas.width / 2;
        var centerY = canvas.height / 2;
        var radius = Math.min(centerX, centerY);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.font = "20px monospace";
        ctx.textAlign = "left";
        colors.forEach(function(color, idx) {
            drawPart(ctx, color.color || '#777777', colors.length, idx, centerX, centerY, radius);
        });
        ctx.fillStyle = "#000000";
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, 0*Math.PI, 2*Math.PI);
        ctx.stroke();
        colors.forEach(function(color, idx) {
            // drawLabels(ctx, color.label || idx, colors.length, idx, centerX, centerY, radius);
            drawImages(ctx, image, colors.length, idx, centerX, centerY, radius);
        });
    }

    const [processGoing, setProcessGoing] = useState(null);
    const [result, setResult] = useState("-");
    const [resultSearch, setResultSearch] = useState(null);
    useEffect(() => {
        const image = new Image(96, 90); // Using optional size for image
        image.onload = function() {
            draw(this);
        }; // Draw when image has loaded

        // Load an image of intrinsic size 300x227 in CSS pixels
        image.src = '/icons.png';
    }, []);

    return (
        <div className="App">
            <div className="title">
                Marisella's Food Finder
            </div>
            <div className="wheel">
                <FontAwesomeIcon icon={faAngleDoubleDown} />
                <canvas onClick={go} id="wheelCanvas" width="300" height="300"></canvas>
            </div>
            <div className="result">
                {result}
            </div>
            <div className="actions">
                <button onClick={() => {
                    if (resultSearch) {
                        window.open(`https://www.google.com/maps/search/${resultSearch}`)
                    }
                }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt}/> Find around me
                </button>
            </div>
        </div>
    );
}

export default App;