import React, { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
    SafeAreaView,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import restaurantService from '../services/restaurant.service';
import RestaurantCard from '../components/RestaurantCard';

const CATEGORIES = [
    { id: '1', name: 'SUSHI', icon: 'fish' },
    { id: '2', name: 'GASTRONOMIC', icon: 'restaurant' },
    { id: '3', name: 'HEALTHY', icon: 'leaf' },
];

const RestaurantListScreen = ({ navigation }) => {
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('1');

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                const response = await restaurantService.getAll();
                setRestaurants(response.data.data);
            } catch (e) {
                console.error('Error fetching restaurants:', e);
                // Fallback mock data if API is offline
                setRestaurants([
                    { id: 1, name: "L'Artiste du Goût", category: { name: 'French Fusion' }, type: 'Gastronomic', deliveryTime: '20-30 min', rating: 4.9, imageUrl: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070' },
                    { id: 2, name: 'Ocean Breeze Sushi', category: { name: 'Japanese' }, type: 'Authentic', deliveryTime: '25-40 min', rating: 4.8, imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070' },
                    { id: 3, name: 'La Medina Spice', category: { name: 'Moroccan' }, type: 'Traditional', deliveryTime: '30-45 min', rating: 4.7, imageUrl: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=2070' }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchRestaurants();
    }, []);

    const renderHeader = () => (
        <View>
            <View style={styles.headerTitleContainer}>
                <View>
                    <Text style={styles.headerSubtitle}>Explore the elite</Text>
                    <Text style={styles.headerTitle}>CasaLivraison Selection</Text>
                </View>
                <TouchableOpacity style={styles.searchButton}>
                    <Ionicons name="search" size={24} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.heroCard}
                onPress={() => navigation.navigate('RestaurantDetail', { id: restaurants[0]?.id || 1 })}
            >
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2070&auto=format&fit=crop' }}
                    style={styles.heroImage}
                    imageStyle={{ borderRadius: 25 }}
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.8)']}
                        style={styles.heroGradient}
                    >
                        <View style={styles.badgeContainer}>
                            <Text style={styles.badgeText}>EDITOR'S CHOICE</Text>
                        </View>
                        <Text style={styles.heroTitle}>L'Artiste du Goût</Text>
                        <Text style={styles.heroSubtitle}>Sophisticated French fusion in the heart of Anfa.</Text>
                        <TouchableOpacity
                            style={styles.heroButton}
                            onPress={() => navigation.navigate('RestaurantDetail', { id: restaurants[0]?.id || 1 })}
                        >
                            <Text style={styles.heroButtonText}>Explore Menu</Text>
                            <Ionicons name="arrow-forward" size={16} color="black" />
                        </TouchableOpacity>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
                contentContainerStyle={{ paddingRight: 20 }}
            >
                {CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[
                            styles.categoryCard,
                            activeCategory === cat.id && styles.activeCategoryCard,
                        ]}
                        onPress={() => setActiveCategory(cat.id)}
                    >
                        <Ionicons
                            name={cat.icon}
                            size={18}
                            color={activeCategory === cat.id ? 'white' : '#E54B4B'}
                        />
                        <Text style={[
                            styles.categoryText,
                            activeCategory === cat.id && styles.activeCategoryText,
                        ]}>
                            {cat.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            <View style={styles.sectionHeader}>
                <View>
                    <Text style={styles.sectionTitle}>Trending</Text>
                    <Text style={styles.sectionSubtitle}>CASABLANCA'S FAVORITES</Text>
                </View>
                <TouchableOpacity>
                    <Text style={styles.viewAllText}>VIEW ALL</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderFooter = () => (
        <View style={styles.footerBanner}>
            <View style={styles.bannerInfo}>
                <Text style={styles.bannerSubtitle}>MEMBERSHIP</Text>
                <Text style={styles.bannerTitle}>Join the Gold Circle for free delivery.</Text>
                <TouchableOpacity style={styles.bannerButton}>
                    <Text style={styles.bannerButtonText}>UPGRADE NOW</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bannerIconContainer}>
                <View style={styles.bannerCircle}>
                    <Ionicons name="star" size={30} color="#E54B4B" />
                </View>
            </View>
        </View>
    );

    if (loading) return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#E54B4B" />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <TouchableOpacity>
                    <Ionicons name="menu-outline" size={28} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.brandName}>CASALIVRAISON</Text>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={26} color="#1A1A1A" />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={restaurants}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                renderItem={({ item }) => (
                    <RestaurantCard
                        restaurant={item}
                        onPress={() => navigation.navigate('RestaurantDetail', { id: item.id })}
                    />
                )}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    brandName: {
        fontSize: 18,
        fontWeight: '800',
        color: '#E54B4B',
        letterSpacing: 2,
    },
    notificationDot: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#E54B4B',
        borderWidth: 1.5,
        borderColor: 'white',
    },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    list: { padding: 20 },
    headerTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#BCBCBC',
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    searchButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroCard: {
        height: 300,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 8,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        flex: 1,
        padding: 25,
        justifyContent: 'flex-end',
        borderRadius: 25,
    },
    badgeContainer: {
        backgroundColor: '#E54B4B',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        alignSelf: 'flex-start',
        marginBottom: 12,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1,
    },
    heroTitle: {
        color: 'white',
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 8,
    },
    heroSubtitle: {
        color: '#E0E0E0',
        fontSize: 14,
        marginBottom: 20,
        lineHeight: 20,
    },
    heroButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    heroButtonText: {
        color: '#1A1A1A',
        fontWeight: '700',
        marginRight: 8,
    },
    categoriesContainer: {
        marginBottom: 30,
    },
    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 15,
        backgroundColor: '#FAFAFA',
        marginRight: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    activeCategoryCard: {
        backgroundColor: '#E54B4B',
        borderColor: '#E54B4B',
    },
    categoryText: {
        marginLeft: 8,
        fontWeight: '700',
        fontSize: 13,
        color: '#BCBCBC',
    },
    activeCategoryText: {
        color: 'white',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    sectionSubtitle: {
        fontSize: 12,
        color: '#BCBCBC',
        fontWeight: '700',
        letterSpacing: 1,
        marginTop: 2,
    },
    viewAllText: {
        color: '#E54B4B',
        fontWeight: '700',
        fontSize: 13,
        borderBottomWidth: 2,
        borderBottomColor: '#E54B4B',
        paddingBottom: 2,
    },
    footerBanner: {
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        padding: 25,
        borderRadius: 25,
        marginTop: 10,
        marginBottom: 30,
        alignItems: 'center',
    },
    bannerInfo: {
        flex: 1,
    },
    bannerSubtitle: {
        fontSize: 10,
        fontWeight: '800',
        color: '#E54B4B',
        letterSpacing: 1,
        marginBottom: 8,
    },
    bannerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 15,
    },
    bannerButton: {
        backgroundColor: 'black',
        paddingHorizontal: 18,
        paddingVertical: 10,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    bannerButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '800',
    },
    bannerIconContainer: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bannerCircle: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FFEEEE',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default RestaurantListScreen;
