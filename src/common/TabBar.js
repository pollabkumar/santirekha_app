// import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// import { useState } from 'react';
// import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
// import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
// import Icon3 from 'react-native-vector-icons/dist/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';
// import { responsiveFontSize } from "react-native-responsive-dimensions";


// const TabBar = () => {
//     const [sidebaropen, setsidebaropen] = useState(false);
//     const navigation = useNavigation();
//     const primarycolor = "#066B8C"
//     const Whitecolor = "#fff"
//     const litegrey = "#dfdfdf"
//     const black = "#000"
//     return (
//         <View style={{ flex: 1 }}>
//             <View style={{
//                 width: "100%",
//                 height: 57,
//                 flexDirection: "row",
//                 backgroundColor: primarycolor,
//                 alignItems: "center",
//                 justifyContent: "space-evenly",

//                 position: "absolute",
//                 bottom: 0,

//             }}>

//                 {/* home */}
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('Deshboard')}
//                     style={{
//                         width: "25%",
//                         height: 60,
//                         justifyContent: "center",
//                         alignItems: "center",

//                     }}
//                 >
//                     <Icon name='home'
//                         style={{ color: Whitecolor, fontSize: responsiveFontSize(2.7) }}
//                     />
//                     <Text style={{ fontSize: responsiveFontSize(1.40), color: Whitecolor, fontWeight: "800" }}>Home</Text>
//                 </TouchableOpacity>


//                 {/* category */}
//                 <TouchableOpacity
//                 onPress={()=>navigation.navigate("Category")}
//                     style={{
//                         width: "25%",
//                         height: 60,
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }} >
//                     <Icon name='view-grid-plus-outline'
//                         style={{ color: Whitecolor, fontSize: responsiveFontSize(2.6) }}
//                     />
//                     <Text style={{ fontSize: responsiveFontSize(1.40), color: Whitecolor, fontWeight: "800" }}>
//                         categories
//                     </Text>
//                 </TouchableOpacity>

//                 {/* Account */}
//                 <TouchableOpacity
//                     style={{
//                         width: "25%",
//                         height: 60,
//                         justifyContent: "center",
//                         alignItems: "center",
//                     }}
//                     onPress={() => navigation.navigate('Account')}
//                 >
//                     <Icon2 name='user'
//                         style={{ color: Whitecolor, fontSize: responsiveFontSize(2.6) }}
//                     />
//                     <Text style={{ fontSize: responsiveFontSize(1.40), color: Whitecolor, fontWeight: "800" }}>Account</Text>
//                 </TouchableOpacity>

//             </View>
//         </View>
//     )
// }

// export default TabBar;

// const styles = StyleSheet.create({});

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/dist/FontAwesome';
import Icon3 from 'react-native-vector-icons/dist/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { responsiveFontSize } from "react-native-responsive-dimensions";

const TabBar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const primarycolor = "#066B8C";
    const Whitecolor = "#fff";
    const redColor = "red";

    const getColor = (screen) => {
        return route.name === screen ? Whitecolor : "#b2b2b2";
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                width: "100%",
                height: 57,
                flexDirection: "row",
                backgroundColor: primarycolor,
                alignItems: "center",
                justifyContent: "space-evenly",
                position: "absolute",
                bottom: 0,
            }}>

                {/* home */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('Deshboard')}
                    style={{
                        width: "25%",
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Icon name='home'
                        style={{ color: getColor('Deshboard'), fontSize: responsiveFontSize(2.7) }}
                    />
                    <Text style={{ fontSize: responsiveFontSize(1.40), color: getColor('Deshboard'), fontWeight: "800" }}>Home</Text>
                </TouchableOpacity>

                {/* category */}
                <TouchableOpacity
                    onPress={() => navigation.navigate("Category")}
                    style={{
                        width: "25%",
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Icon name='view-grid-plus-outline'
                        style={{ color: getColor('Category'), fontSize: responsiveFontSize(2.6) }}
                    />
                    <Text style={{
                        fontSize: responsiveFontSize(1.40),
                        color: getColor('Category'),
                        fontWeight: "800"
                    }}>
                        Categories
                    </Text>
                </TouchableOpacity>

                {/* Account */}
                <TouchableOpacity
                    style={{
                        width: "25%",
                        height: 60,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => navigation.navigate('Account')}
                >
                    <Icon2 name='user'
                        style={{ color: getColor('Account'), fontSize: responsiveFontSize(2.6) }}
                    />
                    <Text style={{ fontSize: responsiveFontSize(1.40), color: getColor('Account'), fontWeight: "800" }}>Account</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TabBar;

const styles = StyleSheet.create({});

