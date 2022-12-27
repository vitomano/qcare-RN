import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { ImageType } from '../interfaces/intakes.reports'
import Carousel from 'react-native-snap-carousel';
import { TextApp } from './ui/TextApp'
import { ModalConfirmation } from './modals/ModalConfirmation'

interface Props {
  images: ImageType[]
  deleteAction?: (key: string, key_low: string) => void
}

export const ImageGallery = ({ images, deleteAction }: Props) => {

  const [index, setIndex] = useState(0)
  const [modalImage, setModalImage] = useState(false)
  const [loading, setLoading] = useState(false)

  const [modalDeleteImage, setModalDeleteImage] = useState(false)

  const { top } = useSafeAreaInsets()
  const { width } = Dimensions.get("window")

  return (

    <View style={{ flexDirection: "row", flexWrap: "wrap", width: "99%", alignSelf: "center", paddingLeft: "1%" }}>
      {
        images.map((image, i) => (

          <TouchableOpacity
            activeOpacity={.9}
            key={image.key}
            style={{ width: "33%", height: width / 3.7 }}
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

      <Modal
        transparent={true}
        animationType='fade'
        visible={modalImage}
        onRequestClose={() => setModalImage(false)}
      >
        <View style={styles.container} >

          {
            deleteAction &&
            <>
              <TouchableOpacity
                activeOpacity={.9}
                style={{ position: "absolute", top: top + 25, left: 20, zIndex: 10 }}
                onPress={() => setModalDeleteImage(true)}
              >
                <TextApp style={{ color: "crimson" }}>delete</TextApp>
              </TouchableOpacity>

              <ModalConfirmation
                message={`Do you want to delete this image`}
                action={() => {
                  deleteAction(images[index].key, images[index].key_low)
                  setModalDeleteImage(false)
                  setModalImage(false)
                }}
                modal={modalDeleteImage}
                openModal={setModalDeleteImage}
              />
            </>
          }


          <TouchableOpacity
            activeOpacity={.9}
            style={{ position: "absolute", top: top + 20, right: 20, zIndex: 10 }}
            onPress={() => setModalImage(false)}
          >
            <Icon name='close-circle' size={30} color="#fff" />
          </TouchableOpacity>

          {/* <FlatList
            style={{ width: width, height: "100%" }}
            data={images}
            keyExtractor={(item) => item.key}
            initialScrollIndex={index}
            horizontal={true}
            pagingEnabled
            renderItem={item =>
              <FastImage
                style={{ width: width, height: "100%" }}
                source={{ uri: item.item.imgURL }}
                resizeMode={FastImage.resizeMode.contain}
              />
            }
          /> */}

          <Carousel
            data={images}
            renderItem={item =>
              <FastImage
                style={{ width: width, height: "100%" }}
                source={{ uri: item.item.imgURL }}
                resizeMode={FastImage.resizeMode.contain}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
              />

            }
            sliderWidth={width}
            itemWidth={width}
            firstItem={index}
            onSnapToItem={(index) => setIndex(index)}

          />

          {/* <View style={{ flexDirection: "row", padding: 40, alignContent: "flex-end", justifyContent: "space-between", height: "auto", width }}> */}
          <View style={{
            padding: Platform.OS === "ios" ? 40 : 30,
            position: "absolute", bottom: 0, flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: "auto", width
          }}>

            <TouchableOpacity
              disabled={index === 0 ? true : false}
              onPress={() => { index !== 0 && setIndex(c => c - 1) }}
            >
              <Icon name='chevron-back' size={30} color="#fff" />
            </TouchableOpacity>

            <TextApp color='white'>{index + 1} / {images.length}</TextApp>


            <TouchableOpacity
              disabled={index === images.length - 1 ? true : false}
              onPress={() => setIndex(c => c + 1)}
            >
              <Icon name='chevron-forward' size={30} color="#fff" />

            </TouchableOpacity>
          </View>

          {
            loading &&
            <View
              style={{ position: 'absolute', flex: 1, top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}
            >
              <ActivityIndicator size={30} color="#fff" />
            </View>
          }

        </View>
      </Modal>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.8)',
    position: "relative"
  }
});