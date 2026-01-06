import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Svg, { Path } from 'react-native-svg';
import colors from '../theme/colors';

const { width } = Dimensions.get('window');
const TAB_HEIGHT = 70;
const CURVE_HEIGHT = 30;
const TAB_COUNT = 4;
const TAB_WIDTH = width / TAB_COUNT;

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const focusedIndex = state.index;

    const getPath = () => {
        const center = TAB_WIDTH * (focusedIndex + 0.5);
        const startCurve = center - TAB_WIDTH / 2;
        const endCurve = center + TAB_WIDTH / 2;

        return `
      M 0 ${CURVE_HEIGHT}
      L ${startCurve} ${CURVE_HEIGHT}
      C ${startCurve + TAB_WIDTH / 4} ${CURVE_HEIGHT}, ${center - TAB_WIDTH / 4} 0, ${center} 0
      C ${center + TAB_WIDTH / 4} 0, ${endCurve - TAB_WIDTH / 4} ${CURVE_HEIGHT}, ${endCurve} ${CURVE_HEIGHT}
      L ${width} ${CURVE_HEIGHT}
      L ${width} ${TAB_HEIGHT + CURVE_HEIGHT}
      L 0 ${TAB_HEIGHT + CURVE_HEIGHT}
      Z
    `;
    };

    return (
        <View style={styles.container}>
            <View style={[styles.svgContainer, { backgroundColor: '#C59C6C' }]}>
                <Svg width={width} height={TAB_HEIGHT + CURVE_HEIGHT}>
                    <Path d={getPath()} fill="#C59C6C" />
                </Svg>
            </View>

            <View style={styles.tabsContainer}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            style={[
                                styles.tabButton,
                                isFocused ? styles.focusedTab : null
                            ]}
                            activeOpacity={0.8}
                        >
                            <View style={[styles.iconContainer, isFocused ? styles.focusedIconContainer : null]}>
                                <Image
                                    source={
                                        route.name === 'Home' ? require('../../assets/icons/home.png') :
                                            route.name === 'Cart' ? require('../../assets/icons/cart.png') :
                                                route.name === 'Favorites' ? require('../../assets/icons/heart.png') :
                                                    require('../../assets/icons/profile.png')
                                    }
                                    style={{
                                        width: 24,
                                        height: 24,
                                        tintColor: isFocused ? '#fff' : '#000'
                                    }}
                                    resizeMode="contain"
                                />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: width,
        height: TAB_HEIGHT + CURVE_HEIGHT,
        backgroundColor: 'transparent',
        elevation: 0,
    },
    svgContainer: {
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        bottom: 0,
    },
    tabsContainer: {
        flexDirection: 'row',
        height: TAB_HEIGHT,
        marginTop: CURVE_HEIGHT,
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    focusedTab: {
        marginBottom: CURVE_HEIGHT,
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    focusedIconContainer: {
        backgroundColor:  '#39260B',
        width: 50,
        height: 50,
        borderRadius: 25,
        elevation: 5,
    }
});

export default CustomTabBar;
