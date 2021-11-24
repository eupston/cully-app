import {useEffect, useState} from "react";
import Image from 'next/image'
import styles from "/styles/CullyImage.module.css"
import {CullyImageType, FaceType} from "../types";

interface CullyImageProps {
    image: CullyImageType
}

interface CullyImageDimensions {
    width: number,
    height: number,
}

const CullyImage = ({image} : CullyImageProps) => {
    const [faces, setFaces] = useState<FaceType[]>();
    const [dimensions, setDimensions] = useState<CullyImageDimensions>();

    useEffect(() => {
        const getFaces = async (): Promise<FaceType[]> => {
            const coordsEndpoint = process.env.NEXT_PUBLIC_CULLY_API + `/images/${image.id}/faces`;
            const res = await fetch(coordsEndpoint);
            const resJson = await res.json();
            return resJson.data;
        }
        getFaces()
            .then(faces => {
                setFaces(faces);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        const imageElement = document.getElementById(image.filename) as HTMLImageElement;
        setDimensions({width: imageElement?.width, height: imageElement?.height})
    }, [faces]);

    useEffect(() => {
        if(faces && dimensions){
            faces.map((face, index) => {
                drawFaceCoordinates(dimensions, face, index);
            });
        }
    }, [dimensions]);

    const drawFaceCoordinates = (imgDimensions: CullyImageDimensions, face: FaceType, index: number) => {
        const x1 = face.xmin * imgDimensions.width;
        const x2 = face.xmax * imgDimensions.width;
        const y1 = face.ymin * imgDimensions.height;
        const y2 = face.ymax * imgDimensions.height;
        const faceDivElement = document.getElementById(`face_${index}`) as HTMLDivElement;
        faceDivElement.setAttribute("style",
            `display:block;height:${y2 - y1}px;width:${x2 - x1}px;top:${y1}px;left:${x1}px;`
        );
    }

    return(
        <div className={styles.imgContainer}>
            {faces?.map((_faces, idx) => <div id={`face_${idx}`} key={idx} className={styles.faceBox}/>)}
            <Image id={image.filename} src={image.url} width={926} height={618}/>
        </div>
    )
}

export default CullyImage
