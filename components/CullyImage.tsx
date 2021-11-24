import {useEffect} from "react";
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
    useEffect(() => {
        if(image.faces && image.faces?.length > 0){
            const imageContainerElement = document.getElementById("cullyImageContainer") as HTMLImageElement;
            imageContainerElement.style.display = "block";
            const imageElement = document.getElementById(image.filename) as HTMLImageElement;
            image.faces.map((face,index) => {
                drawFaceCoordinates(
                {width:imageElement.width,height:imageElement.height}, face, index);
            })
        }
    }, [image]);

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
        <div id={"cullyImageContainer"} className={styles.imgContainer}>
            {image?.faces?.map((_faces, idx) => <div id={`face_${idx}`} key={idx} className={styles.faceBox}/>)}
            <Image id={image?.filename} src={image?.url} width={968} height={646}/>
        </div>
    )
}

export default CullyImage;
