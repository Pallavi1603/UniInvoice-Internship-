import { StyleSheet, Text, View } from 'react-native'
import { MCColor } from '../../typography/MCColor'
import InputBox from '../InputBox'

const ChooseTime = ({ lable, onChangeText1, onChangeText2 }: { lable: string, onChangeText1: any, onChangeText2: any }) => {

    return (
        <View>
            <Text style={styles.lable} >{lable}</Text>

            <View style={styles.flexBox} >
                <View style={styles.inputBox} >
                    <InputBox
                        keyboardType={'numeric'}
                        placehoder="Open At"
                        onChangeText={onChangeText1}
                        bottomPlaceholder="AM"
                    />
                </View>
                <View style={styles.inputBox} >
                    <InputBox
                        keyboardType={'numeric'}
                        placehoder="Open At"
                        onChangeText={onChangeText2}
                        bottomPlaceholder="PM"
                    />
                </View>
            </View>
        </View>
    )
}

export default ChooseTime

const styles = StyleSheet.create({
    lable: {
        fontFamily: "Nunito",
        fontWeight: '500',
        color: MCColor.heading,
        marginBottom: 6,
        fontSize: 14
    },
    inputBox: {
        width: 100
    },
    flexBox: {
        flexDirection: 'row',
        gap: 25
    }

})