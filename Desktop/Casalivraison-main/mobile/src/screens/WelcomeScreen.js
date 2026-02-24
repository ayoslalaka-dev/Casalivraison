import React, { useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    FlatList,
    Animated,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ChatBot from '../components/ChatBot';
const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        icon: 'restaurant',
        iconBg: ['#E54B4B', '#F78154'],
        title: 'Les meilleurs restaurants',
        subtitle: 'de Casablanca',
        description: 'Découvrez une sélection exclusive des restaurants les plus réputés de Casablanca, livrés chez vous.',
        bgColors: ['#1a0a0a', '#2d0d0d'],
        accentColor: '#E54B4B',
    },
    {
        id: '2',
        icon: 'bicycle',
        iconBg: ['#F78154', '#FBBA72'],
        title: 'Livraison rapide',
        subtitle: '& fiable',
        description: 'Nos livreurs partenaires vous apportent vos plats en moins de 30 minutes, frais et bien emballés.',
        bgColors: ['#100a1a', '#1a0d2d'],
        accentColor: '#F78154',
    },
    {
        id: '3',
        icon: 'location',
        iconBg: ['#4CAF50', '#81C784'],
        title: 'Suivi en temps réel',
        subtitle: 'à Casablanca',
        description: 'Suivez votre commande en direct depuis la préparation jusqu\'à votre porte, étape par étape.',
        bgColors: ['#0a1a0a', '#0d2d0d'],
        accentColor: '#4CAF50',
    },
];

const WelcomeScreen = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.navigate('MainTabs');
        }
    };

    const handleSkip = () => {
        navigation.navigate('MainTabs');
    };

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const renderSlide = ({ item }) => (
        <View style={styles.slide}>
            <LinearGradient colors={item.bgColors} style={StyleSheet.absoluteFill} />

            {/* Décorations d'arrière-plan */}
            <View style={[styles.decorCircle, styles.decorCircle1, { borderColor: item.accentColor + '22' }]} />
            <View style={[styles.decorCircle, styles.decorCircle2, { borderColor: item.accentColor + '15' }]} />

            {/* Icône centrale */}
            <View style={styles.iconWrapper}>
                <LinearGradient colors={item.iconBg} style={styles.iconGradient}>
                    <Ionicons name={item.icon} size={64} color="white" />
                </LinearGradient>
                <View style={[styles.iconGlow, { backgroundColor: item.accentColor + '30' }]} />
            </View>

            {/* Texte */}
            <View style={styles.textBlock}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={[styles.subtitle, { color: item.accentColor }]}>{item.subtitle}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </View>
    );

    const isLast = currentIndex === slides.length - 1;
    const currentAccent = slides[currentIndex].accentColor;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1a0a0a" />

            {/* Bouton Passer */}
            {!isLast && (
                <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                    <Text style={styles.skipText}>Passer</Text>
                </TouchableOpacity>
            )}

            {/* Slides */}
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                scrollEventThrottle={16}
            />

            {/* Footer : dots + bouton */}
            <View style={styles.footer}>
                {/* Pagination dots */}
                <View style={styles.dotsRow}>
                    {slides.map((_, i) => {
                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                        const dotWidth = scrollX.interpolate({
                            inputRange,
                            outputRange: [8, 28, 8],
                            extrapolate: 'clamp',
                        });
                        const opacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.3, 1, 0.3],
                            extrapolate: 'clamp',
                        });
                        return (
                            <Animated.View
                                key={i}
                                style={[styles.dot, { width: dotWidth, opacity, backgroundColor: currentAccent }]}
                            />
                        );
                    })}
                </View>

                {/* Bouton Suivant / Commencer */}
                <TouchableOpacity onPress={handleNext} activeOpacity={0.85}>
                    <LinearGradient
                        colors={slides[currentIndex].iconBg}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.nextBtn}
                    >
                        <Text style={styles.nextBtnText}>
                            {isLast ? 'COMMENCER' : 'SUIVANT'}
                        </Text>
                        <Ionicons
                            name={isLast ? 'rocket-outline' : 'arrow-forward'}
                            size={20}
                            color="white"
                        />
                    </LinearGradient>
                </TouchableOpacity>

                {/* Texte bas de page */}
                <Text style={styles.footerNote}>
                    Service de livraison · Casablanca, Maroc
                </Text>
            </View>
            <ChatBot />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a0a0a',
    },
    skipBtn: {
        position: 'absolute',
        top: 55,
        right: 20,
        zIndex: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    skipText: {
        color: 'rgba(255,255,255,0.7)',
        fontSize: 14,
        fontWeight: '600',
    },
    slide: {
        width,
        height: height * 0.72,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        overflow: 'hidden',
    },
    decorCircle: {
        position: 'absolute',
        borderRadius: 999,
        borderWidth: 1,
    },
    decorCircle1: {
        width: width * 0.8,
        height: width * 0.8,
        top: -width * 0.2,
        right: -width * 0.2,
    },
    decorCircle2: {
        width: width * 1.2,
        height: width * 1.2,
        bottom: -width * 0.4,
        left: -width * 0.3,
    },
    iconWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
        position: 'relative',
    },
    iconGradient: {
        width: 130,
        height: 130,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 15,
    },
    iconGlow: {
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: 80,
        zIndex: -1,
    },
    textBlock: {
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
        lineHeight: 36,
    },
    subtitle: {
        fontSize: 30,
        fontWeight: '300',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: 2,
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.65)',
        textAlign: 'center',
        lineHeight: 25,
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingHorizontal: 30,
        gap: 20,
    },
    dotsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    dot: {
        height: 8,
        borderRadius: 4,
    },
    nextBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 16,
        gap: 10,
        width: width - 60,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    nextBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 1.5,
    },
    footerNote: {
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        fontWeight: '500',
        letterSpacing: 0.5,
    },
});

export default WelcomeScreen;
