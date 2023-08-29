import React, { useState, useEffect } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/Ionicons'
import { ImageType } from '../interfaces/intakes.reports';
import { TextApp } from './ui/TextApp'
import { ModalConfirmation } from './modals/ModalConfirmation'

import ImageView from "react-native-image-viewing";
import { ImageSource } from 'react-native-image-viewing/dist/@types'
import { globalStyles } from '../theme/globalStyles';


interface Props {
  images: ImageType[]
  isDeleting?: boolean
  deleteAction?: (key: string, key_low: string) => void | Promise<void>
}

export const ImageGalleryViewing = ({ images, isDeleting = false, deleteAction }: Props) => {

  const [index, setIndex] = useState(0)
  const [modalImage, setModalImage] = useState(false)
  const [carouselImages, setCarouselImages] = useState<ImageSource[]>([])
  const [modalDeleteImage, setModalDeleteImage] = useState(false)

  const { width } = Dimensions.get("window")

  useEffect(() => {
    setCarouselImages(images.map(img => { return { uri: img.imgURL, key: img.key, key_low: img.key_low } }))
  }, [images])

  const onRequestClose = () => setModalImage(false)

  return (

    <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", alignSelf: "center", paddingLeft: "1%" }}>
    {
        images.map((image, i) => (

          <TouchableOpacity
            activeOpacity={.9}
            key={image.key}
            style={{ position:'relative', overflow:'hidden', width: "33%", aspectRatio: 1 }}
            onPress={() => {
              setIndex(i)
              setModalImage(true)
            }}
          >
            <FastImage
              style={{ flex: 1 }}
              key={image.key}
              source={{ uri: image.imgURL_low }}
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
                    loading={isDeleting}
                    action={async () => {
                      await deleteAction(images[imageIndex].key, images[imageIndex].key_low)
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
          <TextApp color='white' center style={{ marginBottom: 40 }}>{imageIndex + 1} / {carouselImages.length}</TextApp>
        )}
      />

    </View>
  )
}
