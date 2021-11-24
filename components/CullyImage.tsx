import {useEffect} from "react";
import Image from 'next/image'
import styles from "/styles/CullyImage.module.css"
import {CullyImageType, FaceType} from "../types";

interface CullyImageProps {
    image: CullyImageType,
    finishedLoading: (loading: boolean) => void,
    setLoading: (loading: boolean) => void,
    deleteFaceBoxHandler: (removeFace: FaceType) => void
    faces: FaceType[]
}

interface CullyImageDimensions {
    width: number,
    height: number,
}

const CullyImage = ({image, setLoading, finishedLoading, deleteFaceBoxHandler, faces} : CullyImageProps) => {
    useEffect(() => {
        if(image){
            const imageContainerElement = document.getElementById("cullyImageContainer") as HTMLImageElement;
            imageContainerElement.style.display = "none";
            setLoading(true);
        }
    }, [image]);

    useEffect(() => {
        const imageElement = document.getElementById(image?.filename) as HTMLImageElement;
        faces?.map((face,index) => {
            drawFaceCoordinates(
                {width:imageElement.width,height:imageElement.height}, face, index);
        })
    }, [faces]);

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

    const imageLoadedHandler = () => {
        const imageContainerElement = document.getElementById("cullyImageContainer") as HTMLImageElement;
        imageContainerElement.style.display = "block";
        const imageElement = document.getElementById(image.filename) as HTMLImageElement;
        faces?.map((face,index) => {
            drawFaceCoordinates(
                {width:imageElement.width,height:imageElement.height}, face, index);
        })
        finishedLoading(false);
    }

    return(
        <>
        {
            image ?
                <div id={"cullyImageContainer"} className={styles.imgContainer}>
                    {faces?.map((face, idx) => <div onClick={ () => deleteFaceBoxHandler(face)} id={`face_${idx}`} key={idx} className={styles.faceBox}/>)}
                    <Image onLoad={imageLoadedHandler} id={image?.filename} src={image?.url} width={968} height={646}/>
                </div>
                : null
        }
        </>
    )
}

export default CullyImage;
