import React from 'react';

import { StyleSheet, View, Text, ImageBackground, SafeAreaView, Dimensions, Pressable, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
    const scaleValue = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=2070&auto=format&fit=crop' }}
                style={styles.backgroundImage}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.gradient}
                >
                    <SafeAreaView style={styles.safeArea}>
                        <View style={styles.header}>
                            <Text style={styles.logoText}>CASA <Text style={styles.logoTextItalic}>LIVRAISON</Text></Text>
                        </View>

                        <View style={styles.contentContainer}>
                            <BlurView intensity={20} tint="light" style={styles.glassCard}>
                                <Text style={styles.title}>The Art of Delivery</Text>
                                <Text style={styles.subtitle}>in Casablanca</Text>

                                <Text style={styles.description}>
                                    Experience the city's most exclusive eco-friendly courier service, tailored for the modern lifestyle.
                                </Text>

                                <Animated.View style={{ transform: [{ scale: scaleValue }], width: '100%', marginTop: 30 }}>
                                    <Pressable
                                        onPressIn={handlePressIn}
                                        onPressOut={handlePressOut}
                                        onPress={() => navigation.navigate('MainTabs')}
                                        style={({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }]}
                                    >
                                        <LinearGradient
                                            colors={['#E54B4B', '#F78154']}
                                            start={{ x: 0, y: 0 }}
                                            end={{ x: 1, y: 0 }}
                                            style={styles.exploreButtonGradient}
                                        >
                                            <Text style={styles.exploreButtonText}>COMMENCER L'EXPÉRIENCE</Text>
                                            <Ionicons name="chevron-forward" size={20} color="white" />
                                        </LinearGradient>
                                    </Pressable>
                                </Animated.View>

                                <View style={styles.pagination}>
                                    <View style={[styles.dot, styles.activeDot]} />
                                    <View style={styles.dot} />
                                    <View style={styles.dot} />
                                </View>
                            </BlurView>
                        </View>

                        <View style={styles.footer}>
                            <View style={styles.footerItem}>
                                <Ionicons name="leaf" size={14} color="#A8A8A8" />
                                <Text style={styles.footerText}> 100% CARBON NEUTRAL</Text>
                            </View>
                            <View style={styles.footerIcons}>
                                <Ionicons name="globe-outline" size={18} color="#A8A8A8" style={styles.footerIcon} />
                                <Ionicons name="help-circle-outline" size={18} color="#A8A8A8" />
                            </View>
                        </View>
                    </SafeAreaView>
                </LinearGradient>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    gradient: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    logoText: {
        fontSize: 22,
        fontWeight: '700',
        color: 'white',
        letterSpacing: 1,
    },
    logoTextItalic: {
        fontWeight: '300',
        fontStyle: 'italic',
    },
    loginButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    loginButtonText: {
        color: 'white',
        fontWeight: '600',
    },
    contentContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    glassCard: {
        width: width * 0.85,
        padding: 30,
        borderRadius: 30,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: 'white',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 32,
        fontWeight: '300',
        color: '#E54B4B',
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: -5,
    },
    description: {
        fontSize: 16,
        color: '#E0E0E0',
        textAlign: 'center',
        marginTop: 20,
        lineHeight: 24,
    },
    exploreButton: {
        marginTop: 30,
        width: '100%',
    },
    exploreButtonGradient: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 18,
        paddingHorizontal: 25,
        borderRadius: 15,
    },
    exploreButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 15,
        letterSpacing: 1,
    },
    pagination: {
        flexDirection: 'row',
        marginTop: 25,
    },
    dot: {
        width: 30,
        height: 4,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#E54B4B',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    footerItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        color: '#A8A8A8',
        fontSize: 10,
        fontWeight: '600',
        letterSpacing: 1,
    },
    footerIcons: {
        flexDirection: 'row',
    },
    footerIcon: {
        marginRight: 15,
    },
});

export default WelcomeScreen;
