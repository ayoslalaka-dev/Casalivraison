// mobile/src/components/RestaurantCard.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';

const RestaurantCard = ({ restaurant, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {/* Image Placeholder if imageUrl is invalid or local logic needed */}
            <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>{restaurant.name.charAt(0)}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Text style={styles.details}>
                    {restaurant.category?.name || 'Restaurant'} • {restaurant.address}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 12,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center'
    },
    imagePlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    imageText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#888'
    },
    info: {
        flex: 1
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4
    },
    details: {
        color: '#666',
        fontSize: 14
    }
});

export default RestaurantCard;
