import {useEffect, useState} from "react";
import Image from 'next/image'
import styles from "/styles/ImageCarousel.module.css"
import leftArrow from "/public/LeftArrow.svg"
import rightArrow from "/public/RightArrow.svg"
import spinner from "/public/Spinner.svg"

import CullyImage from "./CullyImage";
import {CullyImageType, FaceType} from "../types";

const ImageCarousel = () => {
    const [images, setImages] = useState<CullyImageType[]>();
    const [currentImageIdx, setCurrentImageIdx] = useState<number>(0);
    const [currentImage, setCurrentImage] = useState<CullyImageType>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getAllImages = async (): Promise<CullyImageType[]> => {
            const imageEndpoint = process.env.NEXT_PUBLIC_CULLY_API + "/images";
            const res = await fetch(imageEndpoint);
            const resJson = await res.json();
            return resJson.data;
        }
        getAllImages()
            .then(images => {
                const currentImg = images[0];
                getFaces(currentImg).then(currentFaces => {
                    setCurrentImage({
                        id:currentImg.id,
                        filename: currentImg.filename,
                        url:currentImg.url,
                        faces:currentFaces
                    });
                    setImages(images);
                    setLoading(false);
                });
            })
            .catch(error => {
                console.error(error);
        });
    }, []);

    useEffect(() => {
        if (images) {
            const currentImg = images[currentImageIdx];
            getFaces(currentImg).then(currentFaces => {
                setCurrentImage({
                    id:currentImg.id,
                    filename: currentImg.filename,
                    url:currentImg.url,
                    faces:currentFaces
                })
            });
        }
    },[currentImageIdx])

    const leftClickHandler = () => {
        if(currentImageIdx !== 0){
            setCurrentImageIdx(currentImageIdx - 1);
            setLoading(true);
        }
    }

    const rightClickHandler = async () => {
        if(images && currentImageIdx !== images.length - 1){
            setCurrentImageIdx(currentImageIdx + 1);
            setLoading(true);
        }
    }

    const getFaces = async (image: CullyImageType): Promise<FaceType[]> => {
        const coordsEndpoint = process.env.NEXT_PUBLIC_CULLY_API + `/images/${image.id}/faces`;
        const res = await fetch(coordsEndpoint);
        const resJson = await res.json();
        return resJson.data;
    }

    return(
        <div className={styles.carouselContainer} >
            <div>
                {
                loading &&
                    <Image className={styles.spinner} src={spinner}/>
                }
                <CullyImage finishedLoading={setLoading} image={currentImage as CullyImageType}/>
                <div className={styles.selectorContainer}>
                    <Image className={styles.arrows} onClick={leftClickHandler} src={leftArrow}/>
                    <p>{currentImage?.filename}</p>
                    <Image className={styles.arrows} onClick={rightClickHandler} src={rightArrow}/>
                </div>
            </div>
        </div>
    )
}

export default ImageCarousel;
