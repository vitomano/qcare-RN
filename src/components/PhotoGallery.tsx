import React, { useEffect, useState } from 'react'
import { ImageSource } from 'react-native-image-viewing/dist/@types'
import ImageView from "react-native-image-viewing";
import Icon from 'react-native-vector-icons/Ionicons'

import { Photo } from '../helpers/photosToShow';
import { useDeletePhoto } from '../api/useDeleteImage';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { globalStyles } from '../theme/globalStyles';
import { ModalConfirmation } from './modals/ModalConfirmation';
import { TextApp } from './ui/TextApp';
import { CentredContent } from './CenterContent';

interface Props {
    photos: Photo[],
    pid: string,
    reportId: string,
    prereport: boolean
}

export const PhotoGallery = ({ photos, pid, reportId, prereport = false, }: Props) => {

    const [index, setIndex] = useState<number>(0)
    const [modalImage, setModalImage] = useState<boolean>(false)
    const [modalDeleteImage, setModalDeleteImage] = useState<boolean>(false)
    const [carouselImages, setCarouselImages] = useState<ImageSource[]>([])

    const { mutate, isLoading } = useDeletePhoto()
    const onRequestClose = () => setModalImage(false)

    const { width } = Dimensions.get("window")

    useEffect(() => {
        setCarouselImages(photos.map(photo => { return { uri: photo.photo.imgURL, key: photo.photo.key, key_low: photo.photo.key_low } }))
      }, [photos])


    const deleteAction = async (photo: Photo) => {

        const image = {
            reportId,
            palletId: pid,
            detailName: photo.detailName,
            itemName: photo.name,
            keyName: photo.photo.key,
            keyLow: photo.photo.key_low,
        }

        mutate(
            { image, reportId, prereport },
            { onSuccess: () => setModalImage(false) }
        )
    };

    return (
        <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", alignSelf: "center", paddingLeft: "1%" }}>
        {
          photos.map((photo, i) => (
  
            <TouchableOpacity
              activeOpacity={.9}
              key={ photo.photo.key }
            //   style={{ position:'relative', overflow:'hidden', width: "33%", height: width / 3.7 }}
              style={{ position:'relative', overflow:'hidden', width: "33%", aspectRatio: 1 }}
              onPress={() => {
                setIndex(i)
                setModalImage(true)
              }}
            >
                <View style={{ paddingHorizontal:5, paddingVertical:2, position:'absolute', bottom: 3, left: 3, zIndex: 1, overflow:'hidden', borderRadius: 50, backgroundColor: 'rgba(0,0,0,.5)', marginRight: 3 }}>
                    <TextApp size='xxs' color='white' bold nowrap>{ photo.label }</TextApp>
                </View>
            
              <FastImage
                style={{ flex: 1 }}
                key={ photo.photo.key }
                source={{ uri: photo.photo.imgURL_low }}
              />
            </TouchableOpacity>
          ))
        }
  
        <ImageView
          images={carouselImages}
          imageIndex={index}
          visible={modalImage}
          onRequestClose={onRequestClose}
          HeaderComponent={({ imageIndex }) => (
  
            <View style={{ ...globalStyles.flexBetween, marginHorizontal: 20, marginTop: 40 }}>
              <View>
                {
                  deleteAction &&
                  <>
                    <TouchableOpacity
                      activeOpacity={.9}
                      onPress={() => setModalDeleteImage(true)}
                      style={{ backgroundColor: "#ed3c36", width: 32, height: 32, alignItems: "center", justifyContent: "center", borderRadius: 20 }}
                    >
                        <Icon name='trash-outline' size={22} color="#fee1e8" />
                    </TouchableOpacity>
  
                    <ModalConfirmation
                      message={`Do you want to delete this image`}
                      loading={isLoading}
                      action={async () => {
                        await deleteAction( photos[imageIndex] )
                        setModalDeleteImage(false)
                        onRequestClose()
                      }}
                      modal={modalDeleteImage}
                      openModal={setModalDeleteImage}
                    />
                  </>
                }
              </View>
  
              <TouchableOpacity
                activeOpacity={.9}
                onPress={onRequestClose}
              >
                <Icon name='close-outline' size={30} color="white" />
              </TouchableOpacity>
            </View>
  
  
          )}
          FooterComponent={({ imageIndex }) => (
            <CentredContent  style={{ marginBottom: 40 }}>
                <TextApp color='white' center style={{marginBottom:5}}>{photos[imageIndex].label}</TextApp>
                <TextApp color='white' center>{imageIndex + 1} / {carouselImages.length}</TextApp>
            </CentredContent>
          )}
        />
  
      </View>
        // <>
        //     {
        //         modalImg &&
        //         <ModalPhotoGallery
        //             photo={currentPhoto}
        //             openModal={setModalImg}
        //             action={removeDefectPhoto}
        //             isLoading={isLoading}
        //         />
        //     }

        //     <div className='gallery-photos mb-1'>
        //         {
        //             photos.map(photo => (
        //                 <button
        //                     key={photo.name}
        //                     className='gallery-photos__container'
        //                     onClick={() => {
        //                         setCurrentPhoto(photo)
        //                         setModalImg(true)
        //                     }}
        //                 >
        //                     {photo.name &&
        //                         <div className='photo-tag'>
        //                             <p>{photo.label}</p>
        //                         </div>
        //                     }
        //                     <img src={photo.photo.imgURL_low || photo.photo.imgURL} alt={photo.name} />
        //                 </button>
        //             ))
        //         }
        //     </div>
        // </>
    )
}
