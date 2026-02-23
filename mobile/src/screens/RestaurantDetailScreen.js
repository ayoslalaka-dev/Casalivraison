import React, { useEffect, useState, useContext } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Image,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    ImageBackground,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import restaurantService from '../services/restaurant.service';
import { CartContext } from '../context/CartContext';
import { formatPrice } from '../utils/formatters';

const { width } = Dimensions.get('window');

const MENU_CATEGORIES = [
    { id: 'all', name: 'Signature Grills' },
    { id: 'starters', name: 'Meze & Starters' },
    { id: 'premium', name: 'Premium Cuts' },
];

const RestaurantDetailScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState('all');
    const { items, addToCart } = useContext(CartContext);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const [detailsRes, menusRes] = await Promise.all([
                    restaurantService.getOne(id),
                    restaurantService.getMenus(id)
                ]);
                if (detailsRes?.data?.data) {
                    const restaurantData = detailsRes.data.data;
                    restaurantData.menus = menusRes?.data?.data || [];
                    setRestaurant(restaurantData);
                } else {
                    // Fallback mock data if API fails or returns empty
                    setRestaurant({
                        id,
                        name: 'Le Maârif Grill',
                        description: 'Specialty of the house',
                        menus: [
                            { id: 1, name: 'Signature Wagyu Ribeye', price: 120, isVip: true, imageUrl: 'https://images.unsplash.com/photo-1544025162-831afed7a6e1' },
                            { id: 2, name: 'Truffle Mashed Potatoes', price: 25, isEcoFriendly: true, imageUrl: 'https://images.unsplash.com/photo-1512485800893-b08ec1ea59b1' }
                        ]
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = items.reduce((count, item) => count + item.quantity, 0);

    if (loading) return (
        <View style={styles.center}>
            <ActivityIndicator size="large" color="#E54B4B" />
        </View>
    );

    if (!restaurant) return (
        <View style={styles.center}>
            <Text>Restaurant introuvable</Text>
        </View>
    );

    const renderHeader = () => (
        <View>
            <TouchableOpacity
                style={styles.heroSection}
                activeOpacity={0.9}
            >
                <ImageBackground
                    source={{ uri: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop' }}
                    style={styles.heroImage}
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        style={styles.heroGradient}
                    >
                        <View style={styles.specialtyBadge}>
                            <Text style={styles.specialtyBadgeText}>SPECIALTY OF THE HOUSE</Text>
                        </View>
                        <Text style={styles.heroItemTitle}>Signature Wagyu Ribeye Platter</Text>
                        <Text style={styles.heroItemDesc}>Dry-aged for 28 days, finished with smoked sea salt and herb butter.</Text>
                    </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoriesContainer}
                contentContainerStyle={{ paddingHorizontal: 20 }}
            >
                {MENU_CATEGORIES.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={[
                            styles.categoryTab,
                            activeCategory === cat.id && styles.activeCategoryTab,
                        ]}
                        onPress={() => setActiveCategory(cat.id)}
                    >
                        <Text style={[
                            styles.categoryTabText,
                            activeCategory === cat.id && styles.activeCategoryTabText,
                        ]}>
                            {cat.name}
                        </Text>
                        {activeCategory === cat.id && <View style={styles.activeIndicator} />}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );

    const renderMenuItem = ({ item }) => (
        <View style={styles.menuItemCard}>
            <View style={styles.itemImageContainer}>
                <Image
                    source={{ uri: item.imageUrl || 'https://images.unsplash.com/photo-1532467411038-57680e47d119?q=80&w=2070&auto=format&fit=crop' }}
                    style={styles.itemImage}
                />
                {item.isVip && (
                    <View style={styles.vipBadge}>
                        <Ionicons name="ribbon" size={10} color="#1A1A1A" />
                        <Text style={styles.vipBadgeText}>VIP CHOICE</Text>
                    </View>
                )}
                {item.isEcoFriendly && (
                    <View style={[styles.vipBadge, { top: 40, backgroundColor: '#E8F5E9' }]}>
                        <Ionicons name="leaf" size={10} color="#2E7D32" />
                        <Text style={[styles.vipBadgeText, { color: '#2E7D32' }]}>ECO-FRIENDLY</Text>
                    </View>
                )}
            </View>
            <View style={styles.itemInfo}>
                <View style={styles.itemNameRow}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>{formatPrice(parseFloat(item.price))}</Text>
                </View>
                <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description || 'Locally sourced lamp marinated in 12 Moroccan spices, flame-grilled over holm oak charcoal.'}
                </Text>

                <View style={styles.actionRow}>
                    <TouchableOpacity
                        style={styles.addToOrderButton}
                        onPress={() => {
                            addToCart(item, 1);
                            // Notification push or visual feedback
                        }}
                    >
                        <Ionicons name="cart-outline" size={18} color="white" />
                        <Text style={styles.addToOrderText}>Add to Order</Text>
                    </TouchableOpacity>

                    <View style={styles.quantityContainer}>
                        <TouchableOpacity style={styles.qtyBtn}><Ionicons name="remove" size={16} color="#757575" /></TouchableOpacity>
                        <Text style={styles.qtyText}>1</Text>
                        <TouchableOpacity style={styles.qtyBtn}><Ionicons name="add" size={16} color="#E54B4B" /></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>LE MAÂRIF GRILL</Text>
                <TouchableOpacity>
                    <Ionicons name="search" size={24} color="#1A1A1A" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={restaurant.menus}
                keyExtractor={item => item.id.toString()}
                ListHeaderComponent={renderHeader}
                renderItem={renderMenuItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />

            {cartCount > 0 && (
                <TouchableOpacity
                    style={styles.cartSummary}
                    onPress={() => navigation.navigate('Cart')}
                >
                    <LinearGradient
                        colors={['#E54B4B', '#EB5757']}
                        style={styles.cartGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View style={styles.cartCountBadge}>
                            <Text style={styles.cartCountText}>{cartCount}</Text>
                        </View>
                        <View style={styles.cartTextInfo}>
                            <Text style={styles.cartItemsLabel}>ITEMS ADDED</Text>
                            <Text style={styles.cartActionLabel}>View Cart Summary</Text>
                        </View>
                        <View style={styles.cartPriceContainer}>
                            <Text style={styles.cartTotalAmount}>{formatPrice(cartTotal)}</Text>
                            <Text style={styles.cartTaxLabel}>+ Tax & Fees</Text>
                        </View>
                    </LinearGradient>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '800',
        color: '#E54B4B',
        letterSpacing: 2,
    },
    heroSection: {
        height: 220,
        marginBottom: 20,
    },
    heroImage: {
        width: '100%',
        height: '100%',
    },
    heroGradient: {
        flex: 1,
        padding: 20,
        justifyContent: 'flex-end',
    },
    specialtyBadge: {
        backgroundColor: '#E54B4B',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 10,
    },
    specialtyBadgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '800',
    },
    heroItemTitle: {
        color: 'white',
        fontSize: 26,
        fontWeight: '800',
        marginBottom: 5,
    },
    heroItemDesc: {
        color: '#E0E0E0',
        fontSize: 13,
        lineHeight: 18,
    },
    categoriesContainer: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    categoryTab: {
        paddingVertical: 15,
        marginRight: 25,
        position: 'relative',
    },
    categoryTabText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#757575',
    },
    activeCategoryTabText: {
        color: '#E54B4B',
        fontWeight: '700',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#E54B4B',
    },
    list: { paddingBottom: 100 },
    menuItemCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        marginBottom: 20,
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
    },
    itemImageContainer: {
        height: 200,
        width: '100%',
        position: 'relative',
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    vipBadge: {
        position: 'absolute',
        top: 15,
        left: 15,
        backgroundColor: '#FFEB3B',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    vipBadgeText: {
        fontSize: 9,
        fontWeight: '800',
        color: '#1A1A1A',
        marginLeft: 4,
    },
    itemInfo: {
        padding: 15,
    },
    itemNameRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemName: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1A1A1A',
        flex: 1,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#E54B4B',
    },
    itemDescription: {
        fontSize: 13,
        color: '#757575',
        lineHeight: 18,
        marginBottom: 20,
    },
    actionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addToOrderButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E54B4B',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 12,
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
    },
    addToOrderText: {
        color: 'white',
        fontWeight: '700',
        marginLeft: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7F7F7',
        padding: 5,
        borderRadius: 12,
    },
    qtyBtn: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    qtyText: {
        paddingHorizontal: 12,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    cartSummary: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#E54B4B',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    cartGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    cartCountBadge: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartCountText: {
        color: 'white',
        fontWeight: '800',
        fontSize: 16,
    },
    cartTextInfo: {
        flex: 1,
        marginLeft: 15,
    },
    cartItemsLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    cartActionLabel: {
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
    },
    cartPriceContainer: {
        alignItems: 'flex-end',
    },
    cartTotalAmount: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
    },
    cartTaxLabel: {
        color: 'rgba(255, 255, 255, 0.7)',
        fontSize: 9,
        fontWeight: '600',
    },
});

export default RestaurantDetailScreen;
