import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios';
import Timer from './Timer';
import Countdown from 'react-countdown';

function Home() {
    const low = ['ACE', '2', '3', '4', '5', '6']
    const high = ['8', '9', '10', 'KING', 'QUEEN', 'JACK']

    const [image, setimage] = useState("https://www.deckofcardsapi.com/static/img/back.png")
    const [timerKey, setTimerKey] = useState(null);
    const [bid, setbid] = useState("")
    const [ini, seini] = useState()
    const [sel, setSel] = useState(true)
    const [points, setpoints] = useState(10)
    const [laststaus, setlaststaus] = useState('')
    const onTimerEnd = () => {
        fetch()
        // result()
        setTimeout(() => {
            // Reset the timer by updating the key
            setimage("https://www.deckofcardsapi.com/static/img/back.png")
            setSel(true)
            setbid("")
            setlaststaus("")
        }, 5000);
    };

    const fetch = async () => {
        const { data } = await axios.get("https://high-low-game-backend.vercel.app/getcard")
        setimage(data[0].image)
        result(data[0].value)
        console.log("object", data[0].value)
    }

    const result = async (card) => {
        if (bid == "low" && low.includes(card)) {
            setpoints(points + 2)
            setlaststaus("Won")
        }
        else if (bid == "high" && high.includes(card)) {
            setpoints(points + 2)
            setlaststaus("Won")
        }
        else if (card == '7') {
            setpoints(points + 1)
            setlaststaus("Tie")
        }
        else if (bid === '') {
            setlaststaus("Did't Bid")
        }
        else {
            console.log("hari gia")
            setlaststaus("Lost")
        }


    }


    const restartGame = () => {
        setTimerKey((prevKey) => prevKey + 1);
        seini(Date.now() + 7000)
        setSel(false);
        return () => clearTimeout(timerKey);
    }


    return (
        <div className='buttonWrapper' style={styles.container}>
            <h4 style={styles.points}>POINTS: {points}</h4>
            {ini > 0 && (
                <Countdown
                    key={timerKey}
                    date={ini}
                    onComplete={onTimerEnd}
                    renderer={({ formatted: { minutes, seconds }, completed }) => {
                        if (completed) {
                            return <span style={styles.timer}>00:00</span>;
                        } else {
                            return <span style={styles.timer}>{`${minutes}:${seconds}`}</span>;
                        }
                    }}
                />
            )}
            <br />
            <img src={image} alt="Card" style={styles.image} />
            <br />
            <button onClick={() => { setbid('low'); setSel(true); setpoints(points - 1) }} style={!sel ? styles.button : styles.buttondisable} disabled={sel}>
                Low
            </button>
            <label style={styles.label}>7</label>
            <button onClick={() => { setbid('high'); setSel(true); setpoints(points - 1) }} style={!sel ? styles.button : styles.buttondisable} disabled={sel}>
                High
            </button>
            <button onClick={restartGame} style={(bid !== '' || !sel)?styles.startButtonDisabled:styles.startButton} disabled={(bid !== '' || !sel)}>
                Start
            </button>
            {bid && <p style={styles.bidText}>Your Bid: {bid}</p>}
            {laststaus && <h2 style={styles.status}>{laststaus}</h2>}
        </div>
    )
}

const styles = {
    container: {
        textAlign: 'center',
        margin: '20px',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        height: '88vh'
    },
    buttondisable:{
        padding: '10px',
        margin: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: 'grey',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
    points: {
        fontSize: '24px',
        marginBottom: '10px',
    },
    timer: {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#333',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        marginTop: '10px',
    },
    button: {
        padding: '10px',
        margin: '5px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: 'blue',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
    label: {
        fontSize: '18px',
        margin: '0 10px',
    },
    startButton: {
        padding: '10px',
        margin: '10px',
        fontSize: '18px',
        cursor: 'pointer',
        backgroundColor: 'green',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
    startButtonDisabled: {
        padding: '10px',
        margin: '10px',
        fontSize: '18px',
        cursor: 'pointer',
        backgroundColor: 'red',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
    },
    bidText: {
        fontSize: '18px',
        marginTop: '10px',
    },
    status: {
        fontSize: '24px',
        color: 'blue',
        marginTop: '10px',
    },
};

export default Home
