import {FaceType} from "./FaceType";

export type CullyImageType = {
    id: string,
    filename: string,
    url: string,
    faces?: FaceType[]
}