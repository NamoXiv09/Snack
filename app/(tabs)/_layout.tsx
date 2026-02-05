import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // เลือกใช้ชุดไอคอน Ionicons

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#FF6B6B", // สีไอคอนตอนเลือก
                tabBarInactiveTintColor: "#999",   // สีไอคอนตอนไม่ได้เลือก
                tabBarStyle: {
                    height: 60,
                    paddingBottom: 8,
                },
            }}
        >
            <Tabs.Screen
                name="index" // ไฟล์ index.tsx (หน้า Home)
                options={{
                    title: "รายการขนม",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                }}
            />
            
            <Tabs.Screen
                name="add" // ไฟล์ add.tsx (หน้าเพิ่มขนม)
                options={{
                    title: "เพิ่มขนม",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}