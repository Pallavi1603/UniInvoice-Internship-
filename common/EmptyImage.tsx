import { Image, StyleSheet } from "react-native"

const EmptyImage = () => {
    return (
        <Image
            source={{ uri: "https://cdn-icons-gif.flaticon.com/8369/8369464.gif" }}
            style={styles.emptyImage}
        />
    )
}


const styles = StyleSheet.create({
    emptyImage: { width: 70, height: 70, alignSelf: 'center' }
})

export default EmptyImage