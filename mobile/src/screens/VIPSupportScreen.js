import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image,
    TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const VIPSupportScreen = ({ navigation }) => {
    const [expandedFAQ, setExpandedFAQ] = useState('2'); // '2' is expanded in screenshot

    const FAQS = [
        { title: 'How do I access my exclusive lounge benefits?', id: '1' },
        {
            title: 'Increasing my daily transaction limits',
            id: '2',
            answer: 'As a VIP member, you have higher default limits. To increase them further for a specific transaction, please contact your Concierge directly via the Priority Line for instant verification and temporary limit adjustment.'
        },
        { title: 'Adding a secondary cardholder', id: '3' },
        { title: 'Account security and global travel', id: '4' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>VIP Support</Text>
                <TouchableOpacity style={styles.headerIcon}>
                    <Ionicons name="ribbon" size={20} color="#E54B4B" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.conciergeHeader}>
                    <View style={styles.conciergeAvatarContainer}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop' }}
                            style={styles.conciergeAvatar}
                        />
                        <View style={styles.onlineBadge} />
                    </View>
                    <Text style={styles.welcomeTitle}>Welcome back, Alexander</Text>
                    <Text style={styles.welcomeText}>Your dedicated VIP team is standing by to provide immediate assistance with your premium account.</Text>

                    <View style={styles.responseTimeRow}>
                        <Ionicons name="time" size={16} color="#E54B4B" />
                        <Text style={styles.responseTimeText}> AVERAGE RESPONSE: 30 SECONDS</Text>
                    </View>
                </View>

                <View style={styles.actionButtons}>
                    <TouchableOpacity style={styles.primaryActionButton}>
                        <LinearGradient
                            colors={['#E54B4B', '#EB5757']}
                            style={styles.buttonGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.2)' }]}>
                                <Ionicons name="chatbubble" size={20} color="white" />
                            </View>
                            <View style={styles.buttonTextContainer}>
                                <Text style={styles.buttonTitle}>Message Concierge</Text>
                                <Text style={styles.buttonSubtitle}>Start instant chat</Text>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.secondaryActionButton}>
                        <View style={[styles.iconBox, { backgroundColor: '#FFF5F5' }]}>
                            <Ionicons name="call" size={20} color="#E54B4B" />
                        </View>
                        <View style={styles.buttonTextContainer}>
                            <Text style={styles.buttonTitleBlack}>Priority Line</Text>
                            <Text style={styles.buttonSubtitleGray}>Call dedicated expert</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchContainer}>
                    <Ionicons name="search" size={20} color="#BCBCBC" style={styles.searchIcon} />
                    <TextInput
                        placeholder="How can we help you today?"
                        style={styles.searchInput}
                        placeholderTextColor="#BCBCBC"
                    />
                </View>

                <View style={styles.faqSection}>
                    <View style={styles.faqHeader}>
                        <Ionicons name="checkmark-circle" size={18} color="#E54B4B" />
                        <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
                    </View>

                    {FAQS.map((faq) => (
                        <TouchableOpacity
                            key={faq.id}
                            style={[styles.faqItem, expandedFAQ === faq.id && styles.expandedFaqItem]}
                            onPress={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        >
                            <View style={styles.faqRow}>
                                <Text style={[styles.faqItemTitle, expandedFAQ === faq.id && styles.activeFaqTitle]}>
                                    {faq.title}
                                </Text>
                                <Ionicons
                                    name={expandedFAQ === faq.id ? "chevron-up" : "chevron-down"}
                                    size={18}
                                    color="#BCBCBC"
                                />
                            </View>
                            {expandedFAQ === faq.id && faq.answer && (
                                <Text style={styles.faqAnswer}>{faq.answer}</Text>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={styles.footerCards}>
                    <TouchableOpacity style={styles.footerCard}>
                        <View style={styles.footerIconBox}>
                            <Ionicons name="shield-checkmark" size={20} color="#E54B4B" />
                        </View>
                        <Text style={styles.footerCardTitle}>Security Hub</Text>
                        <Text style={styles.footerCardSubtitle}>Protect your assets</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.footerCard}>
                        <View style={styles.footerIconBox}>
                            <Ionicons name="receipt" size={20} color="#E54B4B" />
                        </View>
                        <Text style={styles.footerCardTitle}>Statements</Text>
                        <Text style={styles.footerCardSubtitle}>Download reports</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="home" size={24} color="#BCBCBC" />
                    <Text style={styles.navLabel}>HOME</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="star" size={24} color="#BCBCBC" />
                    <Text style={styles.navLabel}>BENEFITS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="headset" size={24} color="#E54B4B" />
                    <Text style={[styles.navLabel, { color: '#E54B4B' }]}>SUPPORT</Text>
                    <View style={styles.navActiveDot} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Ionicons name="person" size={24} color="#BCBCBC" />
                    <Text style={styles.navLabel}>PROFILE</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FAFAFA' },
    headerBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFFFFF',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
    },
    headerIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContent: {
        paddingBottom: 100,
    },
    conciergeHeader: {
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
    },
    conciergeAvatarContainer: {
        padding: 3,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#FFD7D7',
        marginBottom: 15,
    },
    conciergeAvatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    onlineBadge: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 15,
        height: 15,
        borderRadius: 7.5,
        backgroundColor: '#2E7D32',
        borderWidth: 2,
        borderColor: 'white',
    },
    welcomeTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 10,
    },
    welcomeText: {
        fontSize: 14,
        color: '#757575',
        textAlign: 'center',
        lineHeight: 20,
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    responseTimeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    responseTimeText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#E54B4B',
        letterSpacing: 0.5,
    },
    actionButtons: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    primaryActionButton: {
        marginBottom: 15,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#E54B4B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    secondaryActionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginBottom: 25,
    },
    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    buttonTextContainer: {
        flex: 1,
    },
    buttonTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: 'white',
    },
    buttonSubtitle: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
    },
    buttonTitleBlack: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
    },
    buttonSubtitleGray: {
        fontSize: 12,
        color: '#757575',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 20,
        paddingHorizontal: 15,
        height: 55,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        marginBottom: 30,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 15,
        color: '#1A1A1A',
    },
    faqSection: {
        paddingHorizontal: 25,
    },
    faqHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    faqTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
        marginLeft: 10,
    },
    faqItem: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 15,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#F7F7F7',
    },
    expandedFaqItem: {
        borderColor: '#E54B4B',
        borderLeftWidth: 4,
    },
    faqRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqItemTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A1A1A',
        flex: 1,
        marginRight: 10,
    },
    activeFaqTitle: {
        color: '#E54B4B',
    },
    faqAnswer: {
        marginTop: 15,
        fontSize: 14,
        color: '#757575',
        lineHeight: 22,
    },
    footerCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 30,
    },
    footerCard: {
        flex: 0.48,
        backgroundColor: '#FFF5F5',
        padding: 15,
        borderRadius: 15,
    },
    footerIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    footerCardTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    footerCardSubtitle: {
        fontSize: 12,
        color: '#757575',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
        paddingBottom: 20,
    },
    navItem: {
        alignItems: 'center',
    },
    navLabel: {
        fontSize: 10,
        fontWeight: '800',
        color: '#BCBCBC',
        marginTop: 4,
    },
    navActiveDot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#E54B4B',
        marginTop: 2,
    }
});

export default VIPSupportScreen;
