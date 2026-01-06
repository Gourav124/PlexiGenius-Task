import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList, Dimensions, Platform } from 'react-native'
import React, { useState, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../theme/colors'
import { Products } from '../../data'


const Homescreen = () => {
    const [selectedCategory, setSelectedCategory] = useState('Hot Coffees');
    const [favorites, setFavorites] = useState<Set<number>>(new Set());

    const toggleFavorite = (id: number) => {
        setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    const renderProduct = ({ item }: any) => {
        return (
            <View style={styles.card}>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => toggleFavorite(item.id)}
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                    }}
                >
                    <Image
                        source={
                            favorites.has(item.id)
                                ? require('../../assets/icons/redheart.png')
                                : require('../../assets/icons/heart.png')
                        }
                        style={{
                            width: 18,
                            height: 18,
                            tintColor: favorites?'#000': '#fff',
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                    <Image source={item.image} style={styles.productImage} resizeMode="cover" />
                <View style={styles.cardRow}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>${item.price}</Text>
                </View>
                <Text style={styles.productDesc}>{item.description}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.profileContainer}>
                    <Image
                        source={require('../../assets/images/Image-60.png')}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.textContainer}>
                        <Text style={styles.headingText}>Shahzaib</Text>
                        <Text style={styles.subHeadintText}>Good Morning!</Text>
                    </View>
                    <View style={styles.headerIconContainer}>
                        <TouchableOpacity style={styles.icon}>
                            <Image source={require('../../assets/icons/search-line.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.icon}>
                            <Image source={require('../../assets/icons/notification-4-line.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.bannerContainer, { marginTop: 6 }]}>
                    <View style={styles.bannerTextWrap}>
                        <Text style={styles.bannerTitle} numberOfLines={2}>
                            Get 20% Discount on your First Order
                        </Text>
                        <Text style={styles.bannerSub} numberOfLines={2}>
                            Lorem ipsum dolor sit amet consectetur. Vestibulum eget blandit mattis
                        </Text>
                    </View>
                    <View style={styles.bannerImageWrap}>
                        <Image
                            source={require('../../assets/images/image_13.png')}
                            style={styles.bannerImage}
                            resizeMode="cover"
                        />
                    </View>
                </View>
                <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingVertical: 8 }}
                >
                    {['Hot Coffees', 'Ice Teas', 'Hot Teas', 'Drinks', 'Bakery'].map((item, index) => (
                        <TouchableOpacity key={index} style={styles.categoryItem} onPress={() => setSelectedCategory(item)}>
                            <Text style={{
                                color: selectedCategory === item ? '#CE9760' : '#fff',
                                fontSize: 18,
                                fontFamily: selectedCategory === item ? 'Poppins-SemiBold' : 'Poppins-Regular',
                            }}>{item}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <FlatList
                    data={Products}
                    keyExtractor={(item: any) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    renderItem={renderProduct}
                    contentContainerStyle={{paddingBottom: 16 }}
                    style={{ marginTop: 8 }}
                />
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Homescreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 10,
    },
    image: {
        width: 60,
        height: 60
    },
    headingText: {
        fontSize: 20,
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
    },
    subHeadintText: {
        fontSize: 16,
        fontFamily: 'Poppins-Light',
        color: '#fff',
    },
    icon: {
        width: 50,
        height: 50,
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerIconContainer: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    bannerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: colors.bannerColor,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 120,
    },
    bannerTextWrap: {
        flex: 1,
        paddingRight: 16,
        justifyContent: 'center',
    },
    bannerTitle: {
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold',
        color: '#fff',
    },
    bannerSub: {
        fontSize: 9,
        fontFamily: 'Poppins-Regular',
        color: '#fff',
        marginTop: 8,
    },
    bannerImageWrap: {
        width: 140,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bannerImage: {
        width: '100%',
        height: '100%',
        borderRadius: 12,
    },
    categoryItem: {
        paddingHorizontal: 10,
        marginTop:10,
        marginRight: 12,
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#CE9760',
        borderRadius: 8,
        margin: 8,
        padding: 8,
        elevation:4,
        width: Dimensions.get('window').width / 2 - 32,
    },
    productImage: {
        width: 120,
        height: 100,
        alignSelf: 'center',
    },
    productPlaceholder: {
        backgroundColor: '#fff',
        opacity: 0.2,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    productName: {
        fontSize: 16,
        color: '#fff',
        fontFamily: 'Poppins-SemiBold',
    },
    productPrice: {
        color: '#39260B',
        fontFamily: 'Poppins-SemiBold',
    },
    productDesc: {
        fontSize: 12,
        color: '#39260B',
        fontFamily: 'Poppins-Regular',
    },
})