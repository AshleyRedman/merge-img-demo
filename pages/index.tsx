/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
import mergeImages from 'merge-images';
import { Dispatch, FunctionComponent, ReactElement, SetStateAction, useEffect, useState } from 'react';

type Position = { src: string; x: number; y: number };
type Cors = Omit<Position, 'src'>;

const door: Cors = { x: 0, y: 0 };
const handle: Cors = { x: 90, y: 180 };
const glass: Cors = { x: 40, y: 30 };

const door1: Position = { ...door, src: '/doors/Abercorn.png' };
const door2: Position = { ...door, src: '/doors/Aston.png' };
const door3: Position = { ...door, src: '/doors/Brampton.png' };

const handle1: Position = { ...handle, src: '/handles/AntiqueHandle.png' };
const handle2: Position = { ...handle, src: '/handles/AntiqueKnob.png' };
const handle3: Position = { ...handle, src: '/handles/Handle.png' };

const glass1: Position = { ...glass, src: '/glass/Aurora.png' };
const glass2: Position = { ...glass, src: '/glass/Bullseye.png' };
const glass3: Position = { ...glass, src: '/glass/Dorchester.png' };

export default function Home() {
    const [output, setOutput] = useState<string | null>(null);
    const [baseDoor, setBaseDoor] = useState<Position | null>(null);
    const [handle, setHandle] = useState<Position | null>(null);
    const [glass, setGlass] = useState<Position | null>(null);

    useEffect(() => {
        let src = [];

        if (baseDoor) src.push(baseDoor);
        if (handle) src.push(handle);
        if (glass) src.push(glass);

        if (!baseDoor) src = [];

        mergeImages(src, {}).then((b64) => setOutput(b64));
    }, [baseDoor, handle, glass]);

    return (
        <>
            <Head>
                <title>Img builder demo</title>
                <link rel='preconnect' href='https://rsms.me/' />
                <link rel='stylesheet' href='https://rsms.me/inter/inter.css' />
            </Head>
            <div className='main'>
                <div>
                    <h2>Build</h2>
                    <div className='picker'>
                        <div>
                            Doors
                            <Position position={door1} setter={setBaseDoor} />
                            <Position position={door2} setter={setBaseDoor} />
                            <Position position={door3} setter={setBaseDoor} />
                            <button style={{ display: 'block' }} onClick={() => setBaseDoor(null)}>
                                Remove door
                            </button>
                        </div>

                        {!!baseDoor && (
                            <div>
                                Handles
                                <Position position={handle1} setter={setHandle} />
                                <Position position={handle2} setter={setHandle} />
                                <Position position={handle3} setter={setHandle} />
                                <button style={{ display: 'block' }} onClick={() => setHandle(null)}>
                                    Remove handle
                                </button>
                            </div>
                        )}

                        {!!baseDoor && (
                            <div>
                                Glass
                                <Position position={glass1} setter={setGlass} />
                                <Position position={glass2} setter={setGlass} />
                                <Position position={glass3} setter={setGlass} />
                                <button style={{ display: 'block' }} onClick={() => setGlass(null)}>
                                    Remove glass
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {!!output && <Download val={output} />}

                <div>{output ? <Display src={output} /> : <p>Select items</p>}</div>
            </div>
        </>
    );
}

const Position: FunctionComponent<{ position: Position; setter: Dispatch<SetStateAction<Position | null>> }> = ({
    position,
    setter
}): ReactElement => {
    return (
        <button onClick={() => setter(position)}>
            <img src={position.src} alt='Pos' width={50} />
        </button>
    );
};

const Display: FunctionComponent<{ src: string }> = ({ src }) => {
    return (
        <div>
            <h2>Display</h2>
            <img src={src} alt='output' width={200} />
        </div>
    );
};

const Download: FunctionComponent<{ val: string }> = ({ val }) => {
    function downloadBase64File(base64Data: string, fileName: string) {
        const linkSource = base64Data;
        const downloadLink = document.createElement('a');
        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
    }

    return <button onClick={() => downloadBase64File(val, 'output.png')}>Click to download</button>;
};
