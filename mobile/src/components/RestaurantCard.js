import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RestaurantCard = ({ restaurant, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: restaurant.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop' }}
                    style={styles.image}
                />
                <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#FFB800" />
                    <Text style={styles.ratingText}>{restaurant.rating || '4.9'}</Text>
                </View>
                <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={22} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            <View style={styles.info}>
                <Text style={styles.name}>{restaurant.name}</Text>
                <Text style={styles.details}>
                    {restaurant.category?.name || 'Japanese'} • {restaurant.type || 'Traditional'} • {restaurant.deliveryTime || '25-35 min'}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'transparent',
        marginBottom: 25,
        borderRadius: 20,
        overflow: 'hidden',
    },
    imageContainer: {
        width: '100%',
        height: 180,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#F5F5F5',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    ratingBadge: {
        position: 'absolute',
        top: 15,
        right: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    ratingText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#1A1A1A',
        marginLeft: 4,
    },
    favoriteButton: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    info: {
        paddingVertical: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
    },
    details: {
        color: '#757575',
        fontSize: 14,
        fontWeight: '500',
    },
});

export default RestaurantCard;
