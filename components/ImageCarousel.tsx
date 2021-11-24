import {useEffect, useState} from "react";
import Image from 'next/image'
import styles from "/styles/ImageCarousel.module.css"
import leftArrow from "/public/LeftArrow.svg"
import rightArrow from "/public/RightArrow.svg"
import CullyImage from "./CullyImage";
import {CullyImageType} from "../types";

const ImageCarousel = () => {
    const [images, setImages] = useState<CullyImageType[]>();
    useEffect(() => {
        const getAllImages = async (): Promise<CullyImageType[]> => {
            const imageEndpoint = process.env.NEXT_PUBLIC_CULLY_API + "/images";
            const res = await fetch(imageEndpoint);
            const resJson = await res.json();
            return resJson.data;
        }
        getAllImages()
            .then(images => {
                setImages(images);
        })
            .catch(error => {
                console.error(error);
        });
    }, [])
    return(
        <div className={styles.carouselContainer} >
            {
                images ?
                    <div>
                        <CullyImage image={images[1]}/>
                        <div className={styles.selectorContainer}>
                            <Image src={leftArrow}/>
                            <p>{images[1]?.filename}</p>
                            <Image src={rightArrow}/>
                        </div>
                    </div>
                    :
                //put spinner here
                null
            }
        </div>
    )
}

export default ImageCarousel
