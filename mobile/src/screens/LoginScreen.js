import React, { useContext, useState } from 'react';
import {
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Text,
    Alert,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
} from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
    const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const { login, register } = useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (activeTab === 'login') {
                await login(email, password);
            } else {
                await register(name, email, password, address);
                Alert.alert('Success', 'Account created! Please sign in.');
                setActiveTab('login');
            }
        } catch (e) {
            Alert.alert('Error', activeTab === 'login' ? 'Invalid credentials' : 'Registration failed');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => navigation.navigate('Welcome')}
                    >
                        <Ionicons name="close" size={28} color="black" />
                    </TouchableOpacity>

                    <View style={styles.header}>
                        <Text style={styles.brandText}>CASALIVRAISON</Text>
                        <View style={styles.iconContainer}>
                            <View style={styles.iconCircle}>
                                <Ionicons name="bicycle" size={32} color="#E54B4B" />
                                <View style={styles.iconPulse} />
                            </View>
                        </View>
                        <Text style={styles.welcomeTitle}>Experience Seamless Luxury</Text>
                        <Text style={styles.welcomeSubtitle}>
                            {activeTab === 'login'
                                ? 'Sign in to access your boutique delivery service'
                                : 'Create an account to start your luxury journey'}
                        </Text>
                    </View>

                    <View style={styles.tabContainer}>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'login' && styles.activeTab]}
                            onPress={() => setActiveTab('login')}
                        >
                            <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.tab, activeTab === 'register' && styles.activeTab]}
                            onPress={() => setActiveTab('register')}
                        >
                            <Text style={[styles.tabText, activeTab === 'register' && styles.activeTabText]}>Create Account</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        {activeTab === 'register' && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>FULL NAME</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="person-outline" size={20} color="#BCBCBC" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="John Doe"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                            </View>
                        )}

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="mail-outline" size={20} color="#BCBCBC" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="name@example.com"
                                    value={email}
                                    onChangeText={setEmail}
                                    autoCapitalize="none"
                                    keyboardType="email-address"
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <View style={styles.labelRow}>
                                <Text style={styles.inputLabel}>PASSWORD</Text>
                                {activeTab === 'login' && (
                                    <TouchableOpacity>
                                        <Text style={styles.forgotText}>Forgot?</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                            <View style={styles.inputWrapper}>
                                <Ionicons name="lock-closed-outline" size={20} color="#BCBCBC" style={styles.inputIcon} />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry
                                />
                            </View>
                        </View>

                        {activeTab === 'register' && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>DELIVERY ADDRESS</Text>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="location-outline" size={20} color="#BCBCBC" style={styles.inputIcon} />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="123 Luxury St, Casablanca"
                                        value={address}
                                        onChangeText={setAddress}
                                    />
                                </View>
                            </View>
                        )}

                        <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
                            <LinearGradient
                                colors={['#E54B4B', '#EB5757']}
                                style={styles.authButtonGradient}
                            >
                                <Text style={styles.authButtonText}>
                                    {activeTab === 'login' ? 'Sign In' : 'Create Account'}
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialContainer}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-google" size={20} color="#E54B4B" style={{ marginRight: 10 }} />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Ionicons name="logo-apple" size={20} color="black" style={{ marginRight: 10 }} />
                            <Text style={styles.socialButtonText}>Apple</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.footerLink}>
                        <Text style={styles.footerLinkText}>
                            Need help? <Text style={styles.footerLinkTextBold}>Contact Concierge Support</Text>
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingBottom: 40,
    },
    closeButton: {
        padding: 20,
        alignSelf: 'flex-start',
    },
    header: {
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    brandText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#E54B4B',
        letterSpacing: 2,
        marginBottom: 30,
    },
    iconContainer: {
        marginBottom: 20,
    },
    iconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFF5F5',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    iconPulse: {
        position: 'absolute',
        width: 20,
        height: 10,
        backgroundColor: '#FFDEDE',
        borderRadius: 10,
        bottom: 25,
        right: 15,
        zIndex: -1,
    },
    welcomeTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: '#1A1A1A',
        textAlign: 'center',
    },
    welcomeSubtitle: {
        fontSize: 15,
        color: '#757575',
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 22,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#F7F7F7',
        marginHorizontal: 25,
        marginTop: 40,
        borderRadius: 15,
        padding: 5,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 12,
    },
    activeTab: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#757575',
    },
    activeTabText: {
        color: '#E54B4B',
    },
    form: {
        paddingHorizontal: 25,
        marginTop: 30,
    },
    inputGroup: {
        marginBottom: 20,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#BCBCBC',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    forgotText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#E54B4B',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FAFAFA',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#F0F0F0',
        paddingHorizontal: 15,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 15,
        color: '#1A1A1A',
    },
    authButton: {
        marginTop: 10,
    },
    authButtonGradient: {
        height: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#E54B4B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    authButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 25,
        marginTop: 30,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#EEEEEE',
    },
    dividerText: {
        marginHorizontal: 15,
        fontSize: 12,
        fontWeight: '700',
        color: '#BCBCBC',
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 25,
        marginTop: 25,
    },
    socialButton: {
        flex: 0.48,
        flexDirection: 'row',
        height: 50,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    socialButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    footerLink: {
        alignItems: 'center',
        marginTop: 40,
    },
    footerLinkText: {
        fontSize: 14,
        color: '#757575',
    },
    footerLinkTextBold: {
        fontWeight: '700',
        color: '#E54B4B',
    },
});

export default LoginScreen;
