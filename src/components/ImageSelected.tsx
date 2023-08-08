import React, { useState } from 'react'
import { Dimensions, Modal, Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { ImageTemp } from '../interfaces/intakes.reports'
import { TextApp } from './ui/TextApp'
import { ModalConfirmation } from './modals/ModalConfirmation'
import { text } from '../theme/variables'
import { IconBtn } from './ui/IconBtn'

interface Props {
  images: ImageTemp[]
  pid: string
  grid?: 3 | 4
  deleteAction: (pid: string, name: string) => void
}

export const ImageSelected = ({ pid, images, grid=4, deleteAction }: Props) => {

  const [index, setIndex] = useState(0)
  const [modalImage, setModalImage] = useState(false)
  const [currentImg, setCurrentImg] = useState("")

  const [confirmation, setConfirmation] = useState(false)

  const { top } = useSafeAreaInsets()
  const { width } = Dimensions.get("window")

  return (

    <View style={{ flexDirection: "row", flexWrap: "wrap", width: "100%", alignSelf: "center", paddingLeft: "1%" }}>

      <ModalConfirmation
        confirmText='Delete'
        message={`Do you want to delete this image?`}
        action={() => {
          deleteAction(pid, currentImg)
          setConfirmation(false)
        }}
        modal={confirmation}
        openModal={setConfirmation}
      />

      {
        images.map((image, i) => (
          <View
            key={image.name}
            style={{ width: grid === 3 ? "33%" :"25%", height: grid === 3 ? width / 3.7 : width / 4.8, padding: 5, position: "relative" }}
          >

            <IconBtn action={() => {
                setCurrentImg(image.name!)
                setConfirmation(true)
              }} icon="close-circle" background='white' iconColor={text}/>

            <FastImage
              style={{ flex: 1 }}
              key={image.name}
              source={{ uri: image.uri }}
            />
          </View>
        ))
      }

      <Modal
        transparent={true}
        animationType='fade'
        visible={modalImage}
        onRequestClose={() => setModalImage(false)}
      >
        <View style={styles.container} >

          <TouchableOpacity
            activeOpacity={.9}
            style={{ position: "absolute", top: top + 20, right: 20, zIndex: 10 }}
            onPress={() => setModalImage(false)}
          >
            <Icon name='close-circle' size={30} color="#fff" />
          </TouchableOpacity>

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