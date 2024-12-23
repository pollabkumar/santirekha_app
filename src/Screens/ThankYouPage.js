import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';

const ThankYouPage = () => {

    const navigation = useNavigation();

    const [time, setTime] = useState(8);

    useEffect(() => {
        let isMounted = true;

        setTimeout(() => {
            if (isMounted) {
                navigation.navigate("Deshboard");
            }
        }, 8000);

        const intervalId = setInterval(() => {
            if (isMounted) {
                setTime(prev => prev - 1);
            }
        }, 1000);

        // Cleanup function
        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                animated={true}
                backgroundColor="#003243"
                barStyle="light-content"
            />

            {/* header */}
            {/* <View style={{ flexDirection: "row", backgroundColor: "#003243", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 15, }}>
                <View style={{ paddingVertical: 10, flexDirection: "row", alignItems: "center", }}>
                    <TouchableOpacity style={{ backgroundColor: "#f6f6f6", padding: 5, borderRadius: 100, alignItems: "center", justifyContent: "center", elevation: 1, marginRight: 6 }} onPress={() => navigation.goBack()}>
                        <Icon name="keyboard-arrow-left" size={20} color="#1b9f65" />
                    </TouchableOpacity>
                    <Text style={{ color: '#fff', fontWeight: "600", fontSize: responsiveFontSize(2.4) }}>Order confimation</Text>
                </View>
            </View> */}

            {/* Content */}
            <View style={{ height: "100%", flexDirection: 'column', backgroundColor: "#003243", justifyContent: "center", paddingBottom: 120, }}>

                {/* Image */}
                <View style={{ justifyContent: "center", width: "100%", flexDirection: "row", }}>
                    <Image
                        source={require("../assets/Newfolder/checked.png")}
                        style={{
                            width: 200,
                            height: 200,
                            resizeMode: 'contain',
                        }}
                    />
                </View>

                {/* Thank you */}
                <Text style={{ color: "#20be79", fontSize: responsiveFontSize(5.3), textAlign: "center", fontWeight: "600" }}>Thank you!</Text>

                <Text style={{ color: "#fff", fontWeight: "600", fontSize: responsiveFontSize(2.3), textAlign: "center", marginTop: 3 }}>Order placed successfully</Text>

                <Text style={{ color: "#8d8990", textAlign: "center", paddingHorizontal: 40, fontWeight: "500", marginTop: 35, fontSize: responsiveFontSize(2) }}>You will be redirected to the home page in {time} seconds</Text>

                {/* Home */}
                <TouchableOpacity style={{ backgroundColor: "#20be79", width: "50%", paddingVertical: 7, borderRadius: 50, alignSelf: "center", marginTop: 40, elevation: 3 }} onPress={() => navigation.navigate("Deshboard")}>
                    <Text style={{ color: "#fff", alignSelf: "center", fontWeight: "400", fontSize: responsiveFontSize(2.2) }}>Return to Home</Text>
                </TouchableOpacity>

            </View>

        </SafeAreaView>
    )
}

export default ThankYouPage

const styles = StyleSheet.create({})