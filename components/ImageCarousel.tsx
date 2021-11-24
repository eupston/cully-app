import {useEffect, useState} from "react";
import Image from 'next/image'
import {inspect} from "util";
import styles from "/styles/ImageCarousel.module.css"
import leftArrow from "/public/LeftArrow.svg"
import rightArrow from "/public/RightArrow.svg"

interface CullyImage {
    id: string,
    filename: string,
    url: string
}

const ImageCarousel = () => {
    const [images, setImages] = useState<CullyImage[]>();
    useEffect(() => {
        const getAllImages = async () => {
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
                        <div className={styles.imgContainer}>
                            <Image src={images[1]?.url} width={926} height={618} />
                        </div>
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
