import { useState, useEffect } from 'react'
import {View , Text , TextInput , TouchableOpacity , StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function     Add(){
    //ประกาศตัวแปร
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [allSnack, setAllSnack] = useState("")

    useEffect(()=>{
        loadSnack()
    },[])

    async function  loadSnack(){
        const data = await AsyncStorage.getItem("snack")
        if(data != null)
        setAllSnack(JSON.parse(data)
        )
    }

    async function addSnack() {
        // เตรียมข้อมูล
        const snack = {
            snackName : name,
            snackPrice : price 
        }
        // ทดสอบ
        console.log(snack)

        const newSnack = [...allSnack, snack]
        await AsyncStorage.setItem("snack", JSON.stringify(newSnack))
        setName("")
        setPrice("")
    }

    return (
        <View style={myStyle.container}>
            <Text style={myStyle.title}>เพิ่มข้อมูล {name} {price}</Text>
                 {/* ช่องรับชื่อ */}
            <TextInput style={myStyle.input} value={name} onChangeText={setName} placeholder='กรุณากรอกชื่อขนม'/>
            {/* ช่องรับราคา */}
            <TextInput style={myStyle.input} value={price} onChangeText={setPrice} placeholder='กรุณากรอกราคา' />

            <TouchableOpacity onPress={addSnack} style={myStyle.button}>
                <Text style={myStyle.buttonText}>บันทึก</Text>
            </TouchableOpacity>
        </View>
    )
}

const myStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF6EE", // พื้นหลังสีครีม
        padding: 20,
        justifyContent: "center",
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#6B3E26", // น้ำตาลเข้ม
        textAlign: "center",
        marginBottom: 10,
    },

    preview: {
        textAlign: "center",
        color: "#A47148",
        marginBottom: 20,
    },

    input: {
        backgroundColor: "#FFFFFF",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#F2C9AC",
    },

    button: {
        backgroundColor: "#FF9F9F", // ชมพูพาสเทล
        paddingVertical: 14,
        borderRadius : 12,
        alignItems: "center",
        marginTop: 10,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 18,
        fontWeight: "bold",
    },
});