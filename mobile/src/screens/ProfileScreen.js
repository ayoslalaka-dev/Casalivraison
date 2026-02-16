import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
    const { userInfo, logout } = useContext(AuthContext);

    const SETTINGS = [
        { id: '1', name: 'Account Settings', icon: 'settings-outline' },
        { id: '2', name: 'Notifications', icon: 'notifications-outline' },
        { id: '3', name: 'Support Center', icon: 'help-circle-outline', onPress: () => navigation.navigate('VIPSupport') },
        { id: '4', name: 'Privacy Policy', icon: 'shield-outline' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: userInfo?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop' }}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editAvatarButton}>
                            <Ionicons name="pencil" size={14} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.userName}>{userInfo?.name || 'Alex Johnson'}</Text>
                    <View style={styles.vipBadge}>
                        <Ionicons name="star" size={12} color="#856404" />
                        <Text style={styles.vipBadgeText}>VIP MEMBER</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Saved Addresses</Text>
                        <TouchableOpacity><Text style={styles.addNewText}>Add New</Text></TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.addressCard}>
                        <View style={[styles.addressIcon, { backgroundColor: '#FFF5F5' }]}>
                            <Ionicons name="home" size={20} color="#E54B4B" />
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressLabel}>Home</Text>
                            <Text style={styles.addressText}>123 Maple Street, Springfield, IL</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#BCBCBC" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.addressCard}>
                        <View style={[styles.addressIcon, { backgroundColor: '#FFF5F5' }]}>
                            <Ionicons name="briefcase" size={20} color="#E54B4B" />
                        </View>
                        <View style={styles.addressInfo}>
                            <Text style={styles.addressLabel}>Work</Text>
                            <Text style={styles.addressText}>456 Corporate Plaza, Tech District</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color="#BCBCBC" />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Settings & Support</Text>
                    <View style={styles.settingsList}>
                        {SETTINGS.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={styles.settingsItem}
                                onPress={item.onPress}
                            >
                                <Ionicons name={item.icon} size={22} color="#E54B4B" />
                                <Text style={styles.settingsItemText}>{item.name}</Text>
                                <Ionicons name="chevron-forward" size={18} color="#BCBCBC" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.signOutButton} onPress={logout}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </ScrollView>
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
    scrollContent: {
        paddingBottom: 40,
    },
    profileHeader: {
        alignItems: 'center',
        paddingVertical: 30,
        backgroundColor: '#FFFFFF',
        marginBottom: 10,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 15,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#FFF5F5',
    },
    editAvatarButton: {
        position: 'absolute',
        bottom: 5,
        right: 0,
        backgroundColor: '#E54B4B',
        padding: 6,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'white',
    },
    userName: {
        fontSize: 24,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 8,
    },
    vipBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9C4',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#FBC02D',
    },
    vipBadgeText: {
        fontSize: 12,
        fontWeight: '800',
        color: '#856404',
        marginLeft: 6,
        letterSpacing: 0.5,
    },
    section: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#1A1A1A',
        marginBottom: 15,
    },
    addNewText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#E54B4B',
    },
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        borderRadius: 15,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    addressIcon: {
        width: 45,
        height: 45,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressInfo: {
        flex: 1,
        marginLeft: 15,
    },
    addressLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    addressText: {
        fontSize: 13,
        color: '#757575',
    },
    settingsList: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#F7F7F7',
    },
    settingsItemText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
        marginLeft: 15,
    },
    signOutButton: {
        margin: 25,
        height: 55,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#E54B4B',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    signOutText: {
        color: '#E54B4B',
        fontSize: 16,
        fontWeight: '700',
    },
});

export default ProfileScreen;
