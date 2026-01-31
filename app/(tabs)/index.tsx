import { useState, useEffect } from 'react'
import {View , Text , FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type Snack = {
    snackName : string,
    snackPrice : string
}

export default function Home(){

    const [allSnack, setAllSnack] = useState<Snack[]>([])

    useEffect(()=>{
        loadSnack()
    },[allSnack])

    async function  loadSnack(){
        const data = await AsyncStorage.getItem("snack")
        if(data != null)
            setAllSnack(JSON.parse(data)
        )
    }

    async function removeSnack(index : number) {
        const newSnack = allSnack.filter((_, i) => i != index)
        setAllSnack(newSnack)
        await AsyncStorage.setItem("snack", JSON.stringify(newSnack))
    }
    return (
        <View style={homeStyle.container}>
            <Text style={homeStyle.title}>🍭 รายการขนม</Text>

           {/* x = [1,2,3,4] x[2] */}
            
            <FlatList
                data={allSnack}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({item , index}) => (
                    <View style={homeStyle.card}>
                        <Text style={homeStyle.snackName}>ชื่อ  : {item.snackName.toString()}</Text>
                        <Text style={homeStyle.snackPrice}>ราคา  : {item.snackPrice.toString()}</Text>
                        <TouchableOpacity style={homeStyle.deleteButton} onPress={() => removeSnack(index)}>
                            <Text style={homeStyle.deleteText}>ลบ</Text>
                        </TouchableOpacity>
                    </View>
                )}

                
            />
        </View>
    )
}

const homeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF6EE", // ครีมอ่อน
        padding: 20,
    },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "#6B3E26", // น้ำตาล
        textAlign: "center",
        marginBottom: 15,
    },

    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 14,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#F2C9AC",
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },

    snackName: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6B3E26",
        marginBottom: 4,
    },

    snackPrice: {
        fontSize: 16,
        color: "#A47148",
        marginBottom: 10,
    },

    deleteButton: {
        alignSelf: "flex-end",
        backgroundColor: "#FFE5E5",
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
    },

    deleteText: {
        color: "#D9534F",
        fontWeight: "bold",
    },
});
